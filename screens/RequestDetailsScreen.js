// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons'; // Added MaterialIcons for back button

// // Keep dummyData consistent, or fetch from backend endpoint
// const dummyData = [
//   {
//     id: 'REQ123',
//     name: 'John Doe',
//     phone: '0712345678',
//     location: 'Nairobi',
//     pickupDate: '2025-06-15',
//     scrapType: 'Metal',
//     weight: '15kg',
//     image: 'https://via.placeholder.com/200x150', // Larger image for details
//     status: 'pending',
//     scrapCentre: 'Baraton Scrap Yard',
//     description: 'Mixed metal scrap from construction site. Includes old pipes, iron rods, and aluminum cans. Ready for immediate pickup, preferably between 9 AM and 1 PM.',
//   },
//   {
//     id: 'REQ124',
//     name: 'Jane Smith',
//     phone: '0723456789',
//     location: 'Eldoret',
//     pickupDate: '2025-06-16',
//     scrapType: 'Plastic',
//     weight: '10kg',
//     image: 'https://via.placeholder.com/200x150',
//     status: 'pending',
//     scrapCentre: 'Kisumu Scrap Yard',
//     description: 'Various plastic bottles and containers (PET and HDPE). Flexible pickup time, any day next week is fine.',
//   },
//   {
//     id: 'REQ125',
//     name: 'Alice Johnson',
//     phone: '0700112233',
//     location: 'Nakuru',
//     pickupDate: '2025-06-17',
//     scrapType: 'Paper',
//     weight: '5kg',
//     image: 'https://via.placeholder.com/200x150',
//     status: 'pending',
//     scrapCentre: 'Baraton Scrap Yard',
//     description: 'Old newspapers and cardboard boxes. All neatly bundled. Needs to be picked up by evening on the 17th.',
//   },
//   {
//     id: 'REQ126',
//     name: 'Bob Williams',
//     phone: '0788990011',
//     location: 'Nairobi',
//     pickupDate: '2025-06-18',
//     scrapType: 'E-waste',
//     weight: '20kg',
//     image: 'https://via.placeholder.com/200x150',
//     status: 'pending',
//     scrapCentre: 'Baraton Scrap Yard',
//     description: 'Old computer parts and small electronics (keyboard, mouse, old phone). Fragile, requires careful handling and specialized disposal.',
//   },
// ];

// const Colors = {
//     primary: '#004225', // Dark Green
//     secondary: '#3CB371', // Medium Green
//     accent: '#FFD700', // Gold/Yellow for highlights
//     white: '#FFFFFF',
//     lightGray: '#F0F0F0',
//     mediumGray: '#CCCCCC',
//     darkGray: '#333333',
//     red: '#DC3545', // Danger
//     green: '#28A745', // Success
//     blue: '#007BFF', // Info
// };

// export default function RequestDetailsScreen({ route, navigation }) {
//   const { requestId, allRequests } = route.params; // Get the ID and potentially allRequests from navigation
//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false); // For approve/reject buttons

//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       setLoading(true);
//       try {
//         // Option 1: Find from passed `allRequests` array (good for small datasets or if data is already loaded)
//         const foundRequest = allRequests.find(req => req.id === requestId);
        
//         // ✅ BACKEND INTEGRATION - Option 2: Make a direct API call for details (more robust)
//         /*
//         // If you don't pass `allRequests`, you'd do:
//         // const response = await fetch(`http://your-backend-url/api/v1/requests/${requestId}`, {
//         //   headers: { Authorization: `Bearer ${yourAuthToken}` },
//         // });
//         // const data = await response.json();
//         // const foundRequest = data.request; // Adjust based on your API response structure
//         */

//         await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
//         if (foundRequest) {
//           setRequest(foundRequest);
//         } else {
//           Alert.alert("Error", "Request not found.");
//           navigation.goBack(); // Go back if request not found
//         }
//       } catch (error) {
//         console.error("Failed to fetch request details:", error);
//         Alert.alert("Error", "Could not load request details.");
//         navigation.goBack();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequestDetails();
//   }, [requestId, allRequests, navigation]);

