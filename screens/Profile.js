import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Profile() {
  const user = {
    fullName: 'Jane Muthoni',
    email: 'jane.muthoni@example.com',
    phone: '+254 711 234 567',
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user.fullName}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#ffffff', 
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#008000',             
  },
  infoBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffff',  
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#008000',            
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',            
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#008000',  
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',            
    fontSize: 16,
    fontWeight: '600',
  },
});
