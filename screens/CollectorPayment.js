// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import axios from 'axios';

// // // export default function CollectorPayment() {
// // //   const [approvedRequests, setApprovedRequests] = useState([]);
// // //   const [inputs, setInputs] = useState({}); // Holds phone & amount for each request

// // //   useEffect(() => {
// // //     const fetchRequests = async () => {
// // //       try {
// // //         const token = await AsyncStorage.getItem('token');
// // //         const collectorId = await AsyncStorage.getItem('userId');

// // //         const res = await axios.get(`http://10.71.125.67:5000/api/v1/requests/collector/${collectorId}/approved`, {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`
// // //           }
// // //         });

// // //         setApprovedRequests(res.data.requests);
// // //       } catch (error) {
// // //         console.error(error);
// // //         Alert.alert('Error', 'Failed to fetch approved requests.');
// // //       }
// // //     };

// // //     fetchRequests();
// // //   }, []);

// // //   const handleInputChange = (field, value, id) => {
// // //     setInputs((prev) => ({
// // //       ...prev,
// // //       [id]: {
// // //         ...prev[id],
// // //         [field]: value,
// // //       }
// // //     }));
// // //   };

// // //   const handlePay = async (request) => {
// // //     const data = inputs[request._id];
// // //     if (!data || !data.phone || !data.amount) {
// // //       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
// // //     }

// // //     try {
// // //       const token = await AsyncStorage.getItem('token');
// // //       await axios.post(
// // //         'http://10.71.125.67:5000/api/v1/payments',
// // //         {
// // //           requestId: request._id,
// // //           homeownerId: request.homeownerId,
// // //           amount: data.amount,
// // //           phoneNumber: data.phone,
// // //         },
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       Alert.alert('Success', 'Payment successful.');
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Error', 'Payment failed.');
// // //     }
// // //   };

// // //   const handleDownloadReceipt = async (requestId) => {
// // //     Alert.alert("Receipt Download", `Trigger download for receipt of request ${requestId}`);
// // //     // Backend should expose /payments/:requestId/receipt endpoint that returns PDF or text receipt
// // //     // Use FileSystem or Sharing module to download/view
// // //   };

// // //   const renderItem = ({ item }) => {
// // //     const data = inputs[item._id] || {};
// // //     return (
// // //       <View style={styles.row}>
// // //         <Text style={styles.cell}>{item.homeownerName}</Text>
// // //         <Text style={styles.cell}>{item.homeownerId}</Text>
// // //         <Text style={styles.cell}>{item._id}</Text>
// // //         <Text style={styles.cell}>{item.scrapType}</Text>
// // //         <Text style={styles.cell}>{item.weight} kg</Text>
// // //         <TextInput
// // //           style={styles.inputCell}
// // //           placeholder="Phone"
// // //           placeholderTextColor="#aaa"
// // //           value={data.phone || ''}
// // //           onChangeText={(text) => handleInputChange('phone', text, item._id)}
// // //           keyboardType="phone-pad"
// // //         />
// // //         <TextInput
// // //           style={styles.inputCell}
// // //           placeholder="Amount"
// // //           placeholderTextColor="#aaa"
// // //           value={data.amount || ''}
// // //           onChangeText={(text) => handleInputChange('amount', text, item._id)}
// // //           keyboardType="numeric"
// // //         />
// // //         <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
// // //           <Text style={styles.buttonText}>Pay</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
// // //           <Text style={styles.buttonText}>Receipt</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <ScrollView horizontal>
// // //       <View style={styles.container}>
// // //         <View style={[styles.row, styles.headerRow]}>
// // //           <Text style={styles.header}>Homeowner</Text>
// // //           <Text style={styles.header}>Homeowner ID</Text>
// // //           <Text style={styles.header}>Request ID</Text>
// // //           <Text style={styles.header}>Scrap Type</Text>
// // //           <Text style={styles.header}>Weight</Text>
// // //           <Text style={styles.header}>Phone</Text>
// // //           <Text style={styles.header}>Amount</Text>
// // //           <Text style={styles.header}>Pay</Text>
// // //           <Text style={styles.header}>Receipt</Text>
// // //         </View>

// // //         <FlatList
// // //           data={approvedRequests}
// // //           keyExtractor={(item) => item._id}
// // //           renderItem={renderItem}
// // //         />
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }

// // // const DARK_GREEN = '#003920';
// // // const GREEN = '#00C851';
// // // const WHITE = '#FFFFFF';

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     padding: 10,
// // //     backgroundColor: DARK_GREEN,
// // //     minWidth: 1000,
// // //   },
// // //   row: {
// // //     flexDirection: 'row',
// // //     marginBottom: 8,
// // //     alignItems: 'center',
// // //     borderBottomWidth: 1,
// // //     borderColor: '#ccc',
// // //     paddingVertical: 6,
// // //   },
// // //   headerRow: {
// // //     borderBottomWidth: 2,
// // //     borderColor: GREEN,
// // //   },
// // //   header: {
// // //     color: WHITE,
// // //     fontWeight: 'bold',
// // //     width: 120,
// // //     textAlign: 'center',
// // //   },
// // //   cell: {
// // //     color: WHITE,
// // //     width: 120,
// // //     textAlign: 'center',
// // //     fontSize: 13,
// // //   },
// // //   inputCell: {
// // //     width: 120,
// // //     padding: 6,
// // //     backgroundColor: '#014d33',
// // //     borderRadius: 5,
// // //     color: WHITE,
// // //     textAlign: 'center',
// // //   },
// // //   payButton: {
// // //     backgroundColor: GREEN,
// // //     padding: 8,
// // //     borderRadius: 6,
// // //     marginHorizontal: 3,
// // //     width: 90,
// // //     alignItems: 'center',
// // //   },
// // //   receiptButton: {
// // //     backgroundColor: '#4285F4',
// // //     padding: 8,
// // //     borderRadius: 6,
// // //     marginHorizontal: 3,
// // //     width: 90,
// // //     alignItems: 'center',
// // //   },
// // //   buttonText: {
// // //     color: WHITE,
// // //     fontWeight: 'bold',
// // //   },
// // // });



