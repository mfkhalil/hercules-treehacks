import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/DashboardScreen';
import LogDiscomfortScreen from './screens/LogDiscomfortScreen';
import LogExistingDiscomfortScreen from './screens/LogExistingDiscomfortScreen';
import LogNewDiscomfortScreen from './screens/LogNewDiscomfortScreen';
import UpdateDiscomfortScreen from './screens/UpdateDiscomfortScreen';
import WhenNewDiscomfortScreen from './screens/WhenNewDiscomfortScreen';
import DescribeMotionScreen from './screens/DescribeMotionScreen';
import FollowUpNewDiscomfortScreen from './screens/FollowUpNewDiscomfortScreen';
import FinishLogNewDiscomfortScreen from './screens/FinishLogNewDiscomfortScreen';
import WrappingUpNewDiscomfortScreen from './screens/WrappingUpNewDiscomfortScreen';
import ProfileScreen from './screens/ProfileScreen';
import { DiscomfortProvider } from './contexts/DiscomfortContext';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'ApercuBold': require('./assets/fonts/apercu_bold_italic_pro.otf'),
    'ApercuRegular': require('./assets/fonts/apercu_regular_pro.otf'),
    'NohemiRegular': require('./assets/fonts/Nohemi-Regular.otf'),
    'NohemiBold': require('./assets/fonts/Nohemi-Bold.otf'),
  });
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Summary') {
            iconName = 'bar-chart';
          } else if (route.name === 'Log') {
            iconName = 'book';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Hide the header
        tabBarActiveTintColor: '#FFAF53',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#292929',
          borderRadius: 100,
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 30, // This ensures the tab bar is above any device-specific screen curvature or navigation bar.
          height: 70, // Total height of the tab bar.
          paddingBottom: 10, // Adjust this value as needed to center the icons vertically.
        },
        
      })}
    >
      <Tab.Screen name="Summary" component={MainStackNavigator} />
      <Tab.Screen name="Log" component={LogStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function LogStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFDEE' },
      }}>
      <Stack.Screen name="LogDiscomfortScreen" component={LogDiscomfortScreen} />
      <Stack.Screen name="LogExistingDiscomfortScreen" component={LogExistingDiscomfortScreen} />
      <Stack.Screen name="LogNewDiscomfortScreen" component={LogNewDiscomfortScreen} />
      <Stack.Screen name="UpdateDiscomfortScreen" component={UpdateDiscomfortScreen} />
      <Stack.Screen name="WhenNewDiscomfortScreen" component={WhenNewDiscomfortScreen} />
      <Stack.Screen name="DescribeMotionScreen" component={DescribeMotionScreen} />
      <Stack.Screen name="FollowUpNewDiscomfortScreen" component={FollowUpNewDiscomfortScreen} />
      <Stack.Screen name="WrappingUpNewDiscomfortScreen" component={WrappingUpNewDiscomfortScreen} />
      <Stack.Screen name="FinishLogNewDiscomfortScreen" component={FinishLogNewDiscomfortScreen} />
    </Stack.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFDEE' },
      }}
    >
      <Stack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
          />
          <Stack.Screen
            name="LogDiscomfortScreen"
            component={LogDiscomfortScreen}
            options={{
              cardStyle: { backgroundColor: '#FFFDEE' },
            }}
          />
          <Stack.Screen
            name="LogExistingDiscomfortScreen"
            component={LogExistingDiscomfortScreen}
          />
          <Stack.Screen
            name="LogNewDiscomfortScreen"
            component={LogNewDiscomfortScreen}
          />
          <Stack.Screen
            name="UpdateDiscomfortScreen"
            component={UpdateDiscomfortScreen}
          />
          <Stack.Screen
            name="WhenNewDiscomfortScreen"
            component={WhenNewDiscomfortScreen}
          />
          <Stack.Screen
            name="DescribeMotionScreen"
            component={DescribeMotionScreen}
          />
          <Stack.Screen
            name="FollowUpNewDiscomfortScreen"
            component={FollowUpNewDiscomfortScreen}
          />
          <Stack.Screen
            name="FinishLogNewDiscomfortScreen"
            component={FinishLogNewDiscomfortScreen}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="WrappingUpNewDiscomfortScreen"
            component={WrappingUpNewDiscomfortScreen}
          />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'ApercuBold': require('./assets/fonts/apercu_bold_italic_pro.otf'),
          'ApercuRegular': require('./assets/fonts/apercu_regular_pro.otf'),
          'NohemiRegular': require('./assets/fonts/Nohemi-Regular.otf'),
          'NohemiBold': require('./assets/fonts/Nohemi-Bold.otf'),
        });
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen once everything is ready
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontLoaded) {
    return null; // Return null or a loading indicator while fonts are loading
  }

  return (
    <DiscomfortProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </DiscomfortProvider>
  );
}