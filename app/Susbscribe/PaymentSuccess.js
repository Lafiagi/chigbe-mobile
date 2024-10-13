import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import { Button } from "react-native-paper";

const PaymentSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.successIcon}
        resizeMode="contain"
        source={require("../../assets/images/success.png")}
      />
      <Text style={[commonStyles.bold, styles.successText]}>
        Payment Succesful!
      </Text>
      <Text style={styles.info}>
        Your subscription payment has been successfully received. We wish you
        great success as you{" "}
        <Text style={commonStyles.boldOrangeText}>chigbe</Text> your missing
        items.
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Dashboard")}
        style={styles.button}
      >
        <Text style={[commonStyles.bold, styles.continue]}>Home</Text>
      </Button>
    </View>
  );
};

export default PaymentSuccess;

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
    padding: 15,
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
