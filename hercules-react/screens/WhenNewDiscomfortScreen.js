import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';

const WhenNewDiscomfortScreen = (route) => {
    const { navigation, bodyPart } = route.params;
    const [selections, setSelections] = useState({
        allTheTime: false,
        whenPressed: false,
        certainMotion: false,
    });
    const sound = new Audio.Sound();

    useEffect(() => {
        async function loadAndPlay() {
            try {
                await sound.loadAsync(require('../assets/audio/WhenNewDiscomfortScreen.mp3'));
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

    const handleSelect = (option) => {
        setSelections(prevSelections => ({
            ...prevSelections,
            [option]: !prevSelections[option],
        }));
    };

    const handleSubmit = () => {
        const selectedOptions = Object.entries(selections)
            .filter(([key, value]) => value)
            .map(([key]) => key);

        if (selections.certainMotion) {
            navigation.navigate('RecordMotionScreen', { bodyPart, selectedOptions });
        } else {
            navigation.navigate('FollowUpNewDiscomfortScreen', { bodyPart, selectedOptions });
        }
    };

    return (
        <View style={styles.container}>
            <Text>You seem to have hurt your {bodyPart}. When does it hurt?</Text>

            <TouchableOpacity
                style={selections.allTheTime ? styles.selectedOption : styles.option}
                onPress={() => handleSelect('allTheTime')}
            >
                <Text>All The Time</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={selections.whenPressed ? styles.selectedOption : styles.option}
                onPress={() => handleSelect('whenPressed')}
            >
                <Text>When I press on it</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={selections.certainMotion ? styles.selectedOption : styles.option}
                onPress={() => handleSelect('certainMotion')}
            >
                <Text>When I do a certain motion</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
                <Button
                    title={`I haven't hurt my ${bodyPart}`}
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
        padding: 20,
    },
    option: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 10,
    },
    selectedOption: {
        backgroundColor: '#c0e0ff',
        padding: 15,
        marginVertical: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default WhenNewDiscomfortScreen;
