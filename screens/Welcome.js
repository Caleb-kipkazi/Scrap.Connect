// import React from 'react';
// import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const WelcomeScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <ImageBackground
//       source={require('../assets/background.png')} // Replace with your actual image path
//       style={styles.background}
//       resizeMode="contain"
//       imageStyle={{ opacity: 0.8 }} // Optional: Adjust the opacity of the background image
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.text}>
//           Hello, Welcome to Scrap Connect where we connect homeowners with scrap collectors for fast and easy scrap collection.
//         </Text>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.buttonText}>Get Started As A HomeOwner</Text>
//         </TouchableOpacity>

//          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ALogin')}>
//           <Text style={styles.buttonText}>Get Started As An Admin</Text>
//         </TouchableOpacity>

//          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clogin')}>
//           <Text style={styles.buttonText}>Get Started As A Collector</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end', // Move content to bottom
//     padding: 30,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
//   },
//   text: {
//     fontSize: 18,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#28a745',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     marginBottom: 10,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default WelcomeScreen;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PagerView from 'react-native-pager-view'; // Import PagerView

const { width, height } = Dimensions.get('window');

// Placeholder images - REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS!
// Example: require('../assets/homeowner_bg.jpeg')
const SLIDES = [
  {
    key: 'homeowner',
    title: 'Your Home, Our Planet',
    message: 'Join a community dedicated to clean living. Easily schedule scrap pickups and earn rewards!',
    buttonText: 'Get Started As A Homeowner',
    destination: 'Login', // Assuming 'Login' is your Homeowner login screen
    backgroundImage: require('../assets/user.png'), // Use your actual image
    // Placeholder image: https://placehold.co/720x1280/5C7A5C/FFFFFF?text=HOMEOWNER+SCRAP
  },
  {
    key: 'admin',
    title: 'Manage & Connect',
    message: 'Oversee collection centers, manage requests, and lead the recycling effort in your region.',
    buttonText: 'Get Started As An Admin',
    destination: 'ALogin', // Your Admin login screen
    backgroundImage: require('../assets/admin.jpg'), // Use your actual image
    // Placeholder image: https://placehold.co/720x1280/81B29A/FFFFFF?text=ADMIN+OVERVIEW
  },
  {
    key: 'collector',
    title: 'Collect & Empower',
    message: 'Take on collection tasks, contribute to a greener environment, and boost your income.',
    buttonText: 'Get Started As A Collector',
    destination: 'Clogin', // Your Collector login screen
    backgroundImage: require('../assets/collector.webp'), // Use your actual image
    // Placeholder image: https://placehold.co/720x1280/3D5B5B/FFFFFF?text=COLLECTOR+TASK
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerRef.current) {
        const nextPageIndex = (currentPage + 1) % SLIDES.length;
        pagerRef.current.setPage(nextPageIndex);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [currentPage]);

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const Dots = () => (
    <View style={styles.paginationDots}>
      {SLIDES.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentPage ? '#fff' : 'rgba(255,255,255,0.5)' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={onPageSelected}
        showPageIndicator={false} // We'll create custom dots
      >
        {SLIDES.map((slide) => (
          <View key={slide.key} style={styles.page}>
            <ImageBackground
              source={slide.backgroundImage}
              style={styles.backgroundImage}
              resizeMode="cover" // 'cover' will ensure the image fills the screen without cutting
              imageStyle={{ opacity: 0.7 }} // Adjust opacity for better text readability
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.message}>{slide.message}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate(slide.destination)}
                >
                  <Text style={styles.buttonText}>{slide.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </PagerView>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    width: width, // Ensure each page takes full width
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Keep content at the bottom
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for better contrast
    padding: 40,
    paddingBottom: 80, // More padding at the bottom
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.4, // Occupy at least 40% of screen height from bottom
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: 'bold',
    color: '#3CB371', // Green accent for title
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Subtle text shadow
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  message: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30, // More space before button
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#28a745', // Vibrant green
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30, // More rounded, pill-like
    marginBottom: 15,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase text
  },
  paginationDots: {
    position: 'absolute',
    bottom: 30, // Position above the bottom buttons slightly
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1, // Add a border to dots for visibility
    borderColor: 'rgba(255,255,255,0.7)',
  },
});

export default WelcomeScreen;