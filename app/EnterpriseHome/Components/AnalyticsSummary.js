// components/AnalyticsSummary.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnalyticsCard from "../../../components/commons/Dashboard/AnalyticsCard";

const AnalyticsSummary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Summary</Text>
      <View style={styles.cardsContainer}>
        <AnalyticsCard title={"Total Scanned"} amount={134} />
        <AnalyticsCard title={"Total Original"} amount={100} />
        <AnalyticsCard title={"Flagged Fakes"} amount={34} />
      </View>
    </View>
  );
};

export default AnalyticsSummary;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
