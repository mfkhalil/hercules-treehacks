import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const LogDiscomfortScreen = () => {
    const sound = new Audio.Sound();
    const navigation = useNavigation();

    useEffect(() => {
        // Function to load and play the sound
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/LogDiscomfortScreen.mp3'));
                await sound.playAsync();
            } catch (error) {
                console.log('Error loading and playing sound:', error);
            }
        }

        // Call the function
        loadAndPlay();

        return () => {
            // Function to stop and unload the sound
            async function stopAndUnload() {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            // Call the function
            stopAndUnload();
        };
    }, []);

    return (
        <View style={styles.container}> 
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Let's log your symptoms.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Would you like to log a new entry or update an existing one?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogNewDiscomfortScreen')}>
                    <Text style={styles.buttonText}>Log a new entry.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogExistingDiscomfortScreen')}>
                    <Text style={styles.buttonText}>Update an existing entry.</Text>
                </TouchableOpacity>
            </View>
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
    },
    top: {
        width: '100%',
        height: '12%',
        justifyContent: 'flex-end',
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
        height: '15%',
        justifyContent: 'flex-end',
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
        alignItems: 'flex-start'
    },
    buttonText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 18,
        paddingLeft: 25
    }
});

export default LogDiscomfortScreen;
