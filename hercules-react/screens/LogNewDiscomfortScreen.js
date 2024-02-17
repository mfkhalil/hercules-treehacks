import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import OpenAI from "openai"
import axios from 'axios';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY })

const LogNewDiscomfortScreen = ({ route }) => {
    const [sound] = useState(new Audio.Sound());
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [recordingReady, setRecordingReady] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [countdown, setCountdown] = useState(0)
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/LogNewDiscomfortScreen.mp3'));
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

    const updateRecordingDuration = () => {
        if (recording) {
            setRecordingDuration(recording._finalDurationMillis / 1000); // Convert milliseconds to seconds
        }
    };

    const handleAudioRecording = async () => {
        if (isRecording) {
            setIsRecording(false);
            const endTime = new Date(); // Capture end time
            await recording.stopAndUnloadAsync();
            // Ensure startTime is not null to avoid runtime errors
            if (startTime) {
                const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
                setRecordingDuration(duration);
            }
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
                    setRecordingDuration(0); // Reset duration
                    const newRecording = new Audio.Recording();
                    await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                    await newRecording.startAsync();
                    setRecording(newRecording);
                    setStartTime(new Date()); // Capture start time
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
        setRecordingDuration(0);
        setRecordingReady(false);
    };

    const startCountdown = async () => {
        setIsCountingDown(true);
        setCountdown(3);
        let counter = 3;
        const intervalId = setInterval(() => {
            counter -= 1;
            setCountdown(counter);
            if (counter === 0) {
                clearInterval(intervalId);
                submitPicture();
            }
        }, 1000);
    };

    const submitPicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCameraVisible(false); // Close the camera modal
            submitData({ type: 'photo', uri: photo.uri }); // Submit photo data
        }
    };

    const submitAudio = async () => {
        if (recording) {
            const uri = await recording.getURI();
            submitData({ type: 'audio', uri }); // Submit audio data
        }
    };

    const submitData = async (data) => {
        setLoading(true);
        try {
            if (data.type === 'photo') {
                // Use Expo's FileSystem to read the file as a base64 encoded string
                const base64Image = await FileSystem.readAsStringAsync(data.uri, { encoding: FileSystem.EncodingType.Base64 });

                // Send the POST request to the Flask endpoint
                const response = await openai.chat.completions.create({
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `Here is an image of an individual pointing at a 
                                    body part that they currently feel pain in.
                                    Identify the body part the individual is pointing at, 
                                    and include only the name of that body part in your response 
                                    as well as which one it is if specified (i.e. right knee, left ear).`
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        "url": `data:image/jpeg;base64,${base64Image}`
                                    }
                                }
                            ]
                        }
                    ],
                })

                if (response.choices[0].message.content) {
                    const bodyPart = response.choices[0].message.content
                    // Navigate or perform actions based on the response
                    navigation.navigate('FollowupNewDiscomfortScreen', { data: bodyPart });
                } else {
                    // Handle non-2xx responses
                    console.error('API responded with an error');
                }
            }
            else if (data.type === 'audio') {
                // Extract the filename from the URI
                const uriParts = data.uri.split('/');
                const fileName = uriParts[uriParts.length - 1];

                // Create a FormData object and append the file
                const formData = new FormData();
                formData.append('file', {
                    uri: data.uri,
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
                                identify the body part the individual is referring to, 
                                and include only the name of that body part in your response 
                                as well as which one it is if specified (i.e. right knee, left ear).
                                The transcription is as follows: ${transcription}`
                            }
                        ]
                    });
                    const bodyPart = response.choices[0].message.content;
                    navigation.navigate('FollowupNewDiscomfortScreen', { data: bodyPart });
                } else {
                    console.error('Failed to transcribe audio: ', transcriptionResult.error);
                }
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={cameraVisible} animationType="slide">
                <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef}>
                    <View style={styles.cameraContainer}>
                        {isCountingDown && <Text style={styles.countdownText}>{countdown}</Text>}
                        {!isCountingDown && <TouchableOpacity onPress={startCountdown} style={styles.button}>
                            <Text>Take Picture</Text>
                        </TouchableOpacity>}
                    </View>
                </Camera>
            </Modal>
            {!loading && !recordingReady && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleAudioRecording} style={styles.button}>
                        <Text>{isRecording ? "Stop Recording" : "Press for Audio"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCameraVisible(true);
                        setIsCountingDown(false);
                    }} style={styles.button}>
                        <Text>Press for Camera</Text>
                    </TouchableOpacity>
                </View>
            )}
            {recordingReady && (
                <>
                    <Text>Recording Duration: {recordingDuration.toFixed(2)} seconds</Text>
                    <TouchableOpacity onPress={submitAudio} style={styles.button}>
                        <Text>Submit Recording</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteRecording} style={styles.button}>
                        <Text>Delete Recording</Text>
                    </TouchableOpacity>
                </>
            )}
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
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        margin: 10,
        padding: 20,
        backgroundColor: 'lightblue',
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownText: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        marginTop: -24,
        fontSize: 48,
        color: 'white',
        zIndex: 10,
    },
});


export default LogNewDiscomfortScreen;
