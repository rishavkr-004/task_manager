import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ✅ attach token automatically (FIXED)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // 🔥 FIX
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;