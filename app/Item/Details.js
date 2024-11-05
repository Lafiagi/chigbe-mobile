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
import { Surface, Button } from "react-native-paper";
import axios from "../../request/requests";
import OnboardingContext from "../context/OnboardingContext"; // Access user token
import authenticatedReq from "../../request/requests";

const ScanDetails = ({ route, navigation }) => {
  const { code } = route.params; // Get unique id from route parameters
  const { user, setIsSignedIn } = React.useContext(OnboardingContext); // Get user for token access
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await authenticatedReq.get(`/upload/single/${code}`, {
          headers: {
            Authorization: `Bearer ${user.token.access}`,
          },
        });
        setDetails(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          setIsSignedIn(false);
        }
        console.log("Error", "Failed to load drug details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [code, user.token.access]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ff4201" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{details.name}</Text>
          <Text style={styles.code}>Code: {details.unique_code}</Text>
        </View>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.statusText}>
            {new Date(details.manufacture_date) < new Date(details.expiry_date)
              ? "Valid"
              : "Expired"}
          </Text>
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Manufacturer:</Text>
          <Text style={styles.value}>{details.manufacturer}</Text>
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Batch Number:</Text>
          <Text style={styles.value}>{details.batch_number}</Text>
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Manufactur Date:</Text>
          <Text style={styles.value}>{details.manufacture_date}</Text>
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{details.expiry_date}</Text>
        </Surface>

        <Button
          mode="contained"
          style={styles.reportButton}
          onPress={() => navigation.navigate("Report", { code })}
        >
          Report an Issue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4201",
  },
  code: {
    fontSize: 16,
    color: "#666",
  },
  surface: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    textTransform: "capitalize",
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  valid: {
    color: "#50C878", // Green for valid
  },
  fake: {
    color: "#ff4201", // Orange for fake
  },
  expired: {
    color: "red", // Red for expired
  },
  reportButton: {
    marginTop: 30,
    backgroundColor: "#ff4201",
  },
});
