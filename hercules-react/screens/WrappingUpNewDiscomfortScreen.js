import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import OpenAI from "openai";
import { Ionicons } from '@expo/vector-icons';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const WrappingUpNewDiscomfortScreen = ({ route }) => {
    const { bodyPart, selectedOptions, motion, followUp } = route.params;
    const navigation = useNavigation();
    const [sound] = useState(new Audio.Sound());
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
        <View style={styles.top}>
        </View>
        <View style={styles.header}>
            <Text style={styles.headerText}>Wrapping up.</Text>
        </View>
        <View style={styles.body}>
            <Text style={styles.bodyText}>On a scale from 1 to 10, how would you rate your pain or discomfort right now?</Text>
        </View>
            <View style={styles.painScaleContainer}>
                {[...Array(10).keys()].map((index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('FinishLogNewDiscomfortScreen', { bodyPart, selectedOptions, motion, followUp, painLevel: index + 1 })
                        }}
                    >
                        <Text style={styles.buttonText}>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    painScaleContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding:20
    },
    button: {
        width: 30,
        height: 30,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: '#292929',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'ApercuRegular',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },

});

export default WrappingUpNewDiscomfortScreen;
