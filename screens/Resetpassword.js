// ResetPassword.js
// ResetPassword.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import for eye icon

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Strong password check function
  const isStrongPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd) &&
    /[!@#$%^&*]/.test(pwd);

  const handleReset = async () => {
    if (!email || !newPassword || !otp) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Check for strong password before sending to backend
    if (!isStrongPassword(newPassword)) {
      Alert.alert(
        "Password Weak",
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)."
      );
      return;
    }

    try {
      // Updated backend API URL
      const response = await fetch('http://192.168.189.119:5000/api/v1/auth/resetPassword', { //
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);

        if (data.userType === 'homeowner') {
          navigation.navigate("Login");
        } else if (data.userType === 'collector') {
          navigation.navigate("CLogin");
        } else if (data.userType === 'admin') {
          navigation.navigate("ALogin");
        } else {
          // Fallback if userType is not recognized
          navigation.navigate("Login");
        }
      } else {
        Alert.alert("Error", data.message || "Something went wrong during password reset.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert("Error", "Could not connect to the server. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT</Text>
        <Text style={styles.welcome}>Reset Your Password</Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Enter OTP"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Enter new password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          {/* Changed this link to go back to RequestOTP */}
          <TouchableOpacity onPress={() => navigation.navigate("RequestOTP")}>
            <Text style={styles.linkText}>Back to Request OTP</Text>
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
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#014d33",
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    color: WHITE,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  resetButton: {
    backgroundColor: GREEN,
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
  },
  resetButtonText: {
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