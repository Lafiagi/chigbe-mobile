// components/ProductList.js
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import axios from '../../../request/requests'

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products
    const fetchProducts = async () => {
      const response = await axios.get("/products"); // Replace with the actual API endpoint
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{`Status: ${item.status}`}</Text>
            <Text>{`Code: ${item.code}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  itemContainer: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  itemName: { fontSize: 16, fontWeight: "bold" },
});
