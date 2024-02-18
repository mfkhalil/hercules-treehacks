import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const DescribeMotionScreen = ({ route }) => {
    const { bodyPart, selectedOptions } = route.params;
    const navigation = useNavigation();
    const [sound] = useState(new Audio.Sound());
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [recordingReady, setRecordingReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    const handleAudioRecording = async () => {
        if (isRecording) {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            if (uri) {
                setRecordingReady(true);
                submitAudio(uri);
            }
        } else {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                setIsRecording(true);
                setRecordingReady(false);
                const newRecording = new Audio.Recording();
                await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await newRecording.startAsync();
                setRecording(newRecording);
            }
        }
    };

    const submitAudio = async (uri) => {
        setLoading(true);
        try {
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
                                Given the following audio transcription, 
                                identify the motion the individual is referring to, 
                                and include a concise one-sentence description of the motion in your response. 
                                For context, the individual is describing a motion that causes discomfort in their ${bodyPart}.
                                The transcription is as follows: ${transcription}
                                Include only the one-sentence description of the motion in your response. 
                                If there are multiple motions mentioned, include them all, one sentence for each.
                                `
                        }
                    ]
                });
                const motion = response.choices[0].message.content;
                navigation.navigate('FollowUpNewDiscomfortScreen', { bodyPart: bodyPart, selectedOptions: selectedOptions, motion: motion });
            } else {
                console.error('Failed to transcribe audio: ', transcriptionResult.error);
            }
        } catch (error) {
            console.error('Error submitting audio for processing:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Describe your motion by recording audio</Text>
            <TouchableOpacity onPress={handleAudioRecording} style={styles.button}>
                <Text>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
            </TouchableOpacity>
            {recordingReady && <Text>Recording ready to be submitted</Text>}
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
    button: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'lightblue',
    },
});

export default DescribeMotionScreen;
