// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function Dashboard() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Good Morning, Homeowner!</Text>

//       <View style={styles.cardGrid}>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Request')}>
//           <Text>Request</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
//           <Text>History</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
//           <Text>My Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FAQs')}>
//           <Text>FAQs</Text>
//           </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AboutUs')}>
//           <Text>About Us</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ContactUs')}>
//           <Text>Contact Us</Text>
//         </TouchableOpacity>
        
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     flex: 1,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   cardGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '48%',
//     height: 100,
//     backgroundColor: '#f1f1f1',
//     marginBottom: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 12,
// //     elevation: 3,
// //   },
// // });


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons, MaterialIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// export default function HomeownerDashboard() {
//   const navigation = useNavigation();

//   const cards = [
//     { title: 'Request', icon: <Ionicons name="ios-add-circle" size={24} color="#fff" />, screen: 'Request', bg: '#4CAF50' },
//     { title: 'History', icon: <FontAwesome5 name="history" size={24} color="#fff" />, screen: 'history', bg: '#2196F3' },
//     { title: 'About Us', icon: <Ionicons name="information-circle" size={24} color="#fff" />, screen: 'AboutUs', bg: '#9C27B0' },
//     { title: 'Contact Us', icon: <Feather name="phone" size={24} color="#fff" />, screen: 'ContactUs', bg: '#FF9800' },
//     { title: 'FAQs', icon: <Ionicons name="help-circle-outline" size={24} color="#fff" />, screen: 'FAQs', bg: '#00BCD4' },
//     { title: 'Messaging', icon: <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />, screen: 'Messaging', bg: '#795548' },
//     { title: 'Notification', icon: <Ionicons name="notifications" size={24} color="#fff" />, screen: 'Notification', bg: '#E91E63' },
//     { title: 'Profile', icon: <Feather name="user" size={24} color="#fff" />, screen: 'Profile', bg: '#607D8B' },
//     { title: 'Reward', icon: <Entypo name="gift" size={24} color="#fff" />, screen: 'Reward', bg: '#673AB7' },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <Text style={styles.welcome}>Welcome HomeOwner</Text>
//         <View style={styles.icons}>
//           <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//             <Ionicons name="notifications-outline" size={28} color="#4CAF50" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//             <Ionicons name="person-circle-outline" size={28} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Subtitles */}
//       <View style={styles.subheading}>
//         <Text style={styles.scrapConnect}>Scrap Connect</Text>
//         <Text style={styles.connectText}>Connect.Collect</Text>
//       </View>

//       {/* Cards Section */}
//       <ScrollView contentContainerStyle={styles.cardContainer}>
//         {cards.map((card, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.card, { backgroundColor: card.bg }]}
//             onPress={() => navigation.navigate(card.screen)}
//           >
//             {card.icon}
//             <Text style={styles.cardText}>{card.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 20 },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   welcome: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   icons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   subheading: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   scrapConnect: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   connectText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 16,
//   },
//   card: {
//     width: '48%',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   cardText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
// });


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

// // Screens
// import Home from './Home';
// import Request from './Request';
// import History from './History';
// import Messaging from './Messaging';
// import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';
// import FAQs from './FAQs';
// import Rewards from './Rewards';

// const Tab = createBottomTabNavigator();

// export default function HomeownerDashboard() {
//   const [activeSidebar, setActiveSidebar] = useState(null);

