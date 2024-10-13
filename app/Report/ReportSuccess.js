import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import { Button } from "react-native-paper";

const ReportSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.successIcon}
        resizeMode="contain"
        source={require("../../assets/images/success.png")}
      />
      <Text style={[commonStyles.bold, styles.successText]}>
        Report Succesful!
      </Text>
      <Text style={styles.info}>
        The item has been uploaded on our platform successfully{" "}
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Dashboard")}
        style={styles.button}
      >
        <Text style={[commonStyles.bold, styles.continue]}>Continue</Text>
      </Button>
    </View>
  );
};

export default ReportSuccess;

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
