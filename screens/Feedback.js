// // Home.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Feedback() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Feedback</Text>
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

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function Feedback() {
  const [pickupDone, setPickupDone] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [requestId, setRequestId] = useState('');
  const [selectedCollector, setSelectedCollector] = useState('');
  const [collectors, setCollectors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Replace with backend fetch if needed
    const mockCollectors = ['James Mwangi', 'Lucy Kamau', 'Peter Otieno', 'Grace Wanjiru'];
    setCollectors(mockCollectors);
  }, []);

  const handleSubmit = async () => {
    if (!requestId.trim()) {
      Alert.alert('Missing Request ID', 'Please enter the request ID.');
      return;
    }
    if (!pickupDone) {
      Alert.alert('Pickup not confirmed', 'Please confirm that pickup has been completed.');
      return;
    }
    if (!selectedCollector) {
      Alert.alert('No Collector Selected', 'Please select the scrap collector.');
      return;
    }

    const feedbackData = {
      requestId: requestId.trim(),
      collector: selectedCollector,
      pickupDone,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    console.log('Prepared Feedback:', feedbackData);

    // === BACKEND CONNECTION LOGIC ===
    /*
    try {
      const response = await fetch('http://<your-backend-url>/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();

      if (data.error === 'Feedback already submitted') {
        Alert.alert('Already Submitted', 'Feedback for this request has already been given.');
        return;
      } else {
        Alert.alert('Thank you!', 'Your feedback has been submitted.');
        setSubmitted(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Submission error:', error);
    }
    */

    // TEMPORARY local alert for offline use
    Alert.alert('Thank you!', 'Feedback submitted (backend not yet connected).');
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feedback & Confirmation</Text>

      <Text style={styles.label}>Request ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Request ID"
        value={requestId}
        onChangeText={setRequestId}
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Select Scrap Collector</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCollector}
          onValueChange={(itemValue) => setSelectedCollector(itemValue)}
          dropdownIconColor="black"
          style={styles.picker}
        >
          <Picker.Item label="-- Select Collector --" value="" />
          {collectors.map((name, idx) => (
            <Picker.Item key={idx} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, pickupDone && styles.confirmed]}
        onPress={() => setPickupDone(!pickupDone)}
        disabled={submitted}
      >
        <Text style={styles.confirmText}>
          {pickupDone ? '✅ Pickup Confirmed' : 'Tap to Confirm Pickup'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Rating</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            disabled={submitted}
          >
            <FontAwesome
              name={star <= rating ? 'star' : 'star-o'}
              size={32}
              color="#2e7d32"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Feedback</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="What went well? What can be improved?"
        value={comment}
        onChangeText={setComment}
        placeholderTextColor="#555"
        editable={!submitted}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, submitted && { backgroundColor: '#ccc' }]}
        disabled={submitted}
      >
        <Text style={styles.submitText}>
          {submitted ? 'Feedback Submitted' : 'Submit Feedback'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#000',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    color: '#000',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#2e7d32',
    borderWidth: 1,
    marginBottom: 20,
  },
  confirmed: {
    backgroundColor: '#c8e6c9',
  },
  confirmText: {
    fontSize: 16,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
