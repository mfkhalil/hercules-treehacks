import React, { useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const LogNewDiscomfortScreen = ({ route }) => {
    const sound = new Audio.Sound();

    useEffect(() => {
        // Function to load and play the sound
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/LogNewDiscomfortScreen.mp3'));
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
            <Text>Log New Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogNewDiscomfortScreen;
