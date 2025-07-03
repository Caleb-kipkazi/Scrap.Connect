// // Home.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Rewards() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Reward Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'green',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

const BASE_URL = 'http://192.168.189.119:5000/api/v1';

export default function Rewards() {
  const [collectedRequests, setCollectedRequests] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectedRequests = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert("Error", "User not found in storage.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/requests/user/${userId}/collected/`);
        const requests = response.data.requests;

        const pointsPerRequest = 30;
        const formatted = requests.map((req) => ({
          requestId: req._id,
          points: pointsPerRequest,
        }));

        setCollectedRequests(formatted);
        setTotalPoints(formatted.length * pointsPerRequest);
      } catch (error) {
        console.error("Error fetching collected requests:", error.message);
        Alert.alert("Error", "Failed to load rewards.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectedRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Loading Rewards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>
      <FontAwesome5 name="gift" size={40} color="#2e7d32" style={styles.icon} />
      <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>

      <Text style={styles.subHeader}>Collected Requests</Text>
      <FlatList
        data={collectedRequests}
        keyExtractor={(item) => item.requestId}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text style={styles.requestText}>Request ID: {item.requestId}</Text>
            <Text style={styles.pointText}>+{item.points} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    textAlign: 'center',
    marginBottom: 10,
  },
  totalPoints: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  requestItem: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  requestText: {
    color: '#000',
    fontSize: 16,
  },
  pointText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});
