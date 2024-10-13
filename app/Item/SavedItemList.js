import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { ViewAll } from "../Home/Dashboard";
import ItemCard from "../../components/commons/item/ItemCard";
import React from "react";
import commonStyles from "../../components/commons/styles/generic";

const SavedItemList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{minHeight: 0}}
        cursorColor={"#ff6200"}
        iconColor="#ff4201"
      />
      <Text style={[commonStyles.bold, styles.title]}>Saved Items</Text>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item, index }) => (
          <ItemCard key={index} navigator={navigation} />
        )}
        keyExtractor={(item, index) => {
          `search-item-${index}`;
        }}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ marginBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={2}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#999",
    alignSelf: "center",
    marginTop: 20,
  },
  list: {
    marginTop: 20,
    paddingBottom: 10,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
  },
});
export default SavedItemList;
