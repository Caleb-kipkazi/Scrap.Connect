// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';

// const RequestScreen = () => {
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [details, setDetails] = useState('');
//   const [weight, setWeight] = useState('');
//   const [image, setImage] = useState(null);
//   const [collectionCenters, setCollectionCenters] = useState([]);
//   const [selectedCenter, setSelectedCenter] = useState('');

//   // Simulate fetching collection centers from backend
//   useEffect(() => {
//     // This will be replaced by actual fetch based on location
//     const mockCenters = [
//       { id: 'center1', name: 'Baraton Collection Center' },
//       { id: 'center2', name: 'Nandi Hills Scrap Yard' },
//       { id: 'center3', name: 'Kapsabet Main Center' },
//     ];
//     setCollectionCenters(mockCenters);
//   }, [location]); // Later: trigger fetch when location changes

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     if (!selectedCenter) {
//       alert('Please select a collection center');
//       return;
//     }

//     const requestData = {
//       fullName,
//       phone,
//       location,
//       details,
//       weight,
//       image,
//       collectionCenter: selectedCenter,
//     };

//     console.log(requestData); // Replace with POST request later
//     alert('Scrap request submitted!');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Scrap Pickup Request</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Location"
//         value={location}
//         onChangeText={setLocation}
//       />

//       <TextInput
//         style={[styles.input, { height: 100 }]}
//         placeholder="Details about the scrap"
//         value={details}
//         onChangeText={setDetails}
//         multiline
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Approximate Weight (kg)"
//         keyboardType="numeric"
//         value={weight}
//         onChangeText={setWeight}
//       />

//       <Text style={styles.label}>Select Scrap Collection Center</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedCenter}
//           onValueChange={(itemValue) => setSelectedCenter(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="-- Choose Collection Center --" value="" />
//           {collectionCenters.map((center) => (
//             <Picker.Item key={center.id} label={center.name} value={center.name} />
//           ))}
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//         <Text style={styles.imagePickerText}>Pick an Image of the Scrap</Text>
//       </TouchableOpacity>
//       {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit Request</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     color: 'green',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderColor: 'green',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     color: '#000',
//     backgroundColor: '#f9f9f9',
//   },
//   label: {
//     color: 'green',
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: 'green',
//     borderRadius: 8,
//     marginBottom: 15,
//     overflow: 'hidden',
//     backgroundColor: '#f9f9f9',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: '#000',
//   },
//   imagePicker: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   imagePickerText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   submitButton: {
//     backgroundColor: 'green',
//     padding: 15,
//     borderRadius: 8,
//   },
//   submitButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default RequestScreen;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';

// const RequestScreen = () => {
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [details, setDetails] = useState('');
//   const [weight, setWeight] = useState('');
//   const [image, setImage] = useState(null);
//   const [collectionCenters, setCollectionCenters] = useState([]);
//   const [selectedCenter, setSelectedCenter] = useState('');

//   useEffect(() => {
//     const mockCenters = [
//       { id: 'center1', name: 'Baraton Collection Center' },
//       { id: 'center2', name: 'Nandi Hills Scrap Yard' },
//       { id: 'center3', name: 'Kapsabet Main Center' },
//     ];
//     setCollectionCenters(mockCenters);
//   }, [location]);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     if (
//       !fullName ||
//       !phone ||
//       !location ||
//       !details ||
//       !weight ||
//       !selectedCenter ||
//       !image
//     ) {
//       alert('Sorry, ensure all fields are filled');
//       return;
//     }

//     const requestData = {
//       fullName,
//       phone,
//       location,
//       details,
//       weight,
//       image,
//       collectionCenter: selectedCenter,
//     };

//     console.log(requestData); // Replace with POST request later
//     alert('Scrap request submitted!');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Scrap Pickup Request</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Location"
//         value={location}
//         onChangeText={setLocation}
//       />

//       <TextInput
//         style={[styles.input, { height: 100 }]}
//         placeholder="Details about the scrap"
//         value={details}
//         onChangeText={setDetails}
//         multiline
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Approximate Weight (kg)"
//         keyboardType="numeric"
//         value={weight}
//         onChangeText={setWeight}
//       />

//       <Text style={styles.label}>Select Scrap Collection Center</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedCenter}
//           onValueChange={(itemValue) => setSelectedCenter(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="-- Choose Collection Center --" value="" />
//           {collectionCenters.map((center) => (
//             <Picker.Item key={center.id} label={center.name} value={center.name} />
//           ))}
//         </Picker>
//       </View>

//       <Text style={styles.label}>Scrap Image</Text>
//       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.imagePreview} />
//         ) : (
//           <Text style={{ color: '#aaa' }}>Tap to select an image</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit Request</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     color: 'green',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderColor: 'green',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     color: '#000',
//     backgroundColor: '#f9f9f9',
//   },
//   label: {
//     color: 'green',
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: 'green',
//     borderRadius: 8,
//     marginBottom: 15,
//     overflow: 'hidden',
//     backgroundColor: '#f9f9f9',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: '#000',
//   },
//   imageField: {
//     height: 200,
//     borderWidth: 1,
//     borderColor: 'green',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   imagePreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   submitButton: {
//     backgroundColor: 'green',
//     padding: 15,
//     borderRadius: 8,
//   },
//   submitButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default RequestScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const RequestScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scrapType, setScrapType] = useState('');
  const [details, setDetails] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);
  const [collectionCenters, setCollectionCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  useEffect(() => {
    // Set current date automatically for scheduled date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setScheduledDate(formattedDate);
  }, []);

  useEffect(() => {
    const mockCenters = [
      { id: 'center1', name: 'Baraton Collection Center' },
      { id: 'center2', name: 'Nandi Hills Scrap Yard' },
      { id: 'center3', name: 'Kapsabet Main Center' },
    ];
    setCollectionCenters(mockCenters);
  }, [location]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // On Android close picker after select
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Pickup date cannot be before today's date.");
        setPickupDate(null);
      } else {
        setPickupDate(selectedDate);
      }
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    if (
      !fullName ||
      !phone ||
      !location ||
      !pickupDate ||
      !scrapType ||
      !details ||
      !weight ||
      !selectedCenter ||
      !image
    ) {
      alert('Sorry, ensure all fields are filled');
      return;
    }

    // Additional date validation on submit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(pickupDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Pickup date cannot be before today's date.");
      return;
    }

    const requestData = {
      fullName,
      phone,
      location,
      pickupDate: formatDate(pickupDate),
      scheduledDate,
      scrapType,
      details,
      weight,
      image,
      collectionCenter: selectedCenter,
    };

    console.log(requestData);
    alert('Scrap request submitted!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Scrap Pickup Request</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Preferred Pickup Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={showDatepicker}
        activeOpacity={0.7}
      >
        <Text style={{ color: pickupDate ? '#000' : '#aaa', fontSize: 16 }}>
          {pickupDate ? formatDate(pickupDate) : 'Select a date'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={pickupDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()} // Prevent past date selection
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Scrap Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={scrapType}
          onValueChange={(itemValue) => setScrapType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Scrap Type --" value="" />
          <Picker.Item label="Metal" value="metal" />
          <Picker.Item label="Plastic" value="plastic" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Others" value="others" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Details about the scrap"
        value={details}
        onChangeText={setDetails}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Approximate Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Select Scrap Collection Center</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCenter}
          onValueChange={(itemValue) => setSelectedCenter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Choose Collection Center --" value="" />
          {collectionCenters.map((center) => (
            <Picker.Item key={center.id} label={center.name} value={center.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Scrap Image</Text>
      <TouchableOpacity style={styles.imageField} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: '#aaa' }}>Tap to select an image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  label: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  imageField: {
    height: 200,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestScreen;
