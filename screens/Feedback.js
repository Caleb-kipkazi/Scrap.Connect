// // // Home.js
// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';

// // export default function Feedback() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.text}>Feedback</Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   text: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: 'green',
// //   },
// // });

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';

// export default function Feedback() {
//   const [pickupDone, setPickupDone] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [requestId, setRequestId] = useState('');
//   const [selectedCollector, setSelectedCollector] = useState('');
//   const [collectors, setCollectors] = useState([]);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     // Replace with backend fetch if needed
//     const mockCollectors = ['James Mwangi', 'Lucy Kamau', 'Peter Otieno', 'Grace Wanjiru'];
//     setCollectors(mockCollectors);
//   }, []);

//   const handleSubmit = async () => {
//     if (!requestId.trim()) {
//       Alert.alert('Missing Request ID', 'Please enter the request ID.');
//       return;
//     }
//     if (!pickupDone) {
//       Alert.alert('Pickup not confirmed', 'Please confirm that pickup has been completed.');
//       return;
//     }
//     if (!selectedCollector) {
//       Alert.alert('No Collector Selected', 'Please select the scrap collector.');
//       return;
//     }

//     const feedbackData = {
//       requestId: requestId.trim(),
//       collector: selectedCollector,
//       pickupDone,
//       rating,
//       comment,
//       timestamp: new Date().toISOString(),
//     };

//     console.log('Prepared Feedback:', feedbackData);

//     // === BACKEND CONNECTION LOGIC ===
//     /*
//     try {
//       const response = await fetch('http://<your-backend-url>/api/feedback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(feedbackData),
//       });

//       const data = await response.json();

//       if (data.error === 'Feedback already submitted') {
//         Alert.alert('Already Submitted', 'Feedback for this request has already been given.');
//         return;
//       } else {
//         Alert.alert('Thank you!', 'Your feedback has been submitted.');
//         setSubmitted(true);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//       console.error('Submission error:', error);
//     }
//     */

//     // TEMPORARY local alert for offline use
//     Alert.alert('Thank you!', 'Feedback submitted (backend not yet connected).');
//     setSubmitted(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Feedback & Confirmation</Text>

//       <Text style={styles.label}>Request ID</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Request ID"
//         value={requestId}
//         onChangeText={setRequestId}
//         placeholderTextColor="#555"
//       />

//       <Text style={styles.label}>Select Scrap Collector</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedCollector}
//           onValueChange={(itemValue) => setSelectedCollector(itemValue)}
//           dropdownIconColor="black"
//           style={styles.picker}
//         >
//           <Picker.Item label="-- Select Collector --" value="" />
//           {collectors.map((name, idx) => (
//             <Picker.Item key={idx} label={name} value={name} />
//           ))}
//         </Picker>
//       </View>

//       <TouchableOpacity
//         style={[styles.confirmButton, pickupDone && styles.confirmed]}
//         onPress={() => setPickupDone(!pickupDone)}
//         disabled={submitted}
//       >
//         <Text style={styles.confirmText}>
//           {pickupDone ? '✅ Pickup Confirmed' : 'Tap to Confirm Pickup'}
//         </Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>Rating</Text>
//       <View style={styles.ratingContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <TouchableOpacity
//             key={star}
//             onPress={() => setRating(star)}
//             disabled={submitted}
//           >
//             <FontAwesome
//               name={star <= rating ? 'star' : 'star-o'}
//               size={32}
//               color="#2e7d32"
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.label}>Feedback</Text>
//       <TextInput
//         style={styles.input}
//         multiline
//         numberOfLines={4}
//         placeholder="What went well? What can be improved?"
//         value={comment}
//         onChangeText={setComment}
//         placeholderTextColor="#555"
//         editable={!submitted}
//       />

//       <TouchableOpacity
//         onPress={handleSubmit}
//         style={[styles.submitButton, submitted && { backgroundColor: '#ccc' }]}
//         disabled={submitted}
//       >
//         <Text style={styles.submitText}>
//           {submitted ? 'Feedback Submitted' : 'Submit Feedback'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     color: '#000',
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#2e7d32',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     color: '#000',
//     textAlignVertical: 'top',
//     backgroundColor: '#fff',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#2e7d32',
//     borderRadius: 10,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     color: '#000',
//   },
//   confirmButton: {
//     padding: 15,
//     backgroundColor: '#e8f5e9',
//     borderRadius: 10,
//     alignItems: 'center',
//     borderColor: '#2e7d32',
//     borderWidth: 1,
//     marginBottom: 20,
//   },
//   confirmed: {
//     backgroundColor: '#c8e6c9',
//   },
//   confirmText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: '#2e7d32',
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   submitText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, // Using TouchableOpacity for a more customizable button
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView, // For pull-to-refresh
  RefreshControl, // For pull-to-refresh
  KeyboardAvoidingView, // For keyboard handling
  Platform // For platform-specific behavior
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define some colors for consistent styling
const PRIMARY_COLOR = '#3CB371'; // A nice green
const ACCENT_COLOR = '#004225'; // Darker green
const TEXT_COLOR = '#333333';
const LIGHT_GRAY = '#F0F0F0';
const BORDER_COLOR = '#CCCCCC';

