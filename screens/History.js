// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet, // Use StyleSheet for better organization
//   useColorScheme,
//   ActivityIndicator, // For loading state
//   RefreshControl, // For pull-to-refresh
//   Alert, // For user feedback
//   Linking, // For making calls
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Define a base URL for your API
// const API_BASE_URL = 'http://192.168.189.119:5000/api/v1';

// // Define a color palette for consistent styling
// const Colors = {
//   backgroundLight: '#f8f9fa',
//   backgroundDark: '#1e1e1e',
//   cardBackground: '#FFFFFF',
//   textLight: '#1e1e1e',
//   textDark: '#f1f1f1',
//   primary: '#007bff', // Blue for active tabs/links
//   secondary: '#6c757d', // Grey for inactive tabs/borders
//   pending: '#ffc107', // Yellow for pending
//   approved: '#28a745', // Green for approved
//   collected: '#17a2b8', // Info blue for collected
//   rejected: '#dc3545', // Red for rejected
//   buttonText: '#fff',
//   shadowColor: '#000',
// };

// // Tabs for filtering requests
// const tabs = ['All', 'Approved', 'Pending', 'Collected', 'Rejected'];

// /**
//  * Renders a single request card based on its status.
//  * Displays different details for pending, approved, collected, and rejected requests.
//  */
// const RequestCard = ({ request, callNumber, themeColors }) => {
//   const { _id, status, requestDate, approvedAt, pickupDate, pickupTime, completedAt, description } = request;
//   const homeownerId = request.homeownerId || 'N/A'; // Assuming homeownerId is on the request
//   const collectionCenter = request.collectionCenter || {}; // Expected populated object or ID
//   const collector = request.collectorId || {}; // Expected populated object or ID (note: changed from .collector to .collectorId to match populate path)

//   // Safely get center details, now expecting 'phoneNo' from backend
//   const centerName = collectionCenter.centerName || collectionCenter._id || 'N/A';
//   const centerPhone = collectionCenter.phoneNo || 'N/A'; // CRITICAL FIX: Access phoneNo
//   const centerId = collectionCenter._id || 'N/A';

//   // Safely get collector details, now expecting 'phoneNo' from backend
//   const collectorFullName = collector.fullName || collector._id || 'N/A'; // 'fullName' is correct
//   const collectorPhone = collector.phoneNo || 'N/A'; // CRITICAL FIX: Access phoneNo
//   const collectorId = collector._id || 'N/A';

//   // Helper function to format dates
//   const formatDate = (dateString) => {
//     return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
//   };

//   // Helper function to format date and time
//   const formatDateTime = (dateString) => {
//     return dateString ? new Date(dateString).toLocaleString() : 'N/A';
//   };

//   return (
//     <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
//       <Text style={[styles.cardTitle, { color: themeColors.text }]}>Request ID: {_id}</Text>

//       {/* Common details for all statuses */}
//       <View style={styles.detailRow}>
//         <Text style={[styles.label, { color: themeColors.lightText }]}>Request Date:</Text>
//         <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(requestDate)}</Text>
//       </View>
//       <View style={styles.detailRow}>
//         <Text style={[styles.label, { color: themeColors.lightText }]}>Status:</Text>
//         <Text
//           style={[
//             styles.statusBadge,
//             status === 'pending' && { backgroundColor: Colors.pending },
//             status === 'approved' && { backgroundColor: Colors.approved },
//             status === 'collected' && { backgroundColor: Colors.collected },
//             status === 'rejected' && { backgroundColor: Colors.rejected },
//           ]}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </Text>
//       </View>

//       {/* Status-specific details */}
//       {status === 'pending' && (
//         <View style={styles.statusSection}>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center ID:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{centerId}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
//             <TouchableOpacity onPress={() => callNumber(centerPhone)}>
//               <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
//                 {centerPhone}
//               </Text>
//             </TouchableOpacity>
//           </View>
//            {request.description && (
//             <View style={styles.detailRow}>
//               <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
//               <Text style={[styles.value, { color: themeColors.text }]}>{request.description}</Text>
//             </View>
//           )}
//         </View>
//       )}

