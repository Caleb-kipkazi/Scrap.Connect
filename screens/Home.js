// // Home.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Home Screen</Text>
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
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const [search, setSearch] = useState('');

  const mockCenters = [
    { id: '1', name: 'Green Collectors', latitude: -0.3904, longitude: 35.2832 },
    { id: '2', name: 'EcoScrap Depot', latitude: -0.3850, longitude: 35.2900 },
    { id: '3', name: 'Trash2Treasure Center', latitude: -0.3925, longitude: 35.2950 },
    { id: '4', name: 'Baraton Waste Services', latitude: -0.4010, longitude: 35.2800 },
  ];

  // Haversine distance formula to calculate nearby centers
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // ⚙️ BACKEND VERSION (use this when ready)
      /*
      const res = await fetch(`https://your-backend.com/api/centers?lat=${loc.coords.latitude}&lng=${loc.coords.longitude}`);
      const data = await res.json();
      setNearbyCenters(data);
      */

      // 🚧 Mock version filtering centers within 5km
      const filtered = mockCenters.filter((center) => {
        const dist = getDistance(
          loc.coords.latitude,
          loc.coords.longitude,
          center.latitude,
          center.longitude
        );
        return dist <= 5;
      });

      setNearbyCenters(filtered);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Scrap Collection Centres</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search location..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            pinColor="green"
          />

          {nearbyCenters.map((center) => (
            <Marker
              key={center.id}
              coordinate={{ latitude: center.latitude, longitude: center.longitude }}
              title={center.name}
              pinColor="blue"
            />
          ))}
        </MapView>
      )}

      <Text style={styles.subHeading}>Suggested Scrap Collection Centres</Text>
      <FlatList
        data={nearbyCenters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.centerCard}>
            <Text style={styles.centerName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  map: {
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#2e7d32',
  },
  centerCard: {
    padding: 10,
    backgroundColor: '#c8e6c9',
    borderRadius: 8,
    marginBottom: 8,
  },
  centerName: {
    fontSize: 16,
    color: '#000',
  },
});
