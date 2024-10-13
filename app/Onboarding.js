import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Button, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import from React Navigation
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const slides = [
  {
    key: 1,
    text: "Welcome to chigbe!",
    image: require("../assets/images/welcome.png"),
    backgroundColor: "#59b2ab",
    textComp: (
      <Text>
        Your one-stop platform to recover lost items and help others do the
        same.
      </Text>
    ),
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },
  {
    key: 2,
    text: "QR Code Tracking",
    image: require("../assets/images/qrscan.png"),
    backgroundColor: "#febe29",
    textComp: <Text>Attach QR tags to track your belongings.</Text>,
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },
  {
    key: 3,
    text: "Secure chat & Reward System.",
    image: require("../assets/images/chat.png"),
    backgroundColor: "#22bcb5",
    textComp: (
      <Text>
        Communicate safely with finders or owners and Earn tokens ($RFND) for
        helping others find their items.
      </Text>
    ),
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },

  {
    key: 5,
    text: "How It Works",
    image: require("../assets/images/welcome.png"),
    backgroundColor: "#22bcb5",
    textComp: (
      <>
        <Text>
          Lost Something? Report it in seconds. Let chigbe and our partners
          help.
        </Text>
        <Text>
          Found Something? Report and earn a reward by helping return lost
          items.
        </Text>
        <Text>Track with QR Codes: Add QR tags for easy recovery.</Text>
      </>
    ),
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },

  {
    key: 6,
    text: "Collaborations.",
    image: require("../assets/images/colab.png"),
    backgroundColor: "#22bcb5",
    textComp: (
      <Text>
        Streamlined Recovery Working with organisations such as hotels, banks,
        and transport companies etc to recover items faster.
      </Text>
    ),
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },

  {
    key: 7,
    text: "Get Started.",
    image: require("../assets/images/getstarted.png"),
    backgroundColor: "#22bcb5",
    textComp: <Text>Sign up and protect your belongings today!</Text>,
    iconName: "camera",
    iconText: "Escrow Payments",
    iconName2: "phone",
    iconText2: "Certified artisans",
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  // const navigation = useNavigation();
  useEffect(() => {
    const checkIsRegistered = async () => {
      const is_registered = await AsyncStorage.getItem("is_registered");
      if (is_registered) {
        navigation.navigate("ThankYou"); // Replace router.replace with navigation.replace
      }
    };

    checkIsRegistered();
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={require("../assets/images/gradientbg.png")}
          style={{ height: height * 0.15, marginTop: 50 }}
          resizeMode="contain"
        />
        <Image
          source={item.image}
          style={{ width: width, height: height * 0.25 }}
          resizeMode="contain"
        />
        <View
          style={{
            height: height * 0.5,
            backgroundColor: "#1e81ce",
            width: width,
            padding: 30,
          }}
        >
          <Text style={styles.text}>{item.textComp}</Text>
          <Text
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: 17,
              marginTop: 10,
            }}
          >
            {item?.text}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 60,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source={item?.iconName} size={20} />
              <Text style={{ color: "#fff", marginLeft: 5 }}>
                {item?.iconText}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source={item?.iconName2} size={20} />
              <Text style={{ color: "#fff", marginLeft: 5 }}>
                {item?.iconText2}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={_onDone}
            style={{ marginTop: 10, borderColor: "#fff" }}
            labelStyle={{ color: "#fff" }}
          >
            Skip to Registration
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.push("Login")} // Replace router.push with navigation.push
            style={{ marginTop: 10, borderColor: "#fff" }}
            labelStyle={{ color: "#fff" }}
          >
            Proceed to Login
          </Button>
        </View>
      </View>
    );
  };

  const _onDone = () => {
    navigation.navigate("OnboardingRegistration"); // Replace router.replace with navigation.replace
  };

  return (
    <>
      {showRealApp ? (
        <View>
          {/* Replace this with your real app component */}
          <Text>Show Real App Here</Text>
        </View>
      ) : (
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
          dotStyle={{ width: 20, height: 15, backgroundColor: "skyblue" }}
          activeDotStyle={{ width: 40, height: 15, backgroundColor: "#fff" }}
          showNextButton={false}
        />
      )}
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "#fff",
  },
});
