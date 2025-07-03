// // // // // const bcrypt=require("bcrypt");
// // // // // const jwt=require("jsonwebtoken");
// // // // // const Center=require('../models/center');
// // // // // const Collector = require('../models/collector');
// // // // // const Requests=require('../models/Requests')

// // // // // const centerSignin=async(req,res)=>{

// // // // //     try {
// // // // //         let {centerUsername,password}=req.body;

// // // // //         centerUsername=centerUsername.trim().toLowerCase()

// // // // //         if(!centerUsername ||!password){
// // // // //             return res.status(400).json({message:"Username and Password are required!"})
// // // // //         }
    
// // // // //         const center=await Center.findOne({centerUsername});
    
// // // // //         if(!center){
// // // // //             return res.status(400).json({message:"Collection center does not exist!"})
// // // // //         }
    
// // // // //         const isMatch=await bcrypt.compare(password,center.password);
// // // // //         if(!isMatch){
// // // // //             return res.status(400).json({message:"Invalid Password"})
// // // // //         }
    
// // // // //         //token generation
// // // // //         const token=jwt.sign({
// // // // //             centerId:center._id,
// // // // //             username:center.username
// // // // //         },
// // // // //         process.env.JWT_SECRET,
// // // // //         {expiresIn:"1h"}
// // // // //         );
    
// // // // //         return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
// // // // //             message:"Login successfull!",
// // // // //             success:true,
// // // // //             token,
// // // // //             user:{
// // // // //                 id:center._id,
// // // // //                 username:center.username
// // // // //             }
// // // // //         })
        
// // // // //     } catch (error) {
// // // // //         return res.status(500).json({message:error.message})
// // // // //     }
   
// // // // // }

// // // // // // get center Info
// // // // // const getCenterInfo=async(req,res)=>{
// // // // //     const {centerId}=req.params;
// // // // //     try {
// // // // //         const center=await Center.findById(centerId);
// // // // //         if(!center){
// // // // //             return res.status(404).json({message:"Collection center not found"});
// // // // //         }

// // // // //         return res.status(200).json({
// // // // //             message:"Collection center Info Fetched Successfully!",
// // // // //             success:true,
// // // // //             center
// // // // //         })

// // // // //     } catch (error) {
// // // // //         return res.status(500).json({message:"Error fetching collection center info",error})
        
// // // // //     }
// // // // // }

// // // // // const centerSignout=(req,res)=>{
// // // // //     try {
// // // // //         res.clearCookie('access_token').status(200).json({
// // // // //             message:"Signout successful!",
// // // // //             success:true
// // // // //         })
// // // // //     } catch (error) {
// // // // //         return res.status(500).json({message:error.message})
// // // // //     }
// // // // // }

// // // // // // get all registered collectors of the collection center
// // // // // const getCollectors=async(req,res)=>{
// // // // //     const {centerId}=req.params;
// // // // //     try {
// // // // //         const center=await Center.findById(centerId);
// // // // //         if(!center){
// // // // //             return res.status(404).json({message:"Collection center not found"});
// // // // //         }

// // // // //         const collectors=await Collector.find({center:centerId});

// // // // //         if(collectors.length===0){
// // // // //             return res.status(404).json({message:"No collectors registered for this collection center"});
// // // // //         }
// // // // //         return res.status(200).json({
// // // // //             message:"Collectors fetched successfully!",
// // // // //             success:true,
// // // // //             collectors:collectors,
// // // // //             totalCollectors:collectors.length
// // // // //         })
// // // // //     } catch (error) {
// // // // //         return res.status(500).json({message:"Error fetching collectors",error})
// // // // //     }
// // // // // }

// // // // // // get all center requests
// // // // // const getAllCenterRequests=async(req,res)=>{
// // // // //     const {centerId}=req.params;

// // // // //     try {
// // // // //         const center =await Center.findById(centerId);

// // // // //         if(!center){
// // // // //             return res.status(404).json({message:"Collection center not found"});
// // // // //         }

// // // // //         const requests=await Requests.find({collectionCenter:centerId})

// // // // //         if(requests.length===0){
// // // // //             return res.status(404).json({message:"No collection requests made for this collection center"});
// // // // //             }
// // // // //             return res.status(200).json({
// // // // //                 message:"Collection Requests fetched successfully!",
// // // // //                 success:true,
// // // // //                 requests:requests,
// // // // //                 totalRequests:requests.length
// // // // //             })
// // // // //         }
// // // // //         catch (error) {
// // // // //         return res.status(500).json({
// // // // //             message:"Error fetching center requests",
// // // // //             success:false
// // // // //         })
// // // // //     }

