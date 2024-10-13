import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import commonStyles from "../styles/generic";
import React from "react";
import { Avatar } from "react-native-paper";

const ItemCard = ({ navigator, data }) => {
  const [saved, setSaved] = React.useState(false);

  return (
    <View style={styles.card}>
      <View style={[commonStyles.spacedContainer, styles.placeContainer]}>
        <View style={[commonStyles.flexContainer, styles.location]}>
          <Ionicons
            name="location"
            size={20}
            color={commonStyles.orangeText.color}
          />
          <Text style={styles.place}>{data?.location} </Text>
        </View>
        <Ionicons
          name={`bookmark${saved ? "" : "-outline"}`}
          size={25}
          color={commonStyles.orangeText.color}
          onPress={() => setSaved(!saved)}
        />
      </View>

      {/* Image or Placeholder */}
      {data?.picture ? (
        <Image
          style={styles.itemPic}
          resizeMode="contain"
          source={{ uri: data?.picture }}
        />
      ) : (
        <Avatar.Icon
          size={80}
          icon="camera"
          color="#ff6200"
          style={styles.itemPlaceholder}
        />
      )}

      <View style={[commonStyles.flexContainer, styles.itemNameContainer]}>
        <View>
          <Text style={styles.itemName} numberOfLines={1}>
            {data?.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        mode="contained"
        style={styles.recoverBtn}
        onPress={() => navigator.navigate("Details", { itemId: data?.id })}
        >
        <Text style={styles.recoverBtnTxt}>Recover Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  card: {
    width: width / 2.2,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    elevation: 0.5,
    alignItems: "center",
    marginRight: 10,
  },
  itemPic: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  itemPlaceholder: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",  // light gray background for the icon placeholder
  },
  placeContainer: {
    marginTop: 5,
    width: "85%",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500"
  },
  itemNameContainer: {
    marginBottom: 10,
  },
  recoverBtn: {
    backgroundColor: "#ff6200",
    padding: 5,
    height: 30,
    borderRadius: 15,
    marginBottom: 10,
    width: "80%",
  },
  recoverBtnTxt: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  place: {
    fontSize: 16,
  },
  location: {
    backgroundColor: "#fff",
    padding: 2,
    elevation: 1,
    borderRadius: 10,
    minWidth: "50%",
  },
});
