import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useDiscomforts } from '../contexts/DiscomfortContext';
import moment from 'moment';

const LogExistingDiscomfortScreen = () => {
    const sound = new Audio.Sound();
    const navigation = useNavigation();
    const { discomforts, setDiscomforts } = useDiscomforts();

    useEffect(() => {
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/LogExistingDiscomfortScreen.mp3'));
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

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Update an entry.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Select an entry to update.</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {discomforts.map((discomfort, index) => (
                    <View key={index} style={styles.discomfortItem}>
                        <Text style={styles.title}>{discomfort.bodyPart}</Text>
                        <Text style={styles.date}>{moment(discomfort.date).format('MMMM Do YYYY')}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('UpdateDiscomfortScreen', { discomfort })}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
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
    }, 
    header: {
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
        justifyContent: 'flex-end',
        width: '100%',
    },
    bodyText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%', 
        marginTop: 20, // Add margin for spacing
    },
    discomfortItem: {
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#292929', // Match the button color for background
        borderRadius: 15, // Match the border radius
        paddingVertical: 18, // Add padding for spacing
        paddingHorizontal: 60, // Add padding for spacing
        marginBottom: 10, // Adjust the margin for spacing
    },
    title: {
        fontFamily: 'ApercuRegular', // Match the font family
        fontSize: 20, // Adjust the font size
        color: 'white', // Match the text color
    },
    date: {
        fontFamily: 'ApercuRegular', // Match the font family
        fontSize: 14, // Adjust the font size
        color: 'grey', // Keep the color for differentiation
        marginBottom: 10, // Add margin for spacing between text and button
    },
    button: {
        backgroundColor: '#FFFDEE', // Use a contrasting color for the button
        borderRadius: 15, // Match the border radius
        paddingHorizontal: 30, // Add padding
        paddingVertical: 10, // Add padding
    },
    buttonText: {
        fontFamily: 'ApercuRegular', // Match the font family
        fontSize: 18, // Adjust the font size
        color: '#292929', // Contrast color for button text
    },
});

export default LogExistingDiscomfortScreen;
