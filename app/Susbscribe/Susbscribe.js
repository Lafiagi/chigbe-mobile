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

const Subscribe = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.info}>
          Please Select A Plan below to enjoy premium services
        </Text>
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefits}>Enhanced Listing Visibility</Text>
          <Text style={styles.benefits}>Priority Customer Support</Text>
          <Text style={styles.benefits}>
            Real-Time Notification and Alerts for potentially Found Items
          </Text>
        </View>
      </View>
      <SubscribeCard
        price={25}
        title={12}
        isSelected={selectedPlan === 12}
        onPress={() => setSelectedPlan(12)}
        discount={"30.56% off"}
      />
      <SubscribeCard
        price={16}
        title={6}
        isSelected={selectedPlan === 6}
        onPress={() => setSelectedPlan(6)}
        discount={"11.11% off"}
      />
      <SubscribeCard
        price={3}
        title={1}
        isSelected={selectedPlan === 1}
        onPress={() => setSelectedPlan(1)}
        discount={"No discount"}
      />

      <View style={styles.buttonContainer}>
        <OrangeButton
          title={"Continue"}
          onPress={() => navigation.navigate("PaymentOptions")}
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
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  info: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
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
  buttonContainer: {
    width: "90%",
    marginTop: 30,
  },
});

export default Subscribe;
