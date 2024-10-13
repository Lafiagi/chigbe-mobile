import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import commonStyles from "../../components/commons/styles/generic";
import BalanceCard from "./Components/BalanceCard";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Item = () => {
  return (
    <View style={[commonStyles.spacedContainer, styles.itemsContainer]}>
      <View style={commonStyles.spacedContainer}>
        <Image
          style={styles.profilePic}
          resizeMode="contain"
          source={require("../../assets/images/profile.png")}
        />
        <View style={{ justifyContent: "center", marginLeft: 10 }}>
          <Text>Dribble</Text>
          <Text style={{ marginTop: 5 }}>Recieved 1,000 SUI Token</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontWeight: "500", marginTop: 10 }}>$130,200,000</Text>
      </View>
    </View>
  );
};

const Wallet = () => {
  const layout = useWindowDimensions();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={commonStyles.spacedContainer}>
        <View style={[styles.imageContainer, commonStyles.spacedContainer]}>
          <Image
            style={styles.profilePic}
            resizeMode="contain"
            source={require("../../assets/images/profile.png")}
          />
          <Text style={[commonStyles.bold, styles.name]}>Keji Olajide</Text>
          <Text style={styles.email}></Text>
        </View>
      </View>

      <View style={commonStyles.spacedContainer}>
        <FlatList
          data={[
            { name: "SUI", balance: 10000 },
            { name: "FUD", balance: 14050 },
            { name: "DWA", balance: 40909 },
          ]}
          renderItem={({ item, index }) => (
            <BalanceCard key={index} object={item} />
          )}
          keyExtractor={(item, index) => `balance-item-${index}`}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <View style={[commonStyles.spacedContainer, styles.tnxContainer]}>
        <TouchableOpacity
          style={[styles.tnxBtn, commonStyles.spaceAroundContainer]}
        >
          <Ionicons name="send-outline" size={20} color={"#fff"} />
          <Text style={styles.tnxTxt}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tnxBtn, commonStyles.spaceAroundContainer]}
        >
          <Ionicons name="download-outline" size={20} color={"#fff"} />
          <Text style={styles.tnxTxt}>Receive</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[2, 3, 4, 5, 6, 10, 7, 8, 2, 3]}
        renderItem={({ item, index }) => <Item />}
        keyExtractor={(item, index) => `search-item-${index}`}
        contentContainerStyle={styles.imageList}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListHeaderComponent={() => (
          <Text style={styles.txnHistory}>Transaction History</Text>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 0,
  },
  name: {
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
    width: "80%",
  },
  balanceCard: {
    padding: 15,
  },
  list: {
    marginTop: 20,
    padding: 0,
  },
  tnxBtn: {
    backgroundColor: "#ff6200",
    padding: 7,
    width: "40%",
    borderRadius: 5,
  },
  tnxTxt: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  tnxContainer: {
    marginTop: 50,
    padding: 5,
  },
  itemsContainer: {
    padding: 5,
    // width: "80%",
    marginTop: 10,
    borderWidth: 0.15,
    elevation: 1,
  },
  amount: {
    width: "15%",
  },

  imageList: {
    marginTop: 20,
    marginBottom: 20,
    minHeight: "100%",
  },
  txnHistory: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Wallet;
