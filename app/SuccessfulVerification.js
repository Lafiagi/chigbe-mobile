import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import commonStyles from "../components/commons/styles/generic";
import { Button } from "react-native-paper";

const SuccessfulVerification = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.successIcon}
        resizeMode="contain"
        source={require("../assets/images/success.png")}
      />
      <Text style={[commonStyles.bold, styles.successText]}>Successful!</Text>
      <Text style={styles.info}>
        Account verified and ready to make an impact! reuniting lost items with
        their owners. Together, we can make a difference!!
      </Text>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={[commonStyles.bold, styles.continue]}>Continue</Text>
      </Button>
    </View>
  );
};

export default SuccessfulVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  successIcon: {
    width: 100,
  },
  successText: {
    fontSize: 30,
    marginTop: 20,
  },
  info: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    color: "#888",
  },
  continue: {
    color: "#fff",
    fontSize: 17,
  },
  button: {
    marginTop: 90,
    backgroundColor: "#ff6200",
    borderRadius: 15,
    padding: 5,
    width: "85%",
  },
});
