import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../../../components/commons/styles/generic";

const NotificationCard = ({ id }) => {
  return (
    <TouchableOpacity
      style={[commonStyles.spacedContainer, styles.container]}
      key={id}
    >
      <Image
        style={styles.profilePic}
        resizeMode="contain"
        source={require("../../../assets/images/profile.png")}
      />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Tayo Yemen Hello there, i will like to recover my item,i saw that you
          uploaded it. Thank you very much
        </Text>
        <Text style={styles.time}>2 hours ago</Text>
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
  message: {},
  messageContainer: { width: "79%" },
  time: {
    color: "#bbb",
    fontWeight: "500",
    marginTop: 2
  },
});

export default NotificationCard;
