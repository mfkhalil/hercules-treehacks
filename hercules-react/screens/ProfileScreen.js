import React, { useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFDEE',
    },
});

export default ProfileScreen;
