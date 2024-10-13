import React from "react";
import { Image, Dimensions, StyleSheet, View, StatusBar } from "react-native";

const LoginRegisterLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        style={styles.welcome}
        resizeMode="contain"
        source={require("../../assets/images/image1.png")}
      />
      {children}
    </View>
  );
};

export default LoginRegisterLayout;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcome: {
    width: width,
    height: height * 0.368,
  },
});
