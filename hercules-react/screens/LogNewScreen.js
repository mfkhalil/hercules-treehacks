import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogNewScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Log New Screen</Text>
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

export default LogNewScreen;
