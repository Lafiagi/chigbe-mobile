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
import SimpleLayout from "../components/layouts/SimpleLayout";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  console.log("Forgot password rendededdd....");
  const handleLogin = () => {
    navigation.navigate("OTP");
  };

  return (
    <SimpleLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <SafeAreaView style={{ marginTop: 100 }}>
          <Text style={[styles.orangeText, styles.forgot]}>
            Forgot Password
          </Text>
          <Text style={styles.info}>
            fill in your email address for a code to be sent to allow you reset
            password
          </Text>
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
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={[commonStyles.bold, styles.continue]}>Continue</Text>
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SimpleLayout>
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
  inputContainer: {
    marginTop: 40,
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
});

export default ForgotPasswordScreen;
