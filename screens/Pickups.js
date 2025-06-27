// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Modal, Image, TextInput
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// // import axios from 'axios'; // Uncomment when backend is ready

// const dummyRequests = [
//   {
//     id: 'REQ001',
//     name: 'John Doe',
//     phone: '0712345678',
//     location: 'Eldoret, Kenya',
//     date: '2025-06-18',
//     scrapType: 'Plastic',
//     weight: '10kg',
//     image: 'https://via.placeholder.com/150',
//     status: 'pending',
//   },
//   {
//     id: 'REQ002',
//     name: 'Jane Kim',
//     phone: '0798765432',
//     location: 'Nairobi, Kenya',
//     date: '2025-06-20',
//     scrapType: 'Metal',
//     weight: '15kg',
//     image: 'https://via.placeholder.com/150',
//     status: 'completed',
//   },
//   // Add more dummy data
// ];

// export default function Pickups() {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');

//   useEffect(() => {
//     // Fetch assigned pickups from backend
//     // const fetchRequests = async () => {
//     //   try {
//     //     const res = await axios.get(`http://yourapi/collector/pickups`, {
//     //       headers: { Authorization: `Bearer ${token}` }
//     //     });
//     //     setRequests(res.data);
//     //     setFilteredRequests(res.data);
//     //   } catch (err) {
//     //     console.error(err);
//     //   }
//     // };
//     // fetchRequests();

//     // Dummy data fallback
//     setRequests(dummyRequests);
//     setFilteredRequests(dummyRequests);
//   }, []);

//   useEffect(() => {
//     const filtered = requests.filter(req => {
//       const matchSearch = Object.values(req).some(val =>
//         String(val).toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       const matchStatus =
//         filterStatus === 'All' || req.status === filterStatus.toLowerCase();
//       return matchSearch && matchStatus;
//     });

//     setFilteredRequests(filtered);
//   }, [searchQuery, filterStatus, requests]);

//   const toggleStatus = (index) => {
//     const updatedRequests = [...requests];
//     const actualIndex = requests.findIndex(r => r.id === filteredRequests[index].id);
//     updatedRequests[actualIndex].status =
//       updatedRequests[actualIndex].status === 'pending' ? 'completed' : 'pending';
//     setRequests(updatedRequests);

//     // Update backend if needed
//     // axios.put(`http://yourapi/collector/pickup/${updatedRequests[actualIndex].id}/status`, {
//     //   status: updatedRequests[actualIndex].status
//     // });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Assigned Pickups</Text>

//       {/* Search & Filter */}
//       <View style={styles.controls}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by any field..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <View style={styles.filterTabs}>
//           {['All', 'Pending', 'Completed'].map(status => (
//             <TouchableOpacity
//               key={status}
//               style={[
//                 styles.filterButton,
//                 filterStatus === status && styles.activeFilter
//               ]}
//               onPress={() => setFilterStatus(status)}
//             >
//               <Text style={styles.filterText}>{status}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Table */}
//       <View style={styles.table}>
//         <View style={[styles.row, styles.headerRow]}>
//           {['Request ID', 'Name', 'Phone', 'Location', 'Date', 'Scrap', 'Weight', 'Image', 'Status'].map((header) => (
//             <Text key={header} style={styles.headerText}>{header}</Text>
//           ))}
//         </View>

//         {filteredRequests.map((item, index) => (
//           <View key={item.id} style={styles.row}>
//             <Text style={styles.cell}>{item.id}</Text>
//             <Text style={styles.cell}>{item.name}</Text>
//             <Text style={styles.cell}>{item.phone}</Text>
//             <Text style={styles.cell}>{item.location}</Text>
//             <Text style={styles.cell}>{item.date}</Text>
//             <Text style={styles.cell}>{item.scrapType}</Text>
//             <Text style={styles.cell}>{item.weight}</Text>