//       {status === 'approved' && (
//         <View style={styles.statusSection}>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
//             <TouchableOpacity onPress={() => callNumber(centerPhone)}>
//               <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
//                 {centerPhone}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Approved At:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(approvedAt)}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Pickup Date:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{pickupDate || 'N/A'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Pickup Time:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{pickupTime || 'N/A'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Collector:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{collectorFullName}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Collector Phone:</Text>
//             <TouchableOpacity onPress={() => callNumber(collectorPhone)}>
//               <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
//                 {collectorPhone}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {request.description && (
//             <View style={styles.detailRow}>
//               <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
//               <Text style={[styles.value, { color: themeColors.text }]}>{request.description}</Text>
//             </View>
//           )}
//         </View>
//       )}

//       {status === 'collected' && (
//         <View style={styles.statusSection}>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Collector:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{collectorFullName}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Collector Phone:</Text>
//             <TouchableOpacity onPress={() => callNumber(collectorPhone)}>
//               <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
//                 {collectorPhone}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Collected At:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(completedAt)}</Text>
//           </View>
//            {request.description && (
//             <View style={styles.detailRow}>
//               <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
//               <Text style={[styles.value, { color: themeColors.text }]}>{request.description}</Text>
//             </View>
//           )}
//         </View>
//       )}