// // // // // }



// // // // // module.exports={
// // // // //     centerSignin,
// // // // //     centerSignout,
// // // // //     getCenterInfo,
// // // // //     getCollectors,
// // // // //     getAllCenterRequests
// // // // // }

// // // // // // AdminLogin.js
// // // // // // import React, { useState } from "react";
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TextInput,
// // // // // //   TouchableOpacity,
// // // // // //   StyleSheet,
// // // // // //   Alert,
// // // // // //   ActivityIndicator,
// // // // // // } from "react-native";
// // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // import axios from "axios";
// // // // // // import AsyncStorage from "@react-native-async-storage/async-storage"; // Correctly import AsyncStorage

// // // // // // export default function AdminLogin({ navigation }) {
// // // // // //   const [centerName, setCenterName] = useState("");
// // // // // //   const [password, setPassword] = useState("");
// // // // // //   const [isPasswordVisible, setPasswordVisible] = useState(false);
// // // // // //   const [loading, setLoading] = useState(false); // New loading state

// // // // // //   const handleLogin = async () => {
// // // // // //     // Basic client-side validation
// // // // // //     if (!centerName || !password) {
// // // // // //       Alert.alert("Error", "Center Name and Password are required.");
// // // // // //       return;
// // // // // //     }

// // // // // //     setLoading(true); // Set loading to true before API call

// // // // // //     try {
// // // // // //       // Connect to the centerSignin endpoint assuming Admin is a Center Admin
// // // // // //       const response = await axios.post(
// // // // // //         "http://192.168.189.119:5000/api/v1/center/signin/", // Endpoint for centerSignin
// // // // // //         {
// // // // // //           // IMPORTANT: Changed 'centerName' to 'centerUsername' to match backend's expected key
// // // // // //           centerUsername: centerName.trim().toLowerCase(), // Trim and lowercase username for consistency
// // // // // //           password,
// // // // // //         },
// // // // // //         {
// // // // // //           withCredentials: true, // Important if your backend sets cookies for session management
// // // // // //         }
// // // // // //       );

// // // // // //       // Destructure token and user from the successful response data
// // // // // //       const { token, user } = response.data; // Backend sends 'user' containing id and username

// // // // // //       // Assuming 'user' in the response contains id (which is centerId) and username
// // // // // //       // Save token and center ID in AsyncStorage for persistent storage
// // // // // //       await AsyncStorage.setItem("token", token); // Store the authentication token
// // // // // //       await AsyncStorage.setItem("centerId", user.id); // Store the center's ID

// // // // // //       // Show success alert and navigate to the main admin section
// // // // // //       Alert.alert("Login Successful", `Welcome back, Admin ${user.username}!`);
// // // // // //       navigation.navigate("AmainNavigator"); // Navigate to the admin main navigator
// // // // // //     } catch (error) {
// // // // // //       // Log the detailed error for debugging purposes
// // // // // //       console.error("Admin Login Error:", error);

// // // // // //       // Extract a user-friendly error message from the response, if available
// // // // // //       const message =
// // // // // //         error.response?.data?.message || "Something went wrong during login.";
// // // // // //       Alert.alert("Login Failed", message); // Display error message to the user
// // // // // //     } finally {
// // // // // //       setLoading(false); // Always set loading to false after the API call completes (success or failure)
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={styles.container}>
// // // // // //       <View style={styles.loginBox}>
// // // // // //         <Text style={styles.heading}>SCRAP CONNECT.</Text>
// // // // // //         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

// // // // // //         {/* TextInput for Center Name (username) */}
// // // // // //         <TextInput
// // // // // //           placeholder="Center Name" // Placeholder text
// // // // // //           placeholderTextColor="#ccc"
// // // // // //           style={styles.input}
// // // // // //           keyboardType="default" // Default keyboard type for usernames
// // // // // //           autoCapitalize="none" // Prevent auto-capitalization
// // // // // //           value={centerName} // Bind to centerName state
// // // // // //           onChangeText={setCenterName} // Update centerName state on text change
// // // // // //         />

