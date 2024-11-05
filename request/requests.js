import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authenticatedReq = axios.create({
  baseURL: "http:/192.168.69.54:8000/api/v1/core",
  timeout: 5000,
});

// Request interceptor to add Authorization header if token is present
authenticatedReq.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(await AsyncStorage.getItem("authToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.access}`; // Inject Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors or token expiration
authenticatedReq.interceptors.response.use(
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

export default authenticatedReq;
