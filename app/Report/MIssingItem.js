import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import commonStyles from "../../components/commons/styles/generic";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import SearchModal from "../../components/commons/SearchModal";
import * as DocumentPicker from "expo-document-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "../../utils/utils";
import OrangeButton from "../../components/commons/OrangeButton";
import axios from "../../request/requests"; // Assuming axios is configured here

const MissingItem = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemLossDate, setItemLossDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [file, setFile] = useState(null); // State for file

  const [categories, setCategories] = useState([]); // State for categories
  const [locations, setLocations] = useState([]); // State for locations
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected location
  const [modalPurpose, setModalPurpose] = useState(""); // To determine if the modal is for category or location

  // Fetch categories from /categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response?.data?.results);
      console.log(`Categories returned is ${JSON.stringify(response?.data?.results)}`)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch locations from /locations
  const fetchLocations = async () => {
    try {
      const response = await axios.get("/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setItemLossDate(date);
    hideDatePicker();
  };

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type !== "cancel") {
        setFile(result); // Set the selected file
      }
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  const handleReport = async () => {
    if (!itemLossDate || !itemColor || !description || !file || !selectedCategory || !selectedLocation) {
      Alert.alert("Missing Information", "Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", "Lost Item"); // Example name, could be collected from user
    formData.append("picture", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream", // File type
    });
    formData.append("description", description);
    formData.append("location", selectedLocation.name); // Replace with actual location name
    formData.append("incident_date", itemLossDate.toISOString());
    formData.append("category", selectedCategory.id); // Replace with actual category ID

    try {
      const response = await axios.post("/report-missing-item/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigation.navigate("ReportSuccess"); // Navigate to success page
      } else {
        Alert.alert("Error", "Failed to report missing item. Please try again.");
      }
    } catch (error) {
      console.error("Error reporting item:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Open the modal and set the purpose
  const openModal = (purpose) => {
    setModalPurpose(purpose);
    setVisible(true);
  };

  const handleItemSelect = (item) => {
    if (modalPurpose === "category") {
      setSelectedCategory(item);
    } else if (modalPurpose === "location") {
      setSelectedLocation(item);
    }
    setVisible(false);
  };
console.log(`Selected location ${selectedCategory}`)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "#fbfbfb", flex: 1, justifyContent: "center" }}
    >
      <Text style={[commonStyles.bold, styles.upload]}>
        Upload a photo of the lost item
      </Text>
      <TouchableOpacity style={styles.uploadPicBtn} onPress={handleSelectFile}>
        <Ionicons name="image" size={20} color={"#888"} />
        <Text>{file ? file.name : "Select File"}</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 40 }}>
        {/* Category Selection */}
        <TouchableOpacity
          style={[commonStyles.spacedContainer, styles.category]}
          onPress={() => openModal("category")}
        >
          <Text style={commonStyles.bold}>
            {selectedCategory ? selectedCategory.name : "Select Category"}
          </Text>
          <Ionicons name="chevron-down-outline" size={20} color={"#111"} />
        </TouchableOpacity>

        {/* Location Selection */}
        <TouchableOpacity
          style={[commonStyles.spacedContainer, styles.category]}
          onPress={() => openModal("location")}
        >
          <Text style={commonStyles.bold}>
            {selectedLocation ? selectedLocation.name : "Select Location"}
          </Text>
          <Ionicons name="chevron-down-outline" size={20} color={"#111"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.spacedContainer, styles.category]}
          onPress={showDatePicker}
        >
          <Text style={commonStyles.bold}>
            {itemLossDate
              ? `${formatDate(itemLossDate)}`
              : "Select a Date and Time"}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={"#111"} />
        </TouchableOpacity>

        <TextInput
          label={<Text style={styles.label}>What color is this item?</Text>}
          value={itemColor}
          onChangeText={setItemColor}
          autoCapitalize="none"
          style={[styles.input, { height: 40 }]}
          mode="outlined"
          outlineStyle={styles.outlineStyle}
          cursorColor="#ff6200"
          textColor="#111"
        />
        <TextInput
          label={<Text style={styles.label}>Description</Text>}
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.outlineStyle}
          cursorColor="#ff6200"
          textColor="#111"
          multiline
          numberOfLines={3}
        />

        <View style={styles.submitBtnContainer}>
          <OrangeButton title={"Report Item"} onPress={handleReport} />
        </View>
      </View>

      {/* Search Modal for Category/Location */}
      <SearchModal
        data={modalPurpose === "category" ? categories : locations} // Dynamically pass category or location data
        setVisible={setVisible}
        visible={visible}
        setSearchQuery={handleItemSelect}
        searchQuery={searchQuery}
        navigation={navigation}
        onItemSelect={handleItemSelect} // Callback to handle item selection
      />

      {/* Date Time Picker */}
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="spinner" // or "default"
        maximumDate={new Date()} // Ensure only past dates can be selected
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  upload: { fontSize: 20, textAlign: "center", marginTop: 10 },
  uploadPicBtn: {
    borderRadius: 10,
    borderWidth: 2,
    width: "75%",
    alignSelf: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 30,
    borderStyle: "dashed",
    borderColor: "#888",
  },
  category: {
    padding: 12,
    elevation: 2,
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  submitBtnContainer: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#fbfbfb",
    alignSelf: "center",
    width: "80%",
    marginVertical: 10,
    textAlignVertical: "top",
  },
  outlineStyle: { borderRadius: 10, borderColor: "#ff6200", borderWidth: 1 },
  label: { fontSize: 16, color: "#111" },
});

export default MissingItem;
