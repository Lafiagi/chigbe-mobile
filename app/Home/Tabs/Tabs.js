import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, Dimensions } from "react-native"; // Import any other necessary components
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Login from "../../Login";
import Dashboard from "../Dashboard";
import Notifications from "../../Notifications/Notifications";
import Messages from "../../Messages/Messages";
import Profile from "../../Profile/Profile";
import ReportMenu from "../../Report/ReportMenu";
import Wallet from "../../Wallet/Wallet";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const Home = () => {
  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#ff6200",
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            statusBarHidden: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="message1" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Report Item"
          component={ReportMenu}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Wallet"
          component={Wallet}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
