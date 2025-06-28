import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define a base URL for your API
const API_BASE_URL = 'http://192.168.189.119:5000/api/v1';

// Define a color palette for consistent styling
const Colors = {
  backgroundLight: '#f0f2f5', // Light grey background
  backgroundDark: '#1e1e1e', // Dark mode background
  cardBackgroundLight: '#FFFFFF', // White card background
  cardBackgroundDark: '#333333', // Dark mode card background
  textLight: '#1e1e1e', // Dark text
  textDark: '#f1f1f1', // Light text
  primaryGreen: '#008000', // Primary green from your original styles
  secondaryGreen: '#006600', // Darker green for buttons
  errorRed: '#dc3545',
  labelColor: '#008000', // Label color from your original styles
};

export default function Profile({ navigation }) { // Assume navigation prop is available for logout redirect
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Determine theme colors based on device's color scheme
  // const scheme = useColorScheme(); // Uncomment if you have react-native-appearance or similar
  const scheme = 'light'; // For simulation, assume light mode, change if you have actual useColorScheme setup
  const themeBg = scheme === 'dark' ? Colors.backgroundDark : Colors.backgroundLight;
  const textColor = scheme === 'dark' ? Colors.textDark : Colors.textLight;
  const cardBg = scheme === 'dark' ? Colors.cardBackgroundDark : Colors.cardBackgroundLight;
  const labelColor = Colors.labelColor; // Keep green labels regardless of theme for now
  const valueColor = scheme === 'dark' ? Colors.textDark : Colors.textLight;

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let storedId = null;
    let storedRole = null;
    let storedToken = null;

    try {
      // Retrieve user role and ID from AsyncStorage
      storedRole = await AsyncStorage.getItem('userRole');
      storedToken = await AsyncStorage.getItem('token');

      let endpoint = '';
      if (storedRole === 'homeowner') {
        storedId = await AsyncStorage.getItem('userId');
        endpoint = `${API_BASE_URL}/user/info/${storedId}`;
      } else if (storedRole === 'collector') {
        storedId = await AsyncStorage.getItem('collectorId');
        endpoint = `${API_BASE_URL}/collector/info/${storedId}`;
      } else if (storedRole === 'center') {
        storedId = await AsyncStorage.getItem('centerId');
        endpoint = `${API_BASE_URL}/center/info/${storedId}`;
      } else {
        setError('No user role found. Please log in.');
        setLoading(false);
        return;
      }

      if (!storedId) {
        setError('User ID not found. Please log in.');
        setLoading(false);
        return;
      }

      setUserId(storedId);
      setUserRole(storedRole);
      setUserToken(storedToken);

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: storedToken ? `Bearer ${storedToken}` : undefined,
        },
      });

      // Based on your backend responses:
      if (storedRole === 'homeowner') {
        setProfileData(response.data.user);
      } else if (storedRole === 'collector') {
        setProfileData(response.data.collector);
      } else if (storedRole === 'center') {
        setProfileData(response.data.center);
      }

    } catch (err) {
      console.error('Error fetching profile data:', err.response?.data || err.message);
      setError('Failed to fetch profile. Please log in again or check network.');
      // Handle 401 Unauthorized specifically
      if (err.response && err.response.status === 401) {
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
        handleLogout(true); // Force logout without backend call if already unauthorized
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleLogout = async (isSessionExpired = false) => {
    setLoading(true); // Show loading while logging out
    let logoutEndpoint = '';
    if (userRole === 'homeowner') {
      logoutEndpoint = `${API_BASE_URL}/user/signout/`;
    } else if (userRole === 'collector') {
      logoutEndpoint = `${API_BASE_URL}/collector/signout/`;
    } else if (userRole === 'center') {
      logoutEndpoint = `${API_BASE_URL}/center/signout/`;
    } else {
      console.warn("No user role found for logout. Clearing local storage only.");
    }

    try {
      if (logoutEndpoint && !isSessionExpired) { // Don't call backend if session already expired
        await axios.post(logoutEndpoint, {}, {
          headers: {
            Authorization: userToken ? `Bearer ${userToken}` : undefined,
          },
        });
      }
    } catch (err) {
      console.error('Error during backend logout call:', err.response?.data || err.message);
      // Even if backend logout fails, proceed with client-side cleanup
    } finally {
      // Clear all stored user data
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('collectorId');
      await AsyncStorage.removeItem('centerId');
      await AsyncStorage.removeItem('userRole');

      setProfileData(null);
      setUserId(null);
      setUserRole(null);
      setUserToken(null);
      setLoading(false);

      Alert.alert('Logged Out', 'You have been successfully logged out.');
      // Navigate to your login/splash screen
      if (navigation && navigation.replace) {
        navigation.replace('Login'); // Replace with your actual login screen route name
      } else {
        // Fallback if navigation prop isn't set or replace isn't available
        console.log('Logout successful, would navigate to Login screen.');
      }
    }
  };

  if (loading) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeBg }]}>
        <ActivityIndicator size="large" color={Colors.primaryGreen} />
        <Text style={[styles.loadingText, { color: textColor }]}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeBg }]}>
        <Text style={[styles.errorText, { color: Colors.errorRed }]}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfileData}>
          <Text style={styles.logoutText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Display 'Not logged in' if no profile data after loading
  if (!profileData) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeBg }]}>
        <Text style={[styles.errorText, { color: textColor }]}>Not logged in or profile not found.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfileData}>
          <Text style={styles.logoutText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Determine which fields to display based on role
  const displayFields = [];
  let titleText = 'Profile';
  let idLabel = 'ID';
  let currentId = userId; // Fallback to generic userId

  if (userRole === 'homeowner') {
    titleText = 'Homeowner Profile';
    idLabel = 'Homeowner ID';
    displayFields.push(
      { label: 'Username', value: profileData.username }, // userModel has username
      { label: 'Email', value: profileData.email },
      { label: 'Phone No', value: profileData.phoneNo ? profileData.phoneNo.toString() : 'N/A' } // Convert number to string
    );
  } else if (userRole === 'collector') {
    titleText = 'Collector Profile';
    idLabel = 'Collector ID';
    currentId = userId; // userId would be collectorId in this case
    displayFields.push(
      { label: 'Full Name', value: profileData.fullName },
      { label: 'Username', value: profileData.username },
      { label: 'Email', value: profileData.email },
      { label: 'Phone No', value: profileData.phoneNo ? profileData.phoneNo.toString() : 'N/A' }
    );
  } else if (userRole === 'center') {
    titleText = 'Center Profile';
    idLabel = 'Center ID';
    currentId = userId; // userId would be centerId in this case
    displayFields.push(
      { label: 'Center Name', value: profileData.centerName },
      { label: 'Username', value: profileData.centerUsername },
      { label: 'Email', value: profileData.email },
      { label: 'Phone No', value: profileData.phoneNo ? profileData.phoneNo.toString() : 'N/A' },
      { label: 'Location', value: profileData.location }
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeBg }]}>
      <Text style={[styles.title, { color: Colors.primaryGreen }]}>👤 {titleText}</Text>

      {/* Display User ID dynamically */}
      {currentId && (
        <View style={[styles.infoBox, { backgroundColor: cardBg }]}>
          <Text style={[styles.label, { color: labelColor }]}>{idLabel}</Text>
          <Text style={[styles.value, { color: valueColor }]}>{currentId}</Text>
        </View>
      )}

      {/* Render dynamic profile fields */}
      {displayFields.map((field, index) => (
        <View key={index} style={[styles.infoBox, { backgroundColor: cardBg }]}>
          <Text style={[styles.label, { color: labelColor }]}>{field.label}</Text>
          <Text style={[styles.value, { color: valueColor }]}>{field.value}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  infoBox: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: Colors.primaryGreen,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: Colors.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
});
