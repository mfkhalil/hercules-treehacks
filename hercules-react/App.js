import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import LogScreen from './screens/LogScreen';
import LogExistingScreen from './screens/LogExistingScreen';
import LogNewScreen from './screens/LogNewScreen';

const Stack = createStackNavigator();

export default function App() {
  const [injuries, setInjuries] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashboardScreen"
        screenOptions={{
          headerShown: false, // This hides the header for all screens within this Stack.Navigator
        }}
      >
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="LogScreen" component={LogScreen} />
        <Stack.Screen name="LogExistingScreen" component={LogExistingScreen} />
        <Stack.Screen name="LogNewScreen" component={LogNewScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};