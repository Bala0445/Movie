import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-8ccf.onrender.com/api", // change if your backend base differs
});

// attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
