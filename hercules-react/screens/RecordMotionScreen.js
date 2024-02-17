import React, { useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const RecordMotionScreen = ({ navigation, route }) => {
    const { bodyPart, selectedOptions } = route.params;
    
    return (
        <View style={styles.container}>
            <Text>Record Motion</Text>
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

export default RecordMotionScreen;
