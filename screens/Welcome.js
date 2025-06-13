import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Replace with your actual image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>
          Hello, Welcome to Scrap Connect where we connect homeowners with scrap collectors for fast and easy scrap collection.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started As A HomeOwner</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ALogin')}>
          <Text style={styles.buttonText}>Get Started As An Admin</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clogin')}>
          <Text style={styles.buttonText}>Get Started As A Collector</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Move content to bottom
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

