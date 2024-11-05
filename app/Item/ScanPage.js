import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Scan successful!", `Scanned code: ${data}`);
    navigation.navigate("ReportIssue", { scanData: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Square Focus Area */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleContainer}>
          <View style={styles.sideOverlay} />
          <View style={styles.focused} />
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} />
      </View>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default ScanScreen;

const overlayColor = "rgba(0, 0, 0, 0.6)"; // Dark background color with transparency
const squareSize = 250; // Size of the focus area square

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  topOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
    width: "100%",
  },
  middleContainer: {
    flexDirection: "row",
  },
  sideOverlay: {
    backgroundColor: overlayColor,
    height: squareSize,
    flex: 1,
  },
  focused: {
    height: squareSize,
    width: squareSize,
    borderWidth: 2,
    borderColor: "#fff",
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
    width: "100%",
  },
});
