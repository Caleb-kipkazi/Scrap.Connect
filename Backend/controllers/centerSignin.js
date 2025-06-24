// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const Center=require('../models/center');
// const Collector = require('../models/collector');
// const Requests=require('../models/Requests')

// const centerSignin=async(req,res)=>{

//     try {
//         let {centerUsername,password}=req.body;

//         centerUsername=centerUsername.trim().toLowerCase()

//         if(!centerUsername ||!password){
//             return res.status(400).json({message:"Username and Password are required!"})
//         }
    
//         const center=await Center.findOne({centerUsername});
    
//         if(!center){
//             return res.status(400).json({message:"Collection center does not exist!"})
//         }
    
//         const isMatch=await bcrypt.compare(password,center.password);
//         if(!isMatch){
//             return res.status(400).json({message:"Invalid Password"})
//         }
    
//         //token generation
//         const token=jwt.sign({
//             centerId:center._id,
//             username:center.username
//         },
//         process.env.JWT_SECRET,
//         {expiresIn:"1h"}
//         );
    
//         return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
//             message:"Login successfull!",
//             success:true,
//             token,
//             user:{
//                 id:center._id,
//                 username:center.username
//             }
//         })
        
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
   
// }

// // get center Info
// const getCenterInfo=async(req,res)=>{
//     const {centerId}=req.params;
//     try {
//         const center=await Center.findById(centerId);
//         if(!center){
//             return res.status(404).json({message:"Collection center not found"});
//         }

//         return res.status(200).json({
//             message:"Collection center Info Fetched Successfully!",
//             success:true,
//             center
//         })

//     } catch (error) {
//         return res.status(500).json({message:"Error fetching collection center info",error})
        
//     }
// }

// const centerSignout=(req,res)=>{
//     try {
//         res.clearCookie('access_token').status(200).json({
//             message:"Signout successful!",
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
// }

// // get all registered collectors of the collection center
// const getCollectors=async(req,res)=>{
//     const {centerId}=req.params;
//     try {
//         const center=await Center.findById(centerId);
//         if(!center){
//             return res.status(404).json({message:"Collection center not found"});
//         }

//         const collectors=await Collector.find({center:centerId});

//         if(collectors.length===0){
//             return res.status(404).json({message:"No collectors registered for this collection center"});
//         }
//         return res.status(200).json({
//             message:"Collectors fetched successfully!",
//             success:true,
//             collectors:collectors,
//             totalCollectors:collectors.length
//         })
//     } catch (error) {
//         return res.status(500).json({message:"Error fetching collectors",error})
//     }
// }

// // get all center requests
// const getAllCenterRequests=async(req,res)=>{
//     const {centerId}=req.params;

//     try {
//         const center =await Center.findById(centerId);

//         if(!center){
//             return res.status(404).json({message:"Collection center not found"});
//         }

//         const requests=await Requests.find({collectionCenter:centerId})

//         if(requests.length===0){
//             return res.status(404).json({message:"No collection requests made for this collection center"});
//             }
//             return res.status(200).json({
//                 message:"Collection Requests fetched successfully!",
//                 success:true,
//                 requests:requests,
//                 totalRequests:requests.length
//             })
//         }
//         catch (error) {
//         return res.status(500).json({
//             message:"Error fetching center requests",
//             success:false
//         })
//     }

// }



// module.exports={
//     centerSignin,
//     centerSignout,
//     getCenterInfo,
//     getCollectors,
//     getAllCenterRequests
// }

// // AdminLogin.js
// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ActivityIndicator,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import axios from "axios";
// // import AsyncStorage from "@react-native-async-storage/async-storage"; // Correctly import AsyncStorage

// // export default function AdminLogin({ navigation }) {
// //   const [centerName, setCenterName] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [isPasswordVisible, setPasswordVisible] = useState(false);
// //   const [loading, setLoading] = useState(false); // New loading state

// //   const handleLogin = async () => {
// //     // Basic client-side validation
// //     if (!centerName || !password) {
// //       Alert.alert("Error", "Center Name and Password are required.");
// //       return;
// //     }

// //     setLoading(true); // Set loading to true before API call

