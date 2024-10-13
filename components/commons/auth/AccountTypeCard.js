import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";

const AccountTypeCard = ({
  title,
  icon,
  body,
  selectedType,
  setSelectedType,
}) => {
  return (
    <TouchableOpacity
      style={
        selectedType === title
          ? [styles.card, { backgroundColor: "#00afee" }]
          : styles.card
      }
      onPress={() => setSelectedType(title)}
    >
      <View style={styles.iconLayout}>
        <Image style={[styles.icon1, styles.iconLayout]} source={icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    height: 100,
    marginTop: 5,
    alignItems: "center",
    elevation: 5,
  },
  iconLayout: {
    height: 34,
    width: 34,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 17,
    textTransform: 'uppercase'
  },
  textContainer: {
    width: "80%",
  },
});

export default AccountTypeCard;
