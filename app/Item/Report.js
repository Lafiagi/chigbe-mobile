import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Button, RadioButton, Surface } from "react-native-paper";

const ReportIssue = ({ route, navigation }) => {
  const scanData = { code: "XXLOPEO2029303", name: "Ibuprofen 20mg" };
  const [selectedIssue, setSelectedIssue] = useState("expired"); // Default to 'expired'
  const [country, setCountry] = useState(""); // State for selected country
  const [description, setDescription] = useState("");

  // Sample countries dropdown list (can be replaced with a more comprehensive list)
  const countries = [
    { key: "1", value: "Nigeria" },
    { key: "2", value: "Ghana" },
    { key: "3", value: "South Africa" },
    { key: "4", value: "Kenya" },
    { key: "5", value: "United States" },
    // Add more countries as needed
  ];

  const submitReport = async () => {
    try {
      // Call backend API to submit the report
      const response = await axios.post("/report-issue", {
        code: scanData.code,
        issueType: selectedIssue,
        country: country,
        description: description,
      });

      if (response.status === 200) {
        alert("Report submitted successfully!");
        navigation.goBack(); // Navigate back to previous screen
      }
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Report an Issue</Text>
          <Text style={styles.subTitle}>{scanData.name}</Text>
          <Text style={styles.code}>Code: {scanData.code}</Text>
        </View>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Select Issue Type:</Text>

          <RadioButton.Group
            onValueChange={(value) => setSelectedIssue(value)}
            value={selectedIssue}
          >
            <View style={styles.radioOption}>
              <RadioButton value="expired" color="#ff4201" />
              <Text style={styles.optionText}>Expired</Text>
            </View>

            <View style={styles.radioOption}>
              <RadioButton value="counterfeit" color="#ff4201" />
              <Text style={styles.optionText}>Counterfeit</Text>
            </View>

            <View style={styles.radioOption}>
              <RadioButton value="other" color="#ff4201" />
              <Text style={styles.optionText}>Other Issue</Text>
            </View>
          </RadioButton.Group>
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Select Country:</Text>
          <SelectList
            setSelected={(value) => setCountry(value)}
            data={countries}
            placeholder="Select your country"
            boxStyles={styles.dropdown} // Apply styles to the dropdown
          />
        </Surface>

        <Surface style={styles.surface}>
          <Text style={styles.label}>Additional Description (Optional):</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Describe the issue in detail..."
            value={description}
            onChangeText={setDescription}
          />
        </Surface>

        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={submitReport}
        >
          Submit Report
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportIssue;

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
  subTitle: {
    fontSize: 18,
    marginTop: 5,
  },
  code: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
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
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#ff4201",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
});
