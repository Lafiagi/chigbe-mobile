import { StyleSheet, Text } from "react-native";
import { Surface } from "react-native-paper";

const AnalyticsCard = ({ title, amount }) => {
  return (
    <Surface style={styles.surface}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    minHeight: 40,
    width: "48%",
    marginTop: 10,
    backgroundColor: "#ff4201",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign:"center"
  },

  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign:"center"
  },
});
export default AnalyticsCard;
