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
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Trequests from './Trequests';
import Assign from './Assign';
import Ahistory from './Ahistory';
import Reports from './Reports';
import RequestDetailsScreen from './RequestDetailsScreen';
import Collectors from './Collectors';
import CollectorSignUp from './Csignup'; // Collector signup screen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator (used as one screen in Stack)
function AdminTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Requests"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Requests': iconName = 'list'; break;
            case 'Assign': iconName = 'send'; break;
            case 'History': iconName = 'time'; break;
            case 'Collectors': iconName = 'people'; break;
            case 'Reports': iconName = 'bar-chart'; break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Requests" component={Trequests} />
      <Tab.Screen name="Assign" component={Assign} />
      <Tab.Screen name="History" component={Ahistory} />
      <Tab.Screen name="Collectors" component={Collectors} />
      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
  );
}



export default function AdminDashboard() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="RequestDetailsScreen" component={RequestDetailsScreen} />
      <Stack.Screen name="CollectorSignUp" component={CollectorSignUp} />
    </Stack.Navigator>
  );
}
