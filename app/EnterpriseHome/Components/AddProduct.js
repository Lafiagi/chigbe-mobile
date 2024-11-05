import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import * as DocumentPicker from "expo-document-picker";
import authenticatedReq from "../../../request/requests";
import OnboardingContext from "../../context/OnboardingContext";
import Toast from "react-native-simple-toast";

const AddProduct = () => {
  const navigation = useNavigation();
  const [productDetails, setProductDetails] = useState({
    name: "",
    dosage: "",
    batch_number: "",
    manufacture_date: "",
    expiry_date: "",
    manufacturer: "",
  });
  const [uniqueCode, setUniqueCode] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const { user, setIsSignedIn } = React.useContext(OnboardingContext);
  const handleAddProduct = async () => {
    try {
      const response = await authenticatedReq.post(
        "/upload/single/",
        productDetails,
        {
          headers: { Authorization: `Bearer ${user?.token?.access}` },
        }
      );
      if (response.status === 201) {
        setUniqueCode(response?.data?.unique_code);
        Toast.show("Product added successfully!");
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.error(
        `Failed to add product: ${JSON.stringify(error?.response?.status)}`
      );
      if (error?.response?.status === 401) {
        Alert.alert("Error", `${error.response.data.detail}`);
        setIsSignedIn(false);
      }
      console.error(
        `Failed to add product: ${JSON.stringify(error?.response?.data)}`
      );
    }
  };

  const handleChange = (field, value) => {
    setProductDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleBulkUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      // type: "text/csv",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const formData = new FormData();
      formData.append("file", {
        uri: result.uri,
        type: "text/csv",
        name: "bulk_upload.csv",
      });

      setUploadMessage("Uploading items... Please wait.");

      try {
        const response = await authenticatedReq.post(
          "/upload/bulk/",
          formData,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user?.token?.access}`,
            },
          }
        );
        if (response.status === 201) {
          setUploadMessage("Bulk upload successful!");
          navigation.navigate("Dashboard");
        }
        if (response.status === 401) {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Failed to upload CSV:", JSON.stringify(error));
        setUploadMessage("Failed to upload CSV. Please try again.");
      }
    } else {
      console.log("Cancelled or failed to pick a file", result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Add New Product</Text>
        {uniqueCode && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>Unique QR Code</Text>
            <QRCode value={uniqueCode} size={150} />
          </View>
        )}
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(value) => handleChange("name", value)}
        />
        <TextInput
          placeholder="Dosage"
          style={styles.input}
          onChangeText={(value) => handleChange("dosage", value)}
        />
        <TextInput
          placeholder="Batch Number"
          style={styles.input}
          onChangeText={(value) => handleChange("batch_number", value)}
        />
        <TextInput
          placeholder="Manufacture Date (YYYY-MM-DD)"
          style={styles.input}
          onChangeText={(value) => handleChange("manufacture_date", value)}
        />
        <TextInput
          placeholder="Expiry Date (YYYY-MM-DD)"
          style={styles.input}
          onChangeText={(value) => handleChange("expiry_date", value)}
        />
        <TextInput
          placeholder="Manufacturer"
          style={styles.input}
          onChangeText={(value) => handleChange("manufacturer", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledButton} onPress={handleBulkUpload} disabled>
          <Text style={styles.buttonText}>Bulk Upload CSV(coming soon)</Text>
        </TouchableOpacity>

        {uploadMessage ? (
          <View style={styles.uploadMessageContainer}>
            <Text style={styles.uploadMessage}>{uploadMessage}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
    justifyContent: "center",
  },
  scrollView: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff4201",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#ffffff",
    elevation: 1,
  },
  button: {
    backgroundColor: "#ff4201",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#888888",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  qrText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  uploadMessageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 1,
  },
  uploadMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
