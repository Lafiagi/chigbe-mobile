import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import { currencyFormat } from "../../utils/utils";

const SubscribeCard = ({ title, price, discount, isSelected, onPress }) => {
  const SUI_PRICE = 0.063608;
  return (
    <TouchableOpacity
      style={[
        styles.subCard,
        commonStyles.spacedContainer,
        isSelected && styles.selectedCard,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.cardTitle}>
          {title} {title > 1 ? "Months" : "Month"}
        </Text>
        <Text
          style={[styles.cardDiscount, isSelected && styles.selectedDiscount]}
        >
          {discount}
        </Text>
      </View>
      <View style={{ maxWidth: "80%" }}>
        <Text style={styles.cardPrice}>${price}</Text>
        <Text style={styles.cardPrice}>
          {currencyFormat(price / SUI_PRICE)} FUD
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  benefits: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  subCard: {
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#ccc",
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: "#ff6200",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cardDiscount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginTop: 5,
  },
  selectedDiscount: {
    color: "#ff6200",
    fontWeight: "700",
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff6200",
    textAlign: "right",
  },
});
export default SubscribeCard;
