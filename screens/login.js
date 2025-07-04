// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function Login({ navigation }) {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [isPasswordVisible, setPasswordVisible] = React.useState(false);

//   const onSignIn = () => {
//     // Here you would normally handle authentication logic
//     // For now, just navigate to Dashboard
//     navigation.navigate("Dashboard");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.loginBox}>
//         <Text style={styles.heading}>SCRAP CONNECT</Text>
//         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN</Text>

//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
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

//         <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//             <Text style={styles.linkText}>Don't have an account?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
//             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
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
//     backgroundColor: "#013220", // slightly lighter dark green for contrast
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
//     backgroundColor: "#014d33", // medium dark green
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
//     paddingRight: 45, // space for the eye icon
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
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function Login({ navigation }) {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [isPasswordVisible, setPasswordVisible] = React.useState(false);

//   // const onSignIn = () => {
//   //   // TODO: Replace the below mock user object with actual login API call and response
//   //   // Example:
//   //   // const response = await fetch('your_api_endpoint', {
//   //   //   method: 'POST',
//   //   //   headers: { 'Content-Type': 'application/json' },
//   //   //   body: JSON.stringify({ email, password }),
//   //   // });
//   //   // const data = await response.json();
//   //   // const userRole = data.user.role;

//   //   // MOCK user role for now — replace this with actual role from backend
//   //   const userRole = "homeowner"; // or "scrap_collector"

//   //   if (userRole === "homeowner") {
//   //     navigation.navigate("HomeownerDashboard"); // Navigate to homeowner dashboard
//   //   } else if (userRole === "scrap_collector") {
//   //     navigation.navigate("CollectorDashboard"); // Navigate to scrap collector dashboard
//   //   } else {
//   //     // Optional: handle unknown roles or error
//   //     alert("Unknown user role. Please contact support.");
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <View style={styles.loginBox}>
//         <Text style={styles.heading}>SCRAP CONNECT.</Text>
//         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN HOMEOWNER.</Text>

//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
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

//         {/* <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity> */}

//         {/* <view>
//           <TouchableOpacity onPress={() => navigation.navigate("HomeownerDashboard")}> //this is for testing to navigate directly
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>
//         </view> */}

//           <TouchableOpacity
//     style={styles.signInButton}
//     onPress={() => navigation.navigate("mainNavigator")} // Navigate to mainNavigator after login
//   >
//     <Text style={styles.signInButtonText}>Sign In</Text>
//   </TouchableOpacity>


//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//             <Text style={styles.linkText}>Don't have an account?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
//             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
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
//     backgroundColor: "#013220", // slightly lighter dark green for contrast
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
//     backgroundColor: "#014d33", // medium dark green
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
//     paddingRight: 45, // space for the eye icon
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


// connection with backend

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DARK_GREEN = "#004225";
const GREEN = "#3CB371";
const WHITE = "#FFFFFF";

export default function Login({ navigation }) {
  const [username, setUsername] = useState(""); // Renamed from fullName for clarity with backend
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and Password are required.");
      return;
    }

    setLoading(true); // Set loading to true during login attempt

    try {
      const response = await axios.post(
        "http://192.168.189.119:5000/api/v1/user/signin/",
        {
          username: username.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Homeowner Login API Response:', response.data); // Log the full response data

      // --- CRITICAL FIX: Destructure userId and userRole directly ---
      const { token, userId, userRole } = response.data;

      // Save token, user ID, and user role in AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId); // Correctly save userId
      await AsyncStorage.setItem("userRole", userRole); // Save the user's role

      Alert.alert("Login Successful", `Welcome back, Homeowner ${response.data.userInfo.username}!`);
      navigation.navigate("mainNavigator"); // Navigate to homeowner main navigator
    } catch (error) {
      console.error("Homeowner Login Error:", error.response?.data || error.message);
      const message =
        error.response?.data?.message || "Something went wrong during login.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT.</Text>
        <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN HOMEOWNER.</Text>

        <TextInput
          placeholder="Username" // Changed placeholder
          placeholderTextColor="#ccc"
          style={styles.input}
          autoCapitalize="none"
          value={username} // Use username state
          onChangeText={setUsername} // Set username state
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

        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator color={WHITE} /> // Show loading indicator
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkText}>Don't have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("RequestOTP")}>
            <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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