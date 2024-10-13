import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
} from "react-native";
import { Searchbar } from "react-native-paper";
import ItemCard from "../../components/commons/item/ItemCard";
import commonStyles from "../../components/commons/styles/generic";
import axios from "../../request/requests";
import debounce from "lodash.debounce";

const ItemList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  // Fetch items from the API
  const fetchItems = useCallback(
    async (url = "/report-missing-item/", searchQuery = "") => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          params: {
            search: searchQuery, // Add search query to request
          },
        });
        const { results, next } = response.data;

        setItems((prevItems) =>
          url === "/report-missing-item/" ? results : [...prevItems, ...results]
        );
        setNextPageUrl(next);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchItems("/report-missing-item/", searchQuery).finally(() =>
      setRefreshing(false)
    );
  }, [fetchItems, searchQuery]);

  // Handle loading more items when reaching the end
  const loadMoreItems = useCallback(() => {
    if (!loading && nextPageUrl) {
      fetchItems(nextPageUrl, searchQuery);
    }
  }, [loading, nextPageUrl, fetchItems, searchQuery]);

  // Fetch items when searchQuery changes with debounce
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchItems("/report-missing-item/", query);
    }, 500), // Delay of 500ms
    [fetchItems]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Initial data fetching
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        cursorColor={"#ff6200"}
        iconColor="#ff4201"
      />

      <Text style={[commonStyles.bold, styles.title]}>Latest Items</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <ItemCard key={index} navigator={navigation} data={item} />
        )}
        keyExtractor={(item, index) => `search-item-${index}`}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ marginBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        scrollEnabled={false}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5} // Fetch more when scrolled 50% to the bottom
        ListFooterComponent={
          loading && <Text style={styles.loadingText}>Loading more...</Text>
        }
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
    height: 50,
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
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
});
export default ItemList;
