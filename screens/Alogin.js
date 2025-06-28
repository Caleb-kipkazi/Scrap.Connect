// // import React from "react";
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function AdminLogin({ navigation }) {
// //   const [email, setEmail] = React.useState("");
// //   const [password, setPassword] = React.useState("");
// //   const [isPasswordVisible, setPasswordVisible] = React.useState(false);

// //   // const onSignIn = () => {
// //   //   // TODO: Replace the below mock user object with actual login API call and response
// //   //   // Example:
// //   //   // const response = await fetch('your_api_endpoint', {
// //   //   //   method: 'POST',
// //   //   //   headers: { 'Content-Type': 'application/json' },
// //   //   //   body: JSON.stringify({ email, password }),
// //   //   // });
// //   //   // const data = await response.json();
// //   //   // const userRole = data.user.role;

// //   //   // MOCK user role for now — replace this with actual role from backend
// //   //   const userRole = "homeowner"; // or "scrap_collector"

// //   //   if (userRole === "homeowner") {
// //   //     navigation.navigate("HomeownerDashboard"); // Navigate to homeowner dashboard
// //   //   } else if (userRole === "scrap_collector") {
// //   //     navigation.navigate("CollectorDashboard"); // Navigate to scrap collector dashboard
// //   //   } else {
// //   //     // Optional: handle unknown roles or error
// //   //     alert("Unknown user role. Please contact support.");
// //   //   }
// //   // };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.loginBox}>
// //         <Text style={styles.heading}>SCRAP CONNECT.</Text>
// //         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

// //         <TextInput
// //           placeholder="Email"
// //           placeholderTextColor="#ccc"
// //           style={styles.input}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //           value={email}
// //           onChangeText={setEmail}
// //         />

// //         <View style={styles.passwordContainer}>
// //           <TextInput
// //             placeholder="Password"
// //             placeholderTextColor="#ccc"
// //             style={styles.passwordInput}
// //             secureTextEntry={!isPasswordVisible}
// //             value={password}
// //             onChangeText={setPassword}
// //           />
// //           <TouchableOpacity
// //             onPress={() => setPasswordVisible(!isPasswordVisible)}
// //             style={styles.eyeIcon}
// //           >
// //             <Ionicons
// //               name={isPasswordVisible ? "eye-off" : "eye"}
// //               size={24}
// //               color="#ccc"
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         {/* <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
// //           <Text style={styles.signInButtonText}>Sign In</Text>
// //         </TouchableOpacity> */}

// //         {/* <view>
// //           <TouchableOpacity onPress={() => navigation.navigate("HomeownerDashboard")}> //this is for testing to navigate directly
// //             <Text style={styles.signInButtonText}>Sign In</Text>
// //           </TouchableOpacity>
// //         </view> */}

// //           <TouchableOpacity
// //     style={styles.signInButton}
// //     onPress={() => navigation.navigate("AmainNavigator")} // Navigate to mainNavigator after login
// //   >
// //     <Text style={styles.signInButtonText}>Sign In</Text>
// //   </TouchableOpacity>


// //         <View style={styles.linksContainer}>
// //           <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
// //             <Text style={styles.linkText}>Don't have an account?</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
// //             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // const DARK_GREEN = "#004225";
// // const GREEN = "#3CB371";
// // const WHITE = "#FFFFFF";

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: DARK_GREEN,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   loginBox: {
// //     width: "85%",
// //     backgroundColor: "#013220", // slightly lighter dark green for contrast
// //     borderRadius: 10,
// //     borderWidth: 2,
// //     borderColor: GREEN,
// //     padding: 25,
// //   },
// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: WHITE,
// //     textAlign: "center",
// //   },
// //   welcome: {
// //     fontSize: 18,
// //     fontStyle: "italic",
// //     color: WHITE,
// //     textAlign: "center",
// //     marginVertical: 15,
// //   },
// //   input: {
// //     backgroundColor: "#014d33", // medium dark green
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     marginBottom: 15,
// //   },
// //   passwordContainer: {
// //     position: "relative",
// //     marginBottom: 15,
// //   },
// //   passwordInput: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     paddingRight: 45, // space for the eye icon
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 15,
// //     top: 12,
// //   },
// //   signInButton: {
// //     backgroundColor: GREEN,
// //     borderRadius: 6,
// //     paddingVertical: 15,
// //     alignItems: "center",
// //     marginTop: 5,
// //   },
// //   signInButtonText: {
// //     color: WHITE,
// //     fontWeight: "600",
// //     fontSize: 18,
// //   },
// //   linksContainer: {
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   linkText: {
// //     color: WHITE,
// //     textDecorationLine: "underline",
// //     fontSize: 16,
// //   },
// // // });


// // //backened connection
// // import React, { useState } from "react";
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import axios from "axios";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // export default function AdminLogin({ navigation }) {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [isPasswordVisible, setPasswordVisible] = useState(false);

// //   const handleLogin = async () => {
// //     try {
// //       const response = await axios.post(
// //         "http://   192.168.189.119:5000/api/v1/center/signin/",
// //         {
// //           username: email.trim().toLowerCase(), // assuming email is used as username
// //           password,
// //         },
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       const { token, user } = response.data;

// //       // Save token and user ID in AsyncStorage
// //       await AsyncStorage.setItem("token", token);
// //       await AsyncStorage.setItem("userId", user.id);

// //       Alert.alert("Login Successful", "Welcome back!");
// //       navigation.navigate("AmainNavigator");
// //     } catch (error) {
// //       console.error(error);
// //       const message =
// //         error.response?.data?.message || "Something went wrong during login.";
// //       Alert.alert("Login Failed", message);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.loginBox}>
// //         <Text style={styles.heading}>SCRAP CONNECT.</Text>
// //         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

// //         <TextInput
// //           placeholder="Email"
// //           placeholderTextColor="#ccc"
// //           style={styles.input}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //           value={email}
// //           onChangeText={setEmail}
// //         />

// //         <View style={styles.passwordContainer}>
// //           <TextInput
// //             placeholder="Password"
// //             placeholderTextColor="#ccc"
// //             style={styles.passwordInput}
// //             secureTextEntry={!isPasswordVisible}
// //             value={password}
// //             onChangeText={setPassword}
// //           />
// //           <TouchableOpacity
// //             onPress={() => setPasswordVisible(!isPasswordVisible)}
// //             style={styles.eyeIcon}
// //           >
// //             <Ionicons
// //               name={isPasswordVisible ? "eye-off" : "eye"}
// //               size={24}
// //               color="#ccc"
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         {/* <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
// //           <Text style={styles.signInButtonText}>Sign In</Text>
// //         </TouchableOpacity> */}

// //         {/* <view>
// //           <TouchableOpacity onPress={() => navigation.navigate("HomeownerDashboard")}> //this is for testing to navigate directly
// //             <Text style={styles.signInButtonText}>Sign In</Text>
// //           </TouchableOpacity>
// //         </view> */}

// //         <TouchableOpacity
// //           style={styles.signInButton}
// //           onPress={handleLogin} // <-- connected to backend
// //         >
// //           <Text style={styles.signInButtonText}>Sign In</Text>
// //         </TouchableOpacity>

// //         <View style={styles.linksContainer}>
// //           <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
// //             <Text style={styles.linkText}>Don't have an account?</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
// //             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // const DARK_GREEN = "#004225";
// // const GREEN = "#3CB371";
// // const WHITE = "#FFFFFF";

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: DARK_GREEN,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   loginBox: {
// //     width: "85%",
// //     backgroundColor: "#013220",
// //     borderRadius: 10,
// //     borderWidth: 2,
// //     borderColor: GREEN,
// //     padding: 25,
// //   },
// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: WHITE,
// //     textAlign: "center",
// //   },
// //   welcome: {
// //     fontSize: 18,
// //     fontStyle: "italic",
// //     color: WHITE,
// //     textAlign: "center",
// //     marginVertical: 15,
// //   },
// //   input: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     marginBottom: 15,
// //   },
// //   passwordContainer: {
// //     position: "relative",
// //     marginBottom: 15,
// //   },
// //   passwordInput: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     paddingRight: 45,
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 15,
// //     top: 12,
// //   },
// //   signInButton: {
// //     backgroundColor: GREEN,
// //     borderRadius: 6,
// //     paddingVertical: 15,
// //     alignItems: "center",
// //     marginTop: 5,
// //   },
// //   signInButtonText: {
// //     color: WHITE,
// //     fontWeight: "600",
// //     fontSize: 18,
// //   },
// //   linksContainer: {
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   linkText: {
// //     color: WHITE,
// //     textDecorationLine: "underline",
// //     fontSize: 16,
// //   },
// // });


// // gmni
// // import React, { useState } from "react"; // Added useState import
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native"; // Added Alert and ActivityIndicator
// // import { Ionicons } from "@expo/vector-icons";
// // import axios from "axios"; // Import axios
// // import AsyncStorage from "@react-native-async-storage/async-storage";


// // export default function AdminLogin({ navigation }) {
// //   const [centerName, setCenterName] = useState(""); // Changed from email to username to match backend
// //   const [password, setPassword] = useState("");
// //   const [isPasswordVisible, setPasswordVisible] = useState(false);
// //   const [loading, setLoading] = useState(false); // New loading state

// //   const handleLogin = async () => {
// //     if (!centerName || !password) {
// //       Alert.alert("Error", "Center Name and Password are required.");
// //       return;
// //     }

// //     setLoading(true); // Set loading to true

// //     try {
// //       // Connect to the centerSignin endpoint assuming Admin is a Center Admin
// //       const response = await axios.post(
// //         "http://192.168.189.119:5000/api/v1/center/signin/", // Endpoint for centerSignin
// //         {
// //           centerUsername: centerName.trim().toLowerCase(), // Trim and lowercase username
// //           password,
// //         },
// //         {
// //           withCredentials: true, // Important if your backend sets cookies
// //         }
// //       );

// //       const { token, user } = response.data; // Backend sends 'user' containing id and username

// //       // Assuming 'user' in the response contains id (which is centerId) and username
// //       // Save token and center ID in AsyncStorage
// //       // You might want to use AsyncStorage.setItem("adminToken", token) or AsyncStorage.setItem("centerToken", token)
// //       // depending on your AsyncStorage key naming convention for different user types.
// //       await AsyncStorage.setItem("token", token); // General token key
// //       await AsyncStorage.setItem("centerId", user.id); // Storing the center's ID

// //       Alert.alert("Login Successful", `Welcome back, Admin ${user.username}!`);
// //       navigation.navigate("AmainNavigator"); // Navigate to admin main navigator
// //     } catch (error) {
// //       console.error("Admin Login Error:", error);
// //       const message =
// //         error.response?.data?.message || "Something went wrong during login.";
// //       Alert.alert("Login Failed", message);
// //     } finally {
// //       setLoading(false); // Set loading to false regardless of success or failure
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.loginBox}>
// //         <Text style={styles.heading}>SCRAP CONNECT.</Text>
// //         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

// //         <TextInput
// //           placeholder="Center UserName" // Changed from Email to Username to match backend expectation
// //           placeholderTextColor="#ccc"
// //           style={styles.input}
// //           keyboardType="default" // Changed from email-address
// //           autoCapitalize="none"
// //           value={centerName} // Use username state
// //           onChangeText={setCenterName} // Set username state
// //         />

// //         <View style={styles.passwordContainer}>
// //           <TextInput
// //             placeholder="Password"
// //             placeholderTextColor="#ccc"
// //             style={styles.passwordInput}
// //             secureTextEntry={!isPasswordVisible}
// //             value={password}
// //             onChangeText={setPassword}
// //           />
// //           <TouchableOpacity
// //             onPress={() => setPasswordVisible(!isPasswordVisible)}
// //             style={styles.eyeIcon}
// //           >
// //             <Ionicons
// //               name={isPasswordVisible ? "eye-off" : "eye"}
// //               size={24}
// //               color="#ccc"
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         <TouchableOpacity
// //           style={styles.signInButton}
// //           onPress={handleLogin} // Call the new handleLogin function
// //           disabled={loading} // Disable button when loading
// //         >
// //           {loading ? (
// //             <ActivityIndicator color={WHITE} /> // Show loading indicator
// //           ) : (
// //             <Text style={styles.signInButtonText}>Sign In</Text>
// //           )}
// //         </TouchableOpacity>

// //         <View style={styles.linksContainer}>
// //           <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
// //             <Text style={styles.linkText}>Don't have an account?</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
// //             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // const DARK_GREEN = "#004225";
// // const GREEN = "#3CB371";
// // const WHITE = "#FFFFFF";

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: DARK_GREEN,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   loginBox: {
// //     width: "85%",
// //     backgroundColor: "#013220",
// //     borderRadius: 10,
// //     borderWidth: 2,
// //     borderColor: GREEN,
// //     padding: 25,
// //   },
// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: WHITE,
// //     textAlign: "center",
// //   },
// //   welcome: {
// //     fontSize: 18,
// //     fontStyle: "italic",
// //     color: WHITE,
// //     textAlign: "center",
// //     marginVertical: 15,
// //   },
// //   input: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     marginBottom: 15,
// //   },
// //   passwordContainer: {
// //     position: "relative",
// //     marginBottom: 15,
// //   },
// //   passwordInput: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     paddingRight: 45,
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 15,
// //     top: 12,
// //   },
// //   signInButton: {
// //     backgroundColor: GREEN,
// //     borderRadius: 6,
// //     paddingVertical: 15,
// //     alignItems: "center",
// //     marginTop: 5,
// //   },
// //   signInButtonText: {
// //     color: WHITE,
// //     fontWeight: "600",
// //     fontSize: 18,
// //   },
// //   linksContainer: {
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   linkText: {
// //     color: WHITE,
// //     textDecorationLine: "underline",
// //     fontSize: 16,
// //   },
// // });

// //test for geting all requests
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DARK_GREEN = "#004225";
// const GREEN = "#3CB371";
// const WHITE = "#FFFFFF";


// export default function AdminLogin({ navigation }) {
//     const [centerName, setCenterName] = useState("");
//     const [password, setPassword] = useState("");
//     const [isPasswordVisible, setPasswordVisible] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleLogin = async () => {
//         if (!centerName || !password) {
//             Alert.alert("Error", "Center Name and Password are required.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 "http://192.168.189.119:5000/api/v1/center/signin/",
//                 {
//                     centerUsername: centerName.trim().toLowerCase(),
//                     password,
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             );

//             // The backend sends 'token' and 'user' object (which is actually centerInfo)
//             const { token, user } = response.data; 

//             // --- FIX HERE: Use 'adminToken' as the key and save 'centerName' ---
//             await AsyncStorage.setItem("adminToken", token); // Store token with key 'adminToken'
//             await AsyncStorage.setItem("centerId", user.id); // Store center's _id
//             await AsyncStorage.setItem("centerName", user.centerName); // Store center's name, crucial for Trequests.js

//             Alert.alert("Login Successful", `Welcome back, Admin ${user.username}!`);
//             navigation.navigate("AmainNavigator"); // Navigate to admin main navigator
//         } catch (error) {
//             console.error("Admin Login Error:", error);
//             const message =
//                 error.response?.data?.message || "Something went wrong during login.";
//             Alert.alert("Login Failed", message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.loginBox}>
//                 <Text style={styles.heading}>SCRAP CONNECT.</Text>
//                 <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

//                 <TextInput
//                     placeholder="Center UserName"
//                     placeholderTextColor="#ccc"
//                     style={styles.input}
//                     keyboardType="default"
//                     autoCapitalize="none"
//                     value={centerName}
//                     onChangeText={setCenterName}
//                 />

//                 <View style={styles.passwordContainer}>
//                     <TextInput
//                         placeholder="Password"
//                         placeholderTextColor="#ccc"
//                         style={styles.passwordInput}
//                         secureTextEntry={!isPasswordVisible}
//                         value={password}
//                         onChangeText={setPassword}
//                     />
//                     <TouchableOpacity
//                         onPress={() => setPasswordVisible(!isPasswordVisible)}
//                         style={styles.eyeIcon}
//                     >
//                         <Ionicons
//                             name={isPasswordVisible ? "eye-off" : "eye"}
//                             size={24}
//                             color="#ccc"
//                         />
//                     </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity
//                     style={styles.signInButton}
//                     onPress={handleLogin}
//                     disabled={loading}
//                 >
//                     {loading ? (
//                         <ActivityIndicator color={WHITE} />
//                     ) : (
//                         <Text style={styles.signInButtonText}>Sign In</Text>
//                     )}
//                 </TouchableOpacity>

//                 <View style={styles.linksContainer}>
//                     <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
//                         <Text style={styles.linkText}>Don't have an account?</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
//                         <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// }

// // const DARK_GREEN = "#004225";
// // const GREEN = "#3CB371";
// // const WHITE = "#FFFFFF";

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: DARK_GREEN,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     loginBox: {
//         width: "85%",
//         backgroundColor: "#013220",
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: GREEN,
//         padding: 25,
//     },
//     heading: {
//         fontSize: 28,
//         fontWeight: "bold",
//         color: WHITE,
//         textAlign: "center",
//     },
//     welcome: {
//         fontSize: 18,
//         fontStyle: "italic",
//         color: WHITE,
//         textAlign: "center",
//         marginVertical: 15,
//     },
//     input: {
//         backgroundColor: "#014d33",
//         color: WHITE,
//         borderRadius: 6,
//         paddingHorizontal: 15,
//         paddingVertical: 12,
//         fontSize: 16,
//         marginBottom: 15,
//     },
//     passwordContainer: {
//         position: "relative",
//         marginBottom: 15,
//     },
//     passwordInput: {
//         backgroundColor: "#014d33",
//         color: WHITE,
//         borderRadius: 6,
//         paddingHorizontal: 15,
//         paddingVertical: 12,
//         fontSize: 16,
//         paddingRight: 45,
//     },
//     eyeIcon: {
//         position: "absolute",
//         right: 15,
//         top: 12,
//     },
//     signInButton: {
//         backgroundColor: GREEN,
//         borderRadius: 6,
//         paddingVertical: 15,
//         alignItems: "center",
//         marginTop: 5,
//     },
//     signInButtonText: {
//         color: WHITE,
//         fontWeight: "600",
//         fontSize: 18,
//     },
//     linksContainer: {
//         marginTop: 20,
//         alignItems: "center",
//     },
//     linkText: {
//         color: WHITE,
//         textDecorationLine: "underline",
//         fontSize: 16,
//     },
// });


//fixingbugs
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DARK_GREEN = "#004225";
const GREEN = "#3CB371";
const WHITE = "#FFFFFF";

export default function AdminLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Center Email and Password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.189.119:5000/api/v1/center/signin/",
        {
          email: email.trim().toLowerCase(),
          password,
        }
      );

      console.log('Center Login API Response:', response.data); // Log the full response data

      // --- CRITICAL FIX: Save token under 'token' key for consistency ---
      const { token, centerId, userRole, centerInfo } = response.data;

      // Save token, center ID, and user role in AsyncStorage
      await AsyncStorage.setItem("token", token); // Changed from "adminToken" to "token"
      await AsyncStorage.setItem("centerId", centerId);
      await AsyncStorage.setItem("userRole", userRole);
      // Storing centerName for convenience if needed elsewhere, e.g., for greeting
      await AsyncStorage.setItem("centerName", centerInfo.centerName);

      Alert.alert("Login Successful", `Welcome back, Admin ${centerInfo.centerName}!`);
      navigation.replace("AmainNavigator"); // Use replace to prevent going back to login screen
    } catch (error) {
      console.error("Admin Login Error:", error.response?.data || error.message);
      const message =
        error.response?.data?.message || "Something went wrong during login.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT.</Text>
        <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

        <TextInput
          placeholder="Center Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
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
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
            <Text style={styles.linkText}>Don't have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
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
