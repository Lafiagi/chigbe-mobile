import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../styles/generic";
import { Divider, IconButton } from "react-native-paper";
import { getFontSize } from "../../../utils/utils";
import React from "react";

const ScanHistoryCard = ({
  scanData,
  date,
  name,
  code,
  status,
  navigation,
}) => {
  // Determine the status style dynamically
  const statusStyle = () => {
    if (status.toLowerCase() === "expired") {
      return styles.expired;
    } else if (status.toLowerCase() === "fake") {
      return styles.fake;
    }
    return styles.status;
  };

  return (
    <React.Fragment>
      <View style={[commonStyles.spacedContainer, { marginTop: 10 }]}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("Details")}
        >
          <Text style={styles.uniqueCode}>{code}</Text>
          <Text style={styles.medicineName}>{name}</Text>
          <View style={[styles.statusContainer, statusStyle()]}>
            <Text style={styles.status}>{status}</Text>
          </View>
        </TouchableOpacity>
        <IconButton icon="chevron-right" size={22} />
      </View>
      <Divider style={{ marginTop: 5, height: 1, backgroundColor: "#aaa" }} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: { width: "57%" },
  date: { fontSize: getFontSize(15), fontWeight: "bold" },
  medicineName: { fontSize: getFontSize(14), fontWeight: "bold" },
  uniqueCode: { fontSize: getFontSize(14) },
  status: {
    fontSize: getFontSize(14),
    textTransform: "capitalize",
    color: "#fff",
  },

  statusContainer: {
    fontSize: getFontSize(20),
    backgroundColor: "#50C878", // Default background color
    textTransform: "capitalize",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 20,
    width: 120,
    color: "#fff",
    fontWeight: "500",
  },
  expired: {
    backgroundColor: "red",
    color: "#fff",
  },
  fake: {
    backgroundColor: "orange",
    color: "#fff",
  },
});

export default ScanHistoryCard;
