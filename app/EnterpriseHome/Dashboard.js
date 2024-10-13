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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../../request/requests"; // Import axios
import { ViewAll } from "./Components/ViewAll";
import { ItemList } from "./Components/ItemList";

const Dashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [missingItems, setMissingItems] = useState([]);
  const [foundItems, setFounditems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reported missing items
    axios
      .get("/report-missing-item/")
      .then((response) => {
        setMissingItems(response.data.results); // Store the fetched items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching missing items:", error);
        setLoading(false);
      });

    axios
      .get("/report-found-item/")
      .then((response) => {
        setFounditems(response.data.results); // Store the fetched items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching missing items:", error);
        setLoading(false);
      });
  }, []);

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
            Welcome Jamee
          </Text>
          <Text style={styles.info}>Scan, verify, protect.</Text>
        </View>
        <View style={[commonStyles.spacedContainer, styles.searchContainer]}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={commonStyles.searchBar}
            cursorColor={"#ff6200"}
            iconColor="#ff4201"
            inputStyle={{
              minHeight: 0,
            }}
          />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Filter")}
            mode="contained"
            style={[styles.filterBtn, commonStyles.centerFlexContainer]}
          >
            <MaterialCommunityIcons
              name="filter-variant"
              size={20}
              color={"#fff"}
            />
            <Text style={[commonStyles.bold, styles.filterText]}>Filters</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <Surface style={styles.surface}>
            <Text style={[styles.subscribeText, commonStyles.bold]}>
              Subscribe now to access the report feature
            </Text>
            <Button
              style={styles.subscribeBtn}
              mode="elevated"
              onPress={() => navigation.navigate("Susbscribe")}
            >
              <Text style={[commonStyles.orangeText, commonStyles.bold]}>
                Subscribe Now
              </Text>
            </Button>
          </Surface>
        </View>
        <ViewAll
          title={"Top Missing items"}
          onPress={() => navigation.navigate("ItemList")}
        />
        <ItemList
          navigation={navigation}
          data={missingItems}
          loading={loading}
        />
        <ViewAll
          title={"Top Reports"}
          onPress={() => console.log("View all top")}
        />
        <ItemList navigation={navigation} data={foundItems} loading={loading} />
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
  info: { fontSize: 16, color: "#888", marginTop: 5, fontWeight: "500" },
  welcomeText: {
    fontSize: 25,
    color: "#ff4201",
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  surface: {
    padding: 10,
    height: 90,
    width: "100%",
    marginTop: 10,
    backgroundColor: "#ff4201",
    borderRadius: 20,
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
  filterBtn: {
    backgroundColor: "#ff4201",
    padding: 5,
    borderRadius: 20,
    width: "25%",
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
  },
});
