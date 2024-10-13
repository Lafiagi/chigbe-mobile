import { StyleSheet, Text } from "react-native";
import { Surface } from "react-native-paper";

const BalanceCard = ({ object }) => {
  return (
    <Surface style={styles.balanceCard}>
      <Text style={styles.balanceNameText}>{object?.name} Balance</Text>
      <Text style={styles.balanceText}>
        {object?.balance}
        {object?.name}
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    padding: 20,
    marginRight: 5,
    backgroundColor: "#ff6200"
  },
  balanceNameText:{
    color: "#fff",
    fontWeight: "600",
  },
  balanceText:{
    color: "#fff",
    marginTop: 10
  }
});
export default BalanceCard;
