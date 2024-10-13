import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export const NavButton = ({ step }) => {
  const router = useRouter();
  return (
    <View
      style={{
        justifyContent: "space-between",
        padding: 0,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {step > 1 ? (
        <IconButton
          icon="arrow-left"
          iconColor={"#fff"}
          size={20}
          containerColor="#3c9ae2"
          onPress={() => router.back()}
        />
      ) : <View style={{flex: 1}}></View>}

      <Text style={{ fontSize: 17, marginRight: 10, marginTop: 5 }}>
        Step {step}/2
      </Text>
    </View>
  );
};
