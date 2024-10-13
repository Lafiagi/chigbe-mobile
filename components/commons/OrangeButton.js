import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import commonStyles from "./styles/generic";

const OrangeButton = ({ title, onPress, rounded = false }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={rounded ? styles.roundedButton : styles.button}
    >
      <Text style={[commonStyles.bold, styles.login]}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff6200",
    borderRadius: 10,
    padding: 0,
  },
  roundedButton: {
    backgroundColor: "#ff6200",
    borderRadius: 100,
    padding: 0,
  },

  login: {
    fontSize: 17,
    color: "#fff",
  },
});

export default OrangeButton;
