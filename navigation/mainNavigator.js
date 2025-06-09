// src/navigation/MainNavigation.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeownerDashboard from '../screens/HomeownerDashboard';
import Request from '../screens/Request';
import Profile from '../screens/Profile';
import FAQs from '../screens/FAQs';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import History from '../screens/History';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeownerDashboard" component={HomeownerDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="History" component={History} />

    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
        drawerLabelStyle: { marginLeft: -10 },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Request"
        component={Request}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQs}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="call-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
