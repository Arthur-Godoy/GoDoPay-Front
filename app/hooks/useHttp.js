import axios from "axios";
import { tokenStorage } from "~/services/tokenStorage";

const useHttp = axios.create({
  baseURL: "http://localhost:8000/api",
});

useHttp.interceptors.request.use(
  function (config) {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

useHttp.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response?.status === 401) {
      tokenStorage.clear();
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default useHttp;
