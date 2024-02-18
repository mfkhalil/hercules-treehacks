import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const WhenNewDiscomfortScreen = ({ route }) => {
    const { bodyPart } = route.params;
    const navigation = useNavigation();
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
        // Format the options to be full phrases
        const formattedOptions = selectedOptions.map(option => {
            switch (option) {
                case 'allTheTime':
                    return 'All the time';
                case 'whenPressed':
                    return 'When I press on it';
                case 'certainMotion':
                    return 'When I do a certain motion';
                default:
                    return '';
            }
        });
        if (selections.certainMotion) {
            navigation.navigate('DescribeMotionScreen', { bodyPart, selectedOptions: formattedOptions });
        } else {
            navigation.navigate('FollowUpNewDiscomfortScreen', { bodyPart, selectedOptions: formattedOptions, motion: null });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>It looks like you have pain in your<Text style={styles.boldHeaderText}> {bodyPart}</Text>.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>
                    <Text style={styles.boldBodyText}>When</Text> does it hurt? Select all that apply.</Text>
            </View>
            <View style={styles.selectContainer}>
                <TouchableOpacity
                    style={selections.allTheTime ? styles.selectedButton : styles.button}
                    onPress={() => handleSelect('allTheTime')}
                >
                    <Text style={styles.buttonText}>All The Time</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selections.whenPressed ? styles.selectedButton : styles.button}
                    onPress={() => handleSelect('whenPressed')}
                >
                    <Text style={styles.buttonText}>When I press on it</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={selections.certainMotion ? styles.selectedButton : styles.button}
                    onPress={() => handleSelect('certainMotion')}
                >
                    <Text style={styles.buttonText}>When I do a certain motion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.handleSubmitButton} onPress={handleSubmit}>
                    <Text style={styles.nextText}>
                        Next
                    </Text>
                    <Ionicons name="arrow-forward" size={30} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wrongButton} onPress={() => navigation.navigate('LogNewDiscomfortScreen')}>
                    <Text style={styles.wrongButtonText}>I haven't hurt my {bodyPart}</Text>
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
    boldHeaderText: {
        fontFamily: 'NohemiBold',
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
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30
    },
    selectContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
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
    selectedButton: {
        width: '88%',
        marginBottom: 10,
        backgroundColor: '#FFAF53',
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
    buttonContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        marginBottom: 20,
    },
    handleSubmitButton: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    nextText: {
        fontFamily: 'ApercuRegular',
        fontSize: 25,
        color: '#292929',
        marginLeft: 230,
        marginTop: 10
    },
    wrongButton: {
        width: '60%',
        marginBottom: 10,
        marginTop: 55
    },
    wrongButtonText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        color: '#292929',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});

export default WhenNewDiscomfortScreen;
