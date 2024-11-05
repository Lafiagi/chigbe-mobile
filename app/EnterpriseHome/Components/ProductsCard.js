import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../../../components/commons/styles/generic";
import { Divider, IconButton } from "react-native-paper";
import React from "react";
import { getFontSize } from "../../../utils/utils";
import moment from "moment";

const ProductsCard = ({ expiryDate, name, code, id, navigation }) => {
  // Calculate days until expiry
  const daysUntilExpiry = moment(expiryDate).diff(moment(), "days");

  // Determine the style for the expiry status container
  const expiryStatusStyle = () => {
    if (daysUntilExpiry <= 0) {
      return styles.expired; // Already expired
    } else if (daysUntilExpiry <= 30) {
      return styles.nearExpiry; // Close to expiry
    }
    return styles.fresh; // Safe expiry period
  };

  return (
    <React.Fragment>
      <View style={[commonStyles.spacedContainer, { marginTop: 10 }]}>
        <View>
          <Text>Mfg. Date</Text>
          <Text style={styles.date}>
            {moment(expiryDate).format("DD MMM YYYY")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            navigation.navigate("Details", {
              code: id,
            })
          }
        >
          <Text style={styles.uniqueCode}>{code}</Text>
          <Text style={styles.medicineName}>{name}</Text>
          <View style={[styles.statusContainer, expiryStatusStyle()]}>
            <Text style={styles.statusText}>
              {daysUntilExpiry > 0
                ? `Expires in ${daysUntilExpiry} days`
                : "Expired"}
            </Text>
          </View>
        </TouchableOpacity>
        <IconButton icon="chevron-right" size={22} />
      </View>
      <Divider style={{ marginTop: 5, height: 1, backgroundColor: "#aaa" }} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: { width: "50%" },
  date: { fontSize: getFontSize(15), fontWeight: "bold" },
  medicineName: { fontSize: getFontSize(14), fontWeight: "bold" },
  uniqueCode: { fontSize: getFontSize(14) },
  statusText: {
    fontSize: getFontSize(14),
    textTransform: "capitalize",
    color: "#fff",
  },

  statusContainer: {
    fontSize: getFontSize(20),
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 20,
    minWidth: 120,
    fontWeight: "500",
  },
  fresh: {
    backgroundColor: "#50C878", // Green for safe expiry period
  },
  nearExpiry: {
    backgroundColor: "orange", // Orange for close to expiry
  },
  expired: {
    backgroundColor: "red", // Red for expired
  },
});

export default ProductsCard;
