import { FlatList, Text } from "react-native";
import ItemCard from "../../../components/commons/item/ItemCard";

export const ItemList = ({ data, navigation, loading }) => {
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <ItemCard key={item.id} data={item} navigator={navigation}/>}
          keyExtractor={(item) => `top-missing-${item.id}`}
          contentContainerStyle={{
            marginTop: 0,
            paddingBottom: 10,
            justifyContent: "flex-start",
            paddingTop: 10,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      )}
    </>
  );
};
