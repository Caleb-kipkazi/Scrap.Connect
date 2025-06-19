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

// export default function SignUp({ navigation }) {
//   const [fullName, setFullName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [phone, setPhone] = React.useState("");
//   const [role, setRole] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [confirmPassword, setConfirmPassword] = React.useState("");
//   const [isPasswordVisible, setPasswordVisible] = React.useState(false);
//   const [isConfirmVisible, setConfirmVisible] = React.useState(false);

//   const isStrongPassword = (pwd) => {
//     return (
//       pwd.length >= 8 &&
//       /[A-Z]/.test(pwd) &&
//       /[a-z]/.test(pwd) &&
//       /[0-9]/.test(pwd) &&
//       /[!@#\$%^&\*]/.test(pwd)
//     );
//   };

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidPhone = (phone) =>
//     /^\d{10}$/.test(phone); // ✅ Only 10 digits allowed

//   const onRegister = () => {
//     if (!fullName || !email || !phone || !role || !password || !confirmPassword) {
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

//     // Registration logic placeholder

//     navigation.navigate("Login");
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

//         {/* Role Picker */}
//         <View style={{ backgroundColor: "#014d33", borderRadius: 6, marginBottom: 15 }}>
//           <Picker
//             selectedValue={role}
//             onValueChange={(itemValue) => setRole(itemValue)}
//             style={{ color: role ? "#fff" : "#ccc", paddingHorizontal: 10 }}
//             dropdownIconColor="#ccc"
//           >
//             <Picker.Item label="Select Your Role" value="" color="#ccc" />
//             <Picker.Item label="Scrap Collector" value="collector" />
//             <Picker.Item label="Home Owner" value="homeowner" />
//           </Picker>
//         </View>

//         {/* Password */}
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

//         {/* Confirm Password */}
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

//         <TouchableOpacity style={styles.signInButton} onPress={onRegister}>
//           <Text style={styles.signInButtonText}>Register</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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

// export default function SignUp({ navigation }) {
//   const [fullName, setFullName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [phone, setPhone] = React.useState("");
//   const [role, setRole] = React.useState("");
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
//     if (!fullName || !email || !phone || !role || !password || !confirmPassword) {
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

//     navigation.navigate("Login");
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

//         {/* Role Picker */}
//         {/* <View style={styles.pickerContainer}>
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
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
//   // pickerContainer: {
//   //   backgroundColor: "#014d33",
//   //   borderRadius: 6,
//   //   marginBottom: 15,
//   //   overflow: "hidden",
//   // },
//   // picker: {
//   //   color: "#fff",
//   //   fontSize: 16,
//   //   paddingVertical: Platform.OS === "android" ? 10 : 12,
//   //   paddingHorizontal: 15,
//   //   backgroundColor: "#014d33",
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


//tgp
// Signup.js (Updated with Backend Integration)

// import React, { useState } from "react";
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
// import axios from "axios";
// // import { Picker } from "@react-native-picker/picker";

// export default function SignUp({ navigation }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [isConfirmVisible, setConfirmVisible] = useState(false);

//   const isStrongPassword = (pwd) =>
//     pwd.length >= 8 &&
//     /[A-Z]/.test(pwd) &&
//     /[a-z]/.test(pwd) &&
//     /[0-9]/.test(pwd) &&
//     /[!@#\$%^&\*]/.test(pwd);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^\d{10}$/.test(phone);

//   const onRegister = async () => {
//     if (!fullName || !email || !phone || !password || !confirmPassword) {
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

//     try {
//       const response = await axios.post("http://YOUR_LOCAL_IP:5000/api/v1/user/signup/", {
//         email,
//         username: fullName,
//         phoneNo: phone,
//         password,
//       });

//       if (response.data.success) {
//         Alert.alert("Success", response.data.message);
//         navigation.navigate("Login");
//       } else {
//         Alert.alert("Error", response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       Alert.alert("Error", error.response?.data?.message || "Network error");
//     }
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

//         <TouchableOpacity style={styles.signInButton} onPress={onRegister}>
//           <Text style={styles.signInButtonText}>Register</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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

//mini
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator, // Import for loading state
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker"; // Uncomment if you add role to backend

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  // const [role, setRole] = React.useState(""); // Uncomment if you add role to backend
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [isConfirmVisible, setConfirmVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // New loading state

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

  const onRegister = async () => { // Make function async
    if (!fullName || !email || !phone || !password || !confirmPassword) {
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

    setLoading(true); // Set loading to true before API call

    try {
      const response = await fetch("http://YOUR_SERVER_IP_ADDRESS:5000/api/v1/user/signup/", { // Replace YOUR_SERVER_IP_ADDRESS
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullName, // Map fullName to username
          email: email,
          phoneNo: phone, // Map phone to phoneNo
          password: password,
          // If you add role to backend, uncomment this:
          // role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message || "Account created successfully!");
        navigation.navigate("Login");
      } else {
        // Handle backend errors (e.g., user already exists, validation errors from backend)
        Alert.alert("Registration Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Network Error", "Could not connect to the server. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT</Text>
        <Text style={styles.welcome}>Create a new account</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
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

        {/* Role Picker - Uncomment and enable if you add 'role' to your backend user model */}
        {/* <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="#ccc"
            mode="dropdown"
          >
            <Picker.Item label="Select Your Role" value="" color="#ccc" />
            <Picker.Item label="Scrap Collector" value="collector" color="#000" />
            <Picker.Item label="Home Owner" value="homeowner" color="#000" />
            <Picker.Item label="Admin" value="admin" color="#000" />
          </Picker>
        </View> */}

        <TouchableOpacity style={styles.signInButton} onPress={onRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={styles.signInButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
  // pickerContainer: {
  //   backgroundColor: "#014d33",
  //   borderRadius: 6,
  //   marginBottom: 15,
  //   overflow: "hidden",
  // },
  // picker: {
  //   color: "#fff",
  //   fontSize: 16,
  //   paddingVertical: Platform.OS === "android" ? 10 : 12,
  //   paddingHorizontal: 15,
  //   backgroundColor: "#014d33",
  // },
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