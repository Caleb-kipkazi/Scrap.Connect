import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import AdminDashboard from '../screens/AdminDashboard';
import Profile from '../screens/Profile';
import Messaging from '../screens/Messaging';
import FAQs from '../screens/FAQs';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import RequestDetailsScreen from '../screens/RequestDetailsScreen';
import Collectors from '../screens/Collectors';
import CollectorSignUp from '../screens/Csignup';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Collectors" component={Collectors} options={{ title: 'Collectors List' }} />
      <Stack.Screen name="CollectorSignUp" component={CollectorSignUp} options={{ title: 'Add New Collector' }} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messaging" component={Messaging} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ title: 'Request Details' }} />
    </Stack.Navigator>
  );
}

export default function AmainNavigator() {
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
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Messaging"
        component={Messaging}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="chatbubble" size={size} color={color} />,
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
    </Drawer.Navigator>
  );
}