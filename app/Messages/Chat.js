import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const ws = useRef(null);
  const userId = 1; // Assume the current user ID is 1
  const receiverId = 2; // Assume the receiver user ID is 2

  useEffect(() => {
    axios
      .get("http://192.168.0.101:8001/api/v1/core/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.log(error));

    ws.current = new WebSocket("ws://192.168.0.101:8001/ws/claim_item/");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      ws.current.send(
        JSON.stringify({
          content: inputText,
          sender_id: userId,
          receiver_id: receiverId,
        })
      );
      setInputText("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={
        item?.sender_id === userId ? styles.userMessage : styles.receiverMessage
      }
    >
      <Text style={styles.messageText}>{item?.content}</Text>
    </View>
  );
  console.log(`Data ${JSON.stringify(messages)}`);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatList: {
    paddingHorizontal: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#ff6200",
    borderRadius: 16,
    marginVertical: 8,
    padding: 12,
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    marginVertical: 8,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#ff6200",
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;
