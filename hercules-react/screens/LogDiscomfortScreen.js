import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

const LogDiscomfortScreen = ({ navigation }) => {
    const sound = new Audio.Sound();

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
            <View style={styles.buttonContainer}>
                <Button
                    title="New Pain"
                    onPress={() => navigation.navigate('LogNewDiscomfortScreen')}
                />
                <Button
                    title="Existing Pain"
                    onPress={() => navigation.navigate('LogExistingDiscomfortScreen')}
                />
                <Button
                    title="Cancel"
                    onPress={() => navigation.navigate('DashboardScreen')}
                />
            </View>
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
        marginTop: 20,
    },
});

export default LogDiscomfortScreen;
