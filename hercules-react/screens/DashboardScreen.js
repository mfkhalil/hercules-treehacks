import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.dashboard}>
                <Text>Dashboard Here</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Log New Pain"
                    onPress={() => navigation.navigate('LogScreen')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    dashboard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 80,
        marginHorizontal: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default DashboardScreen;
