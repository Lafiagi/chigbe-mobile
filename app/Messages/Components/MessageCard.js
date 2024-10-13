import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-paper";
import commonStyles from "../../../components/commons/styles/generic";

const MessageCard = ({ id, navigation }) => {
  return (
    <TouchableOpacity
      style={[commonStyles.spacedContainer, styles.container]}
      key={id}
      onPress={() => navigation.navigate("Chat")}
    >
      <Image
        style={styles.profilePic}
        resizeMode="contain"
        source={require("../../../assets/images/profile.png")}
      />
      <Text style={styles.message}>
        Tayo Yemen Hello there, i will like to recover my item,i saw that you
        uploaded it. Thank you very much
      </Text>
      <View>
        <Text style={styles.time}>2 hrs </Text>
        <Badge size={35} style={styles.bagde}>
          99+
        </Badge>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
    marginBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  message: {
    width: "60%",
  },
  bagde: {
    alignSelf: "flex-start",
    marginTop: 5,
    fontWeight: "500",
    elevation: 4,
    fontSize: 14,
    backgroundColor: "#ff4201",
  },
  time: {
    fontWeight: "600",
    color: "#666",
  },
});

export default MessageCard;
