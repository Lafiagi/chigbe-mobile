import * as React from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import commonStyles from "../components/commons/styles/generic";
import LoginRegisterLayout from "../components/layouts/LoginRegisterLayout";
import OnboardingContext from "./context/OnboardingContext";
import api from "../request/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // State to handle loading state
  const { setIsSignedIn, isSignedIn, setUser } =
    React.useContext(OnboardingContext);
  const [errorMessage, setErrorMessage] = React.useState(null);
  // Email validation function using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const generatedAccount = algosdk.generateAccount();
const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);
console.log(`My address: ${generatedAccount.addr}`);
console.log(`My passphrase: ${passphrase}`);

  // Check if both fields are filled and if email is valid
  const isFormValid = email !== "" && password !== "" && isValidEmail(email);

  // Handle login function
  const handleLogin = async () => {
    setLoading(true); // Set loading state to true
    setErrorMessage(null);

    try {
      const response = await api.post("/signin", {
        email: email,
        password: password,
      });
      const { token } = response.data; // Assuming the API returns a token

      await AsyncStorage.setItem("authToken", JSON.stringify(token));
      await AsyncStorage.setItem("user", JSON.stringify(response?.data));
      setUser(response?.data);
      console.log(response.data);

      Toast.show("Login Successful!", Toast.LONG);
      setIsSignedIn(true);
    } catch (error) {
      setErrorMessage(error?.response?.data?.detail);
      Toast.show(error?.response?.data?.detail, Toast.LONG);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <LoginRegisterLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.signInText}>Sign in to your account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label={<Text style={styles.label}>Email</Text>}
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email" color={"#ff6200"} />}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              outlineStyle={styles.outlineStyle}
              cursorColor="#ff6200"
              textColor="#111"
              error={!isValidEmail(email) && email !== ""} // Show error if email is invalid
            />
            <TextInput
              label={<Text style={styles.label}>Password</Text>}
              value={password}
              onChangeText={setPassword}
              left={<TextInput.Icon icon="lock" color={"#ff6200"} />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  color={"#ff6200"}
                  onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
                />
              }
              secureTextEntry={!showPassword} // Toggle password visibility
              style={styles.input}
              mode="outlined"
              outlineStyle={styles.outlineStyle}
              cursorColor="#ff6200"
              textColor="#111"
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <View style={[commonStyles.centerFlexContainer, { marginTop: 10 }]}>
              <Text style={[styles.forgotPass]}>Forgot your </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={[styles.forgotPass, styles.orangeText]}>
                  Password?
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={!isFormValid || loading} // Disable if form is invalid or loading
              loading={loading} // Show loading indicator while logging in
              style={[
                styles.button,
                (!isFormValid || loading) && styles.disabledButton, // Apply disabled style if invalid or loading
              ]}
            >
              <Text style={[commonStyles.bold, styles.login]}>Login</Text>
            </Button>

            <View style={[commonStyles.centerFlexContainer, { marginTop: 30 }]}>
              <Text style={[styles.forgotPass]}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={[styles.forgotPass, styles.orangeText]}>
                  Register now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LoginRegisterLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 20,
    marginTop: 15,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
  },
  disabledButton: {
    backgroundColor: "#ddd", // Greyed-out background for disabled button
  },
  signInText: {
    fontSize: 19,
    textAlign: "center",
    fontWeight: "400",
    textTransform: "capitalize",
    color: "gray",
  },
  inputContainer: {
    marginTop: 30,
  },
  forgotPass: {
    fontSize: 17,
    textAlign: "center",
    color: "gray",
  },
  orangeText: {
    color: "#ff6200",
    fontWeight: "bold",
  },
  outlineStyle: {
    borderColor: "#fff",
  },
  login: {
    fontSize: 17,
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Login;
