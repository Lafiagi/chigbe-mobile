import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import OrangeButton from "../../components/commons/OrangeButton";
import { Ionicons } from "@expo/vector-icons";
import OnboardingContext from "../context/OnboardingContext";
import React from "react";

const EditProfileMenuItem = ({ itemName, itemIcon, navigation }) => {
  const { setIsSignedIn } = React.useContext(OnboardingContext);

  return (
    <TouchableOpacity
      style={[commonStyles.spacedContainer, styles.menuItem]}
      onPress={() => {
        itemName.toLowerCase() === "logout"
          ? setIsSignedIn(false)
          : navigation.navigate(itemName);
      }}
    >
      <View style={[commonStyles.spacedContainer]}>
        <Ionicons name={itemIcon} size={20} color={"#666"} />
        <Text style={{ marginLeft: 10 }}>{itemName}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color={"#666"} />
    </TouchableOpacity>
  );
};
const Profile = ({ navigation }) => {
  const menuItems = [
    { name: "Security", icon: "shield-outline" },
    { name: "Subscription", icon: "card-outline" },
    { name: "Customer Support", icon: "chatbubble-outline" },
    { name: "Member ID", icon: "person-circle-outline" },
    { name: "Logout", icon: "log-out-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={commonStyles.spacedContainer}>
        <View>
          <Image
            style={styles.profilePic}
            resizeMode="contain"
            source={require("../../assets/images/profile.png")}
          />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: 100,
            maxWidth: "70%",
            marginBottom: 20,
          }}
        >
          <Text style={[commonStyles.bold, styles.name]}>Keji Olajide</Text>
          <Text style={styles.email}>logoladyng@gmail.com</Text>
          <OrangeButton
            onPress={() => navigation.navigate("EditProfile")}
            title={"Edit Profile"}
          />
        </View>
      </View>

      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => (
          <EditProfileMenuItem
            key={index}
            itemIcon={item.icon}
            itemName={item.name}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => {
          `search-item-${index}`;
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
  },
  email: {
    fontSize: 16,
  },
  list: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
  },
  menuItem: {
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#f4f4f4",
    borderRadius: 5,
  },
});

export default Profile;
