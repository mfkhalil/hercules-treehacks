import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogExistingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Log Existing Screen</Text>
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

export default LogExistingScreen;