const Feedback = () => {
  const [userId, setUserId] = useState(null);
  const [request, setRequest] = useState(null);
  const [rating, setRating] = useState('');
  // FIX: Corrected useState initialization for comment
  const [comment, setComment] = useState('');
  const [pickupDone, setPickupDone] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const fetchUnreviewedRequest = async (id) => {
    try {
      setLoading(true); // Ensure loading is true when fetching
      const response = await axios.get(`http://192.168.1.5:5000/api/v1/feedback/unreviewed/${id}`);
      console.log('Unreviewed request response:', response.data);
      setRequest(response.data.request);
    } catch (err) {
      console.error('Fetch unreviewed request error:', err.response?.data || err.message);
      // More specific message if no requests are found
      if (err.response && err.response.status === 404) {
        Alert.alert('No Feedback Needed', 'You have no collected requests needing feedback at this moment.');
      } else {
        Alert.alert('Error', 'Failed to load requests. Please try again.');
      }
      setRequest(null); // Clear request if fetch fails
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing animation
    }
  };

  const loadUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('Attempting to load userId from AsyncStorage...');
      console.log('Stored UserId:', storedUserId);

      if (storedUserId) {
        setUserId(storedUserId);
        fetchUnreviewedRequest(storedUserId);
      } else {
        Alert.alert('Error', 'User ID not found in storage. Please log in again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      Alert.alert('Error', 'Could not load user info');
      setLoading(false);
    }
  };

  // Callback for pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUser(); // Re-fetch user and requests
  }, []);

  const submitFeedback = async () => {
    const parsedRating = parseInt(rating);

    // FIX: Enhanced validation for rating and comment
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return Alert.alert('Validation Error', 'Please enter a valid rating between 1 and 5.');
    }
    if (!comment.trim()) { // Check if comment is not empty or just whitespace
      return Alert.alert('Validation Error', 'Please enter a comment.');
    }

    if (!request || !request._id || !request.collectorId?._id) {
      console.error('Invalid request or missing requestId/collectorId:', request);
      Alert.alert('Submission Error', 'Invalid request data. Cannot submit feedback.');
      return;
    }

    const payload = {
      requestId: request._id,
      collector: request.collectorId._id,
      rating: parsedRating, // Use the parsed integer rating
      comment: comment.trim(), // Trim whitespace from comment
      pickupDone,
    };

    console.log('Submitting feedback payload:', payload);

    try {
      const res = await axios.post(`http://192.168.1.5:5000/api/v1/feedback/submit`, payload);
      console.log('Feedback submission success:', res.data);
      Alert.alert('Success', 'Feedback submitted successfully!');
      setRequest(null); // Clear the request after successful submission
      setRating(''); // Clear input fields
      setComment('');
      // Optionally, if you want to immediately check for another request after submission:
      // loadUser(); 
    } catch (err) {
      console.error('Submit feedback error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || 'Failed to submit feedback. Please try again.';
      Alert.alert('Submission Failed', errorMessage);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading your collected requests...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView // Helps move content up when keyboard appears
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={PRIMARY_COLOR} // iOS
            colors={[PRIMARY_COLOR]} // Android
          />
        }
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Submit Feedback</Text>

          {request ? (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Collector:</Text>
                <Text style={styles.value}>{request.collectorId?.fullName || 'N/A'}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Request ID:</Text>
                <Text style={styles.value}>{request._id || 'N/A'}</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Rating (1-5)"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
                maxLength={1} // Assuming single digit rating
              />
              <TextInput
                style={[styles.input, styles.commentInput]}
                placeholder="Comment"
                placeholderTextColor="#A0A0A0"
                multiline
                value={comment}
                onChangeText={setComment}
                maxLength={500} // Limit comment length
              />

              <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.noRequestContainer}>
              <Text style={styles.noRequestText}>
                No collected requests needing feedback at this time.
              </Text>
              <Text style={styles.noRequestSubText}>
                Pull down to refresh or check back later.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
  },
  loadingText: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginTop: 10,
  },
  noRequestContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  noRequestText: {
    fontSize: 18,
    color: TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  noRequestSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: ACCENT_COLOR,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  value: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: 'normal',
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: TEXT_COLOR,
    backgroundColor: LIGHT_GRAY,
  },
  commentInput: {
    height: 120,
    textAlignVertical: 'top', // For multiline TextInput on Android
    paddingTop: 15, // Adjust padding for better multiline appearance
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
