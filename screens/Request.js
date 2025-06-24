// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   StyleSheet,
// // // //   TouchableOpacity,
// // // //   Image,
// // // //   ScrollView,
// // // //   Platform,
// // // // } from 'react-native';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import * as ImagePicker from 'expo-image-picker';

// // // // const RequestScreen = () => {
// // // //   const [fullName, setFullName] = useState('');
// // // //   const [phone, setPhone] = useState('');
// // // //   const [location, setLocation] = useState('');
// // // //   const [details, setDetails] = useState('');
// // // //   const [weight, setWeight] = useState('');
// // // //   const [image, setImage] = useState(null);
// // // //   const [collectionCenters, setCollectionCenters] = useState([]);
// // // //   const [selectedCenter, setSelectedCenter] = useState('');

// // // //   // Simulate fetching collection centers from backend
// // // //   useEffect(() => {
// // // //     // This will be replaced by actual fetch based on location
// // // //     const mockCenters = [
// // // //       { id: 'center1', name: 'Baraton Collection Center' },
// // // //       { id: 'center2', name: 'Nandi Hills Scrap Yard' },
// // // //       { id: 'center3', name: 'Kapsabet Main Center' },
// // // //     ];
// // // //     setCollectionCenters(mockCenters);
// // // //   }, [location]); // Later: trigger fetch when location changes

// // // //   const pickImage = async () => {
// // // //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // //     if (status !== 'granted') {
// // // //       alert('Permission to access media library is required!');
// // // //       return;
// // // //     }

// // // //     const result = await ImagePicker.launchImageLibraryAsync({
// // // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // //       allowsEditing: true,
// // // //       quality: 1,
// // // //     });

