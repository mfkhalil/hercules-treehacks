import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UpdateDiscomfortScreen = ({ route }) => {
    const navigation = useNavigation();
    const { discomfort } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>This is where you would update your discomfort for <Text style={styles.boldHeaderText}>{discomfort.bodyPart}</Text></Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Unfortunately, Hercules's makers ran out of time...</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => navigation.navigate('DashboardScreen')}>Return to Dashboard</Text>
                </View>
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
        justifyContent: 'center',
    },
    top: {
        width: '100%',
        height: '25%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backArrow: {
        marginLeft: 18,
        width: '10%',
    },
    header: {
        width: '100%',
        // height: '13%',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'NohemiRegular',
        fontSize: 35,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    },
    boldHeaderText: {
        fontFamily: 'NohemiBold',
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
        marginRight: 30,
        marginTop: 20
    },
    boldBodyText: {
        fontFamily: 'ApercuBold',
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 20,
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

export default UpdateDiscomfortScreen;
