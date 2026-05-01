import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanager-production-18a4.up.railway.app/api"
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