import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDiscomforts } from '../contexts/DiscomfortContext';
import { Ionicons } from '@expo/vector-icons';

const FinishLogNewDiscomfortScreen = ({ route }) => {
    const { bodyPart, selectedOptions, motion, followUp, painLevel } = route.params;
    const navigation = useNavigation();
    const { discomforts, setDiscomforts } = useDiscomforts();

    const finishLogging = () => {
        const newDiscomfort = {
            bodyPart,
            whenPain: selectedOptions.join(', '),
            motion,
            followUp,
            painLevel,
            date: new Date().toISOString(), // Storing the current date
        };

        // Update state with the new discomfort log
        // If passing setDiscomforts through props, ensure it's received in this component
        setDiscomforts((prevDiscomforts) => [...prevDiscomforts, newDiscomfort]);

        navigation.navigate('WoohooScreen');
    };

    return (
        <View style={styles.container}>

            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Summary.</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}><Text style={styles.boldBodyText}>Body Part:</Text> {bodyPart}</Text>
                <Text style={styles.bodyText}><Text style={styles.boldBodyText}>When:</Text> {selectedOptions.join(', ')}</Text>
                {motion && (<Text style={styles.bodyText}><Text style={styles.boldBodyText}>Motion:</Text> {motion}</Text>)}
                {followUp && (<Text style={styles.bodyText}><Text style={styles.boldBodyText}>Follow-up:</Text> {followUp}</Text>)}
                <Text style={styles.bodyText}><Text style={styles.boldBodyText}>Pain Level:</Text> {painLevel}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={finishLogging}>
                    <Text style={styles.buttonText}>Finish Logging</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardScreen')}>
                    <Text style={styles.buttonText}>Cancel</Text>
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
        height: '25%',
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

export default FinishLogNewDiscomfortScreen;