// // // // // //         {/* Password input with toggle visibility */}
// // // // // //         <View style={styles.passwordContainer}>
// // // // // //           <TextInput
// // // // // //             placeholder="Password" // Placeholder text
// // // // // //             placeholderTextColor="#ccc"
// // // // // //             style={styles.passwordInput}
// // // // // //             secureTextEntry={!isPasswordVisible} // Toggle for password visibility
// // // // // //             value={password} // Bind to password state
// // // // // //             onChangeText={setPassword} // Update password state on text change
// // // // // //           />
// // // // // //           {/* Eye icon to toggle password visibility */}
// // // // // //           <TouchableOpacity
// // // // // //             onPress={() => setPasswordVisible(!isPasswordVisible)}
// // // // // //             style={styles.eyeIcon}
// // // // // //           >
// // // // // //             <Ionicons
// // // // // //               name={isPasswordVisible ? "eye-off" : "eye"} // Change icon based on visibility
// // // // // //               size={24}
// // // // // //               color="#ccc"
// // // // // //             />
// // // // // //           </TouchableOpacity>
// // // // // //         </View>

// // // // // //         {/* Sign In Button */}
// // // // // //         <TouchableOpacity
// // // // // //           style={styles.signInButton}
// // // // // //           onPress={handleLogin} // Call handleLogin function on press
// // // // // //           disabled={loading} // Disable button when loading to prevent multiple submissions
// // // // // //         >
// // // // // //           {loading ? (
// // // // // //             // Show loading indicator when loading
// // // // // //             <ActivityIndicator color={'#FFFFFF'} /> // Use string literal for color
// // // // // //           ) : (
// // // // // //             // Show "Sign In" text when not loading
// // // // // //             <Text style={styles.signInButtonText}>Sign In</Text>
// // // // // //           )}
// // // // // //         </TouchableOpacity>

// // // // // //         {/* Links for "Don't have an account?" and "Forgot Password?" */}
// // // // // //         <View style={styles.linksContainer}>
// // // // // //           <TouchableOpacity onPress={() => navigation.navigate("Asignup")}>
// // // // // //             <Text style={styles.linkText}>Don't have an account?</Text>
// // // // // //           </TouchableOpacity>

// // // // // //           <TouchableOpacity onPress={() => navigation.navigate("AResetpassword")}>
// // // // // //             <Text style={[styles.linkText, { marginTop: 10 }]}>Forgot Password?</Text>
// // // // // //           </TouchableOpacity>
// // // // // //         </View>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // }

// // // // // // // Define color constants for consistent styling
// // // // // // const DARK_GREEN = "#004225";
// // // // // // const GREEN = "#3CB371";
// // // // // // const WHITE = "#FFFFFF"; // Defined here for use in ActivityIndicator and other components

