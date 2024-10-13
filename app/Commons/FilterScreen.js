import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import commonStyles from "../../components/commons/styles/generic";
import React from "react";
import OrangeButton from "../../components/commons/OrangeButton";

const FilterButtons = ({ name, navigation, onPress }) => {
  return (
    <TouchableOpacity
      navigator={navigation}
      onPress={onPress}
      style={styles.filterButton}
    >
      <Text style={styles.filterBtnText}>{name}</Text>
    </TouchableOpacity>
  );
};
const FilterScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[commonStyles.searchBar, styles.searchBarCustom]}
          cursorColor={"#ff6200"}
          iconColor="#ff4201"
          inputStyle={{
            minHeight: 0, // Add this
          }}
        />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={({ item, index }) => <FilterButtons name={"Lagos"} />}
          keyExtractor={(item, index) => {
            `1-item-${index}`;
          }}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginTop: 10,
          }}
          ListHeaderComponent={
            <Text style={[styles.locations, commonStyles.bold]}>Location</Text>
          }
        />

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={({ item, index }) => <FilterButtons name={"Lagos"} />}
          keyExtractor={(item, index) => {
            `2-item-${index}`;
          }}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginTop: 10,
          }}
          ListHeaderComponent={
            <Text style={[styles.locations, commonStyles.bold]}>Category</Text>
          }
        />

        <FlatList
          data={[1, 2]}
          renderItem={({ item, index }) => (
            <FilterButtons name={"Recent Report"} />
          )}
          keyExtractor={(item, index) => {
            `32-item-${index}`;
          }}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={3}
          style={{ width: "65%" }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginTop: 10,
          }}
          ListHeaderComponent={
            <Text style={[styles.locations, commonStyles.bold]}>Sort By</Text>
          }
        />
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.resetContainer}>
          <OrangeButton
            onPress={() => console.log("Seach btn Clicked...")}
            title="Reset Filter"
            rounded
          />
        </View>
        <OrangeButton
          onPress={() => console.log("Seach btn Clicked...")}
          title="Done"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    minHeight: "100%",
  },
  locations: {
    fontSize: 20,
    marginTop: 30,
  },
  searchBarCustom: {
    width: "100%",
    alignSelf: "center",
    height: 40,
  },
  btnContainer: {
    marginBottom: 10,
    marginTop: 30
  },
  resetContainer: {
    alignSelf: "center",
    marginBottom: 10,
  },
  filterButton: {
    padding: 5,
    borderWidth: 1,
    minWidth: "30%",
    borderColor: "#999",
    borderRadius: 3,
  },
  filterBtnText: {
    textAlign: "center",
  },
});
export default FilterScreen;
