// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   FlatList,
// //   StyleSheet,
// //   Image,
// //   Modal,
// //   TouchableOpacity,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import { AntDesign } from '@expo/vector-icons';

// // export default function Assign() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [filteredRequests, setFilteredRequests] = useState([]);
// //   const [approvedRequests, setApprovedRequests] = useState([]);
// //   const [collectorMap, setCollectorMap] = useState({});
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);

// //   const dummyRequests = [
// //     {
// //       id: 'REQ001',
// //       name: 'John Doe',
// //       phone: '0712345678',
// //       location: 'Nairobi',
// //       date: '2025-06-15',
// //       type: 'Metal',
// //       weight: '50kg',
// //       image: 'https://via.placeholder.com/300', // larger image URL
// //       status: 'Approved',
// //       centre: 'West Nairobi Centre',
// //     },
// //     {
// //       id: 'REQ002',
// //       name: 'Alice Kimani',
// //       phone: '0798765432',
// //       location: 'Eldoret',
// //       date: '2025-06-17',
// //       type: 'Plastic',
// //       weight: '30kg',
// //       image: 'https://via.placeholder.com/300',
// //       status: 'Approved',
// //       centre: 'Eldoret Town Centre',
// //     },
// //   ];

// //   const collectorOptions = {
// //     'West Nairobi Centre': ['Collins Otieno', 'Jane Njeri'],
// //     'Eldoret Town Centre': ['Peter Kipkoech', 'Faith Chebet'],
// //   };

// //   useEffect(() => {
// //     setApprovedRequests(dummyRequests);
// //     setFilteredRequests(dummyRequests);
// //   }, []);

// //   const handleSearch = (query) => {
// //     const lower = query.toLowerCase();
// //     setSearchQuery(lower);
// //     const filtered = approvedRequests.filter((item) => {
// //       const nameMatch = item.name.toLowerCase().includes(lower);
// //       const collector = collectorMap[item.id] || '';
// //       const collectorMatch = collector.toLowerCase().includes(lower);
// //       return nameMatch || collectorMatch;
// //     });
// //     setFilteredRequests(filtered);
// //   };

// //   const handleAssignChange = (requestId, collectorName) => {
// //     setCollectorMap((prev) => ({ ...prev, [requestId]: collectorName }));
// //     // Commented backend logic
// //     /*
// //     fetch('/api/assign', {
// //       method: 'POST',
// //       body: JSON.stringify({ requestId, collectorName }),
// //     });
// //     */
// //   };

// //   const openImageModal = (uri) => {
// //     setSelectedImage(uri);
// //     setModalVisible(true);
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.row}>
// //       <Text style={styles.cell}>{item.id}</Text>
// //       <Text style={styles.cell}>{item.name}</Text>
// //       <Text style={styles.cell}>{item.phone}</Text>
// //       <Text style={styles.cell}>{item.location}</Text>
// //       <Text style={styles.cell}>{item.date}</Text>
// //       <Text style={styles.cell}>{item.type}</Text>
// //       <Text style={styles.cell}>{item.weight}</Text>
// //       <TouchableOpacity onPress={() => openImageModal(item.image)} style={styles.imageWrapper}>
// //         <Image source={{ uri: item.image }} style={styles.image} />
// //       </TouchableOpacity>
// //       <View style={styles.cell}>
// //         <Picker
// //           selectedValue={collectorMap[item.id] || ''}
// //           style={styles.picker}
// //           onValueChange={(value) => handleAssignChange(item.id, value)}
// //         >
// //           <Picker.Item label="Assign Collector" value="" />
// //           {(collectorOptions[item.centre] || []).map((collector) => (
// //             <Picker.Item key={collector} label={collector} value={collector} />
// //           ))}
// //         </Picker>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Assign</Text>
// //       <Text style={styles.subHeader}>
// //         Here you can assign approved requests to scrap collectors
// //       </Text>
// //       <TextInput
// //         style={styles.searchInput}
// //         placeholder="Search by homeowner or collector name..."
// //         value={searchQuery}
// //         onChangeText={handleSearch}
// //       />

// //       <View style={styles.tableHeader}>
// //         <Text style={styles.cellHeader}>Req ID</Text>
// //         <Text style={styles.cellHeader}>Name</Text>
// //         <Text style={styles.cellHeader}>Phone</Text>
// //         <Text style={styles.cellHeader}>Location</Text>
// //         <Text style={styles.cellHeader}>Date</Text>
// //         <Text style={styles.cellHeader}>Type</Text>
// //         <Text style={styles.cellHeader}>Weight</Text>
// //         <Text style={styles.cellHeader}>Image</Text>
// //         <Text style={styles.cellHeader}>Assign</Text>
// //       </View>

// //       <FlatList
// //         data={filteredRequests}
// //         renderItem={renderItem}
// //         keyExtractor={(item) => item.id}
// //         ListEmptyComponent={<Text style={styles.emptyText}>No matching results found.</Text>}
// //       />

