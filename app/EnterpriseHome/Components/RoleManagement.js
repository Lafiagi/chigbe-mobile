// components/RoleManagement.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: "1", name: "Admin", permissions: ["Add", "Delete", "Update"] },
    { id: "2", name: "Viewer", permissions: ["View"] },
    // Add more roles as needed
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Role Management</Text>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.roleItem}>
            <Text style={styles.roleName}>{item.name}</Text>
            <Text>{`Permissions: ${item.permissions.join(", ")}`}</Text>
          </View>
        )}
      />
      <Button title="Manage Roles" onPress={() => {/* Handle role management */}} />
    </View>
  );
};

export default RoleManagement;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  roleItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  roleName: { fontSize: 16, fontWeight: "bold" },
});