// // // //     if (!result.cancelled) {
// // // //       setImage(result.assets[0].uri);
// // // //     }
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     if (!selectedCenter) {
// // // //       alert('Please select a collection center');
// // // //       return;
// // // //     }

// // // //     const requestData = {
// // // //       fullName,
// // // //       phone,
// // // //       location,
// // // //       details,
// // // //       weight,
// // // //       image,
// // // //       collectionCenter: selectedCenter,
// // // //     };

// // // //     console.log(requestData); // Replace with POST request later
// // // //     alert('Scrap request submitted!');
// // // //   };

// // // //   return (
// // // //     <ScrollView contentContainerStyle={styles.container}>
// // // //       <Text style={styles.header}>Scrap Pickup Request</Text>

// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Full Name"
// // // //         value={fullName}
// // // //         onChangeText={setFullName}
// // // //       />
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Phone Number"
// // // //         keyboardType="phone-pad"
// // // //         value={phone}
// // // //         onChangeText={setPhone}
// // // //       />
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Location"
// // // //         value={location}
// // // //         onChangeText={setLocation}
// // // //       />

// // // //       <TextInput
// // // //         style={[styles.input, { height: 100 }]}
// // // //         placeholder="Details about the scrap"
// // // //         value={details}
// // // //         onChangeText={setDetails}
// // // //         multiline
// // // //       />

// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Approximate Weight (kg)"
// // // //         keyboardType="numeric"
// // // //         value={weight}
// // // //         onChangeText={setWeight}
// // // //       />

// // // //       <Text style={styles.label}>Select Scrap Collection Center</Text>
// // // //       <View style={styles.pickerContainer}>
// // // //         <Picker
// // // //           selectedValue={selectedCenter}
// // // //           onValueChange={(itemValue) => setSelectedCenter(itemValue)}
// // // //           style={styles.picker}
// // // //         >
// // // //           <Picker.Item label="-- Choose Collection Center --" value="" />
// // // //           {collectionCenters.map((center) => (
// // // //             <Picker.Item key={center.id} label={center.name} value={center.name} />
// // // //           ))}
// // // //         </Picker>
// // // //       </View>

// // // //       <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
// // // //         <Text style={styles.imagePickerText}>Pick an Image of the Scrap</Text>
// // // //       </TouchableOpacity>
// // // //       {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

// // // //       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
// // // //         <Text style={styles.submitButtonText}>Submit Request</Text>
// // // //       </TouchableOpacity>
// // // //     </ScrollView>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     padding: 20,
// // // //     backgroundColor: '#fff',
// // // //   },
// // // //   header: {
// // // //     fontSize: 24,
// // // //     color: 'green',
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 20,
// // // //     textAlign: 'center',
// // // //   },
// // // //   input: {
// // // //     borderColor: 'green',
// // // //     borderWidth: 1,
// // // //     borderRadius: 8,
// // // //     padding: 10,
// // // //     marginBottom: 15,
// // // //     fontSize: 16,
// // // //     color: '#000',
// // // //     backgroundColor: '#f9f9f9',
// // // //   },
// // // //   label: {
// // // //     color: 'green',
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 8,
// // // //   },
// // // //   pickerContainer: {
// // // //     borderWidth: 1,
// // // //     borderColor: 'green',
// // // //     borderRadius: 8,
// // // //     marginBottom: 15,
// // // //     overflow: 'hidden',
// // // //     backgroundColor: '#f9f9f9',
// // // //   },
// // // //   picker: {
// // // //     height: 50,
// // // //     width: '100%',
// // // //     color: '#000',
// // // //   },
// // // //   imagePicker: {
// // // //     backgroundColor: 'green',
// // // //     padding: 12,
// // // //     borderRadius: 8,
// // // //     marginBottom: 10,
// // // //   },
// // // //   imagePickerText: {
// // // //     color: '#fff',
// // // //     textAlign: 'center',
// // // //     fontWeight: 'bold',
// // // //   },
// // // //   imagePreview: {
// // // //     width: '100%',
// // // //     height: 200,
// // // //     borderRadius: 8,
// // // //     marginBottom: 20,
// // // //   },
// // // //   submitButton: {
// // // //     backgroundColor: 'green',
// // // //     padding: 15,
// // // //     borderRadius: 8,
// // // //   },
// // // //   submitButtonText: {
// // // //     color: '#fff',
// // // //     textAlign: 'center',
// // // //     fontSize: 16,
// // // //     fontWeight: 'bold',
// // // //   },
// // // // });

// // // // export default RequestScreen;


// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   StyleSheet,
// // // //   TouchableOpacity,
// // // //   Image,
// // // //   ScrollView,
// // // //   Platform,
// // // // } from 'react-native';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import * as ImagePicker from 'expo-image-picker';

// // // // const RequestScreen = () => {
// // // //   const [fullName, setFullName] = useState('');
// // // //   const [phone, setPhone] = useState('');
// // // //   const [location, setLocation] = useState('');
// // // //   const [details, setDetails] = useState('');
// // // //   const [weight, setWeight] = useState('');
// // // //   const [image, setImage] = useState(null);
// // // //   const [collectionCenters, setCollectionCenters] = useState([]);
// // // //   const [selectedCenter, setSelectedCenter] = useState('');

// // // //   useEffect(() => {
// // // //     const mockCenters = [
// // // //       { id: 'center1', name: 'Baraton Collection Center' },
// // // //       { id: 'center2', name: 'Nandi Hills Scrap Yard' },
// // // //       { id: 'center3', name: 'Kapsabet Main Center' },
// // // //     ];
// // // //     setCollectionCenters(mockCenters);
// // // //   }, [location]);

// // // //   const pickImage = async () => {
// // // //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // //     if (status !== 'granted') {
// // // //       alert('Permission to access media library is required!');
// // // //       return;
// // // //     }

// // // //     const result = await ImagePicker.launchImageLibraryAsync({
// // // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // //       allowsEditing: true,
// // // //       quality: 1,
// // // //     });

// // // //     if (!result.canceled) {
// // // //       setImage(result.assets[0].uri);
// // // //     }
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     if (
// // // //       !fullName ||
// // // //       !phone ||
// // // //       !location ||
// // // //       !details ||
// // // //       !weight ||
// // // //       !selectedCenter ||
// // // //       !image
// // // //     ) {
// // // //       alert('Sorry, ensure all fields are filled');
// // // //       return;
// // // //     }

// // // //     const requestData = {
// // // //       fullName,
// // // //       phone,
// // // //       location,
// // // //       details,
// // // //       weight,
// // // //       image,
// // // //       collectionCenter: selectedCenter,
// // // //     };

// // // //     console.log(requestData); // Replace with POST request later
// // // //     alert('Scrap request submitted!');
// // // //   };

// // // //   return (
// // // //     <ScrollView contentContainerStyle={styles.container}>
// // // //       <Text style={styles.header}>Scrap Pickup Request</Text>

// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Full Name"
// // // //         value={fullName}
// // // //         onChangeText={setFullName}
// // // //       />
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Phone Number"
// // // //         keyboardType="phone-pad"
// // // //         value={phone}
// // // //         onChangeText={setPhone}
// // // //       />
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Location"
// // // //         value={location}
// // // //         onChangeText={setLocation}
// // // //       />

// // // //       <TextInput
// // // //         style={[styles.input, { height: 100 }]}
// // // //         placeholder="Details about the scrap"
// // // //         value={details}
// // // //         onChangeText={setDetails}
// // // //         multiline
// // // //       />

// // // //       <TextInput
// // // //         style={styles.input}
// // // //         placeholder="Approximate Weight (kg)"
// // // //         keyboardType="numeric"
// // // //         value={weight}
// // // //         onChangeText={setWeight}
// // // //       />

// // // //       <Text style={styles.label}>Select Scrap Collection Center</Text>
// // // //       <View style={styles.pickerContainer}>
// // // //         <Picker
// // // //           selectedValue={selectedCenter}
// // // //           onValueChange={(itemValue) => setSelectedCenter(itemValue)}
// // // //           style={styles.picker}
// // // //         >
// // // //           <Picker.Item label="-- Choose Collection Center --" value="" />
// // // //           {collectionCenters.map((center) => (
// // // //             <Picker.Item key={center.id} label={center.name} value={center.name} />
// // // //           ))}
// // // //         </Picker>
// // // //       </View>

// // // //       <Text style={styles.label}>Scrap Image</Text>
// // // //       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
// // // //         {image ? (
// // // //           <Image source={{ uri: image }} style={styles.imagePreview} />
// // // //         ) : (
// // // //           <Text style={{ color: '#aaa' }}>Tap to select an image</Text>
// // // //         )}
// // // //       </TouchableOpacity>

// // // //       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
// // // //         <Text style={styles.submitButtonText}>Submit Request</Text>
// // // //       </TouchableOpacity>
// // // //     </ScrollView>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     padding: 20,
// // // //     backgroundColor: '#fff',
// // // //   },
// // // //   header: {
// // // //     fontSize: 24,
// // // //     color: 'green',
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 20,
// // // //     textAlign: 'center',
// // // //   },
// // // //   input: {
// // // //     borderColor: 'green',
// // // //     borderWidth: 1,
// // // //     borderRadius: 8,
// // // //     padding: 10,
// // // //     marginBottom: 15,
// // // //     fontSize: 16,
// // // //     color: '#000',
// // // //     backgroundColor: '#f9f9f9',
// // // //   },
// // // //   label: {
// // // //     color: 'green',
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 8,
// // // //   },
// // // //   pickerContainer: {
// // // //     borderWidth: 1,
// // // //     borderColor: 'green',
// // // //     borderRadius: 8,
// // // //     marginBottom: 15,
// // // //     overflow: 'hidden',
// // // //     backgroundColor: '#f9f9f9',
// // // //   },
// // // //   picker: {
// // // //     height: 50,
// // // //     width: '100%',
// // // //     color: '#000',
// // // //   },
// // // //   imageField: {
// // // //     height: 200,
// // // //     borderWidth: 1,
// // // //     borderColor: 'green',
// // // //     borderRadius: 8,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //     marginBottom: 20,
// // // //     backgroundColor: '#f9f9f9',
// // // //   },
// // // //   imagePreview: {
// // // //     width: '100%',
// // // //     height: '100%',
// // // //     borderRadius: 8,
// // // //   },
// // // //   submitButton: {
// // // //     backgroundColor: 'green',
// // // //     padding: 15,
// // // //     borderRadius: 8,
// // // //   },
// // // //   submitButtonText: {
// // // //     color: '#fff',
// // // //     textAlign: 'center',
// // // //     fontSize: 16,
// // // //     fontWeight: 'bold',
// // // //   },
// // // // });

// // // // export default RequestScreen;


// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   Image,
// // //   ScrollView,
// // //   Platform,
// // // } from 'react-native';
// // // import { Picker } from '@react-native-picker/picker';
// // // import * as ImagePicker from 'expo-image-picker';
// // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // const RequestScreen = () => {
// // //   const [fullName, setFullName] = useState('');
// // //   const [phone, setPhone] = useState('');
// // //   const [location, setLocation] = useState('');
// // //   const [pickupDate, setPickupDate] = useState(null);
// // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // //   const [pickupTime, setPickupTime] = useState('');
// // // const [showTimePicker, setShowTimePicker] = useState(false);
// // //   const [scrapType, setScrapType] = useState('');
// // //   const [details, setDetails] = useState('');
// // //   const [weight, setWeight] = useState('');
// // //   const [image, setImage] = useState(null);
// // //   const [collectionCenters, setCollectionCenters] = useState([]);
// // //   const [selectedCenter, setSelectedCenter] = useState('');
// // //   const [scheduledDate, setScheduledDate] = useState('');


// // //   useEffect(() => {
// // //     // Simulate user data from login token
// // //   const mockUser = {
// // //     fullName: 'John Doe',
// // //     phoneNumber: '+254712345678',
// // //   };
// // //   setFullName(mockUser.fullName);
// // //   setPhone(mockUser.phoneNumber);

// // //     // Set current date automatically for scheduled date
// // //     const currentDate = new Date();
// // //     const formattedDate = currentDate.toISOString().split('T')[0];
// // //     setScheduledDate(formattedDate);
// // //   }, []);

// // //   useEffect(() => {
// // //     const mockCenters = [
// // //       { id: 'center1', name: 'Baraton Collection Center' },
// // //       { id: 'center2', name: 'Nandi Hills Scrap Yard' },
// // //       { id: 'center3', name: 'Kapsabet Main Center' },
// // //     ];
// // //     setCollectionCenters(mockCenters);
// // //   }, [location]);
  
  

// // //   const pickImage = async () => {
// // //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // //     if (status !== 'granted') {
// // //       alert('Permission to access media library is required!');
// // //       return;
// // //     }

// // //     const result = await ImagePicker.launchImageLibraryAsync({
// // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // //       allowsEditing: true,
// // //       quality: 1,
// // //     });

// // //     if (!result.canceled) {
// // //       setImage(result.assets[0].uri);
// // //     }
// // //   };

// // //   // const onChangeDate = (event, selectedDate) => {
// // //   // //   setShowDatePicker(Platform.OS === 'ios'); // On Android close picker after select
// // //   //   if (selectedDate) {
// // //   //     const today = new Date();
// // //   //     today.setHours(0, 0, 0, 0);
// // //   //     selectedDate.setHours(0, 0, 0, 0);

// // //   //     if (selectedDate < today) {
// // //   //       alert("Pickup date cannot be before today's date.");
// // //   //       setPickupDate(null);
// // //   //     } else {
// // //   //       setPickupDate(selectedDate);
// // //   //     }
// // //   //   }
// // //   // };
// // // const onChangeDate = (event, selectedDate) => {
// // //   setShowDatePicker(false);
// // //   if (selectedDate) {
// // //     // Adjust timezone offset manually
// // //     const correctedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
// // //     setPickupDate(correctedDate);
// // //   }
// // // };

// // // const onChangeTime = (event, selectedTime) => {
// // //   setShowTimePicker(false);
// // //   if (selectedTime) {
// // //     const hours = selectedTime.getHours();
// // //     const minutes = selectedTime.getMinutes();
// // //     const ampm = hours >= 12 ? 'PM' : 'AM';
// // //     const formattedHour = ((hours + 11) % 12 + 1);
// // //     const formattedMinutes = minutes.toString().padStart(2, '0');
// // //     const formattedTime = `${formattedHour}:${formattedMinutes} ${ampm}`;
// // //     setPickupTime(formattedTime);
// // //   }
// // // };

// // //   const showDatepicker = () => {
// // //     setShowDatePicker(true);
// // //   };

// // //   const formatDate = (date) => {
// // //     if (!date) return '';
// // //     return date.toISOString().split('T')[0];
// // //   };

// // //   const handleSubmit = () => {
// // //     if (
// // //       !fullName ||
// // //       !phone ||
// // //       !location ||
// // //       !pickupDate ||
// // //       !scrapType ||
// // //       !details ||
// // //       !weight ||
// // //       !selectedCenter ||
// // //       !image
// // //     ) {
// // //       alert('Sorry, ensure all fields are filled');
// // //       return;
// // //     }

// // //     // Additional date validation on submit
// // //     const today = new Date();
// // //     today.setHours(0, 0, 0, 0);
// // //     const selectedDate = new Date(pickupDate);
// // //     selectedDate.setHours(0, 0, 0, 0);

// // //     if (selectedDate < today) {
// // //       alert("Pickup date cannot be before today's date.");
// // //       return;
// // //     }

// // //     const requestData = {
// // //       fullName,
// // //       phone,
// // //       location,
// // //       // pickupDate: formatDate(pickupDate),
// // //       pickupDate: formatDate(pickupDate),
// // // pickupTime,

// // //       scheduledDate,
// // //       scrapType,
// // //       details,
// // //       weight,
// // //       image,
// // //       collectionCenter: selectedCenter,
// // //     };

// // //     console.log(requestData);
// // //     alert('Scrap request submitted!');
// // //   };

// // //   return (
// // //     <ScrollView contentContainerStyle={styles.container}>
// // //       <Text style={styles.header}>Scrap Pickup Request</Text>

// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Full Name"
// // //         value={fullName}
// // //         onChangeText={setFullName}
// // //       />
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Phone Number"
// // //         keyboardType="phone-pad"
// // //         value={phone}
// // //         onChangeText={setPhone}
// // //       />
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Location"
// // //         value={location}
// // //         onChangeText={setLocation}
// // //       />

// // //       <Text style={styles.label}>Preferred Pickup Date</Text>
// // //       <TouchableOpacity
// // //         style={styles.input}
// // //         onPress={showDatepicker}
// // //         activeOpacity={0.7}
// // //       >
// // //         <Text style={{ color: pickupDate ? '#000' : '#aaa', fontSize: 16 }}>
// // //           {pickupDate ? formatDate(pickupDate) : 'Select a date'}
// // //         </Text>
// // //       </TouchableOpacity>

// // //       {showDatePicker && (
// // //         <DateTimePicker
// // //           value={pickupDate || new Date()}
// // //           mode="date"
// // //           display="default"
// // //           minimumDate={new Date()} // Prevent past date selection
// // //           onChange={onChangeDate}
// // //         />
// // //       )}

// // //       {/* <Text style={styles.label}>Preffered Pickup Time</Text>
// // //       <TextInput
// // //   style={styles.input}
// // //   placeholder="Preferred Pickup Time (e.g. 10:00 AM)"
// // //   value={pickupTime}
// // //   onChangeText={setPickupTime}
// // // /> */}

// // // <Text style={styles.label}>Preferred Pickup Time</Text>
// // // <TouchableOpacity
// // //   style={styles.input}
// // //   onPress={() => setShowTimePicker(true)}
// // //   activeOpacity={0.7}
// // // >
// // //   <Text style={{ color: pickupTime ? '#000' : '#aaa', fontSize: 16 }}>
// // //     {pickupTime || 'Select Pickup Time'}
// // //   </Text>
// // // </TouchableOpacity>

// // // {showTimePicker && (
// // //   <DateTimePicker
// // //     value={new Date()}
// // //     mode="time"
// // //     display="default"
// // //     onChange={onChangeTime}
// // //   />
// // // )}


// // //       <Text style={styles.label}>Scrap Type</Text>
// // //       <View style={styles.pickerContainer}>
// // //         <Picker
// // //           selectedValue={scrapType}
// // //           onValueChange={(itemValue) => setScrapType(itemValue)}
// // //           style={styles.picker}
// // //         >
// // //           <Picker.Item label="-- Select Scrap Type --" value="" />
// // //           <Picker.Item label="Metal" value="metal" />
// // //           <Picker.Item label="Plastic" value="plastic" />
// // //           <Picker.Item label="Electronics" value="electronics" />
// // //           <Picker.Item label="Others" value="others" />
// // //         </Picker>
// // //       </View>

// // //       <TextInput
// // //         style={[styles.input, { height: 100 }]}
// // //         placeholder="Details about the scrap"
// // //         value={details}
// // //         onChangeText={setDetails}
// // //         multiline
// // //       />

// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="Approximate Weight (kg)"
// // //         keyboardType="numeric"
// // //         value={weight}
// // //         onChangeText={setWeight}
// // //       />

// // //       <Text style={styles.label}>Select Scrap Collection Center</Text>
// // //       <View style={styles.pickerContainer}>
// // //         <Picker
// // //           selectedValue={selectedCenter}
// // //           onValueChange={(itemValue) => setSelectedCenter(itemValue)}
// // //           style={styles.picker}
// // //         >
// // //           <Picker.Item label="-- Choose Collection Center --" value="" />
// // //           {collectionCenters.map((center) => (
// // //             <Picker.Item key={center.id} label={center.name} value={center.name} />
// // //           ))}
// // //         </Picker>
// // //       </View>

// // //       <Text style={styles.label}>Scrap Image</Text>
// // //       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
// // //         {image ? (
// // //           <Image source={{ uri: image }} style={styles.imagePreview} />
// // //         ) : (
// // //           <Text style={{ color: '#aaa' }}>Tap to select an image</Text>
// // //         )}
// // //       </TouchableOpacity>

// // //       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
// // //         <Text style={styles.submitButtonText}>Submit Request</Text>
// // //       </TouchableOpacity>
// // //     </ScrollView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     padding: 20,
// // //     backgroundColor: '#fff',
// // //   },
// // //   header: {
// // //     fontSize: 24,
// // //     color: 'green',
// // //     fontWeight: 'bold',
// // //     marginBottom: 20,
// // //     textAlign: 'center',
// // //   },
// // //   input: {
// // //     borderColor: 'green',
// // //     borderWidth: 1,
// // //     borderRadius: 8,
// // //     padding: 10,
// // //     marginBottom: 15,
// // //     fontSize: 16,
// // //     color: '#000',
// // //     backgroundColor: '#f9f9f9',
// // //     justifyContent: 'center',
// // //   },
// // //   label: {
// // //     color: 'green',
// // //     fontWeight: 'bold',
// // //     marginBottom: 8,
// // //   },
// // //   pickerContainer: {
// // //     borderWidth: 1,
// // //     borderColor: 'green',
// // //     borderRadius: 8,
// // //     marginBottom: 15,
// // //     overflow: 'hidden',
// // //     backgroundColor: '#f9f9f9',
// // //   },
// // //   picker: {
// // //     height: 50,
// // //     width: '100%',
// // //     color: '#000',
// // //   },
// // //   imageField: {
// // //     height: 200,
// // //     borderWidth: 1,
// // //     borderColor: 'green',
// // //     borderRadius: 8,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginBottom: 20,
// // //     backgroundColor: '#f9f9f9',
// // //   },
// // //   imagePreview: {
// // //     width: '100%',
// // //     height: '100%',
// // //     borderRadius: 8,
// // //   },
// // //   submitButton: {
// // //     backgroundColor: 'green',
// // //     padding: 15,
// // //     borderRadius: 8,
// // //   },
// // //   submitButtonText: {
// // //     color: '#fff',
// // //     textAlign: 'center',
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default RequestScreen;


// // //test
// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView,
// //   Platform,
// //   Alert,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import * as ImagePicker from 'expo-image-picker';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage'; // To get user ID/token

// // // Ensure this IP is correct for your backend server.
// // // If testing on an Android emulator and backend is on the same machine, use 'http://10.0.2.2:5000'
// // const BACKEND_URL = "http://192.168.1.119:5000"; 

// // const RequestScreen = () => {
// //   const [userId, setUserId] = useState(null);
// //   const [fullName, setFullName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [location, setLocation] = useState(''); // User's input for location search
// //   const [pickupDate, setPickupDate] = useState(null);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [pickupTime, setPickupTime] = useState('');
// //   const [showTimePicker, setShowTimePicker] = useState(false);
// //   const [scrapType, setScrapType] = useState('');
// //   const [details, setDetails] = useState('');
// //   const [weight, setWeight] = useState('');
// //   const [image, setImage] = useState(null);
// //   const [collectionCenters, setCollectionCenters] = useState([]);
// //   const [selectedCenter, setSelectedCenter] = useState(''); // Stores the NAME of the selected center
// //   const [loading, setLoading] = useState(false); // For form submission loading
// //   const [centerLoading, setCenterLoading] = useState(false); // For loading centers by location
// //   const [error, setError] = useState(null); // General error for form submission
// //   const [centerError, setCenterError] = useState(null); // Specific error for center fetching

// //   // Auto-fill Full Name and Phone Number from logged-in user
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       setLoading(true); // Indicate loading for user data
// //       try {
// //         const storedToken = await AsyncStorage.getItem("token"); // Assuming token is stored
// //         const storedUserId = await AsyncStorage.getItem("userId"); // Assuming userId is stored

// //         if (storedUserId) {
// //           setUserId(storedUserId);
// //           // Fetch full user info from backend
// //           // Assuming /api/v1/user/info/:userId endpoint exists and returns { user: { username, phoneNo } }
// //           const response = await axios.get(`${BACKEND_URL}/api/v1/user/info/${storedUserId}`, {
// //             headers: { Authorization: `Bearer ${storedToken}` } // If your API requires authentication
// //           });
// //           setFullName(response.data.user.username); // Assuming username is used as full name
// //           setPhone(response.data.user.phoneNo);
// //         } else {
// //           Alert.alert("Authentication Required", "Please log in to view and submit requests.");
// //           // Optionally, navigate to login screen if userId is not found
// //           // navigation.navigate('Login');
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch user data:", err);
// //         Alert.alert("Error", "Could not load user details. Please ensure you are logged in and try again.");
// //       } finally {
// //         setLoading(false); // Stop loading for user data
// //       }
// //     };
// //     fetchUserData();
// //   }, []); // Run once on component mount

// //   // Fetch Centers by Location from the 'Center' model
// //   const fetchCentersByLocation = useCallback(async (locationQuery) => {
// //     setCenterLoading(true);
// //     setCenterError(null);
// //     setCollectionCenters([]); // Clear previous centers
// //     setSelectedCenter(''); // Clear selected center

// //     if (!locationQuery || locationQuery.trim().length < 2) { // Require at least 2 characters for search
// //       setCenterLoading(false);
// //       return;
// //     }

// //     try {
// //       // Use the new endpoint for fetching centers by location from the 'Center' model
// //       const response = await axios.get(`${BACKEND_URL}/api/v1/centers-by-location-for-homeowner?location=${encodeURIComponent(locationQuery.trim())}`);
      
// //       if (response.data.centers && response.data.centers.length > 0) {
// //         setCollectionCenters(response.data.centers);
// //       } else {
// //         setCenterError('No registered centers found for this location.');
// //       }
// //     } catch (err) {
// //       console.error("Error fetching centers by location:", err);
// //       setCenterError(err.response?.data?.message || 'Failed to fetch centers for this location. Please check your spelling or try a different location.');
// //     } finally {
// //       setCenterLoading(false);
// //     }
// //   }, [BACKEND_URL]);

// //   // Debounce effect for location input to prevent excessive API calls
// //   useEffect(() => {
// //     const handler = setTimeout(() => {
// //       fetchCentersByLocation(location);
// //     }, 500); // 500ms delay after typing stops

// //     return () => {
// //       clearTimeout(handler); // Clean up the timer on unmount or re-render
// //     };
// //   }, [location, fetchCentersByLocation]); // Re-run when location state changes or fetchCentersByLocation is re-created

// //   const pickImage = async () => {
// //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //     if (status !== 'granted') {
// //       Alert.alert('Permission Required', 'Permission to access media library is required to pick an image!');
// //       return;
// //     }

// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [4, 3], // Maintain aspect ratio
// //       quality: 0.7, // Compress image for better performance
// //     });

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   const onChangeDate = (event, selectedDate) => {
// //     setShowDatePicker(false); // Close picker on Android immediately
// //     if (selectedDate) {
// //       // Set to the selected date. DatePicker returns a Date object.
// //       setPickupDate(selectedDate);
// //     }
// //   };

// //   const onChangeTime = (event, selectedTime) => {
// //     setShowTimePicker(false); // Close picker on Android immediately
// //     if (selectedTime) {
// //       const hours = selectedTime.getHours();
// //       const minutes = selectedTime.getMinutes();
// //       // Format time to HH:MM AM/PM
// //       const ampm = hours >= 12 ? 'PM' : 'AM';
// //       const formattedHour = ((hours + 11) % 12 + 1); // Convert to 12-hour format
// //       const formattedMinutes = minutes.toString().padStart(2, '0');
// //       const formattedTime = `${formattedHour}:${formattedMinutes} ${ampm}`;
// //       setPickupTime(formattedTime);
// //     }
// //   };

// //   const showDatepicker = () => {
// //     setShowDatePicker(true);
// //   };

// //   // Helper function to format date consistently for backend (YYYY-MM-DD)
// //   const formatDateForBackend = (date) => {
// //     if (!date) return '';
// //     const d = new Date(date);
// //     const year = d.getFullYear();
// //     const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
// //     const day = String(d.getDate()).padStart(2, '0');
// //     return `${year}-${month}-${day}`;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async () => {
// //     // Frontend validation
// //     if (
// //       !userId || // Ensure user ID is available
// //       !fullName ||
// //       !phone ||
// //       !location ||
// //       !pickupDate ||
// //       !pickupTime ||
// //       !scrapType ||
// //       !details ||
// //       !weight ||
// //       !selectedCenter || // The name of the selected center
// //       !image // Image URI
// //     ) {
// //       Alert.alert('Validation Error', 'Please ensure all fields are filled before submitting.');
// //       return;
// //     }

// //     // Date validation: pickup date cannot be in the past
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0); // Reset time for comparison
// //     const dateToCheck = new Date(pickupDate);
// //     dateToCheck.setHours(0, 0, 0, 0); // Reset time for comparison

// //     if (dateToCheck < today) {
// //       Alert.alert("Invalid Date", "Pickup date cannot be before today's date.");
// //       return;
// //     }

// //     setLoading(true); // Start loading for form submission
// //     setError(null); // Clear previous errors

// //     // IMPORTANT: Image upload to backend/cloud storage
// //     // The current 'image' state holds a local URI (e.g., 'file:///...').
// //     // Your backend needs a publicly accessible URL for `imageUrl`.
// //     // For a real application, you would implement actual image upload logic here:
// //     // 1. Upload `image` (local URI) to a cloud storage service (e.g., Cloudinary, Firebase Storage, AWS S3).
// //     // 2. Get the public URL returned by the storage service.
// //     // 3. Send that public URL to your backend.
    
// //     // For now, we are sending the local URI directly. Your backend `createRequest` endpoint
// //     // will just store this URI as a string. It will NOT handle actual file upload to server storage.
// //     const finalImageUrl = image; // This needs to be a real URL in production

// //     try {
// //       const requestData = {
// //         fullName,
// //         phoneNumber: phone,
// //         location,
// //         pickupDate: formatDateForBackend(pickupDate), // Format for backend
// //         pickupTime,
// //         scrapType,
// //         details, // This maps to 'description' in your backend Request model
// //         weight: parseFloat(weight), // Ensure weight is a number
// //         selectedCollectionCenterName: selectedCenter, // Send the NAME of the center for lookup
// //         imageUrl: finalImageUrl,
// //       };

// //       // Ensure your backend endpoint is correct: /api/v1/requests/:userId/create/
// //       const response = await axios.post(`${BACKEND_URL}/api/v1/requests/${userId}/create/`, requestData);

// //       Alert.alert('Success', response.data.message || 'Scrap request submitted successfully!');
// //       // Optionally, clear form fields after successful submission
// //       // setLocation(''); setPickupDate(null); setPickupTime(''); setScrapType('');
// //       // setDetails(''); setWeight(''); setImage(null); setSelectedCenter('');

// //     } catch (err) {
// //       console.error("Error submitting request:", err);
// //       // More detailed error messages
// //       const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request. Please try again.';
// //       setError(errorMessage);
// //       Alert.alert("Submission Failed", errorMessage);
// //     } finally {
// //       setLoading(false); // Stop loading for form submission
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.header}>Scrap Pickup Request</Text>

// //       {/* Full Name (Auto-filled & uneditable) */}
// //       <Text style={styles.label}>Full Name</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Full Name"
// //         value={fullName}
// //         editable={false} // Auto-filled from user data, prevent manual editing
// //         placeholderTextColor="#888" // Better contrast for disabled inputs
// //       />

// //       {/* Phone Number (Auto-filled & uneditable) */}
// //       <Text style={styles.label}>Phone Number</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Phone Number"
// //         keyboardType="phone-pad"
// //         value={phone}
// //         editable={false} // Auto-filled from user data, prevent manual editing
// //         placeholderTextColor="#888"
// //       />

// //       {/* Location (User enters to filter centers) */}
// //       <Text style={styles.label}>Your Location (e.g., City, Town)</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter your location (e.g., Nairobi, Mombasa)"
// //         value={location}
// //         onChangeText={setLocation}
// //         placeholderTextColor="#aaa"
// //       />
// //       {centerLoading && <ActivityIndicator size="small" color="green" />}
// //       {centerError && <Text style={styles.errorText}>{centerError}</Text>}


// //       {/* Select Scrap Collection Center (Filtered by Location) */}
// //       <Text style={styles.label}>Select Scrap Collection Center</Text>
// //       <View style={styles.pickerContainer}>
// //         {centerLoading ? (
// //             <ActivityIndicator size="small" color="green" style={{ alignSelf: 'center', marginVertical: 10 }} />
// //         ) : collectionCenters.length > 0 ? (
// //           <Picker
// //             selectedValue={selectedCenter}
// //             onValueChange={(itemValue) => setSelectedCenter(itemValue)}
// //             style={styles.picker}
// //             enabled={collectionCenters.length > 0} // Only enable if there are centers to pick
// //           >
// //             <Picker.Item label="-- Choose Collection Center --" value="" />
// //             {collectionCenters.map((center) => (
// //               <Picker.Item key={center.id} label={center.name} value={center.name} />
// //             ))}
// //           </Picker>
// //         ) : (
// //           <Text style={styles.pickerPlaceholderText}>
// //             {location.trim().length >= 2 ? (centerError || "No centers found, try another location.") : "Enter location above to find centers"}
// //           </Text>
// //         )}
// //       </View>


// //       {/* Preferred Pickup Date */}
// //       <Text style={styles.label}>Preferred Pickup Date</Text>
// //       <TouchableOpacity
// //         style={styles.input}
// //         onPress={showDatepicker}
// //         activeOpacity={0.7}
// //       >
// //         <Text style={{ color: pickupDate ? '#333' : '#aaa', fontSize: 16 }}>
// //           {pickupDate ? formatDateForBackend(pickupDate) : 'Select a date'}
// //         </Text>
// //       </TouchableOpacity>
// //       {showDatePicker && (
// //         <DateTimePicker
// //           value={pickupDate || new Date()}
// //           mode="date"
// //           display="default"
// //           minimumDate={new Date()} // Prevent past date selection
// //           onChange={onChangeDate}
// //         />
// //       )}

// //       {/* Preferred Pickup Time */}
// //       <Text style={styles.label}>Preferred Pickup Time</Text>
// //       <TouchableOpacity
// //         style={styles.input}
// //         onPress={() => setShowTimePicker(true)}
// //         activeOpacity={0.7}
// //       >
// //         <Text style={{ color: pickupTime ? '#333' : '#aaa', fontSize: 16 }}>
// //           {pickupTime || 'Select Pickup Time'}
// //         </Text>
// //       </TouchableOpacity>
// //       {showTimePicker && (
// //         <DateTimePicker
// //           value={new Date()} // Initial value for time picker (can be current time)
// //           mode="time"
// //           display="default"
// //           onChange={onChangeTime}
// //         />
// //       )}

// //       {/* Scrap Type Picker */}
// //       <Text style={styles.label}>Scrap Type</Text>
// //       <View style={styles.pickerContainer}>
// //         <Picker
// //           selectedValue={scrapType}
// //           onValueChange={(itemValue) => setScrapType(itemValue)}
// //           style={styles.picker}
// //         >
// //           <Picker.Item label="-- Select Scrap Type --" value="" />
// //           <Picker.Item label="Metal" value="metal" />
// //           <Picker.Item label="Plastic" value="plastic" />
// //           <Picker.Item label="Electronics" value="electronics" />
// //           <Picker.Item label="Paper/Cardboard" value="paper_cardboard" />
// //           <Picker.Item label="Glass" value="glass" />
// //           <Picker.Item label="Textiles" value="textiles" />
// //           <Picker.Item label="Others" value="others" />
// //         </Picker>
// //       </View>

// //       {/* Details about the scrap */}
// //       <TextInput
// //         style={[styles.input, { height: 100 }]}
// //         placeholder="Details about the scrap (e.g., quantity, condition)"
// //         value={details}
// //         onChangeText={setDetails}
// //         multiline
// //         textAlignVertical="top" // Align text to top for multiline
// //         placeholderTextColor="#aaa"
// //       />

// //       {/* Approximate Weight */}
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Approximate Weight (kg)"
// //         keyboardType="numeric"
// //         value={weight}
// //         onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))} // Allow only numbers and a decimal point
// //         placeholderTextColor="#aaa"
// //       />

// //       {/* Scrap Image */}
// //       <Text style={styles.label}>Scrap Image</Text>
// //       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
// //         {image ? (
// //           <Image source={{ uri: image }} style={styles.imagePreview} />
// //         ) : (
// //           <Text style={{ color: '#aaa' }}>Tap to select an image (e.g., of scrap pile)</Text>
// //         )}
// //       </TouchableOpacity>

// //       {/* Submit Request Button */}
// //       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.submitButtonText}>Submit Request</Text>
// //         )}
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     backgroundColor: '#f5f5f5', // Lighter background
// //   },
// //   header: {
// //     fontSize: 26, // Larger header
// //     color: '#2e7d32', // Dark green
// //     fontWeight: 'bold',
// //     marginBottom: 25,
// //     textAlign: 'center',
// //   },
// //   input: {
// //     borderColor: '#a5d6a7', // Lighter green border
// //     borderWidth: 1,
// //     borderRadius: 10, // More rounded corners
// //     padding: 15,
// //     marginBottom: 18,
// //     fontSize: 16,
// //     color: '#333',
// //     backgroundColor: '#ffffff', // White background for inputs
// //     shadowColor: '#000', // Subtle shadow
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   label: {
// //     color: '#2e7d32',
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     fontSize: 15,
// //   },
// //   pickerContainer: {
// //     borderWidth: 1,
// //     borderColor: '#a5d6a7',
// //     borderRadius: 10,
// //     marginBottom: 18,
// //     overflow: 'hidden',
// //     backgroundColor: '#ffffff',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //     minHeight: 50, // Ensure picker container has height even if no items
// //     justifyContent: 'center',
// //   },
// //   picker: {
// //     height: 50,
// //     width: '100%',
// //     color: '#333',
// //   },
// //   pickerPlaceholderText: {
// //     color: '#aaa',
// //     fontSize: 16,
// //     paddingLeft: 15,
// //   },
// //   imageField: {
// //     height: 180, // Adjusted height
// //     borderWidth: 1,
// //     borderColor: '#a5d6a7',
// //     borderRadius: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 25,
// //     backgroundColor: '#ffffff',
// //     overflow: 'hidden', // Ensure image respects border radius
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   imagePreview: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'cover', // Cover the area
// //   },
// //   submitButton: {
// //     backgroundColor: '#4CAF50', // A nice vibrant green
// //     padding: 18,
// //     borderRadius: 10,
// //     alignItems: 'center', // Center text
// //     marginTop: 10,
// //     marginBottom: 30, // Space at bottom
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 5,
// //     elevation: 5,
// //   },
// //   submitButtonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   errorText: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginBottom: 10,
// //   }
// // });

// // export default RequestScreen;

// //phone number validation
// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView,
// //   Platform,
// //   Alert,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import * as ImagePicker from 'expo-image-picker';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage'; // To get user ID/token

// // // Ensure this IP is correct for your backend server.
// // // If testing on an Android emulator and backend is on the same machine, use 'http://10.0.2.2:5000'
// // const BACKEND_URL = "http://192.168.1.119:5000"; 

// // const RequestScreen = () => {
// //   const [userId, setUserId] = useState(null);
// //   const [fullName, setFullName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [location, setLocation] = useState(''); // User's input for location search
// //   const [pickupDate, setPickupDate] = useState(null);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [pickupTime, setPickupTime] = useState('');
// //   const [showTimePicker, setShowTimePicker] = useState(false);
// //   const [scrapType, setScrapType] = useState('');
// //   const [details, setDetails] = useState('');
// //   const [weight, setWeight] = useState('');
// //   const [image, setImage] = useState(null);
// //   const [collectionCenters, setCollectionCenters] = useState([]);
// //   const [selectedCenter, setSelectedCenter] = useState(''); // Stores the NAME of the selected center
// //   const [loading, setLoading] = useState(false); // For form submission loading
// //   const [centerLoading, setCenterLoading] = useState(false); // For loading centers by location
// //   const [error, setError] = useState(null); // General error for form submission
// //   const [centerError, setCenterError] = useState(null); // Specific error for center fetching

// //   // Auto-fill Full Name and Phone Number from logged-in user
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       setLoading(true); // Indicate loading for user data
// //       try {
// //         const storedToken = await AsyncStorage.getItem("token"); // Assuming token is stored
// //         const storedUserId = await AsyncStorage.getItem("userId"); // Assuming userId is stored

// //         if (storedUserId) {
// //           setUserId(storedUserId);
// //           // Fetch full user info from backend
// //           // Assuming /api/v1/user/info/:userId endpoint exists and returns { user: { username, phoneNo } }
// //           const response = await axios.get(`${BACKEND_URL}/api/v1/user/info/${storedUserId}`, {
// //             headers: { Authorization: `Bearer ${storedToken}` } // If your API requires authentication
// //           });
// //           console.log("User data fetched from backend:", response.data.user); // DEBUG LOG
// //           setFullName(response.data.user.username); // Assuming username is used as full name
// //           // FIX: Explicitly convert phoneNo to String, handling potential null/undefined
// //           setPhone(response.data.user.phoneNo ? String(response.data.user.phoneNo) : ''); 
// //         } else {
// //           Alert.alert("Authentication Required", "Please log in to view and submit requests.");
// //           // Optionally, navigate to login screen if userId is not found
// //           // navigation.navigate('Login');
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch user data:", err);
// //         Alert.alert("Error", "Could not load user details. Please ensure you are logged in and try again.");
// //       } finally {
// //         setLoading(false); // Stop loading for user data
// //       }
// //     };
// //     fetchUserData();
// //   }, []); // Run once on component mount

// //   // Fetch Centers by Location from the 'Center' model
// //   const fetchCentersByLocation = useCallback(async (locationQuery) => {
// //     setCenterLoading(true);
// //     setCenterError(null);
// //     setCollectionCenters([]); // Clear previous centers
// //     setSelectedCenter(''); // Clear selected center

// //     if (!locationQuery || locationQuery.trim().length < 2) { // Require at least 2 characters for search
// //       setCenterLoading(false);
// //       return;
// //     }

// //     try {
// //       // Use the new endpoint for fetching centers by location from the 'Center' model
// //       const response = await axios.get(`${BACKEND_URL}/api/v1/centers-by-location-for-homeowner?location=${encodeURIComponent(locationQuery.trim())}`);
      
// //       if (response.data.centers && response.data.centers.length > 0) {
// //         setCollectionCenters(response.data.centers);
// //       } else {
// //         setCenterError('No registered centers found for this location.');
// //       }
// //     } catch (err) {
// //       console.error("Error fetching centers by location:", err);
// //       setCenterError(err.response?.data?.message || 'Failed to fetch centers for this location. Please check your spelling or try a different location.');
// //     } finally {
// //       setCenterLoading(false);
// //     }
// //   }, [BACKEND_URL]);

// //   // Debounce effect for location input to prevent excessive API calls
// //   useEffect(() => {
// //     const handler = setTimeout(() => {
// //       fetchCentersByLocation(location);
// //     }, 500); // 500ms delay after typing stops

// //     return () => {
// //       clearTimeout(handler); // Clean up the timer on unmount or re-render
// //     };
// //   }, [location, fetchCentersByLocation]); // Re-run when location state changes or fetchCentersByLocation is re-created

// //   const pickImage = async () => {
// //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //     if (status !== 'granted') {
// //       Alert.alert('Permission Required', 'Permission to access media library is required to pick an image!');
// //       return;
// //     }

// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [4, 3], // Maintain aspect ratio
// //       quality: 0.7, // Compress image for better performance
// //     });

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   const onChangeDate = (event, selectedDate) => {
// //     setShowDatePicker(false); // Close picker on Android immediately
// //     if (selectedDate) {
// //       // Set to the selected date. DatePicker returns a Date object.
// //       setPickupDate(selectedDate);
// //     }
// //   };

// //   const onChangeTime = (event, selectedTime) => {
// //     setShowTimePicker(false); // Close picker on Android immediately
// //     if (selectedTime) {
// //       const hours = selectedTime.getHours();
// //       const minutes = selectedTime.getMinutes();
// //       // Format time to HH:MM AM/PM
// //       const ampm = hours >= 12 ? 'PM' : 'AM';
// //       const formattedHour = ((hours + 11) % 12 + 1); // Convert to 12-hour format
// //       const formattedMinutes = minutes.toString().padStart(2, '0');
// //       const formattedTime = `${formattedHour}:${formattedMinutes} ${ampm}`;
// //       setPickupTime(formattedTime);
// //     }
// //   };

// //   const showDatepicker = () => {
// //     setShowDatePicker(true);
// //   };

// //   // Helper function to format date consistently for backend (YYYY-MM-DD)
// //   const formatDateForBackend = (date) => {
// //     if (!date) return '';
// //     const d = new Date(date);
// //     const year = d.getFullYear();
// //     const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
// //     const day = String(d.getDate()).padStart(2, '0');
// //     return `${year}-${month}-${day}`;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async () => {
// //     // Frontend validation
// //     if (
// //       !userId || // Ensure user ID is available
// //       !fullName ||
// //       !phone ||
// //       !location ||
// //       !pickupDate ||
// //       !pickupTime ||
// //       !scrapType ||
// //       !details ||
// //       !weight ||
// //       !selectedCenter || // The name of the selected center
// //       !image // Image URI
// //     ) {
// //       Alert.alert('Validation Error', 'Please ensure all fields are filled before submitting.');
// //       return;
// //     }

// //     // Date validation: pickup date cannot be in the past
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0); // Reset time for comparison
// //     const dateToCheck = new Date(pickupDate);
// //     dateToCheck.setHours(0, 0, 0, 0); // Reset time for comparison

// //     if (dateToCheck < today) {
// //       Alert.alert("Invalid Date", "Pickup date cannot be before today's date.");
// //       return;
// //     }

// //     setLoading(true); // Start loading for form submission
// //     setError(null); // Clear previous errors

// //     // IMPORTANT: Image upload to backend/cloud storage
// //     // The current 'image' state holds a local URI (e.g., 'file:///...').
// //     // Your backend needs a publicly accessible URL for `imageUrl`.
// //     // For a real application, you would implement actual image upload logic here:
// //     // 1. Upload `image` (local URI) to a cloud storage service (e.g., Cloudinary, Firebase Storage, AWS S3).
// //     // 2. Get the public URL returned by the storage service.
// //     // 3. Send that public URL to your backend.
    
// //     // For now, we are sending the local URI directly. Your backend `createRequest` endpoint
// //     // will just store this URI as a string. It will NOT handle actual file upload to server storage.
// //     const finalImageUrl = image; // This needs to be a real URL in production

// //     try {
// //       const requestData = {
// //         fullName,
// //         phoneNumber: phone,
// //         location,
// //         pickupDate: formatDateForBackend(pickupDate), // Format for backend
// //         pickupTime,
// //         scrapType,
// //         details, // This maps to 'description' in your backend Request model
// //         weight: parseFloat(weight), // Ensure weight is a number
// //         selectedCollectionCenterName: selectedCenter, // Send the NAME of the center for lookup
// //         imageUrl: finalImageUrl,
// //       };

// //       // Ensure your backend endpoint is correct: /api/v1/requests/:userId/create/
// //       const response = await axios.post(`${BACKEND_URL}/api/v1/requests/${userId}/create/`, requestData);

// //       Alert.alert('Success', response.data.message || 'Scrap request submitted successfully!');
// //       // Optionally, clear form fields after successful submission
// //       // setLocation(''); setPickupDate(null); setPickupTime(''); setScrapType('');
// //       // setDetails(''); setWeight(''); setImage(null); setSelectedCenter('');

// //     } catch (err) {
// //       console.error("Error submitting request:", err);
// //       // More detailed error messages
// //       const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request. Please try again.';
// //       setError(errorMessage);
// //       Alert.alert("Submission Failed", errorMessage);
// //     } finally {
// //       setLoading(false); // Stop loading for form submission
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.header}>Scrap Pickup Request</Text>

// //       {/* Full Name (Auto-filled & uneditable) */}
// //       <Text style={styles.label}>Full Name</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Full Name"
// //         value={fullName}
// //         editable={false} // Auto-filled from user data, prevent manual editing
// //         placeholderTextColor="#888" // Better contrast for disabled inputs
// //       />

// //       {/* Phone Number (Auto-filled & uneditable) */}
// //       <Text style={styles.label}>Phone Number</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Phone Number"
// //         keyboardType="phone-pad"
// //         value={phone}
// //         editable={false} // Auto-filled from user data, prevent manual editing
// //         placeholderTextColor="#888"
// //       />

// //       {/* Location (User enters to filter centers) */}
// //       <Text style={styles.label}>Your Location (e.g., City, Town)</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter your location (e.g., Nairobi, Mombasa)"
// //         value={location}
// //         onChangeText={setLocation}
// //         placeholderTextColor="#aaa"
// //       />
// //       {centerLoading && <ActivityIndicator size="small" color="green" />}
// //       {centerError && <Text style={styles.errorText}>{centerError}</Text>}


// //       {/* Select Scrap Collection Center (Filtered by Location) */}
// //       <Text style={styles.label}>Select Scrap Collection Center</Text>
// //       <View style={styles.pickerContainer}>
// //         {centerLoading ? (
// //             <ActivityIndicator size="small" color="green" style={{ alignSelf: 'center', marginVertical: 10 }} />
// //         ) : collectionCenters.length > 0 ? (
// //           <Picker
// //             selectedValue={selectedCenter}
// //             onValueChange={(itemValue) => setSelectedCenter(itemValue)}
// //             style={styles.picker}
// //             enabled={collectionCenters.length > 0} // Only enable if there are centers to pick
// //           >
// //             <Picker.Item label="-- Choose Collection Center --" value="" />
// //             {collectionCenters.map((center) => (
// //               <Picker.Item key={center.id} label={center.name} value={center.name} />
// //             ))}
// //           </Picker>
// //         ) : (
// //           <Text style={styles.pickerPlaceholderText}>
// //             {location.trim().length >= 2 ? (centerError || "No centers found, try another location.") : "Enter location above to find centers"}
// //           </Text>
// //         )}
// //       </View>


// //       {/* Preferred Pickup Date */}
// //       <Text style={styles.label}>Preferred Pickup Date</Text>
// //       <TouchableOpacity
// //         style={styles.input}
// //         onPress={showDatepicker}
// //         activeOpacity={0.7}
// //       >
// //         <Text style={{ color: pickupDate ? '#333' : '#aaa', fontSize: 16 }}>
// //           {pickupDate ? formatDateForBackend(pickupDate) : 'Select a date'}
// //         </Text>
// //       </TouchableOpacity>
// //       {showDatePicker && (
// //         <DateTimePicker
// //           value={pickupDate || new Date()}
// //           mode="date"
// //           display="default"
// //           minimumDate={new Date()} // Prevent past date selection
// //           onChange={onChangeDate}
// //         />
// //       )}

// //       {/* Preferred Pickup Time */}
// //       <Text style={styles.label}>Preferred Pickup Time</Text>
// //       <TouchableOpacity
// //         style={styles.input}
// //         onPress={() => setShowTimePicker(true)}
// //         activeOpacity={0.7}
// //       >
// //         <Text style={{ color: pickupTime ? '#333' : '#aaa', fontSize: 16 }}>
// //           {pickupTime || 'Select Pickup Time'}
// //         </Text>
// //       </TouchableOpacity>
// //       {showTimePicker && (
// //         <DateTimePicker
// //           value={new Date()} // Initial value for time picker (can be current time)
// //           mode="time"
// //           display="default"
// //           onChange={onChangeTime}
// //         />
// //       )}

// //       {/* Scrap Type Picker */}
// //       <Text style={styles.label}>Scrap Type</Text>
// //       <View style={styles.pickerContainer}>
// //         <Picker
// //           selectedValue={scrapType}
// //           onValueChange={(itemValue) => setScrapType(itemValue)}
// //           style={styles.picker}
// //         >
// //           <Picker.Item label="-- Select Scrap Type --" value="" />
// //           <Picker.Item label="Metal" value="metal" />
// //           <Picker.Item label="Plastic" value="plastic" />
// //           <Picker.Item label="Electronics" value="electronics" />
// //           <Picker.Item label="Paper/Cardboard" value="paper_cardboard" />
// //           <Picker.Item label="Glass" value="glass" />
// //           <Picker.Item label="Textiles" value="textiles" />
// //           <Picker.Item label="Others" value="others" />
// //         </Picker>
// //       </View>

// //       {/* Details about the scrap */}
// //       <TextInput
// //         style={[styles.input, { height: 100 }]}
// //         placeholder="Details about the scrap (e.g., quantity, condition)"
// //         value={details}
// //         onChangeText={setDetails}
// //         multiline
// //         textAlignVertical="top" // Align text to top for multiline
// //         placeholderTextColor="#aaa"
// //       />

// //       {/* Approximate Weight */}
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Approximate Weight (kg)"
// //         keyboardType="numeric"
// //         value={weight}
// //         onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))} // Allow only numbers and a decimal point
// //         placeholderTextColor="#aaa"
// //       />

// //       {/* Scrap Image */}
// //       <Text style={styles.label}>Scrap Image</Text>
// //       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
// //         {image ? (
// //           <Image source={{ uri: image }} style={styles.imagePreview} />
// //         ) : (
// //           <Text style={{ color: '#aaa' }}>Tap to select an image (e.g., of scrap pile)</Text>
// //         )}
// //       </TouchableOpacity>

// //       {/* Submit Request Button */}
// //       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.submitButtonText}>Submit Request</Text>
// //         )}
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     backgroundColor: '#f5f5f5', // Lighter background
// //   },
// //   header: {
// //     fontSize: 26, // Larger header
// //     color: '#2e7d32', // Dark green
// //     fontWeight: 'bold',
// //     marginBottom: 25,
// //     textAlign: 'center',
// //   },
// //   input: {
// //     borderColor: '#a5d6a7', // Lighter green border
// //     borderWidth: 1,
// //     borderRadius: 10, // More rounded corners
// //     padding: 15,
// //     marginBottom: 18,
// //     fontSize: 16,
// //     color: '#333',
// //     backgroundColor: '#ffffff', // White background for inputs
// //     shadowColor: '#000', // Subtle shadow
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   label: {
// //     color: '#2e7d32',
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     fontSize: 15,
// //   },
// //   pickerContainer: {
// //     borderWidth: 1,
// //     borderColor: '#a5d6a7',
// //     borderRadius: 10,
// //     marginBottom: 18,
// //     overflow: 'hidden',
// //     backgroundColor: '#ffffff',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //     minHeight: 50, // Ensure picker container has height even if no items
// //     justifyContent: 'center',
// //   },
// //   picker: {
// //     height: 50,
// //     width: '100%',
// //     color: '#333',
// //   },
// //   pickerPlaceholderText: {
// //     color: '#aaa',
// //     fontSize: 16,
// //     paddingLeft: 15,
// //   },
// //   imageField: {
// //     height: 180, // Adjusted height
// //     borderWidth: 1,
// //     borderColor: '#a5d6a7',
// //     borderRadius: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 25,
// //     backgroundColor: '#ffffff',
// //     overflow: 'hidden', // Ensure image respects border radius
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   imagePreview: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'cover', // Cover the area
// //   },
// //   submitButton: {
// //     backgroundColor: '#4CAF50', // A nice vibrant green
// //     padding: 18,
// //     borderRadius: 10,
// //     alignItems: 'center', // Center text
// //     marginTop: 10,
// //     marginBottom: 30, // Space at bottom
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 5,
// //     elevation: 5,
// //   },
// //   submitButtonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   errorText: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginBottom: 10,
// //   }
// // });

// // export default RequestScreen;

// //image test
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // To get user ID/token

// // Ensure this IP is correct for your backend server.
// // If testing on an Android emulator and backend is on the same machine, use 'http://10.0.2.2:5000'
// const BACKEND_URL = "http://192.168.1.119:5000"; 

// const RequestScreen = () => {
//   const [userId, setUserId] = useState(null);
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState(''); // User's input for location search
//   const [pickupDate, setPickupDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [pickupTime, setPickupTime] = useState('');
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [scrapType, setScrapType] = useState('');
//   const [details, setDetails] = useState('');
//   const [weight, setWeight] = useState('');
//   const [image, setImage] = useState(null);
//   const [collectionCenters, setCollectionCenters] = useState([]);
//   const [selectedCenter, setSelectedCenter] = useState(''); // Stores the NAME of the selected center
//   const [loading, setLoading] = useState(false); // For form submission loading
//   const [centerLoading, setCenterLoading] = useState(false); // For loading centers by location
//   const [error, setError] = useState(null); // General error for form submission
//   const [centerError, setCenterError] = useState(null); // Specific error for center fetching

//   // Auto-fill Full Name and Phone Number from logged-in user
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true); // Indicate loading for user data
//       try {
//         const storedToken = await AsyncStorage.getItem("token"); // Assuming token is stored
//         const storedUserId = await AsyncStorage.getItem("userId"); // Assuming userId is stored

//         if (storedUserId) {
//           setUserId(storedUserId);
//           // Fetch full user info from backend
//           // Assuming /api/v1/user/info/:userId endpoint exists and returns { user: { username, phoneNo } }
//           const response = await axios.get(`${BACKEND_URL}/api/v1/user/info/${storedUserId}`, {
//             headers: { Authorization: `Bearer ${storedToken}` } // If your API requires authentication
//           });
//           console.log("User data fetched from backend:", response.data.user); // DEBUG LOG
//           setFullName(response.data.user.username); // Assuming username is used as full name
//           // FIX: Explicitly convert phoneNo to String, handling potential null/undefined
//           setPhone(response.data.user.phoneNo ? String(response.data.user.phoneNo) : ''); 
//         } else {
//           Alert.alert("Authentication Required", "Please log in to view and submit requests.");
//           // Optionally, navigate to login screen if userId is not found
//           // navigation.navigate('Login');
//         }
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         Alert.alert("Error", "Could not load user details. Please ensure you are logged in and try again.");
//       } finally {
//         setLoading(false); // Stop loading for user data
//       }
//     };
//     fetchUserData();
//   }, []); // Run once on component mount

//   // Fetch Centers by Location from the 'Center' model
//   const fetchCentersByLocation = useCallback(async (locationQuery) => {
//     setCenterLoading(true);
//     setCenterError(null);
//     setCollectionCenters([]); // Clear previous centers
//     setSelectedCenter(''); // Clear selected center

//     if (!locationQuery || locationQuery.trim().length < 2) { // Require at least 2 characters for search
//       setCenterLoading(false);
//       return;
//     }

//     try {
//       // Use the new endpoint for fetching centers by location from the 'Center' model
//       const response = await axios.get(`${BACKEND_URL}/api/v1/centers-by-location-for-homeowner?location=${encodeURIComponent(locationQuery.trim())}`);
      
//       if (response.data.centers && response.data.centers.length > 0) {
//         setCollectionCenters(response.data.centers);
//       } else {
//         setCenterError('No registered centers found for this location.');
//       }
//     } catch (err) {
//       console.error("Error fetching centers by location:", err);
//       setCenterError(err.response?.data?.message || 'Failed to fetch centers for this location. Please check your spelling or try a different location.');
//     } finally {
//       setCenterLoading(false);
//     }
//   }, [BACKEND_URL]);

//   // Debounce effect for location input to prevent excessive API calls
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       fetchCentersByLocation(location);
//     }, 500); // 500ms delay after typing stops

//     return () => {
//       clearTimeout(handler); // Clean up the timer on unmount or re-render
//     };
//   }, [location, fetchCentersByLocation]); // Re-run when location state changes or fetchCentersByLocation is re-created

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Required', 'Permission to access media library is required to pick an image!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false, // Changed this to false to prevent cropping
//       quality: 0.7, // Compress image for better performance
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const onChangeDate = (event, selectedDate) => {
//     setShowDatePicker(false); // Close picker on Android immediately
//     if (selectedDate) {
//       // Set to the selected date. DatePicker returns a Date object.
//       setPickupDate(selectedDate);
//     }
//   };

//   const onChangeTime = (event, selectedTime) => {
//     setShowTimePicker(false); // Close picker on Android immediately
//     if (selectedTime) {
//       const hours = selectedTime.getHours();
//       const minutes = selectedTime.getMinutes();
//       // Format time to HH:MM AM/PM
//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       const formattedHour = ((hours + 11) % 12 + 1); // Convert to 12-hour format
//       const formattedMinutes = minutes.toString().padStart(2, '0');
//       const formattedTime = `${formattedHour}:${formattedMinutes} ${ampm}`;
//       setPickupTime(formattedTime);
//     }
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   // Helper function to format date consistently for backend (YYYY-MM-DD)
//   const formatDateForBackend = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const day = String(d.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     // Frontend validation
//     if (
//       !userId || // Ensure user ID is available
//       !fullName ||
//       !phone ||
//       !location ||
//       !pickupDate ||
//       !pickupTime ||
//       !scrapType ||
//       !details ||
//       !weight ||
//       !selectedCenter || // The name of the selected center
//       !image // Image URI
//     ) {
//       Alert.alert('Validation Error', 'Please ensure all fields are filled before submitting.');
//       return;
//     }

//     // Date validation: pickup date cannot be in the past
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Reset time for comparison
//     const dateToCheck = new Date(pickupDate);
//     dateToCheck.setHours(0, 0, 0, 0); // Reset time for comparison

//     if (dateToCheck < today) {
//       Alert.alert("Invalid Date", "Pickup date cannot be before today's date.");
//       return;
//     }

//     setLoading(true); // Start loading for form submission and disable button
//     setError(null); // Clear previous errors

//     // IMPORTANT: Image upload to backend/cloud storage
//     // The current 'image' state holds a local URI (e.g., 'file:///...').
//     // Your backend needs a publicly accessible URL for `imageUrl`.
//     // For a real application, you would implement actual image upload logic here:
//     // 1. Upload `image` (local URI) to a cloud storage service (e.g., Cloudinary, Firebase Storage, AWS S3).
//     // 2. Get the public URL returned by the storage service.
//     // 3. Send that public URL to your backend.
    
//     // For now, we are sending the local URI directly. Your backend `createRequest` endpoint
//     // will just store this URI as a string. It will NOT handle actual file upload to server storage.
//     const finalImageUrl = image; // This needs to be a real URL in production

//     try {
//       const requestData = {
//         fullName,
//         phoneNumber: phone,
//         location,
//         pickupDate: formatDateForBackend(pickupDate), // Format for backend
//         pickupTime,
//         scrapType,
//         details, // This maps to 'description' in your backend Request model
//         weight: parseFloat(weight), // Ensure weight is a number
//         selectedCollectionCenterName: selectedCenter, // Send the NAME of the center for lookup
//         imageUrl: finalImageUrl,
//       };

//       // Ensure your backend endpoint is correct: /api/v1/requests/:userId/create/
//       const response = await axios.post(`${BACKEND_URL}/api/v1/requests/${userId}/create/`, requestData);

//       Alert.alert('Success', response.data.message || 'Scrap request submitted successfully!');
//       // Optionally, clear form fields after successful submission
//       // setLocation(''); setPickupDate(null); setPickupTime(''); setScrapType('');
//       // setDetails(''); setWeight(''); setImage(null); setSelectedCenter('');

//     } catch (err) {
//       console.error("Error submitting request:", err);
//       // More detailed error messages
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request. Please try again.';
//       setError(errorMessage);
//       Alert.alert("Submission Failed", errorMessage);
//     } finally {
//       setLoading(false); // Stop loading for form submission and re-enable button
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Scrap Pickup Request</Text>

//       {/* Full Name (Auto-filled & uneditable) */}
//       <Text style={styles.label}>Full Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={fullName}
//         editable={false} // Auto-filled from user data, prevent manual editing
//         placeholderTextColor="#888" // Better contrast for disabled inputs
//       />

//       {/* Phone Number (Auto-filled & uneditable) */}
//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         keyboardType="phone-pad"
//         value={phone}
//         editable={false} // Auto-filled from user data, prevent manual editing
//         placeholderTextColor="#888"
//       />

//       {/* Location (User enters to filter centers) */}
//       <Text style={styles.label}>Your Location (e.g., City, Town)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your location (e.g., Nairobi, Mombasa)"
//         value={location}
//         onChangeText={setLocation}
//         placeholderTextColor="#aaa"
//       />
//       {centerLoading && <ActivityIndicator size="small" color="green" />}
//       {centerError && <Text style={styles.errorText}>{centerError}</Text>}


//       {/* Select Scrap Collection Center (Filtered by Location) */}
//       <Text style={styles.label}>Select Scrap Collection Center</Text>
//       <View style={styles.pickerContainer}>
//         {centerLoading ? (
//             <ActivityIndicator size="small" color="green" style={{ alignSelf: 'center', marginVertical: 10 }} />
//         ) : collectionCenters.length > 0 ? (
//           <Picker
//             selectedValue={selectedCenter}
//             onValueChange={(itemValue) => setSelectedCenter(itemValue)}
//             style={styles.picker}
//             enabled={collectionCenters.length > 0} // Only enable if there are centers to pick
//           >
//             <Picker.Item label="-- Choose Collection Center --" value="" />
//             {collectionCenters.map((center) => (
//               <Picker.Item key={center.id} label={center.name} value={center.name} />
//             ))}
//           </Picker>
//         ) : (
//           <Text style={styles.pickerPlaceholderText}>
//             {location.trim().length >= 2 ? (centerError || "No centers found, try another location.") : "Enter location above to find centers"}
//           </Text>
//         )}
//       </View>


//       {/* Preferred Pickup Date */}
//       <Text style={styles.label}>Preferred Pickup Date</Text>
//       <TouchableOpacity
//         style={styles.input}
//         onPress={showDatepicker}
//         activeOpacity={0.7}
//       >
//         <Text style={{ color: pickupDate ? '#333' : '#aaa', fontSize: 16 }}>
//           {pickupDate ? formatDateForBackend(pickupDate) : 'Select a date'}
//         </Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={pickupDate || new Date()}
//           mode="date"
//           display="default"
//           minimumDate={new Date()} // Prevent past date selection
//           onChange={onChangeDate}
//         />
//       )}

//       {/* Preferred Pickup Time */}
//       <Text style={styles.label}>Preferred Pickup Time</Text>
//       <TouchableOpacity
//         style={styles.input}
//         onPress={() => setShowTimePicker(true)}
//         activeOpacity={0.7}
//       >
//         <Text style={{ color: pickupTime ? '#333' : '#aaa', fontSize: 16 }}>
//           {pickupTime || 'Select Pickup Time'}
//         </Text>
//       </TouchableOpacity>
//       {showTimePicker && (
//         <DateTimePicker
//           value={new Date()} // Initial value for time picker (can be current time)
//           mode="time"
//           display="default"
//           onChange={onChangeTime}
//         />
//       )}

//       {/* Scrap Type Picker */}
//       <Text style={styles.label}>Scrap Type</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={scrapType}
//           onValueChange={(itemValue) => setScrapType(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="-- Select Scrap Type --" value="" />
//           <Picker.Item label="Metal" value="metal" />
//           <Picker.Item label="Plastic" value="plastic" />
//           <Picker.Item label="Electronics" value="electronics" />
//           <Picker.Item label="Paper/Cardboard" value="paper_cardboard" />
//           <Picker.Item label="Glass" value="glass" />
//           <Picker.Item label="Textiles" value="textiles" />
//           <Picker.Item label="Others" value="others" />
//         </Picker>
//       </View>

//       {/* Details about the scrap */}
//       <TextInput
//         style={[styles.input, { height: 100 }]}
//         placeholder="Details about the scrap (e.g., quantity, condition)"
//         value={details}
//         onChangeText={setDetails}
//         multiline
//         textAlignVertical="top" // Align text to top for multiline
//         placeholderTextColor="#aaa"
//       />

//       {/* Approximate Weight */}
//       <TextInput
//         style={styles.input}
//         placeholder="Approximate Weight (kg)"
//         keyboardType="numeric"
//         value={weight}
//         onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))} // Allow only numbers and a decimal point
//         placeholderTextColor="#aaa"
//       />

//       {/* Scrap Image */}
//       <Text style={styles.label}>Scrap Image</Text>
//       <TouchableOpacity style={styles.imageField} onPress={pickImage}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.imagePreview} />
//         ) : (
//           <Text style={{ color: '#aaa' }}>Tap to select an image (e.g., of scrap pile)</Text>
//         )}
//       </TouchableOpacity>

//       {/* Submit Request Button */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.submitButtonText}>Submit Request</Text>
//         )}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f5f5f5', // Lighter background
//   },
//   header: {
//     fontSize: 26, // Larger header
//     color: '#2e7d32', // Dark green
//     fontWeight: 'bold',
//     marginBottom: 25,
//     textAlign: 'center',
//   },
//   input: {
//     borderColor: '#a5d6a7', // Lighter green border
//     borderWidth: 1,
//     borderRadius: 10, // More rounded corners
//     padding: 15,
//     marginBottom: 18,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#ffffff', // White background for inputs
//     shadowColor: '#000', // Subtle shadow
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   label: {
//     color: '#2e7d32',
//     fontWeight: 'bold',
//     marginBottom: 10,
//     fontSize: 15,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#a5d6a7',
//     borderRadius: 10,
//     marginBottom: 18,
//     overflow: 'hidden',
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     minHeight: 50, // Ensure picker container has height even if no items
//     justifyContent: 'center',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: '#333',
//   },
//   pickerPlaceholderText: {
//     color: '#aaa',
//     fontSize: 16,
//     paddingLeft: 15,
//   },
//   imageField: {
//     height: 180, // Adjusted height
//     borderWidth: 1,
//     borderColor: '#a5d6a7',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 25,
//     backgroundColor: '#ffffff',
//     overflow: 'hidden', // Ensure image respects border radius
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   imagePreview: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain', // Changed to 'contain' to show the full image without cropping
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50', // A nice vibrant green
//     padding: 18,
//     borderRadius: 10,
//     alignItems: 'center', // Center text
//     marginTop: 10,
//     marginBottom: 30, // Space at bottom
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   }
// });

// export default RequestScreen;




//request button test
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To get user ID/token

// Ensure this IP is correct for your backend server.
// If testing on an Android emulator and backend is on the same machine, use 'http://10.0.2.2:5000'
const BACKEND_URL = "http://192.168.1.119:5000"; 

const RequestScreen = () => {
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(''); // User's input for location search
  const [pickupDate, setPickupDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [scrapType, setScrapType] = useState('');
  const [details, setDetails] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);
  const [collectionCenters, setCollectionCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(''); // Stores the NAME of the selected center
  const [loading, setLoading] = useState(false); // For form submission loading
  const [centerLoading, setCenterLoading] = useState(false); // For loading centers by location
  const [error, setError] = useState(null); // General error for form submission
  const [centerError, setCenterError] = useState(null); // Specific error for center fetching

  // Auto-fill Full Name and Phone Number from logged-in user
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Indicate loading for user data
      try {
        const storedToken = await AsyncStorage.getItem("token"); // Assuming token is stored
        const storedUserId = await AsyncStorage.getItem("userId"); // Assuming userId is stored

        if (storedUserId) {
          setUserId(storedUserId);
          // Fetch full user info from backend
          // Assuming /api/v1/user/info/:userId endpoint exists and returns { user: { username, phoneNo } }
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/info/${storedUserId}`, {
            headers: { Authorization: `Bearer ${storedToken}` } // If your API requires authentication
          });
          console.log("User data fetched from backend:", response.data.user); // DEBUG LOG
          setFullName(response.data.user.username); // Assuming username is used as full name
          // FIX: Explicitly convert phoneNo to String, handling potential null/undefined
          setPhone(response.data.user.phoneNo ? String(response.data.user.phoneNo) : ''); 
        } else {
          Alert.alert("Authentication Required", "Please log in to view and submit requests.");
          // Optionally, navigate to login screen if userId is not found
          // navigation.navigate('Login');
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        Alert.alert("Error", "Could not load user details. Please ensure you are logged in and try again.");
      } finally {
        setLoading(false); // Stop loading for user data
      }
    };
    fetchUserData();
  }, []); // Run once on component mount

  // Fetch Centers by Location from the 'Center' model
  const fetchCentersByLocation = useCallback(async (locationQuery) => {
    setCenterLoading(true);
    setCenterError(null);
    setCollectionCenters([]); // Clear previous centers
    setSelectedCenter(''); // Clear selected selectedCenter

    if (!locationQuery || locationQuery.trim().length < 2) { // Require at least 2 characters for search
      setCenterLoading(false);
      return;
    }

    try {
      // Use the new endpoint for fetching centers by location from the 'Center' model
      const response = await axios.get(`${BACKEND_URL}/api/v1/centers-by-location-for-homeowner?location=${encodeURIComponent(locationQuery.trim())}`);
      
      if (response.data.centers && response.data.centers.length > 0) {
        setCollectionCenters(response.data.centers);
      } else {
        setCenterError('No registered centers found for this location.');
      }
    } catch (err) {
      console.error("Error fetching centers by location:", err);
      setCenterError(err.response?.data?.message || 'Failed to fetch centers for this location. Please check your spelling or try a different location.');
    } finally {
      setCenterLoading(false);
    }
  }, [BACKEND_URL]);

  // Debounce effect for location input to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCentersByLocation(location);
    }, 500); // 500ms delay after typing stops

    return () => {
      clearTimeout(handler); // Clean up the timer on unmount or re-render
    };
  }, [location, fetchCentersByLocation]); // Re-run when location state changes or fetchCentersByLocation is re-created

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required to pick an image!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Changed this to false to prevent cropping
      quality: 0.7, // Compress image for better performance
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Close picker on Android immediately
    if (selectedDate) {
      // Set to the selected date. DatePicker returns a Date object.
      setPickupDate(selectedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false); // Close picker on Android immediately
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      // Format time to HH:MM AM/PM
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = ((hours + 11) % 12 + 1); // Convert to 12-hour format
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedTime = `${formattedHour}:${formattedMinutes} ${ampm}`;
      setPickupTime(formattedTime);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Helper function to format date consistently for backend (YYYY-MM-DD)
  const formatDateForBackend = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Frontend validation
    if (
      !userId || // Ensure user ID is available
      !fullName ||
      !phone ||
      !location ||
      !pickupDate ||
      !pickupTime ||
      !scrapType ||
      !details ||
      !weight ||
      !selectedCenter || // The name of the selected center
      !image // Image URI
    ) {
      Alert.alert('Validation Error', 'Please ensure all fields are filled before submitting.');
      return;
    }

    // Date validation: pickup date cannot be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    const dateToCheck = new Date(pickupDate);
    dateToCheck.setHours(0, 0, 0, 0); // Reset time for comparison

    if (dateToCheck < today) {
      Alert.alert("Invalid Date", "Pickup date cannot be before today's date.");
      return;
    }

    setLoading(true); // Start loading for form submission and disable button
    setError(null); // Clear previous errors

    // IMPORTANT: Image upload to backend/cloud storage
    // The current 'image' state holds a local URI (e.g., 'file:///...').
    // Your backend needs a publicly accessible URL for `imageUrl`.
    // For a real application, you would implement actual image upload logic here:
    // 1. Upload `image` (local URI) to a cloud storage service (e.g., Cloudinary, Firebase Storage, AWS S3).
    // 2. Get the public URL returned by the storage service.
    // 3. Send that public URL to your backend.
    
    // For now, we are sending the local URI directly. Your backend `createRequest` endpoint
    // will just store this URI as a string. It will NOT handle actual file upload to server storage.
    const finalImageUrl = image; // This needs to be a real URL in production

    try {
      const requestData = {
        fullName,
        phoneNumber: phone,
        location,
        pickupDate: formatDateForBackend(pickupDate), // Format for backend
        pickupTime,
        scrapType,
        details, // This maps to 'description' in your backend Request model
        weight: parseFloat(weight), // Ensure weight is a number
        selectedCollectionCenterName: selectedCenter, // Send the NAME of the center for lookup
        imageUrl: finalImageUrl,
      };

      // Ensure your backend endpoint is correct: /api/v1/requests/:userId/create/
      const response = await axios.post(`${BACKEND_URL}/api/v1/requests/${userId}/create/`, requestData);

      Alert.alert('Success', response.data.message || 'Scrap request submitted successfully!');
      
      // --- START: Added form field clearing logic ---
      setLocation(''); 
      setPickupDate(null); 
      setPickupTime(''); 
      setScrapType('');
      setDetails(''); 
      setWeight(''); 
      setImage(null); 
      setSelectedCenter('');
      // --- END: Added form field clearing logic ---

    } catch (err) {
      console.error("Error submitting request:", err);
      // More detailed error messages
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request. Please try again.';
      setError(errorMessage);
      Alert.alert("Submission Failed", errorMessage);
    } finally {
      setLoading(false); // Stop loading for form submission and re-enable button
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Scrap Pickup Request</Text>

      {/* Full Name (Auto-filled & uneditable) */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        editable={false} // Auto-filled from user data, prevent manual editing
        placeholderTextColor="#888" // Better contrast for disabled inputs
      />

      {/* Phone Number (Auto-filled & uneditable) */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        editable={false} // Auto-filled from user data, prevent manual editing
        placeholderTextColor="#888"
      />

      {/* Location (User enters to filter centers) */}
      <Text style={styles.label}>Your Location (e.g., City, Town)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location (e.g., Nairobi, Mombasa)"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#aaa"
      />
      {centerLoading && <ActivityIndicator size="small" color="green" />}
      {centerError && <Text style={styles.errorText}>{centerError}</Text>}


      {/* Select Scrap Collection Center (Filtered by Location) */}
      <Text style={styles.label}>Select Scrap Collection Center</Text>
      <View style={styles.pickerContainer}>
        {centerLoading ? (
            <ActivityIndicator size="small" color="green" style={{ alignSelf: 'center', marginVertical: 10 }} />
        ) : collectionCenters.length > 0 ? (
          <Picker
            selectedValue={selectedCenter}
            onValueChange={(itemValue) => setSelectedCenter(itemValue)}
            style={styles.picker}
            enabled={collectionCenters.length > 0} // Only enable if there are centers to pick
          >
            <Picker.Item label="-- Choose Collection Center --" value="" />
            {collectionCenters.map((center) => (
              <Picker.Item key={center.id} label={center.name} value={center.name} />
            ))}
          </Picker>
        ) : (
          <Text style={styles.pickerPlaceholderText}>
            {location.trim().length >= 2 ? (centerError || "No centers found, try another location.") : "Enter location above to find centers"}
          </Text>
        )}
      </View>


      {/* Preferred Pickup Date */}
      <Text style={styles.label}>Preferred Pickup Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={showDatepicker}
        activeOpacity={0.7}
      >
        <Text style={{ color: pickupDate ? '#333' : '#aaa', fontSize: 16 }}>
          {pickupDate ? formatDateForBackend(pickupDate) : 'Select a date'}
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

      {/* Preferred Pickup Time */}
      <Text style={styles.label}>Preferred Pickup Time</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: pickupTime ? '#333' : '#aaa', fontSize: 16 }}>
          {pickupTime || 'Select Pickup Time'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={new Date()} // Initial value for time picker (can be current time)
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* Scrap Type Picker */}
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
          <Picker.Item label="Paper/Cardboard" value="paper_cardboard" />
          <Picker.Item label="Glass" value="glass" />
          <Picker.Item label="Textiles" value="textiles" />
          <Picker.Item label="Others" value="others" />
        </Picker>
      </View>

      {/* Details about the scrap */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Details about the scrap (e.g., quantity, condition)"
        value={details}
        onChangeText={setDetails}
        multiline
        textAlignVertical="top" // Align text to top for multiline
        placeholderTextColor="#aaa"
      />

      {/* Approximate Weight */}
      <TextInput
        style={styles.input}
        placeholder="Approximate Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ''))} // Allow only numbers and a decimal point
        placeholderTextColor="#aaa"
      />

      {/* Scrap Image */}
      <Text style={styles.label}>Scrap Image</Text>
      <TouchableOpacity style={styles.imageField} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: '#aaa' }}>Tap to select an image (e.g., of scrap pile)</Text>
        )}
      </TouchableOpacity>

      {/* Submit Request Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Request</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5', // Lighter background
  },
  header: {
    fontSize: 26, // Larger header
    color: '#2e7d32', // Dark green
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderColor: '#a5d6a7', // Lighter green border
    borderWidth: 1,
    borderRadius: 10, // More rounded corners
    padding: 15,
    marginBottom: 18,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff', // White background for inputs
    shadowColor: '#000', // Subtle shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#a5d6a7',
    borderRadius: 10,
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 50, // Ensure picker container has height even if no items
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  pickerPlaceholderText: {
    color: '#aaa',
    fontSize: 16,
    paddingLeft: 15,
  },
  imageField: {
    height: 180, // Adjusted height
    borderWidth: 1,
    borderColor: '#a5d6a7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#ffffff',
    overflow: 'hidden', // Ensure image respects border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Changed to 'contain' to show the full image without cropping
  },
  submitButton: {
    backgroundColor: '#4CAF50', // A nice vibrant green
    padding: 18,
    borderRadius: 10,
    alignItems: 'center', // Center text
    marginTop: 10,
    marginBottom: 30, // Space at bottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  }
});

export default RequestScreen;