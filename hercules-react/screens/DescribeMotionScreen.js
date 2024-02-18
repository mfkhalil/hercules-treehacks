import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import OpenAI from "openai";
import { Ionicons } from '@expo/vector-icons';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const DescribeMotionScreen = ({ route }) => {
    const { bodyPart, selectedOptions } = route.params;
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

    const handleAudioRecording = async () => {
        if (isRecording) {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
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
            <View style={styles.top}>
                <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate('WhenNewDiscomfortScene')}>
                    <Ionicons name="arrow-back" size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Describe the motion.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>What motions cause you pain? Tell me about it.</Text>
            </View>
            {!loading && !recordingReady && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleAudioRecording} style={styles.button}>
                        <Text style={styles.buttonText}>{isRecording ? "Stop Recording" : "Tell Hercules"}</Text>
                        <Ionicons name="mic" size={32} color="white" />
                    </TouchableOpacity>
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

export default DescribeMotionScreen;