// //       {/* Modal Image Viewer */}
// //       <Modal visible={modalVisible} transparent={true} animationType="fade">
// //         <View style={styles.modalBackground}>
// //           <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
// //             <AntDesign name="closecircle" size={30} color="white" />
// //           </TouchableOpacity>
// //           <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 10,
// //     backgroundColor: '#fff',
// //     flex: 1,
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: 'green',
// //     marginBottom: 5,
// //   },
// //   subHeader: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 15,
// //   },
// //   searchInput: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   tableHeader: {
// //     flexDirection: 'row',
// //     backgroundColor: '#f0f0f0',
// //     paddingVertical: 10,
// //     borderRadius: 5,
// //     flexWrap: 'wrap',
// //   },
// //   cellHeader: {
// //     flex: 1,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     color: 'black',
// //     fontSize: 12,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     paddingVertical: 8,
// //     borderBottomWidth: 1,
// //     borderColor: '#eee',
// //     alignItems: 'center',
// //     flexWrap: 'wrap',
// //   },
// //   cell: {
// //     flex: 1,
// //     textAlign: 'center',
// //     color: 'black',
// //     fontSize: 12,
// //   },
// //   picker: {
// //     height: 40,
// //     width: '100%',
// //     color: 'black',
// //   },
// //   imageWrapper: {
// //     alignItems: 'center',
// //     flex: 1,
// //   },
// //   image: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 4,
// //   },
// //   emptyText: {
// //     textAlign: 'center',
// //     marginTop: 20,
// //     color: 'gray',
// //   },
// //   modalBackground: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.95)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   fullImage: {
// //     width: '90%',
// //     height: '80%',
// //   },
// //   closeIcon: {
// //     position: 'absolute',
// //     top: 50,
// //     right: 20,
// //     zIndex: 2,
// //   },
// // });



// //test for the backend model
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   Image,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Your backend URL
// const BACKEND_URL = "http://192.168.137.246:5000";

// export default function Assign() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [approvedRequests, setApprovedRequests] = useState([]); // All approved requests for the center
//   const [collectorMap, setCollectorMap] = useState({}); // Maps requestId to assigned collectorId
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const [loadingRequests, setLoadingRequests] = useState(true);
//   const [loadingCollectors, setLoadingCollectors] = useState(true);
//   const [assigning, setAssigning] = useState(false); // State for individual assignment loading

//   const [adminCenterId, setAdminCenterId] = useState(null); // ID of the logged-in admin's center
//   const [centerCollectors, setCenterCollectors] = useState([]); // List of collectors from the admin's center
//   const [error, setError] = useState(null); // General error for data fetching

//   // --- Data Fetching Logic ---
//   useEffect(() => {
//     const loadAdminDashboardData = async () => {
//       setError(null); // Clear previous errors
//       setLoadingRequests(true);
//       setLoadingCollectors(true);

//       try {
//         const storedAdminToken = await AsyncStorage.getItem('adminToken');
//         const storedCenterId = await AsyncStorage.getItem('centerId');

//         if (!storedAdminToken || !storedCenterId) {
//           setError("Authentication required. Please log in as a center admin.");
//           setLoadingRequests(false);
//           setLoadingCollectors(false);
//           return;
//         }

//         setAdminCenterId(storedCenterId);

//         // 1. Fetch Approved Requests for this Center
//         try {
//           const requestsResponse = await axios.get(
//             `${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list?status=approved`,
//             { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//           );

//           if (requestsResponse.data.success) {
//             const fetchedRequests = requestsResponse.data.requests;
//             setApprovedRequests(fetchedRequests);
//             setFilteredRequests(fetchedRequests);

//             // Initialize collectorMap from fetched data if a collector is already assigned
//             const initialCollectorMap = {};
//             fetchedRequests.forEach(req => {
//               if (req.collectorId && req.collectorId._id) {
//                 initialCollectorMap[req._id] = req.collectorId._id;
//               }
//             });
//             setCollectorMap(initialCollectorMap);
//           } else {
//             setError(requestsResponse.data.message || "Failed to fetch approved requests.");
//           }
//         } catch (err) {
//           console.error("Error fetching requests:", err);
//           setError(err.response?.data?.message || "Failed to load approved requests.");
//         } finally {
//           setLoadingRequests(false);
//         }

//         // 2. Fetch Collectors for this Center
//         try {
//           const collectorsResponse = await axios.get(
//             `${BACKEND_URL}/api/v1/center/collectors/${storedCenterId}`,
//             { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//           );

//           if (collectorsResponse.data.success) {
//             setCenterCollectors(collectorsResponse.data.collectors);
//           } else {
//             setError(collectorsResponse.data.message || "Failed to fetch collectors.");
//           }
//         } catch (err) {
//           console.error("Error fetching collectors:", err);
//           setError(err.response?.data?.message || "Failed to load collectors for this center.");
//         } finally {
//           setLoadingCollectors(false);
//         }

//       } catch (err) {
//         // This catch block handles errors related to AsyncStorage or initial setup
//         console.error("Critical error loading admin data:", err);
//         setError("Could not load admin data. Please ensure the app has storage permissions or you are logged in.");
//         setLoadingRequests(false);
//         setLoadingCollectors(false);
//       }
//     };

//     loadAdminDashboardData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // --- Search Functionality ---
//   const handleSearch = (query) => {
//     const lower = query.toLowerCase();
//     setSearchQuery(lower);
//     const filtered = approvedRequests.filter((item) => {
//       // Search by homeowner's full name, request ID, location, scrap type, or assigned collector's name
//       const nameMatch = item.fullName.toLowerCase().includes(lower);
//       const idMatch = item._id.toLowerCase().includes(lower); // Use MongoDB _id
//       const locationMatch = item.location.toLowerCase().includes(lower);
//       const typeMatch = item.scrapType.toLowerCase().includes(lower);

//       // Check if a collector is assigned and if their name matches
//       const assignedCollectorName = item.collectorId && item.collectorId.collectorName
//         ? item.collectorId.collectorName.toLowerCase()
//         : '';
//       const collectorMatch = assignedCollectorName.includes(lower);

//       return nameMatch || idMatch || locationMatch || typeMatch || collectorMatch;
//     });
//     setFilteredRequests(filtered);
//   };

