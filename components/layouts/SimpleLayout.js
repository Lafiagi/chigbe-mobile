import React from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";

const SimpleLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

export default SimpleLayout;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  welcome: {
    width: width,
    height: height * 0.368,
  },
});
