import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, Dimensions } from "react-native"; // Import any other necessary components
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Dashboard from "../Dashboard";
import Profile from "../../Profile/Profile";
import AddProduct from "../Components/AddProduct";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const EnterpriseHome = () => {
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
          name="Add Product"
          component={AddProduct}
          options={{
            headerShown: false,
            statusBarHidden: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plus" size={size} color={color} />
            ),
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

export default EnterpriseHome;
