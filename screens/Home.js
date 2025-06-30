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

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

// Import your JSON data
import scrapCentersData from './data/scrapcenter.json'; // Adjust this path if your JSON file is in a different location

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922; // Adjust for initial zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const NEARBY_RADIUS_KM = 10; // Define radius for "nearby" centers

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const [mapRegion, setMapRegion] = useState(null); // State to control map region

  // Haversine distance formula
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

  // Function to determine marker color based on category
  const getMarkerColor = useCallback((category) => {
    switch (category) {
      case 'Plastic Recycling':
        return 'green';
      case 'E-Waste Recycling':
        return 'blue';
      case 'Metal Scrap':
        return 'red';
      case 'Tire Recycling':
        return 'purple';
      default:
        return 'darkorange'; // For any uncategorized or default
    }
  }, []);

  // Effect to get user's current location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied. Cannot show nearby centers.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation(loc.coords);

      // Set initial map region to user's location
      setMapRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  // Memoize the data for performance and filter when location/search changes
  useEffect(() => {
    let currentFilteredCenters = scrapCentersData;

    // 1. Filter by search text
    if (searchText) {
      const lowercasedSearch = searchText.toLowerCase();
      currentFilteredCenters = currentFilteredCenters.filter(
        (center) =>
          center.name.toLowerCase().includes(lowercasedSearch) ||
          center.category.toLowerCase().includes(lowercasedSearch) ||
          (center.address && center.address.toLowerCase().includes(lowercasedSearch)) ||
          (center.notes && center.notes.toLowerCase().includes(lowercasedSearch))
      );
    }

    // 2. Filter by nearby location (if current location is available)
    let tempNearbyCenters = [];
    if (currentLocation) {
      tempNearbyCenters = currentFilteredCenters.filter((center) => {
        // Ensure center has valid coordinates before calculating distance
        if (center.latitude && center.longitude) {
          const dist = getDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            center.latitude,
            center.longitude
          );
          return dist <= NEARBY_RADIUS_KM;
        }
        return false; // Exclude centers without valid coordinates for distance calculation
      });

      // Sort nearby centers by distance
      tempNearbyCenters.sort((a, b) => {
        const distA = getDistance(currentLocation.latitude, currentLocation.longitude, a.latitude, a.longitude);
        const distB = getDistance(currentLocation.latitude, currentLocation.longitude, b.latitude, b.longitude);
        return distA - distB;
      });
    } else {
      // If no current location, just sort all filtered centers alphabetically or by a default
      tempNearbyCenters = [...currentFilteredCenters].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCenters(currentFilteredCenters); // This is for markers on the map
    setNearbyCenters(tempNearbyCenters);       // This is for the list below the map

  }, [currentLocation, searchText, getDistance]); // Dependencies for this effect

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Scrap Collection Centres</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, type, or address..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      {currentLocation && mapRegion ? (
        <MapView
          style={styles.map}
          region={mapRegion} // Use state for region to allow updates
          onRegionChangeComplete={setMapRegion} // Keep map region in sync if user moves it
          showsUserLocation={true} // Show blue dot for user's location
          followsUserLocation={true} // Map follows user's location (optional, consider removing if users want to explore freely)
        >
          {/* Your Current Location Marker (if not using showsUserLocation, or for custom styling) */}
          {/* <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="green"
          /> */}

          {filteredCenters.map((center) => (
            // Only render markers if latitude and longitude exist
            center.latitude && center.longitude && (
              <Marker
                key={center.id}
                coordinate={{ latitude: center.latitude, longitude: center.longitude }}
                title={center.name}
                description={center.category}
                pinColor={getMarkerColor(center.category)}
              >
                {/* Callout for more details on marker tap */}
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{center.name}</Text>
                    <Text style={styles.calloutText}>Type: {center.category} - {center.subCategory || 'N/A'}</Text>
                    <Text style={styles.calloutText}>Address: {center.address || 'N/A'}</Text>
                    {center.notes ? <Text style={styles.calloutText}>Notes: {center.notes}</Text> : null}
                    {center.contact ? <Text style={styles.calloutText}>Contact: {center.contact}</Text> : null}
                    {center.website ? (
                      <TouchableOpacity onPress={() => Linking.openURL(center.website)}>
                        <Text style={styles.calloutLink}>Visit Website</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </Callout>
              </Marker>
            )
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingMap}>
          <Text>Loading map and your location...</Text>
        </View>
      )}

      <Text style={styles.subHeading}>
        {searchText ? `Search Results (${filteredCenters.length})` : 'Nearby Scrap Collection Centres'}
      </Text>
      <FlatList
        data={searchText ? filteredCenters : nearbyCenters} // Data for list depends on search
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.centerCard}>
            <Text style={styles.centerName}>{item.name}</Text>
            <Text style={styles.centerDetail}>Category: {item.category}</Text>
            {item.address ? <Text style={styles.centerDetail}>Address: {item.address}</Text> : null}
            {currentLocation && item.latitude && item.longitude ? (
              <Text style={styles.centerDetail}>
                Distance: {getDistance(currentLocation.latitude, currentLocation.longitude, item.latitude, item.longitude).toFixed(2)} km
              </Text>
            ) : null}
            {item.contact ? <Text style={styles.centerDetail}>Contact: {item.contact}</Text> : null}
            {item.website ? (
              <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
                <Text style={styles.centerLink}>Visit Website</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResultsText}>No centers found for your criteria.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f4f7', // Lighter background
    paddingTop: 40, // Adjust for status bar
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#4caf50', // Green border
    borderRadius: 25, // More rounded
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#e8f5e9', // Very light green background
    color: '#333',
    fontSize: 16,
  },
  map: {
    height: 300, // Slightly taller map
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden', // Ensure border radius applies
    borderColor: '#ddd',
    borderWidth: 1,
  },
  loadingMap: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#2e7d32',
    borderBottomWidth: 1,
    borderBottomColor: '#c8e6c9',
    paddingBottom: 5,
  },
  centerCard: {
    padding: 15,
    backgroundColor: '#e8f5e9', // Lighter green background for cards
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  centerDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  centerLink: {
    fontSize: 14,
    color: '#1565c0', // Blue for links
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  // Callout styles
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  calloutLink: {
    fontSize: 12,
    color: '#1565c0',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});