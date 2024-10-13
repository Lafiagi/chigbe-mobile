import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import OrangeButton from "../../components/commons/OrangeButton";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, TextInput, Button } from "react-native-paper";
import React from "react";

const EditProfile = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = () => {
    navigation.navigate("OTP");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.profilePic}
          resizeMode="contain"
          source={require("../../assets/images/profile.png")}
        />
      </View>

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
          disabled
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
          disabled
        />

        <TextInput
          label={<Text style={styles.label}>Residential Address</Text>}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.outlineStyle}
          cursorColor="#ff6200"
          textColor="#111"
          multiline
          numberOfLines={3}
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

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          <Text style={[commonStyles.bold, styles.login]}>Create</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 15,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  input: {
    marginBottom: 10,
    marginTop: 8,
    backgroundColor: "#fff",
    borderColor: "white",
    elevation: 2,
    borderWidth: 0,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
  },
  label: {
    color: "#555",
    fontWeight: "500",
  },
  outlineStyle: {
    borderColor: "#fff",
  },
  inputContainer: {
    marginTop: 50,
  },
});

export default EditProfile;
