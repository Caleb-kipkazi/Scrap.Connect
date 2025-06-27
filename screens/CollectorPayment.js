// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// export default function CollectorPayment() {
//   const [approvedRequests, setApprovedRequests] = useState([]);
//   const [inputs, setInputs] = useState({}); // Holds phone & amount for each request

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const collectorId = await AsyncStorage.getItem('userId');

//         const res = await axios.get(`http://10.71.125.67:5000/api/v1/requests/collector/${collectorId}/approved`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setApprovedRequests(res.data.requests);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch approved requests.');
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleInputChange = (field, value, id) => {
//     setInputs((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       }
//     }));
//   };

//   const handlePay = async (request) => {
//     const data = inputs[request._id];
//     if (!data || !data.phone || !data.amount) {
//       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
//     }

//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.post(
//         'http://10.71.125.67:5000/api/v1/payments',
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

//   const handleDownloadReceipt = async (requestId) => {
//     Alert.alert("Receipt Download", `Trigger download for receipt of request ${requestId}`);
//     // Backend should expose /payments/:requestId/receipt endpoint that returns PDF or text receipt
//     // Use FileSystem or Sharing module to download/view
//   };

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
//           onChangeText={(text) => handleInputChange('phone', text, item._id)}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.inputCell}
//           placeholder="Amount"
//           placeholderTextColor="#aaa"
//           value={data.amount || ''}
//           onChangeText={(text) => handleInputChange('amount', text, item._id)}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
//           <Text style={styles.buttonText}>Pay</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
//           <Text style={styles.buttonText}>Receipt</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <ScrollView horizontal>
//       <View style={styles.container}>
//         <View style={[styles.row, styles.headerRow]}>
//           <Text style={styles.header}>Homeowner</Text>
//           <Text style={styles.header}>Homeowner ID</Text>
//           <Text style={styles.header}>Request ID</Text>
//           <Text style={styles.header}>Scrap Type</Text>
//           <Text style={styles.header}>Weight</Text>
//           <Text style={styles.header}>Phone</Text>
//           <Text style={styles.header}>Amount</Text>
//           <Text style={styles.header}>Pay</Text>
//           <Text style={styles.header}>Receipt</Text>
//         </View>

//         <FlatList
//           data={approvedRequests}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const DARK_GREEN = '#003920';
// const GREEN = '#00C851';
// const WHITE = '#FFFFFF';

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



//working code

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
//   const [inputs, setInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

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
//         `http://192.168.137.246:5000/api/v1/requests/collector/${collectorId}/list/`,
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

//   const handlePay = async request => {
//     const data = inputs[request._id];
//     if (!data || !data.phone || !data.amount) {
//       return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
//     }

//     const amountNum = parseFloat(data.amount);
//     if (isNaN(amountNum) || amountNum <= 0) {
//         return Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
//     }

//     try {
//       const token = await AsyncStorage.getItem('token');
//       await axios.post(
//         'http://192.168.137.246:5000/api/v1/payment/send',
//         {
//           requestId: request._id,
//           homeownerId: request.homeownerId,
//           amount: amountNum,
//           phoneNumber: data.phone,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       Alert.alert('Success', 'Payment successful.');
//       setCollectedRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));
//     } catch (err) {
//       console.error('Payment failed:', err.response?.data || err.message);
//       Alert.alert('Error', `Payment failed: ${err.response?.data?.message || 'Please try again.'}`);
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
//           <Text style={styles.cardLabel}>Homeowner ID:</Text>
//           <Text style={styles.cardValue}>{item.homeownerId || 'N/A'}</Text>
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
//           <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
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
//     <View style={styles.outerContainer}>
//       <Text style={styles.screenTitle}>Collected Requests for Payment</Text>
//       <FlatList // FlatList now handles the main vertical scrolling
//         data={collectedRequests}
//         keyExtractor={item => item._id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.requestsListContainer} // Styles for the FlatList content
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[Colors.primary]}
//             tintColor={Colors.primary}
//           />
//         }
//         ListEmptyComponent={() => ( // Component to show when list is empty
//           <View style={styles.noDataView}>
//             <Text style={styles.noDataText}>No collected requests found for payment.</Text>
//           </View>
//         )}
//       />
//     </View>
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



//test for pay
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

