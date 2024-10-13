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

import { Button, TextInput } from "react-native-paper";
import commonStyles from "../components/commons/styles/generic";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  console.log("new password rendededdd....");
  const handleLogin = () => {
    navigation.navigate("ResetSuccess");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ marginTop: 100 }}>
        <Text style={[styles.orangeText, styles.forgot]}>Reset Password</Text>
        <Text style={styles.info}>Proceed to reset your password</Text>
        <View style={styles.inputContainer}>
          <Text style={[commonStyles.bold, styles.createNewText]}>
            Create New Password
          </Text>

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
          <Text style={styles.passwordInfo}>
            Your password must be 8 characters and contain 1 number, uppercase
            letter, 1 lowercase letter and 1 symbol
          </Text>
          <TextInput
            label={<Text style={styles.label}>Confirm Password</Text>}
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

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            <Text style={[commonStyles.bold, styles.continue]}>Continue</Text>
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 20,
    marginTop: 15,
    backgroundColor: "#fff",
    borderColor: "white",
    elevation: 4,
    borderWidth: 0,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
  },
  info: {
    fontSize: 15,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "gray",
    marginTop: 20,
  },
  passwordInfo: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "gray",
  },
  inputContainer: {
    marginTop: 10,
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
    color: "#ff6200",
  },
  forgot: {
    fontSize: 25,
  },
  continue: {
    color: "#fff",
    fontSize: 17,
  },
  createNewText: {
    fontSize: 19,
    marginTop: 15,
    color: "#888",
  },
});

export default ResetPassword;
