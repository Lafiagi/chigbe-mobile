// components/QrCodeGenerator.js
import React, { useState } from "react";
import { View, Button, StyleSheet, Image, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from '../../../request/requests'

const QrCodeGenerator = () => {
  const [qrValue, setQrValue] = useState(null);

  const generateQrCode = async (productCode) => {
    try {
      const response = await axios.post("/products/qrcode", { productCode });
      setQrValue(response.data.qrCodeValue); // Adjust response structure as needed
    } catch (error) {
      Alert.alert("Error", "Failed to generate QR code.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generate QR Code" onPress={() => generateQrCode("ProductCode123")} />
      {qrValue && <QRCode value={qrValue} size={150} />}
    </View>
  );
};

export default QrCodeGenerator;

const styles = StyleSheet.create({
  container: { marginVertical: 20, alignItems: "center" },
});
