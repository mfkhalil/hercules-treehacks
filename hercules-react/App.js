import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import LogDiscomfortScreen from './screens/LogDiscomfortScreen';
import LogExistingDiscomfortScreen from './screens/LogExistingDiscomfortScreen';
import LogNewDiscomfortScreen from './screens/LogNewDiscomfortScreen';
import UpdateDiscomfortScreen from './screens/UpdateDiscomfortScreen';

const Stack = createStackNavigator();

export default function App() {
  const [discomforts, setDiscomforts] = useState([
    {
      title: 'Upper Back Soreness after Workout',
      date: '2024-01-12',
    },
    {
      title: 'Neck Pain after Sleeping Wrong',
      date: '2024-01-05',
    }
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DashboardScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
        />
        <Stack.Screen
          name="LogDiscomfortScreen"
          component={LogDiscomfortScreen}
        />
        <Stack.Screen
          name="LogExistingDiscomfortScreen"
          component={LogExistingDiscomfortScreen}
          initialParams={{ discomforts }}
        />
        <Stack.Screen
          name="LogNewDiscomfortScreen"
          component={LogNewDiscomfortScreen}
        />
        <Stack.Screen
          name="UpdateDiscomfortScreen"
          component={UpdateDiscomfortScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
