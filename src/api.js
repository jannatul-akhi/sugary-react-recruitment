import axios from "axios";

const API = axios.create({
  baseURL: "https://sugarytestapi.azurewebsites.net",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const isUnauthorized = err.response?.status === 401;
    const hasRefreshToken = localStorage.getItem("refreshToken");
    const notRetriedYet = !originalRequest._retry;

    if (isUnauthorized && hasRefreshToken && notRetriedYet) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "https://sugarytestapi.azurewebsites.net/Account/RefreshToken",
          {
            AccessToken: localStorage.getItem("accessToken"),
            RefreshToken: localStorage.getItem("refreshToken"),
          }
        );

        const data = res.data;

        if (data?.Token) {
          localStorage.setItem("accessToken", data.Token);
          localStorage.setItem("refreshToken", data.RefreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.Token}`;
          return API(originalRequest);
        }
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;
