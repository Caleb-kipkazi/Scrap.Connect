import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function AdminSignUp({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  // const [role, setRole] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [center, setScrapCenter] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [isConfirmVisible, setConfirmVisible] = React.useState(false);

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

  const onRegister = () => {
    if (!fullName || !email || !phone || !location || !center || !password || !confirmPassword) {
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

    navigation.navigate("ALogin");
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

        <TextInput
          placeholder="Location"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          placeholder="Scrap Center"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={center}
          onChangeText={setScrapCenter}
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

        {/* Role Picker
        <View style={styles.pickerContainer}>
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

        <TouchableOpacity style={styles.signInButton} onPress={onRegister}>
          <Text style={styles.signInButtonText}>Register</Text>
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
  // // pickerContainer: {
  // //   backgroundColor: "#014d33",
  // //   borderRadius: 6,
  // //   marginBottom: 15,
  // //   overflow: "hidden",
  // // },
  // // picker: {
  // //   color: "#fff",
  // //   fontSize: 16,
  // //   paddingVertical: Platform.OS === "android" ? 10 : 12,
  // //   paddingHorizontal: 15,
  // //   backgroundColor: "#014d33",
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