// // //working code

// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   FlatList,
// // //   Alert,
// // //   ScrollView,
// // //   ActivityIndicator,
// // //   RefreshControl,
// // // } from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import axios from 'axios';

// // // // Define a color palette for a cleaner look
// // // const Colors = {
// // //   primary: '#28a745', // Green for primary actions
// // //   secondary: '#007bff', // Blue for secondary actions/links
// // //   background: '#f0f2f5', // Lighter grey background
// // //   cardBackground: '#FFFFFF', // White card background
// // //   text: '#343a40', // Dark text
// // //   lightText: '#6c757d', // Lighter text for labels
// // //   inputBg: '#e9ecef', // Light background for inputs
// // //   border: '#dee2e6', // Border color
// // //   success: '#28a745',
// // //   error: '#dc3545',
// // //   gradientStart: '#28a745', // For button gradients
// // //   gradientEnd: '#218838', // For button gradients
// // // };

// // // export default function CollectorPayment() {
// // //   const [collectedRequests, setCollectedRequests] = useState([]);
// // //   const [inputs, setInputs] = useState({});
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   useEffect(() => {
// // //     fetchRequests();
// // //   }, []);

// // //   const fetchRequests = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const token = await AsyncStorage.getItem('token');
// // //       const collectorId = await AsyncStorage.getItem('collectorId');

// // //       if (!collectorId) {
// // //         Alert.alert('Error', 'Collector ID not found. Please log in again.');
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const res = await axios.get(
// // //         `http://192.168.189.119:5000/api/v1/requests/collector/${collectorId}/list/`,
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` }
// // //         }
// // //       );

// // //       const filteredRequests = res.data.requests.filter(
// // //         (request) => request.status === 'collected'
// // //       );
// // //       setCollectedRequests(filteredRequests);
// // //       console.log("Fetched and filtered collected requests:", filteredRequests);
// // //     } catch (err) {
// // //       console.error('Error fetching collected requests:', err);
// // //       setError('Failed to fetch collected requests. Please check your network and try again.');
// // //       Alert.alert('Error', 'Failed to fetch collected requests.');
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   const handleInputChange = (field, value, id) => {
// // //     setInputs(prev => ({
// // //       ...prev,
// // //       [id]: {
// // //         ...prev[id],
// // //         [field]: value,
// // //       }
// // //     }));
// // //   };

// // //   const handlePay = async request => {
// // //     const data = inputs[request._id];
// // //     if (!data || !data.phone || !data.amount) {
// // //       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
// // //     }

// // //     const amountNum = parseFloat(data.amount);
// // //     if (isNaN(amountNum) || amountNum <= 0) {
// // //         return Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
// // //     }

// // //     try {
// // //       const token = await AsyncStorage.getItem('token');
// // //       await axios.post(
// // //         'http://192.168.189.119:5000/api/v1/payment/send',
// // //         {
// // //           requestId: request._id,
// // //           homeownerId: request.homeownerId,
// // //           amount: amountNum,
// // //           phoneNumber: data.phone,
// // //         },
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       Alert.alert('Success', 'Payment successful.');
// // //       setCollectedRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));
// // //     } catch (err) {
// // //       console.error('Payment failed:', err.response?.data || err.message);
// // //       Alert.alert('Error', `Payment failed: ${err.response?.data?.message || 'Please try again.'}`);
// // //     }
// // //   };

// // //   const handleDownloadReceipt = requestId => {
// // //     Alert.alert('Receipt Download', `Trigger download for receipt of request ${requestId}`);
// // //   };

// // //   const onRefresh = () => {
// // //     setRefreshing(true);
// // //     fetchRequests();
// // //   };

// // //   // --- renderItem now renders a stylish card for each request ---
// // //   const renderItem = ({ item }) => {
// // //     const data = inputs[item._id] || {};
// // //     return (
// // //       <View style={styles.requestCard}>
// // //         <Text style={styles.cardTitle}>{item.fullName || 'Homeowner'}</Text>

// // //         <View style={styles.cardDetailRow}>
// // //           <Text style={styles.cardLabel}>Scrap Type:</Text>
// // //           <Text style={styles.cardValue}>{item.scrapType || 'N/A'}</Text>
// // //         </View>
// // //         <View style={styles.cardDetailRow}>
// // //           <Text style={styles.cardLabel}>Weight:</Text>
// // //           <Text style={styles.cardValue}>{item.weight ? `${item.weight} kg` : 'N/A'}</Text>
// // //         </View>
// // //         <View style={styles.cardDetailRow}>
// // //           <Text style={styles.cardLabel}>Request ID:</Text>
// // //           <Text style={styles.cardValue}>{item._id || 'N/A'}</Text>
// // //         </View>
// // //         <View style={styles.cardDetailRow}>
// // //           <Text style={styles.cardLabel}>Homeowner ID:</Text>
// // //           <Text style={styles.cardValue}>{item.homeownerId || 'N/A'}</Text>
// // //         </View>

// // //         {/* Phone Input Group */}
// // //         <View style={styles.inputGroup}>
// // //           <Text style={styles.inputLabel}>Phone Number</Text>
// // //           <TextInput
// // //             style={styles.cardInput}
// // //             placeholder="Enter phone"
// // //             placeholderTextColor={Colors.lightText}
// // //             value={data.phone || item.phoneNumber || ''}
// // //             onChangeText={text => handleInputChange('phone', text, item._id)}
// // //             keyboardType="phone-pad"
// // //           />
// // //         </View>

// // //         {/* Amount Input Group */}
// // //         <View style={styles.inputGroup}>
// // //           <Text style={styles.inputLabel}>Amount to Pay</Text>
// // //           <TextInput
// // //             style={styles.cardInput}
// // //             placeholder="Enter amount"
// // //             placeholderTextColor={Colors.lightText}
// // //             value={data.amount || ''}
// // //             onChangeText={text => handleInputChange('amount', text, item._id)}
// // //             keyboardType="numeric"
// // //           />
// // //         </View>

// // //         {/* Action Buttons */}
// // //         <View style={styles.cardButtonContainer}>
// // //           <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
// // //             <Text style={styles.buttonText}>Pay</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
// // //             <Text style={styles.buttonText}>Receipt</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <View style={styles.centeredView}>
// // //         <ActivityIndicator size="large" color={Colors.primary} />
// // //         <Text style={styles.loadingText}>Fetching collected requests...</Text>
// // //       </View>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <View style={styles.centeredView}>
// // //         <Text style={styles.errorText}>{error}</Text>
// // //         <TouchableOpacity onPress={fetchRequests} style={styles.retryButton}>
// // //           <Text style={styles.buttonText}>Retry</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <View style={styles.outerContainer}>
// // //       <Text style={styles.screenTitle}>Collected Requests for Payment</Text>
// // //       <FlatList // FlatList now handles the main vertical scrolling
// // //         data={collectedRequests}
// // //         keyExtractor={item => item._id}
// // //         renderItem={renderItem}
// // //         contentContainerStyle={styles.requestsListContainer} // Styles for the FlatList content
// // //         refreshControl={
// // //           <RefreshControl
// // //             refreshing={refreshing}
// // //             onRefresh={onRefresh}
// // //             colors={[Colors.primary]}
// // //             tintColor={Colors.primary}
// // //           />
// // //         }
// // //         ListEmptyComponent={() => ( // Component to show when list is empty
// // //           <View style={styles.noDataView}>
// // //             <Text style={styles.noDataText}>No collected requests found for payment.</Text>
// // //           </View>
// // //         )}
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   outerContainer: {
// // //     flex: 1,
// // //     backgroundColor: Colors.background,
// // //     paddingTop: 20,
// // //   },
// // //   screenTitle: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     color: Colors.text,
// // //     textAlign: 'center',
// // //     marginBottom: 25,
// // //     paddingHorizontal: 15,
// // //   },
// // //   requestsListContainer: {
// // //     paddingHorizontal: 15, // Padding around the list of cards
// // //     paddingBottom: 20, // Space at the bottom of the list
// // //   },
// // //   requestCard: {
// // //     backgroundColor: Colors.cardBackground,
// // //     borderRadius: 12,
// // //     marginVertical: 10,
// // //     padding: 20,
// // //     elevation: 8, // Stronger shadow for Android
// // //     shadowColor: Colors.text, // Darker shadow for iOS
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 6,
// // //     borderWidth: 1,
// // //     borderColor: Colors.border,
// // //     alignItems: 'center', // Center content horizontally within the card
// // //   },
// // //   cardTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: Colors.primary, // Green title for emphasis
// // //     marginBottom: 15,
// // //     textAlign: 'center',
// // //     borderBottomWidth: 2,
// // //     borderBottomColor: Colors.primary,
// // //     paddingBottom: 8,
// // //     width: '100%', // Ensure title spans full width for centering
// // //   },
// // //   cardDetailRow: {
// // //     flexDirection: 'row', // Label and value side-by-side
// // //     justifyContent: 'space-between', // Distribute space between them
// // //     width: '100%', // Take full width of card
// // //     marginBottom: 8,
// // //     paddingHorizontal: 10, // Indent details slightly
// // //   },
// // //   cardLabel: {
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //     color: Colors.lightText,
// // //     flex: 1, // Allow label to take available space
// // //     textAlign: 'left', // Align labels to the left
// // //   },
// // //   cardValue: {
// // //     fontSize: 16,
// // //     color: Colors.text,
// // //     flex: 2, // Allow value to take more space
// // //     textAlign: 'right', // Align values to the right
// // //   },
// // //   inputGroup: {
// // //     width: '100%',
// // //     marginBottom: 15,
// // //     alignItems: 'center', // Center label and input within the group
// // //   },
// // //   inputLabel: {
// // //     fontSize: 14,
// // //     color: Colors.lightText,
// // //     marginBottom: 5,
// // //     fontWeight: '600',
// // //   },
// // //   cardInput: {
// // //     width: '85%', // Slightly less than 100% to give some horizontal padding
// // //     padding: 12,
// // //     backgroundColor: Colors.inputBg,
// // //     borderRadius: 8,
// // //     fontSize: 16,
// // //     color: Colors.text,
// // //     textAlign: 'center',
// // //     borderWidth: 1,
// // //     borderColor: Colors.border,
// // //   },
// // //   cardButtonContainer: {
// // //     flexDirection: 'row', // Buttons side by side
// // //     justifyContent: 'space-around', // Space between buttons
// // //     width: '100%',
// // //     marginTop: 20,
// // //   },
// // //   payButton: {
// // //     backgroundColor: Colors.primary,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 25,
// // //     borderRadius: 25, // More rounded for a pill-like shape
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     flex: 1, // Take equal space with receipt button
// // //     marginHorizontal: 5,
// // //     shadowColor: Colors.primary, // Add shadow with primary color
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 5,
// // //   },
// // //   receiptButton: {
// // //     backgroundColor: Colors.secondary,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 25,
// // //     borderRadius: 25,
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     flex: 1,
// // //     marginHorizontal: 5,
// // //     shadowColor: Colors.secondary, // Add shadow with secondary color
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 5,
// // //   },
// // //   buttonText: {
// // //     color: Colors.cardBackground,
// // //     fontWeight: 'bold',
// // //     fontSize: 16,
// // //   },
// // //   centeredView: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: Colors.background,
// // //   },
// // //   loadingText: {
// // //     marginTop: 15,
// // //     fontSize: 18,
// // //     color: Colors.lightText,
// // //   },
// // //   errorText: {
// // //     color: Colors.error,
// // //     fontSize: 18,
// // //     textAlign: 'center',
// // //     marginBottom: 25,
// // //     paddingHorizontal: 20,
// // //   },
// // //   retryButton: {
// // //     backgroundColor: Colors.secondary,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 30,
// // //     borderRadius: 25,
// // //     shadowColor: Colors.secondary,
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.2,
// // //     shadowRadius: 3,
// // //   },
// // //   noDataView: {
// // //     flex: 1, // Ensures it takes available space in FlatList
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     paddingVertical: 50,
// // //   },
// // //   noDataText: {
// // //     color: Colors.lightText,
// // //     fontSize: 18,
// // //     textAlign: 'center',
// // //   },
// // // });



// // //test for pay
// // import React, { useEffect, useState, useCallback } from 'react';
// // import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';
// // import { useFocusEffect } from '@react-navigation/native';
// // import { Feather } from '@expo/vector-icons';

// // const CollectorPickups = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const fetchAssignedRequests = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem('collectorToken');
// //       const collectorId = await AsyncStorage.getItem('collectorId');

// //       if (!token || !collectorId) {
// //         console.error('Missing token or collectorId');
// //         return;
// //       }

// //       const response = await axios.get(`http://192.168.189.119:5000/api/v1/request/assigned/${collectorId}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setRequests(response.data);
// //     } catch (error) {
// //       console.error('Error fetching assigned requests:', error.message);
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   useFocusEffect(
// //     useCallback(() => {
// //       fetchAssignedRequests();
// //     }, [])
// //   );

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     fetchAssignedRequests();
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.cardTitle}>Scrap Pickup</Text>

// //       <View style={styles.cardDetailRow}>
// //         <Text style={styles.cardLabel}>Homeowner:</Text>
// //         <Text style={styles.cardValue}>
// //           {item.homeownerId?.username || item.homeownerId?._id || 'N/A'}
// //         </Text>
// //       </View>

// //       <View style={styles.cardDetailRow}>
// //         <Text style={styles.cardLabel}>Location:</Text>
// //         <Text style={styles.cardValue}>{item.location}</Text>
// //       </View>

// //       <View style={styles.cardDetailRow}>
// //         <Text style={styles.cardLabel}>Weight:</Text>
// //         <Text style={styles.cardValue}>{item.weight} kg</Text>
// //       </View>

// //       <View style={styles.cardDetailRow}>
// //         <Text style={styles.cardLabel}>Status:</Text>
// //         <Text style={styles.cardValue}>{item.status}</Text>
// //       </View>
// //     </View>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color="#388E3C" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Feather name="truck" size={24} color="white" />
// //         <Text style={styles.headerText}>Assigned Pickups</Text>
// //       </View>

// //       <FlatList
// //         data={requests}
// //         keyExtractor={(item) => item._id}
// //         renderItem={renderItem}
// //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
// //         contentContainerStyle={styles.listContent}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F0F4F8',
// //   },
// //   header: {
// //     backgroundColor: '#388E3C',
// //     padding: 16,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   headerText: {
// //     color: 'white',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginLeft: 10,
// //   },
// //   listContent: {
// //     padding: 16,
// //   },
// //   card: {
// //     backgroundColor: 'white',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginBottom: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   cardTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#388E3C',
// //     marginBottom: 8,
// //   },
// //   cardDetailRow: {
// //     flexDirection: 'row',
// //     marginBottom: 4,
// //   },
// //   cardLabel: {
// //     fontWeight: 'bold',
// //     width: 100,
// //     color: '#444',
// //   },
// //   cardValue: {
// //     flex: 1,
// //     color: '#333',
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // export default CollectorPickups;



// //test
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const CollectorProfile = () => {
//   const [collector, setCollector] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCollectorProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         console.error('Missing token');
//         return;
//       }

//       const res = await axios.get('http://192.168.189.119:5000/api/v1/collector/info', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCollector(res.data);
//     } catch (error) {
//       console.error('Error fetching collector profile:', error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCollectorProfile();
//   }, []);

//   if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="green" />;

//   return (
//     <View style={styles.container}>
//       {collector ? (
//         <>
//           <Text style={styles.label}>Full Name:</Text>
//           <Text style={styles.value}>{collector.fullName}</Text>

//           <Text style={styles.label}>Username:</Text>
//           <Text style={styles.value}>{collector.username}</Text>

//           <Text style={styles.label}>Email:</Text>
//           <Text style={styles.value}>{collector.email}</Text>

//           <Text style={styles.label}>Phone:</Text>
//           <Text style={styles.value}>{collector.phoneNo}</Text>
//         </>
//       ) : (
//         <Text style={styles.value}>No profile data found.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   label: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
//   value: { fontSize: 16, marginBottom: 10 },
// });

// export default CollectorProfile;










// woerking code for collector payment with fake STK modal

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import FakeSTKModal from "../components/FakeSTKModal"; // Adjust path if necessary

// // Define a color palette for a cleaner look
// const Colors = {
//   primary: '#28a745', // Green for primary actions
//   secondary: '#007bff', // Blue for secondary actions/links
//   background: '#f0f2f5', // Lighter grey background
//   cardBackground: '#FFFFFF', // White card background
//   text: '#343a40', // Dark text
//   lightText: '#6c757d', // Lighter text for labels
//   inputBg: '#e9ecef', // Light background for inputs
//   border: '#dee2e6', // Border color
//   success: '#28a745',
//   error: '#dc3545',
//   gradientStart: '#28a745', // For button gradients
//   gradientEnd: '#218838', // For button gradients
// };

// export default function CollectorPayment() {
//   const [collectedRequests, setCollectedRequests] = useState([]);
//   const [inputs, setInputs] = useState({}); // Holds phone & amount for each request
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [stk, setStk] = useState({ // Controls fake STK modal
//     visible: false,
//     request: null,
//   });

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const collectorId = await AsyncStorage.getItem('collectorId');

//       if (!collectorId) {
//         Alert.alert('Error', 'Collector ID not found. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(
//         `http://192.168.189.119:5000/api/v1/requests/collector/${collectorId}/list/`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       const filteredRequests = res.data.requests.filter(
//         (request) => request.status === 'collected'
//       );
//       setCollectedRequests(filteredRequests);
//       console.log("Fetched and filtered collected requests:", filteredRequests);
//     } catch (err) {
//       console.error('Error fetching collected requests:', err);
//       setError('Failed to fetch collected requests. Please check your network and try again.');
//       Alert.alert('Error', 'Failed to fetch collected requests.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleInputChange = (field, value, id) => {
//     setInputs(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       }
//     }));
//   };

//   // Function to initiate the STK push
//   const openStk = (request) => {
//     const data = inputs[request._id];
//     if (!data || !data.phone || !data.amount) {
//       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
//     }

//     const amountNum = parseFloat(data.amount);
//     if (isNaN(amountNum) || amountNum <= 0) {
//       return Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
//     }

//     // Pass the request and the input data to the STK modal state
//     setStk({ visible: true, request: { ...request, currentAmount: amountNum, currentPhone: data.phone } });
//   };

//   // Close STK modal
//   const onStkClose = () => {
//     setStk({ visible: false, request: null });
//   };

//   // This function is called when the user confirms PIN in the FakeSTKModal
//   const onStkSuccess = async () => {
//     if (!stk.request) {
//       console.error("STK success called but no request in state.");
//       return;
//     }

//     // Use the request data stored in the STK state
//     const request = stk.request;
//     const amountNum = request.currentAmount;
//     const phoneNumber = request.currentPhone;

//     // --- Added console.log to show payload being sent ---
//     const payload = {
//       requestId: request._id,
//       homeownerId: request.homeownerId,
//       amount: amountNum,
//       phoneNumber: phoneNumber,
//     };
//     console.log("Attempting to send payment with payload:", payload);

//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.post(
//         'http://192.168.189.119:5000/api/v1/payment/send',
//         payload, // Use the payload variable
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       Alert.alert('Success', 'Payment successful.');
//       // Remove the paid request from the list
//       setCollectedRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));
//     } catch (err) {
//       console.error('Payment failed:', err.response?.data || err.message);
//       Alert.alert('Error', `Payment failed: ${err.response?.data?.message || 'Please try again.'}`);
//     } finally {
//       onStkClose(); // Always close the STK modal after payment attempt
//     }
//   };


//   const handleDownloadReceipt = requestId => {
//     Alert.alert('Receipt Download', `Trigger download for receipt of request ${requestId}`);
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchRequests();
//   };

//   // --- renderItem now renders a stylish card for each request ---
//   const renderItem = ({ item }) => {
//     const data = inputs[item._id] || {};
//     return (
//       <View style={styles.requestCard}>
//         <Text style={styles.cardTitle}>{item.fullName || 'Homeowner'}</Text>

//         <View style={styles.cardDetailRow}>
//           <Text style={styles.cardLabel}>Scrap Type:</Text>
//           <Text style={styles.cardValue}>{item.scrapType || 'N/A'}</Text>
//         </View>
//         <View style={styles.cardDetailRow}>
//           <Text style={styles.cardLabel}>Weight:</Text>
//           <Text style={styles.cardValue}>{item.weight ? `${item.weight} kg` : 'N/A'}</Text>
//         </View>
//         <View style={styles.cardDetailRow}>
//           <Text style={styles.cardLabel}>Request ID:</Text>
//           <Text style={styles.cardValue}>{item._id || 'N/A'}</Text>
//         </View>
//         <View style={styles.cardDetailRow}>
//           <Text style={styles.cardLabel}>Homeowner:</Text>
//           <Text style={styles.cardValue}>
//             {item.homeownerId?.username || 'N/A'}
//           </Text>
//         </View>

//         {/* Phone Input Group */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.inputLabel}>Phone Number</Text>
//           <TextInput
//             style={styles.cardInput}
//             placeholder="Enter phone"
//             placeholderTextColor={Colors.lightText}
//             value={data.phone || item.phoneNumber || ''}
//             onChangeText={text => handleInputChange('phone', text, item._id)}
//             keyboardType="phone-pad"
//           />
//         </View>

//         {/* Amount Input Group */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.inputLabel}>Amount to Pay</Text>
//           <TextInput
//             style={styles.cardInput}
//             placeholder="Enter amount"
//             placeholderTextColor={Colors.lightText}
//             value={data.amount || ''}
//             onChangeText={text => handleInputChange('amount', text, item._id)}
//             keyboardType="numeric"
//           />
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.cardButtonContainer}>
//           <TouchableOpacity style={styles.payButton} onPress={() => openStk(item)}>
//             <Text style={styles.buttonText}>Pay</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
//             <Text style={styles.buttonText}>Receipt</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.centeredView}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//         <Text style={styles.loadingText}>Fetching collected requests...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centeredView}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity onPress={fetchRequests} style={styles.retryButton}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <>
//       {/* FakeSTKModal is outside the main view, but part of the component's render */}
//       <FakeSTKModal
//         visible={stk.visible}
//         // Pass the phone number and amount from the current inputs based on the request in STK state
//         amount={stk.request ? (inputs[stk.request._id]?.amount || stk.request.currentAmount || '') : ''}
//         phoneNumber={stk.request ? (inputs[stk.request._id]?.phone || stk.request.currentPhone || '') : ''}
//         onClose={onStkClose}
//         onSuccess={onStkSuccess}
//       />

//       <View style={styles.outerContainer}>
//         <Text style={styles.screenTitle}>Collected Requests for Payment</Text>
//         <FlatList // FlatList now handles the main vertical scrolling
//           data={collectedRequests}
//           keyExtractor={item => item._id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.requestsListContainer} // Styles for the FlatList content
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[Colors.primary]}
//               tintColor={Colors.primary}
//             />
//           }
//           ListEmptyComponent={() => ( // Component to show when list is empty
//             <View style={styles.noDataView}>
//               <Text style={styles.noDataText}>No collected requests found for payment.</Text>
//             </View>
//           )}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     paddingTop: 20,
//   },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: Colors.text,
//     textAlign: 'center',
//     marginBottom: 25,
//     paddingHorizontal: 15,
//   },
//   requestsListContainer: {
//     paddingHorizontal: 15, // Padding around the list of cards
//     paddingBottom: 20, // Space at the bottom of the list
//   },
//   requestCard: {
//     backgroundColor: Colors.cardBackground,
//     borderRadius: 12,
//     marginVertical: 10,
//     padding: 20,
//     elevation: 8, // Stronger shadow for Android
//     shadowColor: Colors.text, // Darker shadow for iOS
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     alignItems: 'center', // Center content horizontally within the card
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.primary, // Green title for emphasis
//     marginBottom: 15,
//     textAlign: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: Colors.primary,
//     paddingBottom: 8,
//     width: '100%', // Ensure title spans full width for centering
//   },
//   cardDetailRow: {
//     flexDirection: 'row', // Label and value side-by-side
//     justifyContent: 'space-between', // Distribute space between them
//     width: '100%', // Take full width of card
//     marginBottom: 8,
//     paddingHorizontal: 10, // Indent details slightly
//   },
//   cardLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: Colors.lightText,
//     flex: 1, // Allow label to take available space
//     textAlign: 'left', // Align labels to the left
//   },
//   cardValue: {
//     fontSize: 16,
//     color: Colors.text,
//     flex: 2, // Allow value to take more space
//     textAlign: 'right', // Align values to the right
//   },
//   inputGroup: {
//     width: '100%',
//     marginBottom: 15,
//     alignItems: 'center', // Center label and input within the group
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: Colors.lightText,
//     marginBottom: 5,
//     fontWeight: '600',
//   },
//   cardInput: {
//     width: '85%', // Slightly less than 100% to give some horizontal padding
//     padding: 12,
//     backgroundColor: Colors.inputBg,
//     borderRadius: 8,
//     fontSize: 16,
//     color: Colors.text,
//     textAlign: 'center',
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
//   cardButtonContainer: {
//     flexDirection: 'row', // Buttons side by side
//     justifyContent: 'space-around', // Space between buttons
//     width: '100%',
//     marginTop: 20,
//   },
//   payButton: {
//     backgroundColor: Colors.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 25, // More rounded for a pill-like shape
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1, // Take equal space with receipt button
//     marginHorizontal: 5,
//     shadowColor: Colors.primary, // Add shadow with primary color
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   receiptButton: {
//     backgroundColor: Colors.secondary,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//     shadowColor: Colors.secondary, // Add shadow with secondary color
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   buttonText: {
//     color: Colors.cardBackground,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.background,
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 18,
//     color: Colors.lightText,
//   },
//   errorText: {
//     color: Colors.error,
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 25,
//     paddingHorizontal: 20,
//   },
//   retryButton: {
//     backgroundColor: Colors.secondary,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     shadowColor: Colors.secondary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   noDataView: {
//     flex: 1, // Ensures it takes available space in FlatList
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 50,
//   },
//   noDataText: {
//     color: Colors.lightText,
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });


// screens/CollectorPayment.js

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ScrollView
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import FakeSTKModal from '../components/FakeSTKModal';

// export default function CollectorPayment() {
//   const [approvedRequests, setApprovedRequests] = useState([]);
//   const [inputs, setInputs] = useState({});       // Holds phone & amount for each request
//   const [stk, setStk] = useState({               // Controls fake STK modal
//     visible: false,
//     request: null
//   });

//   // Fetch collector’s assigned requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const collectorId = await AsyncStorage.getItem('collectorId');

//         const res = await axios.get(
//           `http://192.168.189.119:5000/api/v1/requests/collector/${collectorId}/list/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setApprovedRequests(res.data.requests);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch approved requests.');
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Track input changes
//   const handleInputChange = (field, value, id) => {
//     setInputs(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       }
//     }));
//   };

//   // Real payment call to backend
//   const handlePay = async (request) => {
//     const data = inputs[request._id];
//     if (!data || !data.phone || !data.amount) {
//       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
//     }

//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.post(
//         'http://192.168.189.119:5000/api/v1/payment/send',
//         {
//           requestId: request._id,
//           homeownerId: request.homeownerId,
//           amount: data.amount,
//           phoneNumber: data.phone,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       Alert.alert('Success', 'Payment successful.');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Payment failed.');
//     }
//   };

//   // Show fake STK prompt
//   const openStk = (request) => {
//     setStk({ visible: true, request });
//   };

//   // Close modal
//   const onStkClose = () => {
//     setStk({ visible: false, request: null });
//   };

//   // User confirmed PIN → perform payment
//   const onStkSuccess = () => {
//     if (stk.request) handlePay(stk.request);
//   };

//   // Receipt placeholder
//   const handleDownloadReceipt = (requestId) => {
//     Alert.alert('Receipt Download', `Trigger download for receipt of request ${requestId}`);
//   };

//   // List render
//   const renderItem = ({ item }) => {
//     const data = inputs[item._id] || {};

//     return (
//       <View style={styles.row}>
//         <Text style={styles.cell}>{item.homeownerName}</Text>
//         <Text style={styles.cell}>{item.homeownerId}</Text>
//         <Text style={styles.cell}>{item._id}</Text>
//         <Text style={styles.cell}>{item.scrapType}</Text>
//         <Text style={styles.cell}>{item.weight} kg</Text>

//         <TextInput
//           style={styles.inputCell}
//           placeholder="Phone"
//           placeholderTextColor="#aaa"
//           value={data.phone || ''}
//           onChangeText={text => handleInputChange('phone', text, item._id)}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.inputCell}
//           placeholder="Amount"
//           placeholderTextColor="#aaa"
//           value={data.amount || ''}
//           onChangeText={text => handleInputChange('amount', text, item._id)}
//           keyboardType="numeric"
//         />

//         <TouchableOpacity style={styles.payButton} onPress={() => openStk(item)}>
//           <Text style={styles.buttonText}>Pay</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
//           <Text style={styles.buttonText}>Receipt</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <>
//       <FakeSTKModal
//         visible={stk.visible}
//         amount={ inputs[stk.request?._id]?.amount || '' }
//         phoneNumber={ inputs[stk.request?._id]?.phone || '' }
//         onClose={onStkClose}
//         onSuccess={onStkSuccess}
//       />

//       <ScrollView horizontal>
//         <View style={styles.container}>
//           <View style={[styles.row, styles.headerRow]}>
//             {['Homeowner','Homeowner ID','Request ID','Scrap Type','Weight','Phone','Amount','Pay','Receipt']
//               .map(h => <Text key={h} style={styles.header}>{h}</Text>)}
//           </View>

//           <FlatList
//             data={approvedRequests}
//             keyExtractor={item => item._id}
//             renderItem={renderItem}
//           />
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const DARK_GREEN = '#003920';
// const GREEN      = '#00C851';
// const WHITE      = '#FFFFFF';

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: DARK_GREEN,
//     minWidth: 1000,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 8,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 6,
//   },
//   headerRow: {
//     borderBottomWidth: 2,
//     borderColor: GREEN,
//   },
//   header: {
//     color: WHITE,
//     fontWeight: 'bold',
//     width: 120,
//     textAlign: 'center',
//   },
//   cell: {
//     color: WHITE,
//     width: 120,
//     textAlign: 'center',
//     fontSize: 13,
//   },
//   inputCell: {
//     width: 120,
//     padding: 6,
//     backgroundColor: '#014d33',
//     borderRadius: 5,
//     color: WHITE,
//     textAlign: 'center',
//   },
//   payButton: {
//     backgroundColor: GREEN,
//     padding: 8,
//     borderRadius: 6,
//     marginHorizontal: 3,
//     width: 90,
//     alignItems: 'center',
//   },
//   receiptButton: {
//     backgroundColor: '#4285F4',
//     padding: 8,
//     borderRadius: 6,
//     marginHorizontal: 3,
//     width: 90,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: WHITE,
//     fontWeight: 'bold',
//   },
// });




//testing
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FakeSTKModal from "../components/FakeSTKModal"; // Adjust path if necessary
import * as Print from 'expo-print'; // NEW: Import for PDF generation
import * as Sharing from 'expo-sharing'; // NEW: Import for sharing files

// Define a color palette for a cleaner look
const Colors = {
  primary: '#28a745', // Green for primary actions
  secondary: '#007bff', // Blue for secondary actions/links
  background: '#f0f2f5', // Lighter grey background
  cardBackground: '#FFFFFF', // White card background
  text: '#343a40', // Dark text
  lightText: '#6c757d', // Lighter text for labels
  inputBg: '#e9ecef', // Light background for inputs
  border: '#dee2e6', // Border color
  success: '#28a745',
  error: '#dc3545',
  gradientStart: '#28a745', // For button gradients
  gradientEnd: '#218838', // For button gradients
};

// Define your backend base URL. Consistency is key!
// **IMPORTANT**: Ensure this IP address matches your actual backend server IP.
// If your backend is at 192.168.0.114, change this.
const BASE_URL = 'http://192.168.189.119:5000/api/v1'; // Check if this IP is correct for your backend

export default function CollectorPayment() {
  const [collectedRequests, setCollectedRequests] = useState([]);
  const [inputs, setInputs] = useState({}); // Holds phone & amount for each request
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stk, setStk] = useState({ // Controls fake STK modal
    visible: false,
    request: null,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const collectorId = await AsyncStorage.getItem('collectorId');

      if (!collectorId) {
        Alert.alert('Error', 'Collector ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${BASE_URL}/requests/collector/${collectorId}/list/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Filtering for 'collected' status as per your CODE 1's logic
      const filteredRequests = res.data.requests.filter(
        (request) => request.status === 'collected'
      );
      setCollectedRequests(filteredRequests);
      console.log("Fetched and filtered collected requests:", filteredRequests);
    } catch (err) {
      console.error('Error fetching collected requests:', err.response?.data || err.message);
      setError('Failed to fetch collected requests. Please check your network and try again.');
      Alert.alert('Error', 'Failed to fetch collected requests.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleInputChange = (field, value, id) => {
    setInputs(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      }
    }));
  };

  const openStk = (request) => {
    const data = inputs[request._id];
    if (!data || !data.phone || !data.amount) {
      return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
    }

    const amountNum = parseFloat(data.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
    }

    setStk({ visible: true, request: { ...request, currentAmount: amountNum, currentPhone: data.phone } });
  };

  const onStkClose = () => {
    setStk({ visible: false, request: null });
  };

  const onStkSuccess = async () => {
    if (!stk.request) {
      console.error("STK success called but no request in state.");
      return;
    }

    const request = stk.request;
    const amountNum = request.currentAmount;
    const phoneNumber = request.currentPhone;

    const payload = {
      requestId: request._id,
      homeownerId: request.homeownerId,
      amount: amountNum,
      phoneNumber: phoneNumber,
      collectorId: await AsyncStorage.getItem('collectorId'),
    };
    console.log("Attempting to send payment with payload:", payload);

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `${BASE_URL}/payment/send`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Payment successful.');
      setCollectedRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));
    } catch (err) {
      console.error('Payment failed:', err.response?.data || err.message);
      Alert.alert('Error', `Payment failed: ${err.response?.data?.message || 'Please try again.'}`);
    } finally {
      onStkClose();
    }
  };

  // NEW: Function to generate and download/share the PDF receipt
  const handleDownloadReceipt = async (item) => {
    const receiptData = inputs[item._id] || {};
    const paymentAmount = receiptData.amount || '';
    const paidPhoneNumber = receiptData.phone || item.homeownerId?.phoneNo || item.phoneNumber || '';

    // Check if required data is available for a meaningful receipt
    if (!paymentAmount || !paidPhoneNumber) {
        Alert.alert('Missing Data', 'Please ensure amount and phone number are entered for the receipt.');
        return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 25px; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
          .header { text-align: center; margin-bottom: 25px; }
          .header h1 { color: #28a745; margin: 0; font-size: 28px; }
          .header p { color: #6c757d; font-size: 14px; margin-top: 5px; }
          .receipt-details { margin-bottom: 25px; border-top: 1px dashed #ddd; padding-top: 20px; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { font-weight: bold; width: 40%; }
          .detail-value { width: 60%; text-align: right; }
          .total { border-top: 2px solid #28a745; padding-top: 15px; margin-top: 20px; }
          .total .detail-label { font-size: 18px; }
          .total .detail-value { font-size: 18px; font-weight: bold; color: #28a745; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6c757d; }
          .footer p { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Scrap Connect</h1>
            <p>Official Payment Receipt</p>
            <p>Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div class="receipt-details">
            <div class="detail-row">
              <span class="detail-label">Homeowner Name:</span>
              <span class="detail-value">${item.homeownerId?.fullName || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Homeowner ID:</span>
              <span class="detail-value">${item.homeownerId?._id || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Phone:</span>
              <span class="detail-value">${paidPhoneNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Request ID:</span>
              <span class="detail-value">${item._id}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Scrap Type:</span>
              <span class="detail-value">${item.scrapType || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Weight:</span>
              <span class="detail-value">${item.weight ? `${item.weight} kg` : 'N/A'}</span>
            </div>
          </div>
          <div class="total">
            <div class="detail-row">
              <span class="detail-label">Amount Paid:</span>
              <span class="detail-value">KES ${parseFloat(paymentAmount).toFixed(2)}</span>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for using Scrap Connect!</p>
            <p>This is an electronically generated receipt and does not require a signature.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (uri) {
        // Check if sharing is available on the device
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } else {
          Alert.alert('Sharing Not Available', 'PDF generated, but sharing is not available on this device.');
          console.log('PDF saved to:', uri); // Log URI for debugging on devices without sharing
        }
      } else {
          Alert.alert('Error', 'Failed to generate PDF.');
      }
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
      Alert.alert('Error', `Failed to generate receipt: ${error.message}`);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const renderItem = ({ item }) => {
    const data = inputs[item._id] || {};
    return (
      <View style={styles.requestCard}>
        <Text style={styles.cardTitle}>{item.homeownerId?.fullName || 'Homeowner'}</Text>

        <View style={styles.cardDetailRow}>
          <Text style={styles.cardLabel}>Scrap Type:</Text>
          <Text style={styles.cardValue}>{item.scrapType || 'N/A'}</Text>
        </View>
        <View style={styles.cardDetailRow}>
          <Text style={styles.cardLabel}>Weight:</Text>
          <Text style={styles.cardValue}>{item.weight ? `${item.weight} kg` : 'N/A'}</Text>
        </View>
        <View style={styles.cardDetailRow}>
          <Text style={styles.cardLabel}>Request ID:</Text>
          <Text style={styles.cardValue}>{item._id || 'N/A'}</Text>
        </View>
        <View style={styles.cardDetailRow}>
          <Text style={styles.cardLabel}>Homeowner ID:</Text>
          <Text style={styles.cardValue}>
            {item.homeownerId?._id || 'N/A'}
          </Text>
        </View>

        {/* Phone Input Group */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="Enter phone"
            placeholderTextColor={Colors.lightText}
            value={data.phone || item.homeownerId?.phoneNo || item.phoneNumber || ''}
            onChangeText={text => handleInputChange('phone', text, item._id)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Amount Input Group */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Amount to Pay</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="Enter amount"
            placeholderTextColor={Colors.lightText}
            value={data.amount || ''}
            onChangeText={text => handleInputChange('amount', text, item._id)}
            keyboardType="numeric"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.cardButtonContainer}>
          <TouchableOpacity style={styles.payButton} onPress={() => openStk(item)}>
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
          {/* UPDATED: Pass the entire item to handleDownloadReceipt */}
          <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item)}>
            <Text style={styles.buttonText}>Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Fetching collected requests...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchRequests} style={styles.retryButton}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <FakeSTKModal
        visible={stk.visible}
        amount={stk.request ? (inputs[stk.request._id]?.amount || stk.request.currentAmount || '') : ''}
        phoneNumber={stk.request ? (inputs[stk.request._id]?.phone || stk.request.currentPhone || '') : ''}
        onClose={onStkClose}
        onSuccess={onStkSuccess}
      />

      <View style={styles.outerContainer}>
        <Text style={styles.screenTitle}>Collected Requests for Payment</Text>
        <FlatList
          data={collectedRequests}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.requestsListContainer}
          // PULL-TO-REFRESH IMPLEMENTATION (already present and correct in your CODE 1)
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]} // Customize refresh indicator color
              tintColor={Colors.primary} // For iOS
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.noDataView}>
              <Text style={styles.noDataText}>No collected requests found for payment.</Text>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  requestsListContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginVertical: 10,
    padding: 20,
    elevation: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 8,
    width: '100%',
  },
  cardDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
    flex: 1,
    textAlign: 'left',
  },
  cardValue: {
    fontSize: 16,
    color: Colors.text,
    flex: 2,
    textAlign: 'right',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 5,
    fontWeight: '600',
  },
  cardInput: {
    width: '85%',
    padding: 12,
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  receiptButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: Colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: Colors.lightText,
  },
  errorText: {
    color: Colors.error,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noDataText: {
    color: Colors.lightText,
    fontSize: 18,
    textAlign: 'center',
  },
});