// //     try {
// //       // Connect to the centerSignin endpoint assuming Admin is a Center Admin
// //       const response = await axios.post(
// //         "http://192.168.137.246:5000/api/v1/center/signin/", // Endpoint for centerSignin
// //         {
// //           // IMPORTANT: Changed 'centerName' to 'centerUsername' to match backend's expected key
// //           centerUsername: centerName.trim().toLowerCase(), // Trim and lowercase username for consistency
// //           password,
// //         },
// //         {
// //           withCredentials: true, // Important if your backend sets cookies for session management
// //         }
// //       );

// //       // Destructure token and user from the successful response data
// //       const { token, user } = response.data; // Backend sends 'user' containing id and username

// //       // Assuming 'user' in the response contains id (which is centerId) and username
// //       // Save token and center ID in AsyncStorage for persistent storage
// //       await AsyncStorage.setItem("token", token); // Store the authentication token
// //       await AsyncStorage.setItem("centerId", user.id); // Store the center's ID

// //       // Show success alert and navigate to the main admin section
// //       Alert.alert("Login Successful", `Welcome back, Admin ${user.username}!`);
// //       navigation.navigate("AmainNavigator"); // Navigate to the admin main navigator
// //     } catch (error) {
// //       // Log the detailed error for debugging purposes
// //       console.error("Admin Login Error:", error);

// //       // Extract a user-friendly error message from the response, if available
// //       const message =
// //         error.response?.data?.message || "Something went wrong during login.";
// //       Alert.alert("Login Failed", message); // Display error message to the user
// //     } finally {
// //       setLoading(false); // Always set loading to false after the API call completes (success or failure)
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.loginBox}>
// //         <Text style={styles.heading}>SCRAP CONNECT.</Text>
// //         <Text style={styles.welcome}>GOOD TO SEE YOU AGAIN ADMIN.</Text>

// //         {/* TextInput for Center Name (username) */}
// //         <TextInput
// //           placeholder="Center Name" // Placeholder text
// //           placeholderTextColor="#ccc"
// //           style={styles.input}
// //           keyboardType="default" // Default keyboard type for usernames
// //           autoCapitalize="none" // Prevent auto-capitalization
// //           value={centerName} // Bind to centerName state
// //           onChangeText={setCenterName} // Update centerName state on text change
// //         />

// //         {/* Password input with toggle visibility */}
// //         <View style={styles.passwordContainer}>
// //           <TextInput
// //             placeholder="Password" // Placeholder text
// //             placeholderTextColor="#ccc"
// //             style={styles.passwordInput}
// //             secureTextEntry={!isPasswordVisible} // Toggle for password visibility
// //             value={password} // Bind to password state
// //             onChangeText={setPassword} // Update password state on text change
// //           />
// //           {/* Eye icon to toggle password visibility */}
// //           <TouchableOpacity
// //             onPress={() => setPasswordVisible(!isPasswordVisible)}
// //             style={styles.eyeIcon}
// //           >
// //             <Ionicons
// //               name={isPasswordVisible ? "eye-off" : "eye"} // Change icon based on visibility
// //               size={24}
// //               color="#ccc"
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         {/* Sign In Button */}
// //         <TouchableOpacity
// //           style={styles.signInButton}
// //           onPress={handleLogin} // Call handleLogin function on press
// //           disabled={loading} // Disable button when loading to prevent multiple submissions
// //         >
// //           {loading ? (
// //             // Show loading indicator when loading
// //             <ActivityIndicator color={'#FFFFFF'} /> // Use string literal for color
// //           ) : (
// //             // Show "Sign In" text when not loading
// //             <Text style={styles.signInButtonText}>Sign In</Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* Links for "Don't have an account?" and "Forgot Password?" */}
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

// // // Define color constants for consistent styling
// // const DARK_GREEN = "#004225";
// // const GREEN = "#3CB371";
// // const WHITE = "#FFFFFF"; // Defined here for use in ActivityIndicator and other components

