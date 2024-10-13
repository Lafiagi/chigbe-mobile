import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const TextInputWithLabel = ({
  label,
  value,
  field_name,
  handleInputChange,
  keyboardType
}) => {
  return (
    <View>
      <Text>{label}:</Text>
      <TextInput
        value={value}
        onChangeText={(text) => handleInputChange(field_name, text)}
        style={{ backgroundColor: "#eee", marginBottom: 10, height: 40, elevation: 4,  }}
        mode="outlined"
        outlineColor={"#eee"}
        activeOutlineColor="#eee"
        cursorColor="#333"
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default TextInputWithLabel;
