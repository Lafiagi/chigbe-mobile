import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import OrangeButton from "../../components/commons/OrangeButton";
import { currencyFormat } from "../../App";
import SubscribeCard from "./SubCard";
import PaymentOptionsCard from "./PaymentOptionsCard";

const PaymentOptions = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.info}>Payment Options</Text>
      </View>
      <PaymentOptionsCard
        price={16}
        title={"FUD"}
        isSelected={selectedPlan === 12}
        onPress={() => setSelectedPlan(12)}
        balance={120}
        currency={"FUD"}
      />
      <PaymentOptionsCard
        price={16}
        title={"USDC"}
        isSelected={selectedPlan === 6}
        onPress={() => setSelectedPlan(6)}
        balance={10}
        currency={"USDC"}
      />
      <PaymentOptionsCard
        price={16}
        title={"Card"}
        isSelected={selectedPlan === 1}
        onPress={() => setSelectedPlan(1)}
      />
      <View style={styles.buttonContainer}>
        <OrangeButton
          title={"Continue"}
          onPress={() => navigation.navigate("PaymentSuccess")}
          rounded
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    width: "90%",
    marginTop: 20,
    marginBottom: 0,
  },
  info: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  benefitsContainer: {
    alignItems: "flex-start",
  },
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
  buttonContainer: {
    width: "90%",
    marginTop: 80,
  },
});

export default PaymentOptions;
