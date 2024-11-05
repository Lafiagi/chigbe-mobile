// components/BulkUpload.js
import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from '../../../request/requests'

const BulkUpload = () => {
  const handleBulkUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
    if (result.type === "success") {
      const formData = new FormData();
      formData.append("file", {
        uri: result.uri,
        name: result.name,
        type: "text/csv",
      });
      await axios.post("/products/upload", formData); // Adjust API endpoint as needed
      Alert.alert("Upload Complete", "Products added successfully.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Bulk Upload Products" onPress={handleBulkUpload} color="#ff4201" />
    </View>
  );
};

export default BulkUpload;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
});