// // // StyleSheet for the component's UI
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: DARK_GREEN, // Dark green background for the entire screen
// //     justifyContent: "center", // Center content vertically
// //     alignItems: "center", // Center content horizontally
// //   },
// //   loginBox: {
// //     width: "85%", // 85% width of the screen
// //     backgroundColor: "#013220", // Slightly lighter green for the login box
// //     borderRadius: 10, // Rounded corners
// //     borderWidth: 2, // Border for the box
// //     borderColor: GREEN, // Green border color
// //     padding: 25, // Padding inside the box
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
// //     marginVertical: 15, // Vertical margin
// //   },
// //   input: {
// //     backgroundColor: "#014d33", // Darker green for input fields
// //     color: WHITE, // White text color
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     marginBottom: 15, // Margin below each input
// //   },
// //   passwordContainer: {
// //     position: "relative", // Needed for absolute positioning of the eye icon
// //     marginBottom: 15,
// //   },
// //   passwordInput: {
// //     backgroundColor: "#014d33",
// //     color: WHITE,
// //     borderRadius: 6,
// //     paddingHorizontal: 15,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     paddingRight: 45, // Make space for the eye icon
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 15,
// //     top: 12,
// //   },
// //   signInButton: {
// //     backgroundColor: GREEN, // Green background for the button
// //     borderRadius: 6,
// //     paddingVertical: 15,
// //     alignItems: "center", // Center text horizontally
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
// //     textDecorationLine: "underline", // Underline the links
// //     fontSize: 16,
// //   },
// // });


//test
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Center=require('../models/center');
const Collector = require('../models/collector');
const Requests=require('../models/Requests')

const centerSignin=async(req,res)=>{

    try {
        let {centerUsername,password}=req.body;

        centerUsername=centerUsername.trim().toLowerCase()

        if(!centerUsername ||!password){
            return res.status(400).json({message:"Username and Password are required!"})
        }
    
        const center=await Center.findOne({centerUsername});
    
        if(!center){
            return res.status(400).json({message:"Collection center does not exist!"})
        }
    
        const isMatch=await bcrypt.compare(password,center.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }
    
        //token generation
        const token=jwt.sign({
            centerId:center._id,
            username:center.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
        );
    
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
            message:"Login successfull!",
            success:true,
            token,
            user:{ // FIX: Include centerName here
                id:center._id,
                username:center.username,
                centerName: center.centerName // <--- Added this line
            }
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

// get center Info
const getCenterInfo=async(req,res)=>{
    const {centerId}=req.params;
    try {
        const center=await Center.findById(centerId);
        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        return res.status(200).json({
            message:"Collection center Info Fetched Successfully!",
            success:true,
            center
        })

    } catch (error) {
        return res.status(500).json({message:"Error fetching collection center info",error})
        
    }
}

const centerSignout=(req,res)=>{
    try {
        res.clearCookie('access_token').status(200).json({
            message:"Signout successful!",
            success:true
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all registered collectors of the collection center
const getCollectors=async(req,res)=>{
    const {centerId}=req.params;
    try {
        const center=await Center.findById(centerId);
        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        const collectors=await Collector.find({center:centerId});

        if(collectors.length===0){
            return res.status(404).json({message:"No collectors registered for this collection center"});
        }
        return res.status(200).json({
            message:"Collectors fetched successfully!",
            success:true,
            collectors:collectors,
            totalCollectors:collectors.length
        })
    } catch (error) {
        return res.status(500).json({message:"Error fetching collectors",error})
    }
}

// get all center requests
const getAllCenterRequests=async(req,res)=>{
    const {centerId}=req.params;

    try {
        // Find the center and populate the collectionCenter field in requests
        const center = await Center.findById(centerId);

        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        // Populate 'collectionCenter' to get its name if the frontend needs it
        // The frontend (Trequests.js) uses `req.collectionCenter?.centerName`
        const requests=await Requests.find({collectionCenter:centerId})
                                    .populate('collectionCenter', 'centerName') // Populate only the centerName field
                                    .populate('homeownerId', 'username phoneNo'); // Populate homeowner for name/phone

        if(requests.length===0){
            return res.status(404).json({message:"No collection requests made for this collection center"});
        }
        return res.status(200).json({
            message:"Collection Requests fetched successfully!",
            success:true,
            requests:requests,
            totalRequests:requests.length
        })
    }
    catch (error) {
        console.error("Error in getAllCenterRequests:", error); // Log the actual error
        return res.status(500).json({
                message:"Error fetching center requests",
                success:false,
                error: error.message // Provide more detail in dev environment
            })
    }

}



module.exports={
    centerSignin,
    centerSignout,
    getCenterInfo,
    getCollectors,
    getAllCenterRequests
}
