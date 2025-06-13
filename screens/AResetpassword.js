import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AdminResetPassword({ navigation }) {
  const [email, setEmail] = React.useState("");

  const handleReset = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    // 🔐 Firebase Password Reset Placeholder
    // You can integrate Firebase like:
    // sendPasswordResetEmail(auth, email)
    //   .then(() => Alert.alert("Success", "Check your email to reset your password."))
    //   .catch((error) => Alert.alert("Error", error.message));

    Alert.alert("Success", "If this email exists, you'll receive reset instructions.");
    navigation.navigate("ALogin");
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

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ALogin")}>
            <Text style={styles.linkText}>Back to login</Text>
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
