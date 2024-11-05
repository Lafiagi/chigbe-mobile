import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http:/192.168.69.54:8000/auth/api/v1/",
  timeout: 5000,
});

// Response interceptor to handle errors or token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default api;
