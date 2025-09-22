import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (optional - attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (optional - error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
