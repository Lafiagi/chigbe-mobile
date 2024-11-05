import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import commonStyles from "../../components/commons/styles/generic";

import AnalyticsCard from "../../components/commons/Dashboard/AnalyticsCard";
import ProductsCard from "./Components/ProductsCard";
import OnboardingContext from "../context/OnboardingContext";
import authenticatedReq from "../../request/requests";
import { useFocusEffect } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setIsSignedIn } = React.useContext(OnboardingContext);

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const response = await authenticatedReq.get("/upload/single", {
        headers: { Authorization: `Bearer ${user?.token?.access}` },
      });
      setFoundItems(response.data); // Assuming response contains a `drugs` array
      setLoading(false);
      console.log(`Added the data ${JSON.stringify(response?.data)}`);
    } catch (error) {
      if (error?.response.status === 401) {
        setIsSignedIn(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, [user?.token?.access]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDrugs();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notifications and Profile */}
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
          <IconButton
            icon={"plus"}
            iconColor={"#ff4201"}
            containerColor="#eee"
            size={30}
            onPress={() => navigation.navigate("Add Product")}
          />
        </View>

        {/* Welcome and Summary */}
        <View>
          <Text style={[commonStyles.boldOrangeText, styles.welcomeText]}>
            Welcome {user?.full_name.split(" ")[0]}
          </Text>
          <Text style={styles.info}>Stop counterfeits, save lives.</Text>
        </View>
        <Text style={styles.summary}>Analytics</Text>
        <View
          style={[
            commonStyles.spacedContainer,
            commonStyles.wrapped,
            { marginTop: 10 },
          ]}
        >
          <AnalyticsCard title={"Total Scanned"} amount={134} />
          <AnalyticsCard title={"Total Authentic"} amount={100} />
          <AnalyticsCard title={"Total Fakes"} amount={34} />
          <AnalyticsCard title={"Total Expired"} amount={34} />
        </View>

        {/* Recent Drugs List */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.info}>Recent Drugs</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#ff4201" />
          ) : (
            foundItems?.map((drug, index) => (
              <ProductsCard
                key={index}
                expiryDate={drug.expiry_date}
                name={`${drug.name}, ${drug.dosage}`}
                code={drug.unique_code}
                id={drug?.id}
                navigation={navigation}
              />
            ))
          )}
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
  welcomeText: {
    fontSize: 25,
    color: "#ff4201",
  },
  summary: {
    marginTop: 10,
    fontSize: 30,
  },
});
