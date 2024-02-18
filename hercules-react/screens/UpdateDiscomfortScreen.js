import React, { useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const UpdateDiscomfortScreen = ({ route }) => {
    const { discomfort } = route.params;
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Text>Update Discomfort: {discomfort.title}</Text>
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
