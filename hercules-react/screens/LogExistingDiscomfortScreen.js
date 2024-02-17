import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const LogExistingDiscomfortScreen = ({ navigation, route }) => {
    const { discomforts, setDiscomforts } = route.params;
    const sound = new Audio.Sound();

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
        <ScrollView contentContainerStyle={styles.container}>
            {discomforts.map((discomfort, index) => (
                <View key={index} style={styles.discomfortItem}>
                    <Text style={styles.title}>{discomfort.title}</Text>
                    <Text style={styles.date}>{discomfort.date}</Text>
                    <Button
                        title="Update"
                        onPress={() => navigation.navigate('UpdateDiscomfortScreen', { discomfort })}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discomfortItem: {
        marginVertical: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: 'grey',
    },
});

export default LogExistingDiscomfortScreen;
