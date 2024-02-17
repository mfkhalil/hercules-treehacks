import React, { useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const UpdateDiscomfortScreen = ({ navigation, route }) => {
    const { data } = route.params;
    
    return (
        <View style={styles.container}>
            <Text>{data}</Text>
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

export default UpdateDiscomfortScreen;
