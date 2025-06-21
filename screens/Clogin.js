// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function CollectorLogin({ navigation }) {
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
//         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN COLLECTOR.</Text>

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
//           <TouchableOpacity onPress={() => navigation.navigate("Csignup")}>
//             <Text style={styles.linkText}>Don't have an account?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("CResetpassword")}>
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


//connection to backend

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function CollectorLogin({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isPasswordVisible, setPasswordVisible] = useState(false);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         "http://10.71.125.67:5000/api/v1/user/signin/",
//         {
//           username: email.trim().toLowerCase(), // assuming email is used as username
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const { token, user } = response.data;

//       // Save token and user ID in AsyncStorage
//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("userId", user.id);

//       Alert.alert("Login Successful", "Welcome back!");
//       navigation.navigate("mainNavigator");
//     } catch (error) {
//       console.error(error);
//       const message =
//         error.response?.data?.message || "Something went wrong during login.";
//       Alert.alert("Login Failed", message);
//     }
//   };

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

//         <TouchableOpacity
//           style={styles.signInButton}
//           onPress={handleLogin} // <-- connected to backend
//         >
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("Csignup")}>
//             <Text style={styles.linkText}>Don't have an account?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("CResetpassword")}>
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


//gmni
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CollectorLogin({ navigation }) {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and Password are required.");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      // Corrected endpoint for collector signin
      const response = await axios.post(
        "http:// 192.168.197.119:5000/api/v1/collector/signin/", // <-- CORRECTED ENDPOINT
        {
          username: username.trim().toLowerCase(), // Use the username state directly
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, collectorInfo } = response.data; // Backend sends 'collectorInfo'
      const collectorId = collectorInfo._id; // Get _id from collectorInfo

      // Save token and collector ID in AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("collectorId", collectorId); // Storing collectorId

      Alert.alert("Login Successful", "Welcome back, Collector!");
      // Navigate to the appropriate dashboard for collectors
      navigation.navigate("mainNavigator"); // Or a specific CollectorDashboard if you have one
    } catch (error) {
      console.error("Collector Login Error:", error);
      const message =
        error.response?.data?.message || "Something went wrong during login.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT.</Text>
        <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN COLLECTOR.</Text> {/* Updated message */}

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
          <TouchableOpacity onPress={() => navigation.navigate("Csignup")}>
            <Text style={styles.linkText}>Don't have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CResetpassword")}>
            <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
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


//gpt
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Clogin = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         "http://10.71.125.67:5000/api/v1/collector/signin/",
//         {
//           username: email.trim().toLowerCase(),
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const { token, collectorInfo } = response.data;

//       await AsyncStorage.setItem("token", token);
//       await AsyncStorage.setItem("userId", collectorInfo._id);

//       Alert.alert("Login Successful", "Welcome back!");
//       navigation.navigate("mainNavigator");
//     } catch (error) {
//       console.error("Login error:", error);
//       const message =
//         error.response?.data?.message || "Something went wrong during login.";
//       Alert.alert("Login Failed", message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Collector Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email or Username"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//         <Text style={styles.linkText}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Clogin;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 25,
//     color: "#2e7d32",
//   },
//   input: {
//     height: 48,
//     borderColor: "#2e7d32",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#2e7d32",
//     paddingVertical: 14,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   linkText: {
//     textAlign: "center",
//     color: "#2e7d32",
//     marginTop: 15,
//   },
// });