//   const handleApproval = async (decision) => {
//     Alert.alert(
//       "Confirm Action",
//       `Are you sure you want to ${decision} this request?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Yes",
//           onPress: async () => {
//             setIsProcessing(true);
//             try {
//               // ✅ BACKEND INTEGRATION - Replace with your actual backend call
//               // Example: Assuming an API endpoint for updating request status
//               /*
//               const response = await fetch(`http://your-backend-url/api/v1/requests/${request.id}/status`, {
//                 method: 'PUT', // Or POST, depending on your API
//                 headers: {
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${yourAuthToken}`, // Replace with actual token
//                 },
//                 body: JSON.stringify({ status: decision === 'approve' ? 'approved' : 'rejected' }),
//               });
//               const result = await response.json();

//               if (response.ok) {
//                 setRequest(prevReq => ({ ...prevReq, status: decision === 'approve' ? 'approved' : 'rejected' }));
//                 Alert.alert("Success", `Request ${request.id} ${decision}d.`);
//                 // OPTIONAL: If you want to refresh the list on the previous screen:
//                 // navigation.goBack() will go back, but doesn't auto-refresh.
//                 // You might need a context API or an event emitter for complex refreshes.
//                 // For simplicity, we just update local state and let the user navigate back.
//               } else {
//                 Alert.alert("Error", result.message || "Failed to update request.");
//               }
//               */

//               // Simulate success for dummy data
//               await new Promise(resolve => setTimeout(resolve, 500));
//               setRequest(prevReq => ({ ...prevReq, status: decision === 'approve' ? 'approved' : 'rejected' }));
//               Alert.alert("Success", `Request ${request.id} ${decision}d.`);

//             } catch (error) {
//               console.error('Approval error:', error);
//               Alert.alert("Error", "Failed to communicate with server.");
//             } finally {
//               setIsProcessing(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   if (loading || !request) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//         <Text style={styles.loadingText}>Loading request details...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header Bar */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Request Details ({request.id})</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Homeowner & Pickup Information</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><FontAwesome name="user" size={16} color={Colors.primary} /> Homeowner:</Text>
//             <Text style={styles.detailValue}>{request.name}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><FontAwesome name="phone" size={16} color={Colors.primary} /> Phone:</Text>
//             <Text style={styles.detailValue}>{request.phone}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><MaterialIcons name="location-on" size={16} color={Colors.primary} /> Location:</Text>
//             <Text style={styles.detailValue}>{request.location}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><FontAwesome name="calendar" size={16} color={Colors.primary} /> Pickup Date:</Text>
//             <Text style={styles.detailValue}>{request.pickupDate}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Scrap Details</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><MaterialIcons name="recycling" size={16} color={Colors.primary} /> Scrap Type:</Text>
//             <Text style={styles.detailValue}>{request.scrapType}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}><FontAwesome name="balance-scale" size={16} color={Colors.primary} /> Estimated Weight:</Text>
//             <Text style={styles.detailValue}>{request.weight}</Text>
//           </View>
//           {request.description && (
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}><MaterialIcons name="description" size={16} color={Colors.primary} /> Description:</Text>
//               <Text style={styles.detailValue}>{request.description}</Text>
//             </View>
//           )}
//           {request.image && (
//             <View style={styles.imageContainer}>
//               <Text style={styles.detailLabel}>Scrap Image:</Text>
//               <Image source={{ uri: request.image }} style={styles.scrapImage} />
//             </View>
//           )}
//         </View>

//         <View style={[styles.statusContainer, { backgroundColor: request.status === 'approved' ? Colors.green + 'BB' : request.status === 'rejected' ? Colors.red + 'BB' : Colors.blue + 'BB' }]}>
//             <Text style={styles.statusText}>Current Status: {request.status ? request.status.toUpperCase() : 'PENDING'}</Text>
//         </View>

//       </ScrollView>

//       {/* Action Buttons at the bottom */}
//       <View style={styles.bottomActions}>
//         <TouchableOpacity
//           style={[styles.actionBtn, styles.approveBtn, request.status !== 'pending' && styles.disabledBtn]}
//           onPress={() => handleApproval('approve')}
//           disabled={request.status !== 'pending' || isProcessing}
//         >
//           {isProcessing && request.status === 'pending' ? <ActivityIndicator color={Colors.white} /> : (
//             <>
//               <AntDesign name="check" size={18} color={Colors.white} />
//               <Text style={styles.btnText}>Approve</Text>
//             </>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionBtn, styles.rejectBtn, request.status !== 'pending' && styles.disabledBtn]}
//           onPress={() => handleApproval('reject')}
//           disabled={request.status !== 'pending' || isProcessing}
//         >
//           {isProcessing && request.status === 'pending' ? <ActivityIndicator color={Colors.white} /> : (
//             <>
//               <AntDesign name="close" size={18} color={Colors.white} />
//               <Text style={styles.btnText}>Reject</Text>
//             </>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.lightGray,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.lightGray,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors.darkGray,
//   },
//   header: {
//     backgroundColor: Colors.primary,
//     padding: 20,
//     paddingTop: Platform.OS === 'web' ? 20 : 40,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   backButton: {
//     marginRight: 15,
//     padding: 5,
//   },
//   headerTitle: {
//     fontSize: 22,
//     color: Colors.white,
//     fontWeight: 'bold',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 100, // Make space for the fixed bottom buttons
//   },
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: 8,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.mediumGray,
//     paddingBottom: 5,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     alignItems: 'flex-start', // Align labels to the top if value wraps
//   },
//   detailLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: Colors.darkGray,
//     width: 130, // Fixed width for labels for alignment
//     marginRight: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   detailValue: {
//     fontSize: 15,
//     color: Colors.darkGray,
//     flex: 1, // Allow value to take remaining space
//   },
//   imageContainer: {
//     marginTop: 15,
//   },
//   scrapImage: {
//     width: '100%', // Take full width of card
//     height: 200,
//     borderRadius: 8,
//     resizeMode: 'cover',
//     marginTop: 10,
//     borderColor: Colors.lightGray,
//     borderWidth: 1,
//   },
//   statusContainer: {
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   statusText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.white,
//   },
//   bottomActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: Colors.mediumGray,
//     backgroundColor: Colors.white,
//     position: 'absolute', // Fixed at the bottom
//     bottom: 0,
//     left: 0,
//     right: 0,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//     minWidth: 140,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   approveBtn: {
//     backgroundColor: Colors.green,
//   },
//   rejectBtn: {
//     backgroundColor: Colors.red,
//   },
//   btnText: {
//     color: Colors.white,
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   disabledBtn: {
//     backgroundColor: Colors.mediumGray,
//     opacity: 0.7,
//   },
// });


//test backened
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Colors = {
    primary: '#004225', // Dark Green
    secondary: '#3CB371', // Medium Green
    accent: '#FFD700', // Gold/Yellow for highlights
    white: '#FFFFFF',
    lightGray: '#F0F0F0',
    mediumGray: '#B0B0B0', // Slightly darker gray for better contrast
    darkGray: '#333333',
    red: '#DC3545', // Danger
    green: '#28A745', // Success
    blue: '#007BFF', // Info
    deepBlue: '#0056b3', // Darker blue for active states
    warmRed: '#C82333', // Slightly deeper red for active states
    vibrantGreen: '#218838', // Slightly deeper green for active states
};

// Backend URL - Make sure this matches your actual backend server IP and port
const BACKEND_URL = "http://192.168.1.119:5000"; 

export default function RequestDetailsScreen({ route, navigation }) {
    const { requestData } = route.params; 
    const [request, setRequest] = useState(requestData);
    const [loading, setLoading] = useState(false); // No initial fetch loading as data is passed
    const [isProcessing, setIsProcessing] = useState(false); // For approve/reject buttons

    useEffect(() => {
        if (!requestData) {
            Alert.alert("Error", "Request details not provided.");
            navigation.goBack();
        } else {
            setRequest(requestData);
        }
    }, [requestData, navigation]);

    const handleApproval = async (decision) => {
        Alert.alert(
            "Confirm Action",
            `Are you sure you want to ${decision} this request?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        setIsProcessing(true);
                        try {
                            const storedToken = await AsyncStorage.getItem("adminToken");

                            const requestId = request.id; // Use the frontend-mapped ID (_id from backend)
                            const newStatus = decision === 'approve' ? 'approved' : 'rejected';

                            const response = await axios.post(`${BACKEND_URL}/api/v1/requests/${requestId}/update/`, 
                                { status: newStatus },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${storedToken}`,
                                    },
                                }
                            );

                            if (response.data.success) {
                                setRequest(prevReq => ({ ...prevReq, status: newStatus }));
                                Alert.alert("Success", response.data.message || `Request ${requestId} ${decision}d.`);
                                navigation.goBack(); // Navigate back after successful update
                            } else {
                                Alert.alert("Error", response.data.message || "Failed to update request.");
                            }
                        } catch (error) {
                            console.error('Approval/Rejection error:', error.response?.data || error.message);
                            Alert.alert("Error", error.response?.data?.message || "Failed to communicate with server to update request status.");
                        } finally {
                            setIsProcessing(false);
                        }
                    },
                },
            ]
        );
    };

    if (loading || !request) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading request details...</Text>
            </View>
        );
    }

    const displayPickupTime = request.pickupTime || 'Not specified';

    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Request Details ({request.id})</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Homeowner & Pickup Information</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><FontAwesome name="user" size={16} color={Colors.primary} /> Homeowner:</Text>
                        <Text style={styles.detailValue}>{request.name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><FontAwesome name="phone" size={16} color={Colors.primary} /> Phone:</Text>
                        <Text style={styles.detailValue}>{request.phone}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><MaterialIcons name="location-on" size={16} color={Colors.primary} /> Location:</Text>
                        <Text style={styles.detailValue}>{request.location}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><FontAwesome name="calendar" size={16} color={Colors.primary} /> Pickup Date:</Text>
                        <Text style={styles.detailValue}>{request.pickupDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><FontAwesome name="clock-o" size={16} color={Colors.primary} /> Pickup Time:</Text>
                        <Text style={styles.detailValue}>{displayPickupTime}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Scrap Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><MaterialIcons name="recycling" size={16} color={Colors.primary} /> Scrap Type:</Text>
                        <Text style={styles.detailValue}>{request.scrapType}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}><FontAwesome name="balance-scale" size={16} color={Colors.primary} /> Estimated Weight:</Text>
                        <Text style={styles.detailValue}>{request.weight}</Text>
                    </View>
                    {request.description && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}><MaterialIcons name="description" size={16} color={Colors.primary} /> Description:</Text>
                            <Text style={styles.detailValue}>{request.description}</Text>
                        </View>
                    )}
                    {/* Image display with error handling and better styling */}
                    <View style={styles.imageContainer}>
                        <Text style={styles.detailLabel}>Scrap Image:</Text>
                        {request.image ? (
                            <Image 
                                source={{ uri: request.image }} 
                                style={styles.scrapImage} 
                                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)} 
                                defaultSource={require('../assets/logo.png')} // Ensure this path is correct and file exists
                            />
                        ) : (
                            <View style={styles.noImagePlaceholder}>
                                <FontAwesome name="image" size={50} color={Colors.mediumGray} />
                                <Text style={styles.noImageText}>No Image Available</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={[styles.statusContainer, { 
                    backgroundColor: request.status === 'approved' ? Colors.green : // Use solid color for approved status box
                                     request.status === 'rejected' ? Colors.red : 
                                     request.status === 'collected' ? Colors.primary : 
                                     Colors.blue // Default for pending
                }]}>
                    <Text style={styles.statusText}>Current Status: {request.status ? request.status.toUpperCase() : 'PENDING'}</Text>
                </View>

            </ScrollView>

            {/* Action Buttons at the bottom */}
            <View style={styles.bottomActions}>
                <TouchableOpacity
                    style={[
                        styles.actionBtn, 
                        styles.approveBtn, 
                        (request.status !== 'pending' || isProcessing) && styles.disabledBtn
                    ]}
                    onPress={() => handleApproval('approve')}
                    disabled={request.status !== 'pending' || isProcessing}
                    activeOpacity={0.7} // Add active opacity for feedback
                >
                    {isProcessing && request.status === 'pending' ? <ActivityIndicator color={Colors.white} /> : (
                        <>
                            <AntDesign name="check" size={18} color={Colors.white} />
                            <Text style={styles.btnText}>Approve</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.actionBtn, 
                        styles.rejectBtn, 
                        (request.status !== 'pending' || isProcessing) && styles.disabledBtn
                    ]}
                    onPress={() => handleApproval('reject')}
                    disabled={request.status !== 'pending' || isProcessing}
                    activeOpacity={0.7} // Add active opacity for feedback
                >
                    {isProcessing && request.status === 'pending' ? <ActivityIndicator color={Colors.white} /> : (
                        <>
                            <AntDesign name="close" size={18} color={Colors.white} />
                            <Text style={styles.btnText}>Reject</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.darkGray,
    },
    header: {
        backgroundColor: Colors.primary,
        padding: 20,
        paddingTop: Platform.OS === 'web' ? 20 : 40,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    backButton: {
        marginRight: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 22,
        color: Colors.white,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // Make space for the fixed bottom buttons
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10, // More rounded
        padding: 20,
        marginBottom: 20,
        elevation: 4, // More pronounced shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15, // Slightly stronger shadow
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 19, // Slightly larger
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary + '70', // Slightly transparent secondary color
        paddingBottom: 8, // More padding
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 12, // More space between rows
        alignItems: 'flex-start',
    },
    detailLabel: {
        fontSize: 16, // Slightly larger
        fontWeight: '600',
        color: Colors.darkGray,
        width: 140, // Slightly wider fixed width for labels
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // More space between icon and text
    },
    detailValue: {
        fontSize: 16, // Slightly larger
        color: Colors.darkGray,
        flex: 1, // Allow value to take remaining space
    },
    imageContainer: {
        marginTop: 20, // More space above image
        alignItems: 'center', // Center content horizontally
    },
    scrapImage: {
        width: '95%', // Slightly less than full width of card
        height: 220, // Taller image
        borderRadius: 10, // More rounded
        resizeMode: 'cover',
        marginTop: 15, // More space below label
        borderColor: Colors.mediumGray + '50', // Subtle border
        borderWidth: 1,
        elevation: 3, // Shadow for image
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    noImagePlaceholder: {
        width: '95%',
        height: 220,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.mediumGray + '50',
    },
    noImageText: {
        marginTop: 10,
        color: Colors.mediumGray,
        fontSize: 16,
    },
    statusContainer: {
        padding: 18, // More padding
        borderRadius: 10, // More rounded
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // More pronounced shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statusText: {
        fontSize: 19, // Larger font
        fontWeight: 'bold',
        color: Colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.2)', // Subtle text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.mediumGray + '50',
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10, // Higher elevation for sticky footer
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14, // Increased padding
        paddingHorizontal: 28, // Increased padding
        borderRadius: 10, // More rounded
        minWidth: 150, // Slightly larger min-width
        elevation: 5, // Stronger shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    approveBtn: {
        backgroundColor: Colors.green, // Solid vibrant green
        // Consider a gradient if you add react-native-linear-gradient:
        // background: `linear-gradient(45deg, ${Colors.green}, ${Colors.vibrantGreen})`
    },
    rejectBtn: {
        backgroundColor: Colors.red, // Solid vibrant red
        // Consider a gradient if you add react-native-linear-gradient:
        // background: `linear-gradient(45deg, ${Colors.red}, ${Colors.warmRed})`
    },
    btnText: {
        color: Colors.white,
        fontSize: 17, // Larger font
        fontWeight: '700', // Bolder
        marginLeft: 12, // More space for icon
        textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    disabledBtn: {
        backgroundColor: Colors.mediumGray,
        opacity: 0.6, // More pronounced disabled state
        shadowOpacity: 0, // Remove shadow when disabled
        elevation: 0,
    },
});
