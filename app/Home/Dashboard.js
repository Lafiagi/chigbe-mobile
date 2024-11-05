import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import { IconButton, Searchbar, Button, Surface } from "react-native-paper";
import axios from "../../request/requests"; // Import axios
import AnalyticsCard from "../../components/commons/Dashboard/AnalyticsCard";
import ScanHistoryCard from "../../components/commons/Dashboard/ScanHistoryCard";
import { getFontSize } from "../../utils/utils";
import OnboardingContext from "../context/OnboardingContext";

const Dashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [missingItems, setMissingItems] = useState([]);
  const [foundItems, setFounditems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = React.useContext(OnboardingContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[commonStyles.spacedContainer, styles.profilePicContainer]}
        >
          <IconButton
            icon={"bell-outline"}
            iconColor={"#ff4201"}
            containerColor="#eee"
            size={30}
            onPress={() => navigation.navigate("Notifications")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              style={styles.profilePic}
              resizeMode="contain"
              source={require("../../assets/images/profile.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[commonStyles.boldOrangeText, styles.welcomeText]}>
            Welcome {user?.full_name.split(" ")[0]}
          </Text>
          <Text style={styles.motto}>Stop counterfeits, save lives.</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.info}>You've scanned 10 products in total.</Text>
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("ScanPage")}
          style={styles.scanButton}
        >
          Verify a Drug
        </Button>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.info}>Recent Scans</Text>
          <View>
            <ScanHistoryCard
              date={"12 mar 24"}
              name={"Ezamor Paracetamol, 50 mg"}
              code={"XX2CEXXWQAPL09"}
              status={"valid"}
              navigation={navigation}
            />
            <ScanHistoryCard
              date={"20 Oct 24"}
              name={"Ibuprofen, 200 mg"}
              code={"XX2CEXXWQAPL09"}
              status={"valid"}
              navigation={navigation}
            />
            <ScanHistoryCard
              date={"31 Jun 24"}
              name={"Ciprofloxacin, 200 mg"}
              code={"LLXX09PWRET"}
              status={"valid"}
              navigation={navigation}
            />
            <ScanHistoryCard
              date={"12 mar 24"}
              name={"Ezamor Paracetamol, 50 mg"}
              code={"XX2CEXXWQAPL09"}
              status={"fake"}
              navigation={navigation}
            />
            <ScanHistoryCard
              date={"20 Oct 24"}
              name={"Ibuprofen, 200 mg"}
              code={"XX2CEXXWQAPL09"}
              status={"Expired"}
              navigation={navigation}
            />
            <ScanHistoryCard
              date={"31 Jun 24"}
              name={"Ciprofloxacin, 200 mg"}
              code={"LLXX09PWRET"}
              status={"Valid"}
              navigation={navigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  info: { fontSize: 17, color: "#666", marginTop: 5, fontWeight: "500" },
  motto: {
    fontSize: getFontSize(19),
    color: "#222",
    marginTop: 5,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  totalScans: {
    fontSize: 17,
    color: "#666",
    marginTop: 5,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 25,
    color: "#ff4201",
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  subscribeBtn: {
    width: "50%",
    marginTop: 8,
    padding: 0,
    borderRadius: 40,
  },
  title: {
    fontSize: 19,
  },
  topMissingItems: {
    marginTop: 10,
  },
  viewAll: {
    fontSize: 17,
  },
  viewAllContainer: {
    marginTop: 5,
  },
  scanButton: {
    marginTop: 20,
    backgroundColor: "#ff4201",
    paddingVertical: 0,
    // borderRadius: 10,
  },
  summary: {
    marginTop: 10,
    fontSize: 30,
    // textAlign: "center",
  },
  date: {
    fontWeight: "bold",
  },
});
