import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Chome from './Chome';
import Pickups from './Pickups';
import Chistory from './Chistory';
import CollectorPayment from './CollectorPayment';
// import Messaging from './Messaging';

const Tab = createBottomTabNavigator();

export default function CollectorDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.heading}>Welcome Collector.</Text>
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
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Home': iconName = 'home'; break;
                  case 'Pickups': iconName = 'cart'; break;
                  case 'CollectorPayment': iconName = 'cash'; break;
                  case 'Chistory': iconName = 'time'; break;
                  // case 'Messaging': iconName = 'chatbubble'; break;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={Chome} />
            <Tab.Screen name="Pickups" component={Pickups} />
            <Tab.Screen name="Pay" component={CollectorPayment} />
            <Tab.Screen name="History" component={Chistory} />
            {/* <Tab.Screen name="Messaging" component={Messaging} /> */}
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
