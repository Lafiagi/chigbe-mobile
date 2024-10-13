import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../../../components/commons/styles/generic";
import { Ionicons } from "@expo/vector-icons";

export const ViewAll = ({ title, onPress }) => {
  return (
    <View style={[commonStyles.spacedContainer, styles.topMissingItems]}>
      <Text style={[commonStyles.bold, styles.title]}>{title}</Text>
      <View style={commonStyles.spacedContainer}>
        <TouchableOpacity
          onPress={onPress}
          style={[commonStyles.centerFlexContainer, styles.viewAllContainer]}
        >
          <Text style={[commonStyles.orangeText, styles.viewAll]}>
            View All
          </Text>
          <Ionicons
            name="caret-forward-sharp"
            size={20}
            color={commonStyles.orangeText.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
  },
  topMissingItems: {
    marginTop: 10,
  },
  viewAll: {
    fontSize: 17,
  },
  viewAllContainer: {
    marginTop: 5,
  },
});
