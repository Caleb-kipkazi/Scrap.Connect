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
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Dummy data - replace with real data from backend
const mockApprovedRequests = [
  { requestId: 'REQ001', points: 10 },
  { requestId: 'REQ002', points: 10 },
  { requestId: 'REQ003', points: 10 },
];

export default function Rewards() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Replace this mock fetch with real fetch from backend
    const fetchedRequests = mockApprovedRequests;
    setApprovedRequests(fetchedRequests);
    const total = fetchedRequests.reduce((sum, r) => sum + r.points, 0);
    setTotalPoints(total);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>
      <FontAwesome5 name="gift" size={40} color="#2e7d32" style={styles.icon} />

      <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>

      <Text style={styles.subHeader}>Approved Requests</Text>
      <FlatList
        data={approvedRequests}
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
