import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Screens
// import Chome from './Chome';
import Pickups from './Pickups';
import Chistory from './Chistory';
import CollectorPayment from './CollectorPayment';

const Tab = createBottomTabNavigator();

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

function CollectorTabs() {
  // Animation values for the tab bar icons
  const homeIconAnim = useRef(new Animated.Value(1)).current;
  const pickupsIconAnim = useRef(new Animated.Value(1)).current;
  const payIconAnim = useRef(new Animated.Value(1)).current;
  const historyIconAnim = useRef(new Animated.Value(1)).current;

  const animateIcon = (animValue, focused) => {
    Animated.spring(animValue, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Pickups" // Changed to 'pickups' as per your request
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let animValue;

          switch (route.name) {
            case 'Pickups':
              iconName = focused ? 'cube' : 'cube-outline'; // Changed to cube for pickups
              animValue = pickupsIconAnim;
              break;
            // case 'Pickups':
            //   iconName = focused ? 'cube' : 'cube-outline'; // Changed to cube for pickups
            //   animValue = pickupsIconAnim;
            //   break;
            case 'Pay':
              iconName = focused ? 'wallet' : 'wallet-outline'; // Changed to wallet for pay
              animValue = payIconAnim;
              break;
            case 'History':
              iconName = focused ? 'timer' : 'timer-outline';
              animValue = historyIconAnim;
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
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      {/* <Tab.Screen name="Home" component={Chome} /> */}
      <Tab.Screen name="Pickups" component={Pickups} />
      <Tab.Screen name="Pay" component={CollectorPayment} />
      <Tab.Screen name="History" component={Chistory} />
    </Tab.Navigator>
  );
}

export default function CollectorDashboard() {
  const [collectorName, setCollectorName] = useState('Collector');
  const greetingAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadCollectorName = async () => {
      try {
        const storedCollectorName = await AsyncStorage.getItem('userFullName'); // Assuming 'userFullName' or similar for collector
        if (storedCollectorName) {
          setCollectorName(storedCollectorName);
        }
      } catch (error) {
        console.error('Failed to load collector name from AsyncStorage', error);
      }
    };

    loadCollectorName();

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
            {getTimeGreeting()}, {collectorName}!
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
        <CollectorTabs />
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

//test
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

// // Screens (ensure these paths are correct relative to CollectorDashboard.js)
// import Chome from './Chome'; // This is the component for the 'Home' tab
// import Pickups from './Pickups';
// import Chistory from './Chistory';
// import CollectorPayment from './CollectorPayment';
// // import Messaging from './Messaging'; // Currently commented out

// const Tab = createBottomTabNavigator();

// export default function CollectorDashboard() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <View>
//           <Text style={styles.heading}>Welcome Collector.</Text>
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
//         {/* The NavigationContainer should typically wrap the entire app in App.js,
//             not individual navigators, unless you specifically need independent navigation trees.
//             Keeping it commented out as per your original code. */}
//         {/* <NavigationContainer independent={true}> */}
//           <Tab.Navigator
//             // FIX: Changed initialRouteName from "Chome" to "Home" to match the Tab.Screen name
//             initialRouteName="Home"
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ color, size }) => {
//                 let iconName;
//                 switch (route.name) {
//                   case 'Home': iconName = 'home'; break;
//                   case 'Pickups': iconName = 'cart'; break;
//                   case 'Pay': iconName = 'cash'; break; // 'Pay' is the screen name
//                   case 'History': iconName = 'time'; break;
//                   // case 'Messaging': iconName = 'chatbubble'; break;
//                 }
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//               tabBarActiveTintColor: 'green',
//               tabBarInactiveTintColor: 'gray',
//               headerShown: false, // Hide header for tab screens
//             })}
//           >{/* Ensure no whitespace or empty lines directly between Tab.Navigator tags and its children */
//             }<Tab.Screen name="Home" component={Chome} />
//             <Tab.Screen name="Pickups" component={Pickups} />
//             <Tab.Screen name="Pay" component={CollectorPayment} /> {/* Use 'Pay' as the name */}
//             <Tab.Screen name="History" component={Chistory} />
//             {/* <Tab.Screen name="Messaging" component={Messaging} /> */}</Tab.Navigator>
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
