// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";

// export default function AdminSignUp({ navigation }) {
//   const [fullName, setFullName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [phone, setPhone] = React.useState("");
//   // const [role, setRole] = React.useState("");
//   const [location, setLocation] = React.useState("");
//   const [center, setScrapCenter] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [confirmPassword, setConfirmPassword] = React.useState("");
//   const [isPasswordVisible, setPasswordVisible] = React.useState(false);
//   const [isConfirmVisible, setConfirmVisible] = React.useState(false);

//   const isStrongPassword = (pwd) =>
//     pwd.length >= 8 &&
//     /[A-Z]/.test(pwd) &&
//     /[a-z]/.test(pwd) &&
//     /[0-9]/.test(pwd) &&
//     /[!@#\$%^&\*]/.test(pwd);

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidPhone = (phone) =>
//     /^\d{10}$/.test(phone);

//   const onRegister = () => {
//     if (!fullName || !email || !phone || !location || !center || !password || !confirmPassword) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert("Invalid Email", "Please enter a valid email address.");
//       return;
//     }

//     if (!isValidPhone(phone)) {
//       Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match.");
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       Alert.alert(
//         "Weak Password",
//         "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     navigation.navigate("ALogin");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.loginBox}>
//         <Text style={styles.heading}>SCRAP CONNECT</Text>
//         <Text style={styles.welcome}>Create a new account</Text>

//         <TextInput
//           placeholder="Full Name"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={fullName}
//           onChangeText={setFullName}
//         />

//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />

//         <TextInput
//           placeholder="Phone Number"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="number-pad"
//           maxLength={10}
//           value={phone}
//           onChangeText={setPhone}
//         />

//         <TextInput
//           placeholder="Location"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={location}
//           onChangeText={setLocation}
//         />

//         <TextInput
//           placeholder="Scrap Center"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={center}
//           onChangeText={setScrapCenter}
//         />

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#ccc"
//             style={styles.passwordInput}
//             secureTextEntry={!isPasswordVisible}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!isPasswordVisible)}
//             style={styles.eyeIcon}
//           >
//             <Ionicons
//               name={isPasswordVisible ? "eye-off" : "eye"}
//               size={24}
//               color="#ccc"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Confirm Password"
//             placeholderTextColor="#ccc"
//             style={styles.passwordInput}
//             secureTextEntry={!isConfirmVisible}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setConfirmVisible(!isConfirmVisible)}
//             style={styles.eyeIcon}
//           >
//             <Ionicons
//               name={isConfirmVisible ? "eye-off" : "eye"}
//               size={24}
//               color="#ccc"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Role Picker
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={role}
//             onValueChange={(itemValue) => setRole(itemValue)}
//             style={styles.picker}
//             dropdownIconColor="#ccc"
//             mode="dropdown"
//           >
//             <Picker.Item label="Select Your Role" value="" color="#ccc" />
//             <Picker.Item label="Scrap Collector" value="collector" color="#000" />
//             <Picker.Item label="Home Owner" value="homeowner" color="#000" />
//             <Picker.Item label="Admin" value="admin" color="#000" />
//           </Picker>
//         </View> */}

//         <TouchableOpacity style={styles.signInButton} onPress={onRegister}>
//           <Text style={styles.signInButtonText}>Register</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("ALogin")}>
//             <Text style={styles.linkText}>Already have an account?</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const DARK_GREEN = "#004225";
// const GREEN = "#3CB371";
// const WHITE = "#FFFFFF";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: DARK_GREEN,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginBox: {
//     width: "85%",
//     backgroundColor: "#013220",
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: GREEN,
//     padding: 25,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: WHITE,
//     textAlign: "center",
//   },
//   welcome: {
//     fontSize: 18,
//     fontStyle: "italic",
//     color: WHITE,
//     textAlign: "center",
//     marginVertical: 15,
//   },
//   input: {
//     backgroundColor: "#014d33",
//     color: WHITE,
//     borderRadius: 6,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   passwordContainer: {
//     position: "relative",
//     marginBottom: 15,
//   },
//   passwordInput: {
//     backgroundColor: "#014d33",
//     color: WHITE,
//     borderRadius: 6,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     paddingRight: 45,
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: 15,
//     top: 12,
//   },
//   // // pickerContainer: {
//   // //   backgroundColor: "#014d33",
//   // //   borderRadius: 6,
//   // //   marginBottom: 15,
//   // //   overflow: "hidden",
//   // // },
//   // // picker: {
//   // //   color: "#fff",
//   // //   fontSize: 16,
//   // //   paddingVertical: Platform.OS === "android" ? 10 : 12,
//   // //   paddingHorizontal: 15,
//   // //   backgroundColor: "#014d33",
//   // },
//   signInButton: {
//     backgroundColor: GREEN,
//     borderRadius: 6,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginTop: 5,
//   },
//   signInButtonText: {
//     color: WHITE,
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   linksContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   linkText: {
//     color: WHITE,
//     textDecorationLine: "underline",
//     fontSize: 16,
//   },
// });



// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const Asignup = () => {
//   const navigation = useNavigation();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [center, setCenter] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignup = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http:// 10.80.87.129:5000/api/v1/center/signup/', {
//         centerUsername: username,
//         email,
//         phoneNo: phone,
//         location,
//         centerName: center,
//         password,
//       });

//       Alert.alert('Success', 'Account created successfully!');
//       navigation.navigate('AdminLogin');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Admin Signup</Text>

//       {/* Center Username */}
//       <Text style={styles.label}>Center Username</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter center username"
//         value={username}
//         onChangeText={setUsername}
//       />

//       {/* Email */}
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       {/* Phone Number */}
//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter phone number"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />

//       {/* Location */}
//       <Text style={styles.label}>Location</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter location"
//         value={location}
//         onChangeText={setLocation}
//       />

//       {/* Center Name */}
//       <Text style={styles.label}>Scrap Center Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter scrap center name"
//         value={center}
//         onChangeText={setCenter}
//       />

//       {/* Password */}
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       {/* Confirm Password */}
//       <Text style={styles.label}>Confirm Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//       />

//       {/* Signup Button */}
//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       {/* Navigate to Login */}
//       <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
//         <Text style={styles.link}>Already have an account? Log in</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default Asignup;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     alignSelf: 'center',
//     color: '#2e7d32',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 6,
//     marginTop: 15,
//     color: '#333',
//   },
//   input: {
//     height: 45,
//     borderColor: '#bbb',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   button: {
//     backgroundColor: '#2e7d32',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   link: {
//     color: '#1e88e5',
//     textAlign: 'center',
//     marginTop: 10,
//     fontSize: 14,
//   },
// });


import React, { useState } from "react"; // Added useState import
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Import axios for API calls

export default function AdminSignUp({ navigation }) {
  const [fullName, setFullName] = useState(""); // Will map to centerName
  const [centerUsername, setCenterUsername] = useState(""); // NEW: Added for backend's centerUsername
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  // const [center, setScrapCenter] = useState(""); // This state is no longer directly used for backend's centerUsername, 'fullName' covers centerName
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false); // NEW: Loading state

  const isStrongPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd) &&
    /[!@#\$%^&\*]/.test(pwd);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^\d{10}$/.test(phone);

  const onRegister = async () => { // Made async for API call
    // Frontend validation
    if (!fullName || !centerUsername || !email || !phone || !location || !password || !confirmPassword) { // Added centerUsername, removed 'center' as a separate check
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://10.71.125.67:5000/api/v1/center/signup/", // Correct API endpoint for Center Signup
        {
          centerName: fullName.trim(), // Map fullName to centerName
          centerUsername: centerUsername.trim().toLowerCase(), // Map new state to centerUsername
          email: email.trim().toLowerCase(),
          phoneNo: parseInt(phone, 10), // Convert phone to number
          location: location.trim().toLowerCase(),
          password: password,
        },
        {
          withCredentials: true, // Important if your backend sets cookies
        }
      );

      Alert.alert("Success", response.data.message || "Admin (Center) registered successfully!");
      navigation.navigate("ALogin"); // Navigate to Admin Login page
    } catch (error) {
      console.error("Admin Signup Error:", error.response?.data || error.message);
      const message =
        error.response?.data?.message || "Something went wrong during registration.";
      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT</Text>
        <Text style={styles.welcome}>Create a new account</Text>

        <TextInput
          placeholder="Center Name (Full Name)" // Clarified placeholder
          placeholderTextColor="#ccc"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Center Username" // NEW: Added input for centerUsername
          placeholderTextColor="#ccc"
          style={styles.input}
          autoCapitalize="none"
          value={centerUsername}
          onChangeText={setCenterUsername}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="Location"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        {/* Removed 'Scrap Center' input as 'Center Name' now covers it and 'Center Username' is separate */}
        {/* <TextInput
          placeholder="Scrap Center"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={center}
          onChangeText={setScrapCenter}
        /> */}

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!isConfirmVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmVisible(!isConfirmVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isConfirmVisible ? "eye-off" : "eye"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={onRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={styles.signInButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ALogin")}>
            <Text style={styles.linkText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const DARK_GREEN = "#004225";
const GREEN = "#3CB371";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_GREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: "85%",
    backgroundColor: "#013220",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GREEN,
    padding: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: WHITE,
    textAlign: "center",
  },
  welcome: {
    fontSize: 18,
    fontStyle: "italic",
    color: WHITE,
    textAlign: "center",
    marginVertical: 15,
  },
  input: {
    backgroundColor: "#014d33",
    color: WHITE,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    backgroundColor: "#014d33",
    color: WHITE,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    paddingRight: 45,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  signInButton: {
    backgroundColor: GREEN,
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 5,
  },
  signInButtonText: {
    color: WHITE,
    fontWeight: "600",
    fontSize: 18,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: WHITE,
    textDecorationLine: "underline",
    fontSize: 16,
  },
});