import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import NotificationCard from "./Components/MessageCard";
import React from "react";

const Messages = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        cursorColor={"#ff6200"}
        iconColor="#ff4201"
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item, index }) => (
          <NotificationCard key={index} id={index} navigation={navigation} />
        )}
        keyExtractor={(item, index) => {
          `search-item-${index}`;
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  searchBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#999",
    marginBottom: 10,
    marginTop: 20,
  },
  list: {
    marginTop: 10,
    marginBottom: 200,
    flexGrow: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
export default Messages;