//   // const renderSidebarScreen = () => {
//   //   switch (activeSidebar) {
//   //     case 'AboutUs': return <AboutUs />;
//   //     case 'ContactUs': return <ContactUs />;
//   //     case 'FAQs': return <FAQs />;
//   //     case 'Rewards': return <Rewards />;
//       // default: return (
//         <Tab.Navigator
//           initialRouteName="Home"
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ color, size }) => {
//               let iconName;
//               switch (route.name) {
//                 case 'Home': iconName = 'home'; break;
//                 case 'Request': iconName = 'send'; break;
//                 case 'History': iconName = 'time'; break;
//                 case 'Messaging': iconName = 'chatbubble'; break;
//               }
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: 'green',
//             tabBarInactiveTintColor: 'gray',
//             headerShown: false,
//           })}
//         >
//           <Tab.Screen name="Home" component={Home} />
//           <Tab.Screen name="Request" component={Request} />
//           <Tab.Screen name="History" component={History} />
//           <Tab.Screen name="Messaging" component={Messaging} />
//         </Tab.Navigator>
//       // );
//     }
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <View>
//           <Text style={styles.heading}>Welcome Homeowner.</Text>
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

//       {/* Body */}
//       <View style={styles.body}>
//         {/* Sidebar */}
//         {/* <View style={styles.sidebar}>
//           <ScrollView>
//             <SidebarItem
//               icon="info"
//               label="About Us"
//               onPress={() => setActiveSidebar('AboutUs')}
//             />
//             <SidebarItem
//               icon="phone"
//               label="Contact Us"
//               onPress={() => setActiveSidebar('ContactUs')}
//             />
//             <SidebarItem
//               icon="help"
//               label="FAQs"
//               onPress={() => setActiveSidebar('FAQs')}
//             />
//             <SidebarItem
//               icon="star"
//               label="Rewards"
//               onPress={() => setActiveSidebar('Rewards')}
//             />
//           </ScrollView>
//         </View> */}

//         {/* Main content area (Tabs or Sidebar content) */}
//         <View style={styles.mainContent}>
//           {/* <NavigationContainer independent={true}>
//             {renderSidebarScreen()} */}
//           {/* </NavigationContainer> */}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// // }

// // Sidebar Item Component
// // const SidebarItem = ({ icon, label, onPress }) => (
// //   <TouchableOpacity style={styles.sidebarItem} onPress={onPress}>
// //     <Ionicons name={icon} size={20} color="white" style={{ marginRight: 8 }} />
// //     <Text style={styles.sidebarText}>{label}</Text>
// //   </TouchableOpacity>
// // );

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
//   body: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   // sidebar: {
//   //   width: 120,
//   //   backgroundColor: '#228B22',
//   //   paddingVertical: 20,
//   // },
//   // sidebarItem: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   paddingVertical: 12,
//   //   paddingHorizontal: 10,
//   // },
//   // sidebarText: {
//   //   color: 'white',
//   //   fontSize: 14,
//   // },
//   // mainContent: {
//     // flex: 1,
//   // },
// });


import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Screens
import Home from './Home';
import Request from './Request';
import History from './History';
import Messaging from './Messaging';

const Tab = createBottomTabNavigator();

// --- UI/UX Enhancements: Color Palette ---
const COLORS = {
  PRIMARY_GREEN: '#4CAF50', // A vibrant green for primary actions and highlights
  DARK_GREEN: '#004225', // Dark green for backgrounds
  MEDIUM_GREEN: '#013220', // Slightly lighter dark green for card backgrounds
  LIGHT_GREEN: '#A5D6A7', // Light green for borders/accents
  WHITE: '#FFFFFF',
  GRAY_TEXT: '#CCCCCC', // Lighter grey for secondary text
  BLACK: '#000000',
};

function HomeTabs() {
  // Animation values for the tab bar icons (subtle bounce on active)
  const homeIconAnim = useRef(new Animated.Value(1)).current;
  const requestIconAnim = useRef(new Animated.Value(1)).current;
  const historyIconAnim = useRef(new Animated.Value(1)).current;
  const messagingIconAnim = useRef(new Animated.Value(1)).current;

  const animateIcon = (animValue, focused) => {
    Animated.spring(animValue, {
      toValue: focused ? 1.2 : 1, // Scale up when focused
      friction: 4, // Control the bounciness
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let animValue;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              animValue = homeIconAnim;
              break;
            case 'Request':
              iconName = focused ? 'add-circle' : 'add-circle-outline'; // Changed to add-circle for request
              animValue = requestIconAnim;
              break;
            case 'History':
              iconName = focused ? 'timer' : 'timer-outline'; // Changed to timer for history
              animValue = historyIconAnim;
              break;
            case 'Messaging':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              animValue = messagingIconAnim;
              break;
          }

          useEffect(() => {
            animateIcon(animValue, focused); // Trigger animation on focus change
          }, [focused]);

          return (
            <Animated.View style={{ transform: [{ scale: animValue }] }}>
              <Ionicons name={iconName} size={size * 1.1} color={color} /> {/* Slightly larger icons */}
            </Animated.View>
          );
        },
        tabBarActiveTintColor: COLORS.PRIMARY_GREEN, // Active icon color
        tabBarInactiveTintColor: COLORS.GRAY_TEXT, // Inactive icon color
        tabBarStyle: styles.tabBar, // Custom tab bar style
        tabBarLabelStyle: styles.tabBarLabel, // Custom label style
        headerShown: false, // Hide header for tab screens as we have a custom one
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Request" component={Request} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Messaging" component={Messaging} />
    </Tab.Navigator>
  );
}

export default function HomeownerDashboard() {
  const [userName, setUserName] = useState('Homeowner');
  const greetingAnim = useRef(new Animated.Value(0)).current; // For greeting text animation
  const logoAnim = useRef(new Animated.Value(0)).current; // For logo animation

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username'); // Fetch username from AsyncStorage
        if (storedUsername) {
          setUserName(storedUsername);
        }
      } catch (error) {
        console.error('Failed to load username from AsyncStorage', error);
      }
    };

    loadUserName();

    // Start greeting text animation
    Animated.timing(greetingAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Start logo animation (slight delay)
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
              source={require('../assets/logo.png')} // Your logo image
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.Text style={[styles.greeting, { opacity: greetingAnim }]}>
            {getTimeGreeting()}, {userName}!
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
        <HomeTabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREEN, // Consistent dark background
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.DARK_GREEN, // Top bar background
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MEDIUM_GREEN, // Subtle separator
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Adjust for Android status bar
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35, // Small logo size
    height: 35,
    marginRight: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.WHITE, // White color for greeting
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Subtle text shadow for readability
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
    backgroundColor: COLORS.WHITE, // Main content background
    borderTopLeftRadius: 20, // Rounded corners for the content area
    borderTopRightRadius: 20,
    overflow: 'hidden', // Ensures content respects border radius
  },
  tabBar: {
    backgroundColor: COLORS.DARK_GREEN, // Dark background for tab bar
    borderTopWidth: 0, // No top border
    height: 60, // Slightly taller tab bar
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});