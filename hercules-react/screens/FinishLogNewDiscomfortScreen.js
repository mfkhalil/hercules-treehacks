import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDiscomforts } from '../contexts/DiscomfortContext';

const FinishLogNewDiscomfortScreen = ({ route }) => {
    const { bodyPart, selectedOptions, motion, followup, painLevel } = route.params;
    const navigation = useNavigation();
    const { discomforts, setDiscomforts } = useDiscomforts();

    const finishLogging = () => {
        const newDiscomfort = {
            bodyPart,
            whenPain: selectedOptions.join(', '),
            motion,
            followUp: followup,
            painLevel,
            date: new Date().toISOString(), // Storing the current date
        };
        
        // Update state with the new discomfort log
        // If passing setDiscomforts through props, ensure it's received in this component
        setDiscomforts((prevDiscomforts) => [...prevDiscomforts, newDiscomfort]);
        
        navigation.navigate('DashboardScreen');
    };

    return (
        <View style={styles.container}>
            <Text>Summary</Text>
            <Text>Body Part: {bodyPart}</Text>
            <Text>When: {selectedOptions.join(', ')}</Text>
            <Text>Motion: {motion}</Text>
            <Text>Follow-up: {followup}</Text>
            <Text>Pain Level: {painLevel}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Finish Logging" onPress={finishLogging} />
                <Button title="Cancel" onPress={() => navigation.navigate('DashboardScreen')} />
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default FinishLogNewDiscomfortScreen;