//   // --- Assign Collector Functionality ---
//   const handleAssignChange = async (requestId, collectorId) => {
//     // If "Select Collector" is chosen, clear assignment for this request locally and don't send to backend
//     if (!collectorId) {
//       setCollectorMap((prev) => ({ ...prev, [requestId]: '' }));
//       return;
//     }

//     // Prevent re-assigning to the same collector
//     if (collectorMap[requestId] === collectorId) {
//       Alert.alert("Already Assigned", "This request is already assigned to the selected collector.");
//       return;
//     }

//     setAssigning(true); // Start individual assignment loading state
//     try {
//       const storedAdminToken = await AsyncStorage.getItem('adminToken');
//       if (!storedAdminToken) {
//         Alert.alert("Authentication Error", "Admin token not found. Please log in again.");
//         setAssigning(false);
//         return;
//       }

//       const response = await axios.post(
//         `${BACKEND_URL}/api/v1/request/assign/`,
//         { requestId, collectorId },
//         { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//       );

//       if (response.data.success) {
//         setCollectorMap((prev) => ({ ...prev, [requestId]: collectorId }));
//         Alert.alert('Success', response.data.message);

//         // Update the specific request in the approvedRequests state with the newly assigned collector
//         // This is important because the backend's response includes the populated collector object
//         const updatedApprovedRequests = approvedRequests.map(req => {
//           if (req._id === requestId) {
//             // Replace the collectorId with the fully populated collector object from the response
//             return { ...req, collectorId: response.data.request.collectorId };
//           }
//           return req;
//         });
//         setApprovedRequests(updatedApprovedRequests);
//         // Re-filter the requests to ensure the UI updates correctly, especially if search is active
//         handleSearch(searchQuery);

//       } else {
//         Alert.alert('Assignment Failed', response.data.message || 'Could not assign collector.');
//       }
//     } catch (error) {
//       console.error('Error assigning collector:', error);
//       Alert.alert(
//         'Assignment Error',
//         error.response?.data?.message || 'Failed to assign collector. Please try again.'
//       );
//     } finally {
//       setAssigning(false); // Stop individual assignment loading state
//     }
//   };

//   // --- Image Modal Logic ---
//   const openImageModal = (uri) => {
//     setSelectedImage(uri);
//     setModalVisible(true);
//   };

//   // --- Render Item for FlatList (each request card) ---
//   const renderItem = ({ item }) => {
//     const isCurrentlyAssigningThisRequest = assigning && (collectorMap[item._id] !== item.collectorId?._id);

//     return (
//       <View style={styles.requestCard}>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Request ID:</Text>
//           <Text style={styles.cardValue}>{item._id}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Homeowner:</Text>
//           <Text style={styles.cardValue}>{item.fullName}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Phone:</Text>
//           <Text style={styles.cardValue}>{item.phoneNumber}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Location:</Text>
//           <Text style={styles.cardValue}>{item.location}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Pickup Date:</Text>
//           <Text style={styles.cardValue}>{item.pickupDate}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Scrap Type:</Text>
//           <Text style={styles.cardValue}>{item.scrapType}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Weight:</Text>
//           <Text style={styles.cardValue}>{item.weight} kg</Text>
//         </View>

//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Image:</Text>
//           <TouchableOpacity onPress={() => openImageModal(item.imageUrl)} style={styles.imageButton}>
//             <Image source={{ uri: item.imageUrl || 'https://placehold.co/150x150/E0E0E0/888888?text=No+Image' }} style={styles.requestImage} />
//             <Ionicons name="eye-outline" size={20} color="#007bff" style={styles.viewImageIcon} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.assignmentSection}>
//           <Text style={styles.cardLabel}>Assign Collector:</Text>
//           <View style={styles.pickerWrapper}>
//             {loadingCollectors ? (
//               <ActivityIndicator size="small" color="#4CAF50" style={{ marginVertical: 10 }} />
//             ) : centerCollectors.length === 0 ? (
//               <Text style={styles.noCollectorsText}>No collectors registered for this center.</Text>
//             ) : (
//               <Picker
//                 selectedValue={collectorMap[item._id] || ''}
//                 style={styles.picker}
//                 onValueChange={(value) => handleAssignChange(item._id, value)}
//                 dropdownIconColor="#4CAF50"
//                 enabled={!isCurrentlyAssigningThisRequest} // Disable picker if this request is being assigned
//               >
//                 <Picker.Item label="-- Select Collector --" value="" />
//                 {centerCollectors.map((collector) => (
//                   <Picker.Item
//                     key={collector._id}
//                     label={collector.collectorName}
//                     value={collector._id}
//                   />
//                 ))}
//               </Picker>
//             )}
//           </View>
//           {isCurrentlyAssigningThisRequest && (
//             <View style={styles.assigningLoader}>
//               <ActivityIndicator size="small" color="#4CAF50" />
//               <Text style={styles.assigningText}>Assigning...</Text>
//             </View>
//           )}
//           {(collectorMap[item._id] && !isCurrentlyAssigningThisRequest) && (
//             <Text style={styles.assignedStatus}>
//               Assigned to:{" "}
//               <Text style={styles.assignedCollectorName}>
//                 {centerCollectors.find(c => c._id === collectorMap[item._id])?.collectorName || "N/A"}
//               </Text>
//             </Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // --- Main Component Render ---
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
//       <View style={styles.container}>
//         <Text style={styles.header}>Assign Requests</Text>
//         <Text style={styles.subHeader}>
//           Manage and assign approved scrap pickup requests to collectors from your center.
//         </Text>

//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search by ID, homeowner, location, type, or collector..."
//             placeholderTextColor="#888"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//         </View>

