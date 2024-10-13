import * as React from "react";
import { Modal, Portal, Text, Searchbar, IconButton } from "react-native-paper";
import commonStyles from "../../components/commons/styles/generic";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const CustomButton = ({ title, onPress, setVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        setVisible(false);
      }}
      style={styles.selectBtn}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const SearchModal = ({
  setSearchQuery,
  searchQuery,
  visible,
  setVisible,
  data,
  navigation,
}) => {
  const hideModalAndNavigate = () => {
    setVisible(false);
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
            <IconButton
              icon="close"
              iconColor={"#ff4201"}
              size={30}
              containerColor="#eee"
              style={{ elevation: 4, alignSelf: "flex-end" }}
              onPress={() => setVisible(false)}
            />
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={[commonStyles.searchBar, styles.searchBar]}
              cursorColor={"#ff6200"}
              iconColor="#ff4201"
              inputStyle={{
                minHeight: 0,
              }}
            />

            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <CustomButton
                  title={item.name}
                  onPress={() => setSearchQuery(item.name)}
                  setVisible={setVisible}
                />
              )}
              keyExtractor={(item, index) => {
                `search-item-${index}`;
              }}
              style={{ width: "90%" }}
              showsVerticalScrollIndicator={false}
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
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ff0422",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  modal: {
    minHeight: "50%",
    maxHeight: "70%",
    backgroundColor: "#eee",
    alignSelf: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
  },
  searchBar: {
    height: 43,
    width: "90%",
  },
});

export default SearchModal;
