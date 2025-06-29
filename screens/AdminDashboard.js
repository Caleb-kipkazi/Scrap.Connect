// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// // Screens
// // import requests from './Trequests';
// import Assign from './Assign';
// import Ahistory from './Ahistory';
// import Reports from './Reports';
// import Trequests from './Trequests'; // Assuming this is the summary screen for requests
// import RequestDetailsScreen from './RequestDetailsScreen'; // Assuming this is the detail screen for requests

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export default function AdminDashboard() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <View>
//           <Text style={styles.heading}>Welcome Admin.</Text>
//           <Text style={styles.subheading}>Scrap Connect</Text>
//           <Text style={styles.tagline}>Connect.Collect</Text>
//         </View>
//         <View style={styles.topRightIcons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications" size={24} color="green" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="person" size={24} color="green" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Main content: Tab Navigation */}
//       <View style={styles.mainContent}>
//         {/* <NavigationContainer independent={true}> */}
//           <Tab.Navigator
//             initialRouteName="Requests"
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ color, size }) => {
//                 let iconName;
//                 switch (route.name) {
//                   case 'Requests': iconName = 'list'; break;
//                   case 'Assign': iconName = 'send'; break;
//                   case 'Ahistory': iconName = 'time'; break;
//                   case 'Reports': iconName = 'bar-chart'; break;
//                 }
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//               tabBarActiveTintColor: 'green',
//               tabBarInactiveTintColor: 'gray',
//               headerShown: false,
//             })}
//           >
//             <Tab.Screen name="Requests" component={Trequests} />
//             <Tab.Screen name="Assign" component={Assign} />
//             <Tab.Screen name="History" component={Ahistory} />
//             <Tab.Screen name="Reports" component={Reports} />
//           </Tab.Navigator>
//         {/* </NavigationContainer> */}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   subheading: {
//     fontSize: 16,
//     color: 'black',
//   },
//   tagline: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   topRightIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginLeft: 12,
//   },
//   mainContent: {
//     flex: 1,
//   },
// });

//test
// AdminDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Screens
import Assign from './Assign';
import Ahistory from './Ahistory';
import Reports from './Reports';
import Trequests from './Trequests';
import AdminFeedbackScreen from './Afeedback'; // Assuming this screen exists
import Collectors from './Collectors'; // Assuming this screen exists

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Keep Stack for nested navigation if needed

// --- UI/UX Enhancements: Color Palette (Consistent) ---
const COLORS = {
  PRIMARY_GREEN: '#4CAF50',
  DARK_GREEN: '#004225',
  MEDIUM_GREEN: '#013220',
  LIGHT_GREEN: '#A5D6A7',
  WHITE: '#FFFFFF',
  GRAY_TEXT: '#CCCCCC',
  BLACK: '#000000',
};

function AdminTabs() {
  // Animation values for the tab bar icons
  const requestsIconAnim = useRef(new Animated.Value(1)).current;
  const assignIconAnim = useRef(new Animated.Value(1)).current;
  const historyIconAnim = useRef(new Animated.Value(1)).current;
  const collectorsIconAnim = useRef(new Animated.Value(1)).current;
  const feedbackIconAnim = useRef(new Animated.Value(1)).current;
  const reportsIconAnim = useRef(new Animated.Value(1)).current;

  const animateIcon = (animValue, focused) => {
    Animated.spring(animValue, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let animValue;

          switch (route.name) {
            case 'Requests':
              iconName = focused ? 'list-circle' : 'list-circle-outline'; // Changed to list-circle
              animValue = requestsIconAnim;
              break;
            case 'Assign':
              iconName = focused ? 'send' : 'send-outline';
              animValue = assignIconAnim;
              break;
            case 'History':
              iconName = focused ? 'timer' : 'timer-outline';
              animValue = historyIconAnim;
              break;
            case 'Collectors':
              iconName = focused ? 'people' : 'people-outline';
              animValue = collectorsIconAnim;
              break;
            case 'Feedback':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              animValue = feedbackIconAnim;
              break;
            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              animValue = reportsIconAnim;
              break;
          }

          useEffect(() => {
            animateIcon(animValue, focused);
          }, [focused]);

          return (
            <Animated.View style={{ transform: [{ scale: animValue }] }}>
              <Ionicons name={iconName} size={size * 1.1} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: COLORS.PRIMARY_GREEN,
        tabBarInactiveTintColor: COLORS.GRAY_TEXT,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false, // Hide header for tab screens
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Requests" component={Trequests} />
      <Tab.Screen name="Assign" component={Assign} />
      <Tab.Screen name="History" component={Ahistory} />
      <Tab.Screen name="Collectors" component={Collectors} />
      <Tab.Screen name="Feedback" component={AdminFeedbackScreen} />
      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
  );
}

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState('Admin');
  const greetingAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadAdminName = async () => {
      try {
        const storedAdminName = await AsyncStorage.getItem('username'); // Assuming 'username' or similar for admin
        if (storedAdminName) {
          setAdminName(storedAdminName);
        }
      } catch (error) {
        console.error('Failed to load admin name from AsyncStorage', error);
      }
    };

    loadAdminName();

    Animated.timing(greetingAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1200,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Greeting and Logo */}
      <View style={styles.topBar}>
        <View style={styles.greetingContainer}>
          <Animated.View style={{ opacity: logoAnim, transform: [{ scale: logoAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          })}] }}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.Text style={[styles.greeting, { opacity: greetingAnim }]}>
            {getTimeGreeting()}, {adminName}!
          </Animated.Text>
        </View>
        
        {/* Right side icons */}
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* navigate to notifications */}}>
            <Ionicons name="notifications" size={26} color={COLORS.PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* navigate to profile */}}>
            <Ionicons name="person" size={26} color={COLORS.PRIMARY_GREEN} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content: Tab Navigation */}
      <View style={styles.mainContent}>
        <AdminTabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREEN,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.DARK_GREEN,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MEDIUM_GREEN,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  topRightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  mainContent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  tabBar: {
    backgroundColor: COLORS.DARK_GREEN,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});