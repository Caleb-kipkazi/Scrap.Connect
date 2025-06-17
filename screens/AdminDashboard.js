import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Trequests from './Trequests';
import Assign from './Assign';
import Ahistory from './Ahistory';
import Reports from './Reports';

const Tab = createBottomTabNavigator();

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.heading}>Welcome Admin.</Text>
          <Text style={styles.subheading}>Scrap Connect</Text>
          <Text style={styles.tagline}>Connect.Collect</Text>
        </View>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content: Tab Navigation */}
      <View style={styles.mainContent}>
        {/* <NavigationContainer independent={true}> */}
          <Tab.Navigator
            initialRouteName="Requests"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Requests': iconName = 'list'; break;
                  case 'Assign': iconName = 'send'; break;
                  case 'Ahistory': iconName = 'time'; break;
                  case 'Reports': iconName = 'bar-chart'; break;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Requests" component={Trequests} />
            <Tab.Screen name="Assign" component={Assign} />
            <Tab.Screen name="History" component={Ahistory} />
            <Tab.Screen name="Reports" component={Reports} />
          </Tab.Navigator>
        {/* </NavigationContainer> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  subheading: {
    fontSize: 16,
    color: 'black',
  },
  tagline: {
    fontSize: 14,
    color: 'gray',
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  mainContent: {
    flex: 1,
  },
});
