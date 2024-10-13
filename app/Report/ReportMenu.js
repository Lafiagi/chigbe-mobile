import * as React from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";
import commonStyles from "../../components/commons/styles/generic";
import { StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.selectBtn}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const ReportMenu = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false); // Initialize as false

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      showModal();
    });

    // Clean up event listener
    return unsubscribe;
  }, [navigation]);

  // Function to show the modal
  const showModal = () => setVisible(true);

  // Function to hide the modal and navigate to Dashboard
  const hideModalAndNavigate = () => {
    setVisible(false);
    navigation.navigate("Dashboard");
  };

  return (
    <>
      {/* Only render the modal if 'visible' is true */}
      {visible && (
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModalAndNavigate}
            contentContainerStyle={styles.modal}
          >
            <Text style={[commonStyles.bold, styles.select]}>
              Select An Action
            </Text>
            <CustomButton
              title={"Report Missing Item"}
              onPress={() => {
                setVisible(false);

                navigation.navigate("MissingItem");
              }}
            />
            <CustomButton
              title={"Find Missing Item"}
              onPress={() => {
                setVisible(false);
                navigation.navigate("ReportItem");
              }}
            />
          </Modal>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    fontSize: 19,
    textAlign: "center",
  },
  selectBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ff0422",
    minWidth: 200,
    marginTop: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  modal: {
    height: "40%",
    backgroundColor: "#eee",
    alignSelf: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
  },
});

export default ReportMenu;