//       {status === 'rejected' && (
//         <View style={styles.statusSection}>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center ID:</Text>
//             <Text style={[styles.value, { color: themeColors.text }]}>{centerId}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
//             <TouchableOpacity onPress={() => callNumber(centerPhone)}>
//               <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
//                 {centerPhone}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {request.description && (
//             <View style={styles.detailRow}>
//               <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
//               <Text style={[styles.value, { color: themeColors.text }]}>{request.description}</Text>
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const RequestHistory = () => {
//   const [activeTab, setActiveTab] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [requests, setRequests] = useState([]); // State to hold fetched requests
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [homeownerId, setHomeownerId] = useState(null); // Homeowner ID from AsyncStorage
//   const [refreshing, setRefreshing] = useState(false); // Refresh control state

//   const scheme = useColorScheme();
//   const themeBg = scheme === 'dark' ? Colors.backgroundDark : Colors.backgroundLight;
//   const textColor = scheme === 'dark' ? Colors.textDark : Colors.textLight;
//   const cardBackground = scheme === 'dark' ? '#333' : Colors.cardBackground; // Darker card for dark mode
//   const currentThemeColors = {
//     background: themeBg,
//     text: textColor,
//     cardBackground: cardBackground,
//     lightText: scheme === 'dark' ? Colors.lightText : Colors.secondary,
//     primary: Colors.primary,
//   };

//   // Function to fetch requests from the backend
//   const fetchHomeownerRequests = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     setRefreshing(true); // Start refreshing indicator

//     try {
//       const id = await AsyncStorage.getItem('userId'); // Assuming userId is stored here
//       const token = await AsyncStorage.getItem('token'); // Assuming token is stored here

//       if (!id) {
//         Alert.alert('Error', 'Homeowner ID not found. Please log in again.');
//         setError('Homeowner ID not found.');
//         setLoading(false);
//         setRefreshing(false);
//         return;
//       }
//       setHomeownerId(id);

//       const response = await axios.get(`${API_BASE_URL}/requests/user/${id}/list/`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : undefined, // Include token if available
//         },
//       });

//       setRequests(response.data.requests || []); // Assuming response.data.requests contains the array
//     } catch (err) {
//       console.error('Error fetching homeowner requests:', err.response?.data || err.message);
//       setError('Failed to fetch requests. Please check your network or try again.');
//       Alert.alert('Error', 'Failed to fetch requests.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false); // Stop refreshing indicator
//     }
//   }, []);

//   // Fetch requests on component mount and when refresh is triggered
//   useEffect(() => {
//     fetchHomeownerRequests();
//   }, [fetchHomeownerRequests]);

//   // Function to handle making a phone call
//   const callNumber = (phoneNumber) => {
//     if (!phoneNumber || phoneNumber === 'N/A') {
//       Alert.alert('Invalid Number', 'Phone number not available.');
//       return;
//     }
//     const telUrl = `tel:${phoneNumber}`;
//     Linking.canOpenURL(telUrl)
//       .then((supported) => {
//         if (!supported) {
//           Alert.alert('Call Failed', `Phone calls are not supported on this device or the number is invalid: ${phoneNumber}`);
//         } else {
//           return Linking.openURL(telUrl);
//         }
//       })
//       .catch((err) => console.error('An error occurred trying to open the dialer', err));
//   };

//   // Filter requests based on active tab and search query
//   const filteredByStatus = activeTab === 'All'
//     ? requests
//     : requests.filter(req => req.status && req.status.toLowerCase() === activeTab.toLowerCase()); // Ensure status is compared case-insensitively

//   const filteredRequests = filteredByStatus.filter(req =>
//     (req._id && req._id.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (req.scrapType && req.scrapType.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (req.location && req.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (req.fullName && req.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || // Homeowner's name
//     (req.phoneNumber && req.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())) || // Homeowner's phone
//     (req.collectionCenter && req.collectionCenter.centerName && req.collectionCenter.centerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (req.collectionCenter && req.collectionCenter.phoneNo && req.collectionCenter.phoneNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) || // Search by center phoneNo
//     (req.collectorId && req.collectorId.fullName && req.collectorId.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || // Search by collector fullName
//     (req.collectorId && req.collectorId.phoneNo && req.collectorId.phoneNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) // Search by collector phoneNo
//   );

//   if (loading) {
//     return (
//       <View style={[styles.centeredView, { backgroundColor: currentThemeColors.background }]}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//         <Text style={[styles.loadingText, { color: currentThemeColors.lightText }]}>Loading requests...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.centeredView, { backgroundColor: currentThemeColors.background }]}>
//         <Text style={[styles.errorText, { color: Colors.rejected }]}>{error}</Text>
//         <TouchableOpacity onPress={fetchHomeownerRequests} style={styles.retryButton}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: currentThemeColors.background }]}>
//       <Text style={[styles.screenHeader, { color: currentThemeColors.text }]}>Your Request History</Text>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {tabs.map(tab => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab)}
//             style={[
//               styles.tabButton,
//               { backgroundColor: activeTab.toLowerCase() === tab.toLowerCase() ? Colors.primary : currentThemeColors.cardBackground },
//               activeTab.toLowerCase() === tab.toLowerCase() ? null : { borderColor: Colors.secondary, borderWidth: 1 } // Add border to inactive tabs
//             ]}
//           >
//             <Text style={[
//               styles.tabButtonText,
//               { color: activeTab.toLowerCase() === tab.toLowerCase() ? Colors.buttonText : currentThemeColors.text }
//             ]}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Search Input */}
//       <View style={[styles.searchInputContainer, { backgroundColor: currentThemeColors.cardBackground }]}>
//         <TextInput
//           placeholder="Search requests..."
//           placeholderTextColor={currentThemeColors.lightText}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           style={[styles.searchInput, { color: currentThemeColors.text }]}
//         />
//       </View>

//       {/* Requests List */}
//       <FlatList
//         data={filteredRequests}
//         keyExtractor={item => item._id} // Use backend _id as key
//         renderItem={({ item }) => <RequestCard request={item} callNumber={callNumber} themeColors={currentThemeColors} />}
//         contentContainerStyle={styles.listContentContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchHomeownerRequests}
//             colors={[Colors.primary]}
//             tintColor={Colors.primary}
//           />
//         }
//         ListEmptyComponent={() => (
//           <View style={styles.emptyListContainer}>
//             <Text style={[styles.emptyListText, { color: currentThemeColors.lightText }]}>
//               No {activeTab.toLowerCase()} requests found.
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   screenHeader: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 15,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 25,
//     minWidth: 80,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 4,
//     shadowColor: Colors.shadowColor,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   tabButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   searchInputContainer: {
//     marginHorizontal: 16,
//     marginBottom: 15,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     shadowColor: Colors.shadowColor,
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   searchInput: {
//     fontSize: 16,
//     height: 40,
//   },
//   listContentContainer: {
//     paddingBottom: 20,
//     paddingHorizontal: 10,
//   },
//   card: {
//     padding: 18,
//     marginVertical: 8,
//     marginHorizontal: 6,
//     borderRadius: 15,
//     shadowColor: Colors.shadowColor,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//     elevation: 6,
//     alignItems: 'flex-start', // Align content to the left within the card
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.secondary,
//     paddingBottom: 5,
//     width: '100%',
//     textAlign: 'center', // Centered title within the card
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 6,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     flex: 1,
//     textAlign: 'left',
//   },
//   value: {
//     fontSize: 14,
//     flex: 2,
//     textAlign: 'right',
//   },
//   linkText: {
//     textDecorationLine: 'underline',
//   },
//   statusBadge: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     fontWeight: 'bold',
//     color: Colors.buttonText,
//     fontSize: 12,
//     textAlign: 'center',
//     minWidth: 80,
//   },
//   statusSection: {
//     marginTop: 10,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: Colors.border,
//     width: '100%',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   retryButton: {
//     backgroundColor: Colors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     marginTop: 15,
//   },
//   buttonText: {
//     color: Colors.buttonText,
//     fontWeight: 'bold',
//   },
//   emptyListContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyListText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default RequestHistory;

//test for payment
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet, // Use StyleSheet for better organization
  useColorScheme,
  ActivityIndicator, // For loading state
  RefreshControl, // For pull-to-refresh
  Alert, // For user feedback
  Linking, // For making calls
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define a base URL for your API
const API_BASE_URL = 'http://192.168.189.119:5000/api/v1';

// Define a color palette for consistent styling
const Colors = {
  backgroundLight: '#f8f9fa',
  backgroundDark: '#1e1e1e',
  cardBackground: '#FFFFFF',
  textLight: '#1e1e1e',
  textDark: '#f1f1f1',
  primary: '#007bff', // Blue for active tabs/links
  secondary: '#6c757d', // Grey for inactive tabs/borders
  pending: '#ffc107', // Yellow for pending
  approved: '#28a745', // Green for approved
  collected: '#17a2b8', // Info blue for collected
  rejected: '#dc3545', // Red for rejected
  buttonText: '#fff',
  shadowColor: '#000',
  paymentBadge: '#6f42c1', // Purple for payments
};

// Tabs for filtering requests and displaying payments
const tabs = ['All', 'Approved', 'Pending', 'Collected', 'Rejected', 'Payments']; // Added 'Payments' tab

/**
 * Renders a single request card based on its status.
 * Displays different details for pending, approved, collected, and rejected requests.
 */
const RequestCard = ({ request, callNumber, themeColors }) => {
  const { _id, status, requestDate, approvedAt, pickupDate, pickupTime, completedAt, description } = request;
  const collectionCenter = request.collectionCenter || {}; // Expected populated object or ID
  const collector = request.collectorId || {}; // Expected populated object or ID

  // Safely get center details, now expecting 'phoneNo' from backend
  const centerName = collectionCenter.centerName || collectionCenter._id || 'N/A';
  const centerPhone = collectionCenter.phoneNo || 'N/A';
  const centerId = collectionCenter._id || 'N/A';

  // Safely get collector details, now expecting 'phoneNo' from backend
  const collectorFullName = collector.fullName || collector._id || 'N/A';
  const collectorPhone = collector.phoneNo || 'N/A';
  const collectorId = collector._id || 'N/A';

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : 'N/A';
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: themeColors.text }]}>Request ID: {_id}</Text>

      {/* Common details for all statuses */}
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Request Date:</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(requestDate)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Status:</Text>
        <Text
          style={[
            styles.statusBadge,
            status === 'pending' && { backgroundColor: Colors.pending },
            status === 'approved' && { backgroundColor: Colors.approved },
            status === 'collected' && { backgroundColor: Colors.collected },
            status === 'rejected' && { backgroundColor: Colors.rejected },
          ]}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>

      {/* Status-specific details */}
      {status === 'pending' && (
        <View style={styles.statusSection}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center ID:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{centerId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
            <TouchableOpacity onPress={() => callNumber(centerPhone)}>
              <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
                {centerPhone}
              </Text>
            </TouchableOpacity>
          </View>
           {description && (
            <View style={styles.detailRow}>
              <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>{description}</Text>
            </View>
          )}
        </View>
      )}

      {status === 'approved' && (
        <View style={styles.statusSection}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
            <TouchableOpacity onPress={() => callNumber(centerPhone)}>
              <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
                {centerPhone}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Approved At:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(approvedAt)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Pickup Date:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{pickupDate || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Pickup Time:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{pickupTime || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Collector:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{collectorFullName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Collector Phone:</Text>
            <TouchableOpacity onPress={() => callNumber(collectorPhone)}>
              <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
                {collectorPhone}
              </Text>
            </TouchableOpacity>
          </View>
          {description && (
            <View style={styles.detailRow}>
              <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>{description}</Text>
            </View>
          )}
        </View>
      )}

      {status === 'collected' && (
        <View style={styles.statusSection}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Collector:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{collectorFullName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Collector Phone:</Text>
            <TouchableOpacity onPress={() => callNumber(collectorPhone)}>
              <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
                {collectorPhone}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Collected At:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(completedAt)}</Text>
          </View>
           {description && (
            <View style={styles.detailRow}>
              <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>{description}</Text>
            </View>
          )}
        </View>
      )}

      {status === 'rejected' && (
        <View style={styles.statusSection}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Name:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{centerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center ID:</Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{centerId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: themeColors.lightText }]}>Center Phone:</Text>
            <TouchableOpacity onPress={() => callNumber(centerPhone)}>
              <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
                {centerPhone}
              </Text>
            </TouchableOpacity>
          </View>
          {description && (
            <View style={styles.detailRow}>
              <Text style={[styles.label, { color: themeColors.lightText }]}>Description:</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>{description}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

/**
 * Renders a single payment card.
 */
const PaymentCard = ({ payment, callNumber, themeColors }) => {
  const { _id, requestId, collectorId, amount, paidAt, phoneNumber } = payment; // phoneNumber here is from the payment record itself
  const collectorFullName = collectorId ? collectorId.fullName || collectorId._id || 'N/A' : 'N/A';
  const collectorPhone = collectorId ? collectorId.phoneNo || 'N/A' : 'N/A'; // From populated collector object

  const formatDateTime = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : 'N/A';
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: Colors.paymentBadge }]}>Payment ID: {_id}</Text> {/* Using a distinct color for payment title */}

      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Request ID:</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>{requestId || 'N/A'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Collector:</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>{collectorFullName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Collector Phone:</Text>
        <TouchableOpacity onPress={() => callNumber(collectorPhone)}>
          <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
            {collectorPhone}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Amount Paid:</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>KES {amount ? amount.toFixed(2) : 'N/A'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Paid At:</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>{formatDateTime(paidAt)}</Text>
      </View>
      {/* The phoneNumber on the payment record itself */}
      <View style={styles.detailRow}>
        <Text style={[styles.label, { color: themeColors.lightText }]}>Recipient Phone:</Text>
        <TouchableOpacity onPress={() => callNumber(phoneNumber)}>
          <Text style={[styles.value, styles.linkText, { color: themeColors.primary }]}>
            {phoneNumber || 'N/A'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const RequestHistory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([]); // State to hold fetched requests
  const [payments, setPayments] = useState([]); // NEW: State to hold fetched payments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [homeownerId, setHomeownerId] = useState(null); // Homeowner ID from AsyncStorage
  const [refreshing, setRefreshing] = useState(false); // Refresh control state

  const scheme = useColorScheme();
  const themeBg = scheme === 'dark' ? Colors.backgroundDark : Colors.backgroundLight;
  const textColor = scheme === 'dark' ? Colors.textDark : Colors.textLight;
  const cardBackground = scheme === 'dark' ? '#333' : Colors.cardBackground; // Darker card for dark mode
  const currentThemeColors = {
    background: themeBg,
    text: textColor,
    cardBackground: cardBackground,
    lightText: scheme === 'dark' ? Colors.lightText : Colors.secondary,
    primary: Colors.primary,
  };

  // Function to fetch requests from the backend
  const fetchHomeownerRequests = useCallback(async (id, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/requests/user/${id}/list/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setRequests(response.data.requests || []);
    } catch (err) {
      console.error('Error fetching homeowner requests:', err.response?.data || err.message);
      setError('Failed to fetch requests. Please check your network or try again.');
      Alert.alert('Error', 'Failed to fetch requests.');
      throw err; // Re-throw to be caught by overall fetcher
    }
  }, []);

  // NEW: Function to fetch payments from the backend
  const fetchHomeownerPayments = useCallback(async (id, token) => {
    try {
      // Ensure this endpoint matches your backend route for payments
      const response = await axios.get(`${API_BASE_URL}/payments/user/${id}/list/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setPayments(response.data.payments || []); // Assuming response.data.payments contains the array
    } catch (err) {
      console.error('Error fetching homeowner payments:', err.response?.data || err.message);
      setError('Failed to fetch payments. Please check your network or try again.');
      Alert.alert('Error', 'Failed to fetch payments.');
      throw err; // Re-throw to be caught by overall fetcher
    }
  }, []);

  // Combined fetcher for initial load and refresh
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRefreshing(true);

    try {
      const id = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      if (!id) {
        Alert.alert('Error', 'Homeowner ID not found. Please log in again.');
        setError('Homeowner ID not found.');
        return;
      }
      setHomeownerId(id);

      // Fetch both requests and payments concurrently
      await Promise.all([
        fetchHomeownerRequests(id, token),
        fetchHomeownerPayments(id, token),
      ]);

    } catch (err) {
      // Error is already set by individual fetchers, but ensure loading/refreshing stops
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchHomeownerRequests, fetchHomeownerPayments]);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Function to handle making a phone call
  const callNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber === 'N/A') {
      Alert.alert('Invalid Number', 'Phone number not available.');
      return;
    }
    const telUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(telUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Call Failed', `Phone calls are not supported on this device or the number is invalid: ${phoneNumber}`);
        } else {
          return Linking.openURL(telUrl);
        }
      })
      .catch((err) => console.error('An error occurred trying to open the dialer', err));
  };

  // Filter logic based on active tab
  const getFilteredData = () => {
    if (activeTab === 'Payments') {
      return payments.filter(payment =>
        (payment._id && payment._id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (payment.requestId && payment.requestId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (payment.collectorId && payment.collectorId.fullName && payment.collectorId.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (payment.collectorId && payment.collectorId.phoneNo && payment.collectorId.phoneNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (payment.amount && payment.amount.toString().includes(searchQuery.toLowerCase()))
      );
    } else {
      const filteredByStatus = activeTab === 'All'
        ? requests
        : requests.filter(req => req.status && req.status.toLowerCase() === activeTab.toLowerCase());

      return filteredByStatus.filter(req =>
        (req._id && req._id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.scrapType && req.scrapType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.location && req.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.fullName && req.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || // Homeowner's name
        (req.phoneNumber && req.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())) || // Homeowner's phone
        (req.collectionCenter && req.collectionCenter.centerName && req.collectionCenter.centerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.collectionCenter && req.collectionCenter.phoneNo && req.collectionCenter.phoneNo.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.collectorId && req.collectorId.fullName && req.collectorId.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (req.collectorId && req.collectorId.phoneNo && req.collectorId.phoneNo.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  };

  const currentData = getFilteredData();

  if (loading) {
    return (
      <View style={[styles.centeredView, { backgroundColor: currentThemeColors.background }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[styles.loadingText, { color: currentThemeColors.lightText }]}>Loading history...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centeredView, { backgroundColor: currentThemeColors.background }]}>
        <Text style={[styles.errorText, { color: Colors.rejected }]}>{error}</Text>
        <TouchableOpacity onPress={fetchAllData} style={styles.retryButton}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentThemeColors.background }]}>
      <Text style={[styles.screenHeader, { color: currentThemeColors.text }]}>Your History</Text> {/* Generic header */}

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              setSearchQuery(''); // Clear search on tab change for cleaner UX
            }}
            style={[
              styles.tabButton,
              { backgroundColor: activeTab.toLowerCase() === tab.toLowerCase() ? Colors.primary : currentThemeColors.cardBackground },
              activeTab.toLowerCase() === tab.toLowerCase() ? null : { borderColor: Colors.secondary, borderWidth: 1 } // Add border to inactive tabs
            ]}
          >
            <Text style={[
              styles.tabButtonText,
              { color: activeTab.toLowerCase() === tab.toLowerCase() ? Colors.buttonText : currentThemeColors.text }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Input */}
      <View style={[styles.searchInputContainer, { backgroundColor: currentThemeColors.cardBackground }]}>
        <TextInput
          placeholder={`Search ${activeTab.toLowerCase()}...`} // Dynamic placeholder
          placeholderTextColor={currentThemeColors.lightText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { color: currentThemeColors.text }]}
        />
      </View>

      {/* Requests/Payments List */}
      <FlatList
        data={currentData}
        keyExtractor={item => item._id}
        renderItem={({ item }) =>
          activeTab === 'Payments' ? (
            <PaymentCard payment={item} callNumber={callNumber} themeColors={currentThemeColors} />
          ) : (
            <RequestCard request={item} callNumber={callNumber} themeColors={currentThemeColors} />
          )
        }
        contentContainerStyle={styles.listContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAllData} // Refresh all data
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text style={[styles.emptyListText, { color: currentThemeColors.lightText }]}>
              No {activeTab.toLowerCase()} history found.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  screenHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchInputContainer: {
    marginHorizontal: 16,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    fontSize: 16,
    height: 40,
  },
  listContentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 15,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    alignItems: 'flex-start', // Align content to the left within the card
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    paddingBottom: 5,
    width: '100%',
    textAlign: 'center', // Centered title within the card
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'left',
  },
  value: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontWeight: 'bold',
    color: Colors.buttonText,
    fontSize: 12,
    textAlign: 'center',
    minWidth: 80,
  },
  statusSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RequestHistory;