//             {/* Image Viewer */}
//             <TouchableOpacity style={styles.cell} onPress={() => setSelectedImage(item.image)}>
//               <Ionicons name="image-outline" size={24} color="gray" />
//             </TouchableOpacity>

//             {/* Status Toggle */}
//             <TouchableOpacity
//               style={[
//                 styles.statusButton,
//                 item.status === 'pending' ? styles.pending : styles.completed,
//               ]}
//               onPress={() => toggleStatus(index)}
//             >
//               <Text style={styles.statusText}>
//                 {item.status === 'pending' ? 'Pending' : 'Completed'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>

//       {/* Image Modal */}
//       <Modal visible={!!selectedImage} transparent={true} animationType="fade">
//         <View style={styles.modalContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.modalImage} />
//           <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
//             <Ionicons name="close-circle" size={30} color="white" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 10,
//     color: '#2e7d32',
//     textAlign: 'center',
//   },
//   controls: {
//     marginBottom: 10,
//   },
//   searchInput: {
//     backgroundColor: '#f2f2f2',
//     padding: 8,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   filterTabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   filterButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: '#e0e0e0',
//   },
//   activeFilter: {
//     backgroundColor: '#4caf50',
//   },
//   filterText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     paddingVertical: 8,
//     paddingHorizontal: 4,
//     alignItems: 'center',
//   },
//   headerRow: {
//     backgroundColor: '#2e7d32',
//   },
//   headerText: {
//     flex: 1,
//     fontWeight: 'bold',
//     color: 'white',
//     fontSize: 12,
//   },
//   cell: {
//     flex: 1,
//     fontSize: 12,
//     paddingHorizontal: 2,
//   },
//   statusButton: {
//     flex: 1,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   pending: {
//     backgroundColor: '#fbc02d',
//   },
//   completed: {
//     backgroundColor: '#43a047',
//   },
//   statusText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.85)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalImage: {
//     width: '90%',
//     height: '60%',
//     borderRadius: 10,
//   },
//   closeButton: {
//     marginTop: 20,
//   },
// });



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert, // Using Alert for simple messages, consider custom modal for more complex UI
  Linking, // Import Linking for opening URLs (like tel: links)
  Image, // Import Image component
  Modal, // Import Modal component for full-screen image view
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Pickups = () => {
  const [assignedPickups, setAssignedPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectorId, setCollectorId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isImageViewerVisible, setImageViewerVisible] = useState(false); // State for modal visibility
  const [currentImageUri, setCurrentImageUri] = useState(null); // State for image in modal

  // useEffect to load collector data and initial pickups on component mount
  useEffect(() => {
    const loadCollectorData = async () => {
      try {
        // Retrieve collectorId from AsyncStorage
        const id = await AsyncStorage.getItem('collectorId');
        if (id) {
          setCollectorId(id); // Set the collectorId state
          console.log('Collector ID loaded from AsyncStorage:', id); // Log the loaded ID
          await fetchAssignedPickups(id); // Fetch pickups using the retrieved ID
        } else {
          // Handle case where collectorId is not found in AsyncStorage
          console.warn('Collector ID not found in AsyncStorage. Please ensure it is set upon login.');
          Alert.alert('Authentication Error', 'Collector ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error loading collector data:', error);
        Alert.alert('Error', 'Failed to load collector data.');
      } finally {
        setLoading(false); // Stop loading indicator once data loading attempt is complete
      }
    };
    loadCollectorData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  /**
   * Fetches assigned pickups for the current collector.
   * @param {string} id - The ID of the collector. Defaults to the state's collectorId if not provided.
   */
  const fetchAssignedPickups = async (id = collectorId) => {
    // Only attempt to fetch if collectorId is available
    if (!id) {
      console.warn('Cannot fetch pickups: collectorId is null or undefined.');
      return;
    }

    // --- CORRECTED URL TO MATCH BACKEND ROUTER.JS ---
    const url = `http://192.168.189.119:5000/api/v1/requests/collector/${id}/list/`;
    console.log('Attempting to fetch from URL:', url); // Log the exact URL being requested

    try {
      const response = await axios.get(url);
      // --- FIX: Access the 'requests' array from the response data ---
      setAssignedPickups(response.data.requests);
      console.log('Successfully fetched assigned pickups:', response.data);
    } catch (error) {
      // Log the full error object for better debugging
      console.error('Error fetching assigned pickups:', error);
      // Provide user feedback for the error
      Alert.alert('Error', 'Failed to fetch assigned pickups. Please check your network and try again.');
    }
  };

  /**
   * Marks a specific pickup request as collected.
   * @param {string} requestId - The ID of the request to mark as collected.
   */
  const markAsCollected = async (requestId) => {
    try {
      // --- CORRECTED URL AND METHOD TO MATCH BACKEND ROUTER.JS ---
      // Using POST as per router.post('/requests/:requestId/update/', updateRequestStatus);
      await axios.post(
        `http://192.168.189.119:5000/api/v1/requests/${requestId}/update/`,
        { status: 'collected' } // Send the new status in the request body
      );
      console.log(`Request ${requestId} marked as collected.`);
      Alert.alert('Success', 'Pickup marked as collected!');
      // Re-fetch assigned pickups to update the list
      await fetchAssignedPickups();
    } catch (error) {
      console.error('Error marking as collected:', error);
      Alert.alert('Error', 'Failed to mark pickup as collected. Please try again.');
    }
  };

  /**
   * Handles the pull-to-refresh action.
   */
  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing indicator
    await fetchAssignedPickups(); // Re-fetch pickups
    setRefreshing(false); // Stop refreshing indicator
  };

  /**
   * Function to handle calling a phone number.
   * @param {string} phoneNumber - The phone number to call.
   */
  const callNumber = (phoneNumber) => {
    let telUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(telUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Call Failed', `Phone number ${phoneNumber} is not available for direct calling on this device.`);
        } else {
          return Linking.openURL(telUrl);
        }
      })
      .catch((err) => console.error('An error occurred trying to open the dialer', err));
  };

  /**
   * Opens the full-screen image viewer.
   * @param {string} uri - The URI of the image to display.
   */
  const openImageViewer = (uri) => {
    setCurrentImageUri(uri);
    setImageViewerVisible(true);
  };

  /**
   * Closes the full-screen image viewer.
   */
  const closeImageViewer = () => {
    setImageViewerVisible(false);
    setCurrentImageUri(null);
  };

  /**
   * Renders a single pickup card.
   * @param {object} pickup - The pickup object to render.
   */
  const renderPickup = (pickup) => (
    <View key={pickup._id} style={styles.card}>
      <Text style={styles.title}>Homeowner: {pickup.fullName}</Text>
      <Text style={styles.label}>Scrap Type:</Text>
      <Text style={styles.value}>{pickup.scrapType}</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{pickup.location}</Text>
      <Text style={styles.label}>Weight:</Text>
      <Text style={styles.value}>{pickup.weight} kg</Text>

      {/* Make Phone Number Clickable */}
      <Text style={styles.label}>Phone:</Text>
      <TouchableOpacity onPress={() => callNumber(pickup.phoneNumber)}>
        <Text style={[styles.value, styles.phoneNumberLink]}>{pickup.phoneNumber}</Text>
      </TouchableOpacity>

      {/* Display Pickup Date */}
      <Text style={styles.label}>Pickup Date:</Text>
      <Text style={styles.value}>{pickup.pickupDate}</Text>

      {/* Display Pickup Time */}
      <Text style={styles.label}>Pickup Time:</Text>
      <Text style={styles.value}>{pickup.pickupTime}</Text>

      {/* Display Homeowner Description */}
      {pickup.description && (
        <>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{pickup.description}</Text>
        </>
      )}

      {/* Display Image if imageUrl exists, clickable for full screen */}
      {pickup.imageUrl && (
        <>
          <Text style={styles.label}>Scrap Image:</Text>
          <TouchableOpacity onPress={() => openImageViewer(pickup.imageUrl)}>
            <Image
              source={{ uri: pickup.imageUrl }}
              style={styles.thumbnailImage}
              onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
            />
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.label}>Request Date:</Text>
      <Text style={styles.value}>{new Date(pickup.createdAt || pickup.requestDate).toDateString()}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text
        style={[
          styles.status,
          pickup.status === 'collected'
            ? styles.collected
            : styles.pending,
        ]}
      >
        {pickup.status}
      </Text>

      {/* Show "Mark as Collected" button only if status is not 'collected' */}
      {pickup.status !== 'collected' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => markAsCollected(pickup._id)}
        >
          <Text style={styles.buttonText}>Mark as Collected</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Display a loading indicator while data is being fetched initially
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#008000" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      // Add RefreshControl for pull-to-refresh functionality
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Conditional rendering based on whether there are assigned pickups */}
      {assignedPickups.length === 0 ? (
        <Text style={styles.emptyText}>No assigned pickups available.</Text>
      ) : (
        // Map through assignedPickups and render each one
        assignedPickups.map(renderPickup)
      )}

      {/* Full-screen Image Viewer Modal */}
      <Modal
        visible={isImageViewerVisible}
        transparent={true}
        onRequestClose={closeImageViewer} // For Android back button
      >
        <View style={styles.fullScreenImageViewer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageViewer}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {currentImageUri && (
            <Image
              source={{ uri: currentImageUri }}
              style={styles.fullScreenImage}
              resizeMode="contain" // Ensures the whole image is visible
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
    flex: 1, // Ensure container takes full height
  },
  card: {
    backgroundColor: '#FFFFFF', // White background
    marginVertical: 10,
    padding: 20,
    borderRadius: 12, // More rounded corners
    elevation: 6, // Stronger shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1, // Subtle border
    borderColor: '#e0e0e0', // Light grey border
  },
  title: {
    fontSize: 20, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50', // Darker text for better contrast
    borderBottomWidth: 2, // Underline effect
    borderBottomColor: '#3498db', // Blue underline
    paddingBottom: 5,
  },
  label: {
    fontWeight: '600',
    marginTop: 8, // More spacing
    color: '#555',
    fontSize: 14,
  },
  value: {
    marginBottom: 4,
    color: '#666',
    fontSize: 16,
  },
  phoneNumberLink: {
    color: '#007bff', // A standard link color
    textDecorationLine: 'underline',
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontWeight: 'bold',
    marginTop: 8,
    alignSelf: 'flex-start',
    textTransform: 'capitalize', // Capitalize status text
  },
  collected: {
    backgroundColor: '#d4edda', // Lighter green for collected
    color: '#155724',
  },
  pending: {
    backgroundColor: '#ffeeba', // Lighter yellow for pending
    color: '#856404',
  },
  button: {
    marginTop: 15, // More space above button
    backgroundColor: '#28a745', // Green button
    paddingVertical: 12, // Taller button
    borderRadius: 8,
    alignItems: 'center', // Center text horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18, // Larger text for button
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  // New styles for image display
  thumbnailImage: {
    width: 100, // Small width for thumbnail
    height: 100, // Small height for thumbnail
    borderRadius: 8,
    marginTop: 5,
    resizeMode: 'cover', // Cover the area, cropping if necessary
    borderColor: '#ddd',
    borderWidth: 1,
  },
  fullScreenImageViewer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%', // Occupy most of the screen
    height: '80%', // Occupy most of the screen
    resizeMode: 'contain', // Ensure the entire image is visible
  },
  closeButton: {
    position: 'absolute',
    top: 50, // Adjust position as needed
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    padding: 10,
    borderRadius: 20,
    zIndex: 1, // Ensure button is above image
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pickups;