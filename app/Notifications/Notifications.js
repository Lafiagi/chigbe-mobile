import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import NotificationCard from "./Components/NotificationCard";

const Notifications = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item, index }) => (
          <NotificationCard key={index} navigator={navigation} />
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
  list: {
    // marginTop: 10,
    // marginBottom: 200,
    // flexGrow: 1,
    // paddingBottom: 10,
    // paddingTop: 10
  },
});
export default Notifications;
