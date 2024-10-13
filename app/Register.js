import * as React from "react";
import { Image, ScrollView, StatusBar } from "react-native"; // Import StatusBar
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "../request/requests";
import AppContext from "./context/AppContext";
import DefaultLoader from "../loaders/default";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Button, TextInput, IconButton } from "react-native-paper";
import commonStyles from "../components/commons/styles/generic";
import LoginRegisterLayout from "../components/layouts/LoginRegisterLayout";
import { SelectList } from "react-native-dropdown-select-list";
import accounttypes from "../constants/accounttypes";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountype, setAccountType] = React.useState(null);
  const handleLogin = () => {
    navigation.navigate("OTP");
  };
  return (
    <LoginRegisterLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              label={<Text style={styles.label}>Enter Name</Text>}
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="account" color={"#666"} />}
              autoCapitalize="none"
              style={[styles.input, { marginTop: 0 }]}
              mode="outlined"
              outlineStyle={styles.outlineStyle}
              cursorColor="#ff6200"
              textColor="#111"
            />
            <TextInput
              label={<Text style={styles.label}>Phone Number</Text>}
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="phone" color={"#666"} />}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              outlineStyle={styles.outlineStyle}
              cursorColor="#ff6200"
              textColor="#111"
            />
            <TextInput
              label={<Text style={styles.label}>Email</Text>}
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon icon="email" color={"#666"} />}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              outlineStyle={styles.outlineStyle}
              cursorColor="#ff6200"
              textColor="#111"
            />
            <SelectList
              setSelected={setAccountType}
              data={accounttypes}
              save="value"
              boxStyles={styles.input}
              placeholder={`Select Account Type`}
              search={false}
            />

            <TextInput
              label={<Text style={styles.label}>Password</Text>}
              value={password}
              onChangeText={setPassword}
              left={<TextInput.Icon icon="lock" color={"#666"} />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  color={"#000"}
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
            <View style={[commonStyles.centerFlexContainer, { marginTop: 0 }]}>
              <Text style={[styles.forgotPass]}>already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.forgotPass, styles.orangeText]}>
                  Login Now
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={[commonStyles.bold, styles.login]}>Create</Text>
            </Button>
            <View>
              {/* <Text style={[styles.forgotPass]}>
                Or create account using social media
              </Text> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 1,
                  width: "80%",
                  margin: "auto",
                }}
              >
                <IconButton
                  icon="facebook"
                  iconColor={"#3c5998"}
                  size={25}
                  containerColor="#eee"
                  style={{ elevation: 4 }}
                />
                <IconButton
                  icon="google"
                  iconColor={"red"}
                  size={25}
                  containerColor="#eee"
                  onPress={() => authService.login()}
                />
                <IconButton
                  icon="twitter"
                  iconColor={"#56acee"}
                  size={25}
                  containerColor="#eee"
                />
              </View> */}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LoginRegisterLayout>
  );
};

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    marginTop: 8,
    backgroundColor: "#fff",
    borderColor: "white",
    elevation: 4,
    borderWidth: 0,
  },

  button: {
    marginTop: 0,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
  },
  signInText: {
    fontSize: 19,
    textAlign: "center",
    fontWeight: "400",
    textTransform: "capitalize",
    color: "gray",
  },
  inputContainer: {
    marginTop: 0,
  },
  forgotPass: {
    fontSize: 17,
    textAlign: "center",
    color: "gray",
    marginTop: 10,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  boldOrangeText: {
    color: "#ff6200",
    fontWeight: "bold",
  },

  orangeText: {
    color: "#ff6200",
    fontWeight: "bold",
  },
  outlineStyle: {
    borderColor: "#fff",
  },
  label: {
    color: "#555",
    // fontWeight: "500",
  },
  login: {
    fontSize: 17,
    color: "#fff",
  },
});

export default Register;