// // // // // // // StyleSheet for the component's UI
// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: DARK_GREEN, // Dark green background for the entire screen
// // // // // //     justifyContent: "center", // Center content vertically
// // // // // //     alignItems: "center", // Center content horizontally
// // // // // //   },
// // // // // //   loginBox: {
// // // // // //     width: "85%", // 85% width of the screen
// // // // // //     backgroundColor: "#013220", // Slightly lighter green for the login box
// // // // // //     borderRadius: 10, // Rounded corners
// // // // // //     borderWidth: 2, // Border for the box
// // // // // //     borderColor: GREEN, // Green border color
// // // // // //     padding: 25, // Padding inside the box
// // // // // //   },
// // // // // //   heading: {
// // // // // //     fontSize: 28,
// // // // // //     fontWeight: "bold",
// // // // // //     color: WHITE,
// // // // // //     textAlign: "center",
// // // // // //   },
// // // // // //   welcome: {
// // // // // //     fontSize: 18,
// // // // // //     fontStyle: "italic",
// // // // // //     color: WHITE,
// // // // // //     textAlign: "center",
// // // // // //     marginVertical: 15, // Vertical margin
// // // // // //   },
// // // // // //   input: {
// // // // // //     backgroundColor: "#014d33", // Darker green for input fields
// // // // // //     color: WHITE, // White text color
// // // // // //     borderRadius: 6,
// // // // // //     paddingHorizontal: 15,
// // // // // //     paddingVertical: 12,
// // // // // //     fontSize: 16,
// // // // // //     marginBottom: 15, // Margin below each input
// // // // // //   },
// // // // // //   passwordContainer: {
// // // // // //     position: "relative", // Needed for absolute positioning of the eye icon
// // // // // //     marginBottom: 15,
// // // // // //   },
// // // // // //   passwordInput: {
// // // // // //     backgroundColor: "#014d33",
// // // // // //     color: WHITE,
// // // // // //     borderRadius: 6,
// // // // // //     paddingHorizontal: 15,
// // // // // //     paddingVertical: 12,
// // // // // //     fontSize: 16,
// // // // // //     paddingRight: 45, // Make space for the eye icon
// // // // // //   },
// // // // // //   eyeIcon: {
// // // // // //     position: "absolute",
// // // // // //     right: 15,
// // // // // //     top: 12,
// // // // // //   },
// // // // // //   signInButton: {
// // // // // //     backgroundColor: GREEN, // Green background for the button
// // // // // //     borderRadius: 6,
// // // // // //     paddingVertical: 15,
// // // // // //     alignItems: "center", // Center text horizontally
// // // // // //     marginTop: 5,
// // // // // //   },
// // // // // //   signInButtonText: {
// // // // // //     color: WHITE,
// // // // // //     fontWeight: "600",
// // // // // //     fontSize: 18,
// // // // // //   },
// // // // // //   linksContainer: {
// // // // // //     marginTop: 20,
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   linkText: {
// // // // // //     color: WHITE,
// // // // // //     textDecorationLine: "underline", // Underline the links
// // // // // //     fontSize: 16,
// // // // // //   },
// // // // // // });


// // // // //test
// // // // const bcrypt=require("bcrypt");
// // // // const jwt=require("jsonwebtoken");
// // // // const Center=require('../models/center');
// // // // const Collector = require('../models/collector');
// // // // const Requests=require('../models/Requests')

// // // // const centerSignin=async(req,res)=>{

// // // //     try {
// // // //         let {centerUsername,password}=req.body;

// // // //         centerUsername=centerUsername.trim().toLowerCase()

// // // //         if(!centerUsername ||!password){
// // // //             return res.status(400).json({message:"Username and Password are required!"})
// // // //         }
    
// // // //         const center=await Center.findOne({centerUsername});
    
// // // //         if(!center){
// // // //             return res.status(400).json({message:"Collection center does not exist!"})
// // // //         }
    
// // // //         const isMatch=await bcrypt.compare(password,center.password);
// // // //         if(!isMatch){
// // // //             return res.status(400).json({message:"Invalid Password"})
// // // //         }
    
// // // //         //token generation
// // // //         const token=jwt.sign({
// // // //             centerId:center._id,
// // // //             username:center.username
// // // //         },
// // // //         process.env.JWT_SECRET,
// // // //         {expiresIn:"1h"}
// // // //         );
    
// // // //         return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
// // // //             message:"Login successfull!",
// // // //             success:true,
// // // //             token,
// // // //             user:{ // FIX: Include centerName here
// // // //                 id:center._id,
// // // //                 username:center.username,
// // // //                 centerName: center.centerName // <--- Added this line
// // // //             }
// // // //         })
        
// // // //     } catch (error) {
// // // //         return res.status(500).json({message:error.message})
// // // //     }
    
// // // // }

// // // // // get center Info
// // // // const getCenterInfo=async(req,res)=>{
// // // //     const {centerId}=req.params;
// // // //     try {
// // // //         const center=await Center.findById(centerId);
// // // //         if(!center){
// // // //             return res.status(404).json({message:"Collection center not found"});
// // // //         }

// // // //         return res.status(200).json({
// // // //             message:"Collection center Info Fetched Successfully!",
// // // //             success:true,
// // // //             center
// // // //         })

// // // //     } catch (error) {
// // // //         return res.status(500).json({message:"Error fetching collection center info",error})
        
// // // //     }
// // // // }

// // // // const centerSignout=(req,res)=>{
// // // //     try {
// // // //         res.clearCookie('access_token').status(200).json({
// // // //             message:"Signout successful!",
// // // //             success:true
// // // //         })
// // // //     } catch (error) {
// // // //         return res.status(500).json({message:error.message})
// // // //     }
// // // // }

// // // // // get all registered collectors of the collection center
// // // // const getCollectors=async(req,res)=>{
// // // //     const {centerId}=req.params;
// // // //     try {
// // // //         const center=await Center.findById(centerId);
// // // //         if(!center){
// // // //             return res.status(404).json({message:"Collection center not found"});
// // // //         }

// // // //         const collectors=await Collector.find({center:centerId});

// // // //         if(collectors.length===0){
// // // //             return res.status(404).json({message:"No collectors registered for this collection center"});
// // // //         }
// // // //         return res.status(200).json({
// // // //             message:"Collectors fetched successfully!",
// // // //             success:true,
// // // //             collectors:collectors,
// // // //             totalCollectors:collectors.length
// // // //         })
// // // //     } catch (error) {
// // // //         return res.status(500).json({message:"Error fetching collectors",error})
// // // //     }
// // // // }

// // // // // get all center requests
// // // // const getAllCenterRequests=async(req,res)=>{
// // // //     const {centerId}=req.params;

// // // //     try {
// // // //         // Find the center and populate the collectionCenter field in requests
// // // //         const center = await Center.findById(centerId);

// // // //         if(!center){
// // // //             return res.status(404).json({message:"Collection center not found"});
// // // //         }

// // // //         // Populate 'collectionCenter' to get its name if the frontend needs it
// // // //         // The frontend (Trequests.js) uses `req.collectionCenter?.centerName`
// // // //         const requests=await Requests.find({collectionCenter:centerId})
// // // //                                     .populate('collectionCenter', 'centerName') // Populate only the centerName field
// // // //                                     .populate('homeownerId', 'username phoneNo'); // Populate homeowner for name/phone

// // // //         if(requests.length===0){
// // // //             return res.status(404).json({message:"No collection requests made for this collection center"});
// // // //         }
// // // //         return res.status(200).json({
// // // //             message:"Collection Requests fetched successfully!",
// // // //             success:true,
// // // //             requests:requests,
// // // //             totalRequests:requests.length
// // // //         })
// // // //     }
// // // //     catch (error) {
// // // //         console.error("Error in getAllCenterRequests:", error); // Log the actual error
// // // //         return res.status(500).json({
// // // //                 message:"Error fetching center requests",
// // // //                 success:false,
// // // //                 error: error.message // Provide more detail in dev environment
// // // //             })
// // // //     }

// // // // }



// // // // module.exports={
// // // //     centerSignin,
// // // //     centerSignout,
// // // //     getCenterInfo,
// // // //     getCollectors,
// // // //     getAllCenterRequests
// // // // }

// // // //assign collectors
// // // const Request = require('../models/Requests');
// // // const Center = require('../models/center'); // Make sure you import your Center model
// // // const Collector = require('../models/collector'); // Make sure Collector is imported

// // // // ... (other functions like centerSignin, getCenterInfo, centerSignout, getCollectors) ...

// // // // New or enhanced function to get all requests for a center, with optional status filter
// // // const getAllCenterRequests = async (req, res) => {
// // //     const { centerId } = req.params;
// // //     const { status } = req.query; // Get status from query parameter

// // //     try {
// // //         const center = await Center.findById(centerId);
// // //         if (!center) {
// // //             return res.status(404).json({ message: "Collection Center not found!" });
// // //         }

// // //         let query = { collectionCenter: centerId };
// // //         if (status) {
// // //             query.status = status; // Add status filter if provided
// // //         }

// // //         const allRequests = await Request.find(query)
// // //             .populate('homeownerId', 'username phoneNo') // Populate homeowner details
// // //             .populate('collectorId', 'collectorName phoneNo'); // Populate collector details
        
// // //         res.status(200).json({
// // //             message: "Center Requests fetched successfully!",
// // //             success: true,
// // //             centerName: center.centerName,
// // //             totalRequests: allRequests.length,
// // //             requests: allRequests
// // //         });
// // //     } catch (error) {
// // //         console.error("Error fetching center requests:", error);
// // //         return res.status(500).json({
// // //             message: "Internal server error fetching center requests",
// // //             error: error.message
// // //         });
// // //     }
// // // };

// // // // ... (other functions) ...

// // // module.exports = {
// // //     // ... existing exports ...
// // //     getAllCenterRequests,
// // //     // ... any new exports ...
// // // };

// // //test for fetching requests by status
// // const Center = require('../models/center'); // Import the Center model
// // const Request = require('../models/Requests'); // Import the Request model
// // const Collector = require('../models/collector'); // Import the Collector model
// // const bcrypt = require('bcryptjs'); // For password comparison during signin
// // const jwt = require('jsonwebtoken'); // For generating JWT tokens

// // // Controller for Center Signin
// // const centerSignin = async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         // Check if center exists by email
// //         const center = await Center.findOne({ email });
// //         if (!center) {
// //             return res.status(404).json({ message: "Center not found!" });
// //         }

// //         // Check if password is correct
// //         const isMatch = await bcrypt.compare(password, center.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ message: "Invalid credentials" });
// //         }

// //         // Generate JWT token
// //         const token = jwt.sign(
// //             { id: center._id, role: 'center' }, // Payload for the token
// //             process.env.JWT_SECRET, // Your secret key from .env
// //             { expiresIn: '1h' } // Token expiry time
// //         );

// //         res.status(200).json({
// //             message: "Center Login Success!",
// //             success: true,
// //             token,
// //             centerId: center._id, // Crucially, send the center's _id to the frontend
// //             centerName: center.centerName,
// //             email: center.email
// //         });

// //     } catch (error) {
// //         console.error("Error during center signin:", error);
// //         res.status(500).json({ message: "Server error during signin", error: error.message });
// //     }
// // };

// // // Controller to get Center's information by ID
// // const getCenterInfo = async (req, res) => {
// //     const { centerId } = req.params;

// //     try {
// //         const center = await Center.findById(centerId);
// //         if (!center) {
// //             return res.status(404).json({ message: "Center not found" });
// //         }
// //         // Exclude sensitive information like password
// //         const { password, ...centerInfo } = center._doc;
// //         res.status(200).json({
// //             message: "Center Info Fetched Successfully!",
// //             success: true,
// //             center: centerInfo
// //         });
// //     } catch (error) {
// //         console.error("Error fetching center info:", error);
// //         res.status(500).json({ message: "Error fetching center info", error: error.message });
// //     }
// // };

// // // Controller to get all collectors registered to a specific center
// // const getCollectors = async (req, res) => {
// //     const { centerId } = req.params;

// //     try {
// //         const center = await Center.findById(centerId);
// //         if (!center) {
// //             return res.status(404).json({ message: "Collection Center not found!" });
// //         }

// //         // Find collectors whose 'center' field matches the centerId
// //         const collectors = await Collector.find({ center: centerId });

// //         res.status(200).json({
// //             message: "Collectors fetched successfully!",
// //             success: true,
// //             centerName: center.centerName,
// //             totalCollectors: collectors.length,
// //             collectors: collectors
// //         });
// //     } catch (error) {
// //         console.error("Error fetching collectors:", error);
// //         res.status(500).json({ message: "Internal server error fetching collectors", error: error.message });
// //     }
// // };

// // // Controller to get all requests for a specific center, with optional status filter
// // const getAllCenterRequests = async (req, res) => {
// //     const { centerId } = req.params;
// //     const { status } = req.query; // Get status from query parameter (e.g., ?status=approved)

// //     try {
// //         const center = await Center.findById(centerId);
// //         if (!center) {
// //             return res.status(404).json({ message: "Collection Center not found!" });
// //         }

// //         let query = { collectionCenter: centerId }; // Base query for the center
// //         if (status) {
// //             query.status = status; // Add status filter if provided in the query string
// //         }

// //         // Find requests, and populate homeowner and collector details
// //         const allRequests = await Request.find(query)
// //             .populate('homeownerId', 'username phoneNo') // Populates username and phoneNo from User model
// //             .populate('collectorId', 'collectorName phoneNo'); // Populates collectorName and phoneNo from Collector model

// //         res.status(200).json({
// //             message: "Center Requests fetched successfully!",
// //             success: true,
// //             centerName: center.centerName,
// //             totalRequests: allRequests.length,
// //             requests: allRequests // This will include populated homeownerId and collectorId
// //         });
// //     } catch (error) {
// //         console.error("Error fetching center requests:", error);
// //         return res.status(500).json({
// //             message: "Internal server error fetching center requests",
// //             error: error.message
// //         });
// //     }
// // };


// // // Controller for Center Signout (simple logout, typically handled by client-side token removal)
// // const centerSignout = async (req, res) => {
// //     // In a stateless JWT system, signout is primarily handled on the client by deleting the token.
// //     // However, you can use this endpoint for server-side cleanup if needed (e.g., blacklisting tokens).
// //     // For now, it's a placeholder.
// //     res.status(200).json({ message: "Center logged out successfully", success: true });
// // };

// // module.exports = {
// //     centerSignin,
// //     getCenterInfo,
// //     getCollectors,
// //     getAllCenterRequests, // Export the updated function
// //     centerSignout
// // };


// //test for collectors fetching
// const Center = require('../models/center'); // Import the Center model
// const Request = require('../models/Requests'); // Import the Request model
// const Collector = require('../models/collector'); // Import the Collector model
// const bcrypt = require('bcryptjs'); // For password comparison during signin
// const jwt = require('jsonwebtoken'); // For generating JWT tokens

// // Controller for Center Signin
// const centerSignin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if center exists by email
//         const center = await Center.findOne({ email });
//         if (!center) {
//             return res.status(404).json({ message: "Center not found!" });
//         }

//         // Check if password is correct
//         const isMatch = await bcrypt.compare(password, center.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: center._id, role: 'center' }, // Payload for the token
//             process.env.JWT_SECRET, // Your secret key from .env
//             { expiresIn: '1h' } // Token expiry time
//         );

//         res.status(200).json({
//             message: "Center Login Success!",
//             success: true,
//             token,
//             centerId: center._id, // Crucially, send the center's _id to the frontend
//             centerName: center.centerName,
//             email: center.email
//         });

//     } catch (error) {
//         console.error("Error during center signin:", error);
//         res.status(500).json({ message: "Server error during signin", error: error.message });
//     }
// };

// // Controller to get Center's information by ID
// const getCenterInfo = async (req, res) => {
//     const { centerId } = req.params;

//     try {
//         const center = await Center.findById(centerId);
//         if (!center) {
//             return res.status(404).json({ message: "Center not found" });
//         }
//         // Exclude sensitive information like password
//         const { password, ...centerInfo } = center._doc;
//         res.status(200).json({
//             message: "Center Info Fetched Successfully!",
//             success: true,
//             center: centerInfo
//         });
//     } catch (error) {
//         console.error("Error fetching center info:", error);
//         res.status(500).json({ message: "Error fetching center info", error: error.message });
//     }
// };

// // Controller to get all collectors registered to a specific center
// const getCollectors = async (req, res) => {
//     const { centerId } = req.params;

//     try {
//         const center = await Center.findById(centerId);
//         if (!center) {
//             return res.status(404).json({ message: "Collection Center not found!" });
//         }

//         // Find collectors whose 'center' field matches the centerId
//         // This will fetch all fields of the collector document, including 'fullName' and 'username'
//         const collectors = await Collector.find({ center: centerId });

//         res.status(200).json({
//             message: "Collectors fetched successfully!",
//             success: true,
//             centerName: center.centerName,
//             totalCollectors: collectors.length,
//             collectors: collectors // The 'collectors' array here will contain objects with 'fullName'
//         });
//     } catch (error) {
//         console.error("Error fetching collectors:", error);
//         res.status(500).json({ message: "Internal server error fetching collectors", error: error.message });
//     }
// };

// // Controller to get all requests for a specific center, with optional status filter
// const getAllCenterRequests = async (req, res) => {
//     const { centerId } = req.params;
//     const { status } = req.query; // Get status from query parameter (e.g., ?status=approved)

//     try {
//         const center = await Center.findById(centerId);
//         if (!center) {
//             return res.status(404).json({ message: "Collection Center not found!" });
//         }

//         let query = { collectionCenter: centerId }; // Base query for the center
//         if (status) {
//             query.status = status; // Add status filter if provided in the query string
//         }

//         // Find requests, and populate homeowner and collector details
//         const allRequests = await Request.find(query)
//             .populate('homeownerId', 'username phoneNo') // Populates username and phoneNo from User model
//             .populate('collectorId', 'fullName phoneNo'); // FIX: Populates 'fullName' and 'phoneNo' from Collector model

//         res.status(200).json({
//             message: "Center Requests fetched successfully!",
//             success: true,
//             centerName: center.centerName,
//             totalRequests: allRequests.length,
//             requests: allRequests // This will include populated homeownerId and collectorId with 'fullName'
//         });
//     } catch (error) {
//         console.error("Error fetching center requests:", error);
//         return res.status(500).json({
//             message: "Internal server error fetching center requests",
//             error: error.message
//         });
//     }
// };


// // Controller for Center Signout (simple logout, typically handled by client-side token removal)
// const centerSignout = async (req, res) => {
//     // In a stateless JWT system, signout is primarily handled on the client by deleting the token.
//     // However, you can use this endpoint for server-side cleanup if needed (e.g., blacklisting tokens).
//     // For now, it's a placeholder.
//     res.status(200).json({ message: "Center logged out successfully", success: true });
// };

// module.exports = {
//     centerSignin,
//     getCenterInfo,
//     getCollectors,
//     getAllCenterRequests, // Export the updated function
//     centerSignout
// };


//PROFILE TEST
// ./controllers/center.js
const Center = require('../models/center'); // Import the Center model
const Request = require('../models/Requests'); // Import the Request model
const Collector = require('../models/collector'); // Import the Collector model
const bcrypt = require('bcryptjs'); // For password comparison during signin
const jwt = require('jsonwebtoken'); // For generating JWT tokens

/**
 * @desc Handles Center Signin
 * @route POST /api/v1/center/signin
 * @access Public
 */
const centerSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if center exists by email
        const center = await Center.findOne({ email });
        if (!center) {
            return res.status(404).json({ message: "Center not found!" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, center.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token for center
        const token = jwt.sign(
            { id: center._id, role: 'center' }, // Payload for the token
            process.env.JWT_SECRET, // Your secret key from .env
            { expiresIn: '1h' } // Token expiry time
        );

        res.status(200).json({
            message: "Center Login Success!",
            success: true,
            token,
            centerId: center._id, // Send the center's _id to the frontend
            userRole: 'center', // Add role to token payload
            centerInfo: { // Send specific info for profile
                centerName: center.centerName,
                centerUsername: center.centerUsername,
                email: center.email,
                phoneNo: center.phoneNo,
                location: center.location
            }
        });

    } catch (error) {
        console.error("Error during center signin:", error);
        res.status(500).json({ message: "Server error during signin", error: error.message });
    }
};

/**
 * @desc Gets Center's information by ID
 * @route GET /api/v1/center/info/:centerId
 * @access Private (assuming authenticated center)
 */
const getCenterInfo = async (req, res) => {
    const { centerId } = req.params;

    try {
        const center = await Center.findById(centerId)
            .select('-password -resetOtp -otpExpires'); // Exclude sensitive information

        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }
        
        res.status(200).json({
            message: "Center Info Fetched Successfully!",
            success: true,
            center: center
        });
    } catch (error) {
        console.error("Error fetching center info:", error);
        res.status(500).json({ message: "Error fetching center info", error: error.message });
    }
};

/**
 * @desc Gets all collectors registered to a specific center
 * @route GET /api/v1/center/collectors/:centerId
 * @access Private (assuming authenticated center)
 */
const getCollectors = async (req, res) => {
    const { centerId } = req.params;

    try {
        const center = await Center.findById(centerId);
        if (!center) {
            return res.status(404).json({ message: "Collection Center not found!" });
        }

        // Find collectors whose 'center' field matches the centerId
        const collectors = await Collector.find({ center: centerId });

        res.status(200).json({
            message: "Collectors fetched successfully!",
            success: true,
            centerName: center.centerName,
            totalCollectors: collectors.length,
            collectors: collectors
        });
    } catch (error) {
        console.error("Error fetching collectors:", error);
        res.status(500).json({ message: "Internal server error fetching collectors", error: error.message });
    }
};

/**
 * @desc Gets all requests for a specific center, with optional status filter
 * @route GET /api/v1/requests/center/:centerId/list/
 * @access Private (assuming authenticated center)
 */
const getAllCenterRequests = async (req, res) => {
    const { centerId } = req.params;
    const { status } = req.query;

    try {
        const center = await Center.findById(centerId);
        if (!center) {
            return res.status(404).json({ message: "Collection Center not found!" });
        }

        let query = { collectionCenter: centerId };
        if (status) {
            query.status = status;
        }

        const allRequests = await Request.find(query)
            .populate('homeownerId', 'username phoneNo')
            .populate('collectorId', 'fullName phoneNo');

        res.status(200).json({
            message: "Center Requests fetched successfully!",
            success: true,
            centerName: center.centerName,
            totalRequests: allRequests.length,
            requests: allRequests
        });
    } catch (error) {
        console.error("Error fetching center requests:", error);
        return res.status(500).json({
            message: "Internal server error fetching center requests",
            error: error.message
        });
    }
};

/**
 * @desc Handles Center Signout
 * @route POST /api/v1/center/signout
 * @access Public (token invalidated on client-side primarily)
 */
const centerSignout = async (req, res) => {
    try {
        // In a stateless JWT system, signout is primarily handled on the client by deleting the token.
        // If you're using HTTP-only cookies, clearing the cookie is also relevant.
        res.clearCookie('access_token').status(200).json({
            message: "Center signed out successfully!",
            success: true
        });
    } catch (error) {
        console.error("Error during center signout:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    centerSignin,
    getCenterInfo,
    getCollectors,
    getAllCenterRequests,
    centerSignout
};