export default function CollectorPayment() {
  const [collectedRequests, setCollectedRequests] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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
        `http://192.168.137.246:5000/api/v1/requests/collector/${collectorId}/list/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const filteredRequests = res.data.requests.filter(
        (request) => request.status === 'collected'
      );
      setCollectedRequests(filteredRequests);
      console.log("Fetched and filtered collected requests:", filteredRequests);
    } catch (err) {
      console.error('Error fetching collected requests:', err);
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

  const handlePay = async request => {
    const data = inputs[request._id];
    if (!data || !data.phone || !data.amount) {
      return Alert.alert('Missing Fields', 'Enter phone and amount to pay.');
    }

    const amountNum = parseFloat(data.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
        return Alert.alert('Invalid Amount', 'Please enter a valid positive amount.');
    }

    // --- Added console.log to show payload being sent ---
    const payload = {
        requestId: request._id,
        homeownerId: request.homeownerId,
        amount: amountNum,
        phoneNumber: data.phone,
    };
    console.log("Attempting to send payment with payload:", payload);

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://192.168.137.246:5000/api/v1/payment/send',
        payload, // Use the payload variable
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Payment successful.');
      setCollectedRequests(prevRequests => prevRequests.filter(req => req._id !== request._id));
    } catch (err) {
      console.error('Payment failed:', err.response?.data || err.message);
      Alert.alert('Error', `Payment failed: ${err.response?.data?.message || 'Please try again.'}`);
    }
  };

  const handleDownloadReceipt = requestId => {
    Alert.alert('Receipt Download', `Trigger download for receipt of request ${requestId}`);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  // --- renderItem now renders a stylish card for each request ---
  const renderItem = ({ item }) => {
    const data = inputs[item._id] || {};
    return (
      <View style={styles.requestCard}>
        <Text style={styles.cardTitle}>{item.fullName || 'Homeowner'}</Text>

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
          <Text style={styles.cardValue}>{item.homeownerId || 'N/A'}</Text>
        </View>

        {/* Phone Input Group */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="Enter phone"
            placeholderTextColor={Colors.lightText}
            value={data.phone || item.phoneNumber || ''}
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
          <TouchableOpacity style={styles.payButton} onPress={() => handlePay(item)}>
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.receiptButton} onPress={() => handleDownloadReceipt(item._id)}>
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
    <View style={styles.outerContainer}>
      <Text style={styles.screenTitle}>Collected Requests for Payment</Text>
      <FlatList // FlatList now handles the main vertical scrolling
        data={collectedRequests}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.requestsListContainer} // Styles for the FlatList content
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={() => ( // Component to show when list is empty
          <View style={styles.noDataView}>
            <Text style={styles.noDataText}>No collected requests found for payment.</Text>
          </View>
        )}
      />
    </View>
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
    paddingHorizontal: 15, // Padding around the list of cards
    paddingBottom: 20, // Space at the bottom of the list
  },
  requestCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginVertical: 10,
    padding: 20,
    elevation: 8, // Stronger shadow for Android
    shadowColor: Colors.text, // Darker shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center', // Center content horizontally within the card
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary, // Green title for emphasis
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 8,
    width: '100%', // Ensure title spans full width for centering
  },
  cardDetailRow: {
    flexDirection: 'row', // Label and value side-by-side
    justifyContent: 'space-between', // Distribute space between them
    width: '100%', // Take full width of card
    marginBottom: 8,
    paddingHorizontal: 10, // Indent details slightly
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
    flex: 1, // Allow label to take available space
    textAlign: 'left', // Align labels to the left
  },
  cardValue: {
    fontSize: 16,
    color: Colors.text,
    flex: 2, // Allow value to take more space
    textAlign: 'right', // Align values to the right
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center', // Center label and input within the group
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 5,
    fontWeight: '600',
  },
  cardInput: {
    width: '85%', // Slightly less than 100% to give some horizontal padding
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
    flexDirection: 'row', // Buttons side by side
    justifyContent: 'space-around', // Space between buttons
    width: '100%',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // More rounded for a pill-like shape
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Take equal space with receipt button
    marginHorizontal: 5,
    shadowColor: Colors.primary, // Add shadow with primary color
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
    shadowColor: Colors.secondary, // Add shadow with secondary color
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
    flex: 1, // Ensures it takes available space in FlatList
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
