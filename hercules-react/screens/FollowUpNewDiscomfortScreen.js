import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import OpenAI from "openai";
import { Ionicons } from '@expo/vector-icons';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const FollowUpNewDiscomfortScreen = ({ route }) => {
    const { bodyPart, selectedOptions, motion } = route.params;
    const navigation = useNavigation();
    const [sound] = useState(new Audio.Sound());
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingReady, setRecordingReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    useEffect(() => {
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/FollowUpNewDiscomfortScreen.mp3'));
                await sound.playAsync();
            } catch (error) {
                console.log('Error loading and playing sound:', error);
            }
        }

        loadAndPlay();

        return () => {
            async function stopAndUnload() {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            stopAndUnload();
        };
    }, []);

    const handleAudioRecording = async () => {
        if (isRecording) {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            });
            setRecordingReady(true);
        } else {
            const { status } = await Audio.requestPermissionsAsync();
            if (status === 'granted') {
                try {
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true,
                        staysActiveInBackground: true,
                        shouldDuckAndroid: true,
                    });
                    setIsRecording(true);
                    setRecordingReady(false);
                    const newRecording = new Audio.Recording();
                    await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                    await newRecording.startAsync();
                    setRecording(newRecording);
                } catch (error) {
                    console.log('Error setting audio mode or starting recording:', error);
                    setIsRecording(false);
                }
            } else {
                console.log('Audio recording permissions were not granted.');
            }
        }
    };


    const handleDeleteRecording = () => {
        setRecording(undefined);
        setRecordingReady(false);
    };

    const submitAudio = async () => {
        setLoading(true);
        try {
            const uri = await recording.getURI();
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
                            In your response, provide a short concise summary of any additional details mentioned in the audio.
                            The transcription is: ${transcription}
                            `
                        }
                    ]
                });
                const followUp = response.choices[0].message.content;
                navigation.navigate('WrappingUpNewDiscomfortScreen', { bodyPart: bodyPart, selectedOptions: selectedOptions, motion: motion, followUp: followUp});
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
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Additional details.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>You've been active with <Text style={styles.boldBodyText}>hiking</Text> today, as noticed by your wearable.</Text>
                <Text style={styles.bodyText}>Would you like to add any details about how you're feeling?</Text>
            </View>
            {!loading && !recordingReady && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleAudioRecording} style={styles.button}>
                        <Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Tell Hercules"}</Text>
                        <Ionicons name="mic" size={32} color="white" />
                    </TouchableOpacity>
                    {!isRecording && (
                    <TouchableOpacity onPress={() => {navigation.navigate('WrappingUpNewDiscomfortScreen', { bodyPart: bodyPart, selectedOptions: selectedOptions, motion: motion, followUp: null})}} style={styles.button}>
                        <Text style={styles.buttonText}>No, I'm all set.</Text>
                    </TouchableOpacity>
                    )}
                </View>
            )}
            {recordingReady && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={submitAudio} style={styles.button}>
                        <Text style={styles.buttonText}>Submit Recording</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteRecording} style={styles.button}>
                        <Text style={styles.buttonText}>Delete Recording</Text>
                    </TouchableOpacity>
                </View>
            )}

            {loading && <ActivityIndicator size="large" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFDEE',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
    },
    top: {
        width: '100%',
        height: '12%',
        justifyContent: 'flex-end',
    },
    backArrow: {
        marginLeft: 18,
        width: '10%',
    }, header: {
        width: '100%',
        height: '13%',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'NohemiRegular',
        fontSize: 35,
        marginLeft: 30,
        marginRight: 30
    },
    body: {
        width: '100%',
        height: '15%',
        justifyContent: 'flex-end',
        width: '100%',
    },
    bodyText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30
    },
    boldBodyText: {
        fontFamily: 'ApercuBold',
    },
    buttonContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    button: {
        width: '88%',
        marginBottom: 10,
        backgroundColor: '#292929',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30
    },
    buttonText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 18,
        paddingLeft: 25
    },
});

export default FollowUpNewDiscomfortScreen;
