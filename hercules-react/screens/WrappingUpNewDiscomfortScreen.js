import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const WrappingUpNewDiscomfortScreen = ({ route }) => {
    const { bodyPart, selectedOptions, motion } = route.params;
    const navigation = useNavigation();
    const [painLevel, setPainLevel] = useState(null);
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);

    const startRecording = async () => {
        setLoading(true);
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await newRecording.startAsync();
            setRecording(newRecording);
            setIsRecording(true);
        } catch (error) {
            console.log('Failed to start recording:', error);
        }
        setLoading(false);
    };

    const stopRecording = async () => {
        setIsRecording(false);
        setLoading(true);
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            const uriParts = uri.split('/');
            const fileName = uriParts[uriParts.length - 1];

            // Create a FormData object and append the file
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: 'audio/x-m4a',
                name: fileName,
            });
            formData.append('model', 'whisper-1');

            // Make the API request to OpenAI
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
                    // 'Content-Type': 'multipart/form-data' is set automatically
                },
                body: formData,
            });

            const transcriptionResult = await response.json();

            // Handle the response from OpenAI
            if (transcriptionResult && transcriptionResult.text) {

                const transcription = transcriptionResult.text;
                // Navigate or perform actions based on the transcription
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `
                                In the following audio transcription, 
                                an individual is describing additional details about their discomfort.
                                The individual has reported that they have hurt their ${bodyPart} 
                                and that it hurts when they ${selectedOptions.join(', ')}.
                                ${motion ? `They also reported that it hurts when they ${motion}.` : ''}
                                They rated their pain as a ${painLevel} out of 10.
                                In your response, provide a short concise summary of any additional details mentioned in the audio.
                                The transcription is: ${transcription}
                                `
                        }
                    ]
                });
                const followup = response.choices[0].message.content;
                navigation.navigate('FinishLogNewDiscomfortScreen', { bodyPart: bodyPart, selectedOptions: selectedOptions, motion: motion, followup: followup, painLevel: painLevel });
            } else {
                console.error('Failed to transcribe audio: ', transcriptionResult.error);
            }
        } catch (error) {
            console.log('Could not stop recording:', error);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text>{bodyPart}</Text>
            <Text>{selectedOptions.join(', ')}</Text>
            <Text>{motion}</Text>
            <Text>Rate your pain on a scale of 1 to 10:</Text>
            <View style={styles.painScaleContainer}>
                {[...Array(10).keys()].map((index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.painLevelButton(painLevel === index + 1)}
                        onPress={() => setPainLevel(index + 1)}
                    >
                        <Text>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button title={isRecording ? "Stop Recording" : "Record Follow-up"} onPress={isRecording ? stopRecording : startRecording} />
            {loading && <ActivityIndicator size="large" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    painScaleContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    painLevelButton: (isSelected) => ({
        padding: 10,
        margin: 2,
        backgroundColor: isSelected ? 'skyblue' : 'lightgrey',
    }),
});

export default WrappingUpNewDiscomfortScreen;
