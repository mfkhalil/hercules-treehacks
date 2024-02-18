import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDiscomforts } from '../contexts/DiscomfortContext';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { discomforts, setDiscomforts } = useDiscomforts();

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.emptyHorizontalSection}>
                <Image source={require('../assets/images/profile.png')} style={{ width: 140, height: 140, borderRadius: 500, borderColor: 'black', borderWidth: 1 }} />
            </View>
            <View style={[styles.fullHorizontalSection, { flexDirection: 'column', height: '13%' }]}>
                <Text style={styles.sectionHeaderText}>Mobility Goals</Text>
                <Text style={styles.sectionBodyText}>Alleviate knee pain.</Text>
                <Text style={styles.sectionBodyText}>10K daily steps.</Text>
                <Text style={styles.sectionBodyText}>Stretch before exercising.</Text>
            </View>
            <View style={[styles.fullHorizontalSection, { flexDirection: 'column', height: '13%' }]}>
                <Text style={styles.sectionHeaderText}>Year-at-a-glance</Text>
                <Image source={require('../assets/images/graph.png')} style={{ width: 180, height: 70, marginLeft: 80 }} />
            </View>
            <View style={styles.emptyHorizontalSection}>
                <View style={[styles.leftHalfHorizontalSection, { flexDirection: 'column', height: '85%' }]}>
                    <Text style={styles.sectionHeaderText}>Medical History</Text>
                    <View style={styles.sectionBody}>
                        <View style={styles.diaryButton}>
                            <Text style={styles.sectionBodyText}>Lower back injury</Text>
                        </View>
                        <View style={styles.diaryButton}>
                            <Text style={styles.sectionBodyText}>Asthma</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.rightHalfEmptyHorizontalSection, { flexDirection: 'column', height: '85%' }]}>
                    <View style={styles.topHalfHorizontalSection}>
                        <Text style={styles.sectionHeaderText}>Connected Devices</Text>
                    </View>
                    <View style={styles.bottomHalfHorizontalSection}>
                        <Text style={styles.sectionHeaderText}>Weight and Height</Text>

                    </View>
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
        height: '8%',
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
    topHalfHorizontalSection: {
        width: '100%',
        height: '47%',
        backgroundColor: '#292929',
        marginBottom: '3%',
        borderRadius: 20,
    },
    bottomHalfHorizontalSection: {
        width: '100%',
        height: '47%',
        backgroundColor: '#292929',
        marginTop: '3%',
        borderRadius: 20,
    },
    rightHalfEmptyHorizontalSection: {
        width: '42%',
        height: '100%',
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

export default ProfileScreen;
