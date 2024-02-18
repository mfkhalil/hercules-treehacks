import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDiscomforts } from '../contexts/DiscomfortContext';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const { discomforts, setDiscomforts } = useDiscomforts();

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Good Morning Defne. ✨</Text>
            </View>
            <View style={styles.fullHorizontalSection}>
                <View style={styles.leftHalfFullHorizontalSection}>
                    <Text style={styles.sectionHeaderText}>Daily Progress</Text>
                    <View style={styles.sectionBody}>
                        <Text style={[styles.sectionBodyText, { color: '#FFC87F' }]}>8,980/10,000 steps</Text>
                        <Text style={[styles.sectionBodyText, { color: '#FFAA8F' }]}>6/9 hours slept</Text>
                        <Text style={[styles.sectionBodyText, { color: '#D76342' }]}>98/120 active minutes</Text>
                    </View>

                    <Text style={styles.sectionBodyText}>Reaching your goals today means prepating for a better tomorrow!</Text>
                </View>
                <View style={styles.rightHalfFullHorizontalSection}>
                    <Image source={require('../assets/images/ring.png')} style={{ width: 130, height: 130, marginRight: 20 }} />
                </View>
            </View>
            <View style={styles.emptyHorizontalSection}>
                <View style={styles.leftHalfHorizontalSection}>
                    <Text style={styles.sectionHeaderText}>Weekly Goals</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/bars.png')} style={{ width: 105, height: 95 }} />
                    </View>
                </View>
                <View style={styles.rightHalfHorizontalSection}>
                    <Text style={styles.sectionHeaderText}>Diary</Text>
                    <View style={styles.sectionBody}>
                        {discomforts.map((discomfort, index) => (
                            <View style={styles.diaryButton} key={index}>
                                <Text key={index} style={styles.sectionBodyText}>{(discomfort.bodyPart +  " pain").charAt(0).toUpperCase() + (discomfort.bodyPart +  " pain").substr(1).toLowerCase()}</Text>
                            </View>
                        ))} 
                    </View>
                </View>
            </View>
            <View style={[styles.fullHorizontalSection, { flexDirection: 'column' }]}>
                <Text style={styles.sectionHeaderText}>Weekly Progress</Text>
                <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/mobility.png')} style={{ width: 200, height: 100 }} />
                </View>
            </View>
        </View>
    );
};

// Using existing styles from the provided snippet
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
        marginRight: 30,
        color: '#292929',
    },
    sectionHeaderText: {
        fontFamily: 'NohemiRegular',
        fontSize: 18,
        marginLeft: 20,
        marginTop: 15,
        color: '#FFFDEE',
    },
    sectionBodyText: {
        fontFamily: 'ApercuRegular',
        fontSize: 12,
        marginLeft: 20,
        marginTop: 5,
        color: '#FFFDEE',
    },
    sectionBody: {
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    fullHorizontalSection: {
        flexDirection: 'row',
        width: '90%',
        height: '18%',
        backgroundColor: '#292929',
        borderRadius: 15,
        marginBottom: 20,
    },
    emptyHorizontalSection: {
        width: '100%',
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    leftHalfHorizontalSection: {
        width: '42%',
        height: '100%',
        backgroundColor: '#292929',
        marginRight: '3%',
        borderRadius: 15,
    },
    rightHalfHorizontalSection: {
        width: '42%',
        height: '100%',
        backgroundColor: '#292929',
        marginLeft: '3%',
        borderRadius: 15,
    },
    leftHalfFullHorizontalSection: {
        flexDirection: 'column',
        width: '60%',
    },
    rightHalfFullHorizontalSection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    diaryButton: {
        width: '80%',
        height: 30,
        marginTop: 10,
        marginLeft: 15,
        backgroundColor: 'orange',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 4
    },
});

export default DashboardScreen;
