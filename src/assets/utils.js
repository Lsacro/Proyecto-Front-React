import axios from "axios";
import Cookies from "js-cookie";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API,
});

axiosBase.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;
