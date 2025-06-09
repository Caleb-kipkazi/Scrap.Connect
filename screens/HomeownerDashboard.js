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


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

// Screens
import Home from './Home';
import Request from './Request';
import History from './History';
import Messaging from './Messaging';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import FAQs from './FAQs';
import Rewards from './Rewards';

const Tab = createBottomTabNavigator();

export default function HomeownerDashboard() {
  const [activeSidebar, setActiveSidebar] = useState(null);

  const renderSidebarScreen = () => {
    switch (activeSidebar) {
      case 'AboutUs': return <AboutUs />;
      case 'ContactUs': return <ContactUs />;
      case 'FAQs': return <FAQs />;
      case 'Rewards': return <Rewards />;
      default: return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home': iconName = 'home'; break;
                case 'Request': iconName = 'send'; break;
                case 'History': iconName = 'time'; break;
                case 'Messaging': iconName = 'chatbubble'; break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Request" component={Request} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Messaging" component={Messaging} />
        </Tab.Navigator>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.heading}>Welcome Homeowner.</Text>
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

      {/* Body */}
      <View style={styles.body}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView>
            <SidebarItem
              icon="info"
              label="About Us"
              onPress={() => setActiveSidebar('AboutUs')}
            />
            <SidebarItem
              icon="phone"
              label="Contact Us"
              onPress={() => setActiveSidebar('ContactUs')}
            />
            <SidebarItem
              icon="help"
              label="FAQs"
              onPress={() => setActiveSidebar('FAQs')}
            />
            <SidebarItem
              icon="star"
              label="Rewards"
              onPress={() => setActiveSidebar('Rewards')}
            />
          </ScrollView>
        </View>

        {/* Main content area (Tabs or Sidebar content) */}
        <View style={styles.mainContent}>
          {/* <NavigationContainer independent={true}> */}
            {renderSidebarScreen()}
          {/* </NavigationContainer> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Sidebar Item Component
const SidebarItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.sidebarItem} onPress={onPress}>
    <Ionicons name={icon} size={20} color="white" style={{ marginRight: 8 }} />
    <Text style={styles.sidebarText}>{label}</Text>
  </TouchableOpacity>
);

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
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 120,
    backgroundColor: '#228B22',
    paddingVertical: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sidebarText: {
    color: 'white',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
  },
});