//         {/* Conditional Rendering for Loading, Error, or Data */}
//         {loadingRequests || loadingCollectors ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#4CAF50" />
//             <Text style={styles.loadingText}>Loading dashboard data...</Text>
//           </View>
//         ) : error ? (
//           <View style={styles.errorContainer}>
//             <Ionicons name="alert-circle-outline" size={50} color="red" />
//             <Text style={styles.errorText}>{error}</Text>
//             <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
//                 <Text style={styles.retryButtonText}>Refresh</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <FlatList
//             data={filteredRequests}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             contentContainerStyle={styles.listContent}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Ionicons name="clipboard-outline" size={50} color="#ccc" />
//                 <Text style={styles.emptyText}>No approved requests available for assignment.</Text>
//               </View>
//             }
//           />
//         )}

//         {/* Modal Image Viewer */}
//         <Modal visible={modalVisible} transparent={true} animationType="fade">
//           <View style={styles.modalBackground}>
//             <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
//               <AntDesign name="closecircle" size={30} color="white" />
//             </TouchableOpacity>
//             <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// }

// // --- Stylesheet ---
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subHeader: {
//     fontSize: 15,
//     color: '#555',
//     marginBottom: 20,
//     textAlign: 'center',
//     paddingHorizontal: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//     color: '#333',
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   requestCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//     borderLeftWidth: 5,
//     borderLeftColor: '#4CAF50',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   cardLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     flex: 1,
//   },
//   cardValue: {
//     fontSize: 15,
//     color: '#333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   imageButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     flex: 2,
//   },
//   requestImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     backgroundColor: '#f0f0f0' // Fallback background for image
//   },
//   viewImageIcon: {},
//   assignmentSection: {
//     marginTop: 15,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: '#A5D6A7',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#F9F9F9',
//     marginBottom: 10,
//     justifyContent: 'center', // Center content when loading
//     minHeight: 50, // Ensure height even with loading indicator
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: '#333',
//   },
//   noCollectorsText: {
//     textAlign: 'center',
//     paddingVertical: 10,
//     color: '#888',
//     fontSize: 14,
//   },
//   assignedStatus: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   assignedCollectorName: {
//     fontWeight: 'bold',
//     color: '#2E7D32',
//   },
//   assigningLoader: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   assigningText: {
//     marginLeft: 10,
//     color: '#4CAF50',
//     fontSize: 14,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//     marginTop: 15,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 10,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#ffe0e0', // Light red background for error box
//     borderRadius: 15,
//     paddingVertical: 30,
//     borderWidth: 1,
//     borderColor: 'red',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     marginTop: 15,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   retryButton: {
//     backgroundColor: '#2E7D32',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   retryButtonText: {
//     color: WHITE,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullImage: {
//     width: '95%',
//     height: '75%',
//     borderRadius: 10,
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 60 : 30,
//     right: 20,
//     zIndex: 2,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 20,
//     padding: 5,
//   },
// });


//full
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   Image,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // --- DEFINE COLOR CONSTANTS AT THE TOP OF THIS FILE ---
// // This ensures they are available before any component or style uses them.
// const DARK_GREEN = "#004225"; // Define if you plan to use it for other elements in Assign.js
// const GREEN = "#3CB371";     // Define if you plan to use it for other elements in Assign.js
// const WHITE = "#FFFFFF";      // This was the missing one for retryButtonText
// // --- END COLOR CONSTANTS ---

// // Your backend URL
// const BACKEND_URL = "http://192.168.137.246:5000";

// export default function Assign() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [approvedRequests, setApprovedRequests] = useState([]); // All approved requests for the center
//   const [collectorMap, setCollectorMap] = useState({}); // Maps requestId to assigned collectorId
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const [loadingRequests, setLoadingRequests] = useState(true);
//   const [loadingCollectors, setLoadingCollectors] = useState(true);
//   const [assigning, setAssigning] = useState(false); // State for individual assignment loading

//   const [adminCenterId, setAdminCenterId] = useState(null); // ID of the logged-in admin's center
//   const [centerCollectors, setCenterCollectors] = useState([]); // List of collectors from the admin's center
//   const [error, setError] = useState(null); // General error for data fetching

//   // --- Data Fetching Logic ---
//   useEffect(() => {
//     const loadAdminDashboardData = async () => {
//       setError(null); // Clear previous errors
//       setLoadingRequests(true);
//       setLoadingCollectors(true);

//       try {
//         const storedAdminToken = await AsyncStorage.getItem('adminToken');
//         const storedCenterId = await AsyncStorage.getItem('centerId');

//         if (!storedAdminToken || !storedCenterId) {
//           setError("Authentication required. Please log in as a center admin.");
//           setLoadingRequests(false);
//           setLoadingCollectors(false);
//           return;
//         }

//         setAdminCenterId(storedCenterId);

//         // 1. Fetch Approved Requests for this Center
//         try {
//           const requestsResponse = await axios.get(
//             `${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list?status=approved`,
//             { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//           );

//           if (requestsResponse.data.success) {
//             const fetchedRequests = requestsResponse.data.requests;
//             setApprovedRequests(fetchedRequests);
//             setFilteredRequests(fetchedRequests);

//             // Initialize collectorMap from fetched data if a collector is already assigned
//             const initialCollectorMap = {};
//             fetchedRequests.forEach(req => {
//               if (req.collectorId && req.collectorId._id) {
//                 initialCollectorMap[req._id] = req.collectorId._id;
//               }
//             });
//             setCollectorMap(initialCollectorMap);
//           } else {
//             setError(requestsResponse.data.message || "Failed to fetch approved requests.");
//           }
//         } catch (err) {
//           console.error("Error fetching requests:", err);
//           setError(err.response?.data?.message || "Failed to load approved requests.");
//         } finally {
//           setLoadingRequests(false);
//         }

//         // 2. Fetch Collectors for this Center
//         try {
//           const collectorsResponse = await axios.get(
//             `${BACKEND_URL}/api/v1/center/collectors/${storedCenterId}`,
//             { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//           );

//           if (collectorsResponse.data.success) {
//             setCenterCollectors(collectorsResponse.data.collectors);
//           } else {
//             setError(collectorsResponse.data.message || "Failed to fetch collectors.");
//           }
//         } catch (err) {
//           console.error("Error fetching collectors:", err);
//           setError(err.response?.data?.message || "Failed to load collectors for this center.");
//         } finally {
//           setLoadingCollectors(false);
//         }

//       } catch (err) {
//         // This catch block handles errors related to AsyncStorage or initial setup
//         console.error("Critical error loading admin data:", err);
//         setError("Could not load admin data. Please ensure the app has storage permissions or you are logged in.");
//         setLoadingRequests(false);
//         setLoadingCollectors(false);
//       }
//     };

//     loadAdminDashboardData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // --- Search Functionality ---
//   const handleSearch = (query) => {
//     const lower = query.toLowerCase();
//     setSearchQuery(lower);
//     const filtered = approvedRequests.filter((item) => {
//       // Search by homeowner's full name, request ID, location, scrap type, or assigned collector's name
//       const nameMatch = item.fullName.toLowerCase().includes(lower);
//       const idMatch = item._id.toLowerCase().includes(lower); // Use MongoDB _id
//       const locationMatch = item.location.toLowerCase().includes(lower);
//       const typeMatch = item.scrapType.toLowerCase().includes(lower);

//       // Check if a collector is assigned and if their name matches
//       const assignedCollectorName = item.collectorId && item.collectorId.collectorName
//         ? item.collectorId.collectorName.toLowerCase()
//         : '';
//       const collectorMatch = assignedCollectorName.includes(lower);

//       return nameMatch || idMatch || locationMatch || typeMatch || collectorMatch;
//     });
//     setFilteredRequests(filtered);
//   };

//   // --- Assign Collector Functionality ---
//   const handleAssignChange = async (requestId, collectorId) => {
//     // If "Select Collector" is chosen, clear assignment for this request locally and don't send to backend
//     if (!collectorId) {
//       setCollectorMap((prev) => ({ ...prev, [requestId]: '' }));
//       return;
//     }

//     // Prevent re-assigning to the same collector
//     if (collectorMap[requestId] === collectorId) {
//       Alert.alert("Already Assigned", "This request is already assigned to the selected collector.");
//       return;
//     }

//     setAssigning(true); // Start individual assignment loading state
//     try {
//       const storedAdminToken = await AsyncStorage.getItem('adminToken');
//       if (!storedAdminToken) {
//         Alert.alert("Authentication Error", "Admin token not found. Please log in again.");
//         setAssigning(false);
//         return;
//       }

//       const response = await axios.post(
//         `${BACKEND_URL}/api/v1/request/assign/`,
//         { requestId, collectorId },
//         { headers: { Authorization: `Bearer ${storedAdminToken}` } }
//       );

//       if (response.data.success) {
//         setCollectorMap((prev) => ({ ...prev, [requestId]: collectorId }));
//         Alert.alert('Success', response.data.message);

//         // Update the specific request in the approvedRequests state with the newly assigned collector
//         // This is important because the backend's response includes the populated collector object
//         const updatedApprovedRequests = approvedRequests.map(req => {
//           if (req._id === requestId) {
//             // Replace the collectorId with the fully populated collector object from the response
//             return { ...req, collectorId: response.data.request.collectorId };
//           }
//           return req;
//         });
//         setApprovedRequests(updatedApprovedRequests);
//         // Re-filter the requests to ensure the UI updates correctly, especially if search is active
//         handleSearch(searchQuery);

//       } else {
//         Alert.alert('Assignment Failed', response.data.message || 'Could not assign collector.');
//       }
//     } catch (error) {
//       console.error('Error assigning collector:', error);
//       Alert.alert(
//         'Assignment Error',
//         error.response?.data?.message || 'Failed to assign collector. Please try again.'
//       );
//     } finally {
//       setAssigning(false); // Stop individual assignment loading state
//     }
//   };

//   // --- Image Modal Logic ---
//   const openImageModal = (uri) => {
//     setSelectedImage(uri);
//     setModalVisible(true);
//   };

//   // --- Render Item for FlatList (each request card) ---
//   const renderItem = ({ item }) => {
//     // Determine if this specific request is currently undergoing an assignment action
//     const isCurrentlyAssigningThisRequest = assigning && (collectorMap[item._id] !== (item.collectorId?._id || ''));

//     return (
//       <View style={styles.requestCard}>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Request ID:</Text>
//           <Text style={styles.cardValue}>{item._id}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Homeowner:</Text>
//           <Text style={styles.cardValue}>{item.fullName}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Phone:</Text>
//           <Text style={styles.cardValue}>{item.phoneNumber}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Location:</Text>
//           <Text style={styles.cardValue}>{item.location}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Pickup Date:</Text>
//           <Text style={styles.cardValue}>{item.pickupDate}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Scrap Type:</Text>
//           <Text style={styles.cardValue}>{item.scrapType}</Text>
//         </View>
//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Weight:</Text>
//           <Text style={styles.cardValue}>{item.weight} kg</Text>
//         </View>

//         <View style={styles.cardRow}>
//           <Text style={styles.cardLabel}>Image:</Text>
//           <TouchableOpacity onPress={() => openImageModal(item.imageUrl)} style={styles.imageButton}>
//             <Image source={{ uri: item.imageUrl || 'https://placehold.co/150x150/E0E0E0/888888?text=No+Image' }} style={styles.requestImage} />
//             <Ionicons name="eye-outline" size={20} color="#007bff" style={styles.viewImageIcon} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.assignmentSection}>
//           <Text style={styles.cardLabel}>Assign Collector:</Text>
//           <View style={styles.pickerWrapper}>
//             {loadingCollectors ? (
//               <ActivityIndicator size="small" color="#4CAF50" style={{ marginVertical: 10 }} />
//             ) : centerCollectors.length === 0 ? (
//               <Text style={styles.noCollectorsText}>No collectors registered for this center.</Text>
//             ) : (
//               <Picker
//                 selectedValue={collectorMap[item._id] || ''}
//                 style={styles.picker}
//                 onValueChange={(value) => handleAssignChange(item._id, value)}
//                 dropdownIconColor="#4CAF50"
//                 enabled={!isCurrentlyAssigningThisRequest} // Disable picker if this request is being assigned
//               >
//                 <Picker.Item label="-- Select Collector --" value="" />
//                 {centerCollectors.map((collector) => (
//                   <Picker.Item
//                     key={collector._id}
//                     label={collector.collectorName}
//                     value={collector._id}
//                   />
//                 ))}
//               </Picker>
//             )}
//           </View>
//           {isCurrentlyAssigningThisRequest && (
//             <View style={styles.assigningLoader}>
//               <ActivityIndicator size="small" color="#4CAF50" />
//               <Text style={styles.assigningText}>Assigning...</Text>
//             </View>
//           )}
//           {/* Show assigned status only if a collector is selected and no assignment is pending */}
//           {(collectorMap[item._id] && !isCurrentlyAssigningThisRequest) && (
//             <Text style={styles.assignedStatus}>
//               Assigned to:{" "}
//               <Text style={styles.assignedCollectorName}>
//                 {/* Find the collector's name from the list of centerCollectors */}
//                 {centerCollectors.find(c => c._id === collectorMap[item._id])?.collectorName || "N/A"}
//               </Text>
//             </Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // --- Main Component Render ---
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
//       <View style={styles.container}>
//         <Text style={styles.header}>Assign Requests</Text>
//         <Text style={styles.subHeader}>
//           Manage and assign approved scrap pickup requests to collectors from your center.
//         </Text>

//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search by ID, homeowner, location, type, or collector..."
//             placeholderTextColor="#888"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//         </View>

//         {/* Conditional Rendering for Loading, Error, or Data */}
//         {loadingRequests || loadingCollectors ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#4CAF50" />
//             <Text style={styles.loadingText}>Loading dashboard data...</Text>
//           </View>
//         ) : error ? (
//           <View style={styles.errorContainer}>
//             <Ionicons name="alert-circle-outline" size={50} color="red" />
//             <Text style={styles.errorText}>{error}</Text>
//             <TouchableOpacity style={styles.retryButton} onPress={() => Alert.alert('Refresh', 'Refreshing data...')}>
//                 <Text style={styles.retryButtonText}>Refresh</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <FlatList
//             data={filteredRequests}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             contentContainerStyle={styles.listContent}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Ionicons name="clipboard-outline" size={50} color="#ccc" />
//                 <Text style={styles.emptyText}>No approved requests available for assignment.</Text>
//               </View>
//             }
//           />
//         )}

//         {/* Modal Image Viewer */}
//         <Modal visible={modalVisible} transparent={true} animationType="fade">
//           <View style={styles.modalBackground}>
//             <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
//               <AntDesign name="closecircle" size={30} color="white" />
//             </TouchableOpacity>
//             <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// }

// // --- Stylesheet ---
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subHeader: {
//     fontSize: 15,
//     color: '#555',
//     marginBottom: 20,
//     textAlign: 'center',
//     paddingHorizontal: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//     color: '#333',
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   requestCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//     borderLeftWidth: 5,
//     borderLeftColor: '#4CAF50',
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   cardLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     flex: 1,
//   },
//   cardValue: {
//     fontSize: 15,
//     color: '#333',
//     flex: 2,
//     textAlign: 'right',
//   },
//   imageButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     flex: 2,
//   },
//   requestImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     backgroundColor: '#f0f0f0' // Fallback background for image
//   },
//   viewImageIcon: {},
//   assignmentSection: {
//     marginTop: 15,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: '#A5D6A7',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#F9F9F9',
//     marginBottom: 10,
//     justifyContent: 'center', // Center content when loading
//     minHeight: 50, // Ensure height even with loading indicator
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: '#333',
//   },
//   noCollectorsText: {
//     textAlign: 'center',
//     paddingVertical: 10,
//     color: '#888',
//     fontSize: 14,
//   },
//   assignedStatus: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   assignedCollectorName: {
//     fontWeight: 'bold',
//     color: '#2E7D32',
//   },
//   assigningLoader: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   assigningText: {
//     marginLeft: 10,
//     color: '#4CAF50',
//     fontSize: 14,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//     marginTop: 15,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 10,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#ffe0e0', // Light red background for error box
//     borderRadius: 15,
//     paddingVertical: 30,
//     borderWidth: 1,
//     borderColor: 'red',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     marginTop: 15,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   retryButton: {
//     backgroundColor: '#2E7D32',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   retryButtonText: {
//     color: WHITE, // Now correctly referencing the defined WHITE constant
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullImage: {
//     width: '95%',
//     height: '75%',
//     borderRadius: 10,
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 60 : 30,
//     right: 20,
//     zIndex: 2,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 20,
//     padding: 5,
//   },
// });


//solving collectors name
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// --- DEFINE COLOR CONSTANTS AT THE TOP OF THIS FILE ---
const DARK_GREEN = "#004225";
const GREEN = "#3CB371";
const WHITE = "#FFFFFF";
// --- END COLOR CONSTANTS ---

// Your backend URL
const BACKEND_URL = "http://192.168.137.246:5000";

export default function Assign() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]); // All approved requests for the center
  const [collectorMap, setCollectorMap] = useState({}); // Maps requestId to assigned collectorId
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingCollectors, setLoadingCollectors] = useState(true);
  const [assigning, setAssigning] = useState(false); // State for individual assignment loading

  const [adminCenterId, setAdminCenterId] = useState(null); // ID of the logged-in admin's center
  const [centerCollectors, setCenterCollectors] = useState([]); // List of collectors from the admin's center
  const [error, setError] = useState(null); // General error for data fetching

  // --- Data Fetching Logic ---
  useEffect(() => {
    const loadAdminDashboardData = async () => {
      setError(null); // Clear previous errors
      setLoadingRequests(true);
      setLoadingCollectors(true);

      try {
        const storedAdminToken = await AsyncStorage.getItem('adminToken');
        const storedCenterId = await AsyncStorage.getItem('centerId');

        if (!storedAdminToken || !storedCenterId) {
          setError("Authentication required. Please log in as a center admin.");
          setLoadingRequests(false);
          setLoadingCollectors(false);
          return;
        }

        setAdminCenterId(storedCenterId);

        // 1. Fetch Approved Requests for this Center
        try {
          const requestsResponse = await axios.get(
            `${BACKEND_URL}/api/v1/requests/center/${storedCenterId}/list?status=approved`,
            { headers: { Authorization: `Bearer ${storedAdminToken}` } }
          );

          if (requestsResponse.data.success) {
            const fetchedRequests = requestsResponse.data.requests;
            setApprovedRequests(fetchedRequests);
            setFilteredRequests(fetchedRequests);

            // Initialize collectorMap from fetched data if a collector is already assigned
            const initialCollectorMap = {};
            fetchedRequests.forEach(req => {
              // Ensure collectorId and collectorId._id exist
              if (req.collectorId && req.collectorId._id) {
                initialCollectorMap[req._id] = req.collectorId._id;
              }
            });
            setCollectorMap(initialCollectorMap);
          } else {
            setError(requestsResponse.data.message || "Failed to fetch approved requests.");
          }
        } catch (err) {
          console.error("Error fetching requests:", err);
          setError(err.response?.data?.message || "Failed to load approved requests.");
        } finally {
          setLoadingRequests(false);
        }

        // 2. Fetch Collectors for this Center
        try {
          const collectorsResponse = await axios.get(
            `${BACKEND_URL}/api/v1/center/collectors/${storedCenterId}`,
            { headers: { Authorization: `Bearer ${storedAdminToken}` } }
          );

          if (collectorsResponse.data.success) {
            setCenterCollectors(collectorsResponse.data.collectors);
          } else {
            setError(collectorsResponse.data.message || "Failed to fetch collectors.");
          }
        } catch (err) {
          console.error("Error fetching collectors:", err);
          setError(err.response?.data?.message || "Failed to load collectors for this center.");
        } finally {
          setLoadingCollectors(false);
        }

      } catch (err) {
        // This catch block handles errors related to AsyncStorage or initial setup
        console.error("Critical error loading admin data:", err);
        setError("Could not load admin data. Please ensure the app has storage permissions or you are logged in.");
        setLoadingRequests(false);
        setLoadingCollectors(false);
      }
    };

    loadAdminDashboardData();
  }, []); // Empty dependency array means this effect runs once on mount

  // --- Search Functionality ---
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    setSearchQuery(lower);
    const filtered = approvedRequests.filter((item) => {
      // Search by homeowner's full name, request ID, location, scrap type, or assigned collector's name
      const nameMatch = item.fullName.toLowerCase().includes(lower);
      const idMatch = item._id.toLowerCase().includes(lower); // Use MongoDB _id
      const locationMatch = item.location.toLowerCase().includes(lower);
      const typeMatch = item.scrapType.toLowerCase().includes(lower);

      // Check if a collector is assigned and if their name matches
      // FIX: Changed collectorId.collectorName to collectorId.fullName
      const assignedCollectorName = item.collectorId && item.collectorId.fullName
        ? item.collectorId.fullName.toLowerCase()
        : '';
      const collectorMatch = assignedCollectorName.includes(lower);

      return nameMatch || idMatch || locationMatch || typeMatch || collectorMatch;
    });
    setFilteredRequests(filtered);
  };

  // --- Assign Collector Functionality ---
  const handleAssignChange = async (requestId, collectorId) => {
    // If "Select Collector" is chosen, clear assignment for this request locally and don't send to backend
    if (!collectorId) {
      setCollectorMap((prev) => ({ ...prev, [requestId]: '' }));
      return;
    }

    // Prevent re-assigning to the same collector
    if (collectorMap[requestId] === collectorId) {
      Alert.alert("Already Assigned", "This request is already assigned to the selected collector.");
      return;
    }

    setAssigning(true); // Start individual assignment loading state
    try {
      const storedAdminToken = await AsyncStorage.getItem('adminToken');
      if (!storedAdminToken) {
        Alert.alert("Authentication Error", "Admin token not found. Please log in again.");
        setAssigning(false);
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/request/assign/`,
        { requestId, collectorId },
        { headers: { Authorization: `Bearer ${storedAdminToken}` } }
      );

      if (response.data.success) {
        setCollectorMap((prev) => ({ ...prev, [requestId]: collectorId }));
        Alert.alert('Success', response.data.message);

        // Update the specific request in the approvedRequests state with the newly assigned collector
        // This is important because the backend's response includes the populated collector object
        const updatedApprovedRequests = approvedRequests.map(req => {
          if (req._id === requestId) {
            // Replace the collectorId with the fully populated collector object from the response
            return { ...req, collectorId: response.data.request.collectorId };
          }
          return req;
        });
        setApprovedRequests(updatedApprovedRequests);
        // Re-filter the requests to ensure the UI updates correctly, especially if search is active
        handleSearch(searchQuery);

      } else {
        Alert.alert('Assignment Failed', response.data.message || 'Could not assign collector.');
      }
    } catch (error) {
      console.error('Error assigning collector:', error);
      Alert.alert(
        'Assignment Error',
        error.response?.data?.message || 'Failed to assign collector. Please try again.'
      );
    } finally {
      setAssigning(false); // Stop individual assignment loading state
    }
  };

  // --- Image Modal Logic ---
  const openImageModal = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  // --- Render Item for FlatList (each request card) ---
  const renderItem = ({ item }) => {
    // Determine if this specific request is currently undergoing an assignment action
    const isCurrentlyAssigningThisRequest = assigning && (collectorMap[item._id] !== (item.collectorId?._id || ''));

    return (
      <View style={styles.requestCard}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Request ID:</Text>
          <Text style={styles.cardValue}>{item._id}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Homeowner:</Text>
          <Text style={styles.cardValue}>{item.fullName}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Phone:</Text>
          <Text style={styles.cardValue}>{item.phoneNumber}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Location:</Text>
          <Text style={styles.cardValue}>{item.location}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Pickup Date:</Text>
          <Text style={styles.cardValue}>{item.pickupDate}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Scrap Type:</Text>
          <Text style={styles.cardValue}>{item.scrapType}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Weight:</Text>
          <Text style={styles.cardValue}>{item.weight} kg</Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Image:</Text>
          <TouchableOpacity onPress={() => openImageModal(item.imageUrl)} style={styles.imageButton}>
            <Image source={{ uri: item.imageUrl || 'https://placehold.co/150x150/E0E0E0/888888?text=No+Image' }} style={styles.requestImage} />
            <Ionicons name="eye-outline" size={20} color="#007bff" style={styles.viewImageIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.assignmentSection}>
          <Text style={styles.cardLabel}>Assign Collector:</Text>
          <View style={styles.pickerWrapper}>
            {loadingCollectors ? (
              <ActivityIndicator size="small" color="#4CAF50" style={{ marginVertical: 10 }} />
            ) : centerCollectors.length === 0 ? (
              <Text style={styles.noCollectorsText}>No collectors registered for this center.</Text>
            ) : (
              <Picker
                selectedValue={collectorMap[item._id] || ''}
                style={styles.picker}
                onValueChange={(value) => handleAssignChange(item._id, value)}
                dropdownIconColor="#4CAF50"
                enabled={!isCurrentlyAssigningThisRequest} // Disable picker if this request is being assigned
              >
                <Picker.Item label="-- Select Collector --" value="" />
                {centerCollectors.map((collector) => (
                  <Picker.Item
                    key={collector._id}
                    label={collector.fullName} // FIX: Changed to collector.fullName
                    value={collector._id}
                  />
                ))}
              </Picker>
            )}
          </View>
          {isCurrentlyAssigningThisRequest && (
            <View style={styles.assigningLoader}>
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={styles.assigningText}>Assigning...</Text>
            </View>
          )}
          {/* Show assigned status only if a collector is selected and no assignment is pending */}
          {(collectorMap[item._id] && !isCurrentlyAssigningThisRequest) && (
            <Text style={styles.assignedStatus}>
              Assigned to:{" "}
              <Text style={styles.assignedCollectorName}>
                {/* FIX: Changed to collector.fullName for finding and displaying */}
                {centerCollectors.find(c => c._id === collectorMap[item._id])?.fullName || "N/A"}
              </Text>
            </Text>
          )}
        </View>
      </View>
    );
  };

  // --- Main Component Render ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.container}>
        <Text style={styles.header}>Assign Requests</Text>
        <Text style={styles.subHeader}>
          Manage and assign approved scrap pickup requests to collectors from your center.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by ID, homeowner, location, type, or collector..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Conditional Rendering for Loading, Error, or Data */}
        {loadingRequests || loadingCollectors ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Loading dashboard data...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={50} color="red" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => Alert.alert('Refresh', 'Refreshing data...')}>
                <Text style={styles.retryButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredRequests}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="clipboard-outline" size={50} color="#ccc" />
                <Text style={styles.emptyText}>No approved requests available for assignment.</Text>
              </View>
            }
          />
        )}

        {/* Modal Image Viewer */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <AntDesign name="closecircle" size={30} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  cardValue: {
    fontSize: 15,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  requestImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#f0f0f0' // Fallback background for image
  },
  viewImageIcon: {},
  assignmentSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    justifyContent: 'center', // Center content when loading
    minHeight: 50, // Ensure height even with loading indicator
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  noCollectorsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#888',
    fontSize: 14,
  },
  assignedStatus: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  assignedCollectorName: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  assigningLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  assigningText: {
    marginLeft: 10,
    color: '#4CAF50',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffe0e0', // Light red background for error box
    borderRadius: 15,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '95%',
    height: '75%',
    borderRadius: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
  },
});