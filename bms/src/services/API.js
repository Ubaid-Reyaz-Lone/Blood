import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default API;
