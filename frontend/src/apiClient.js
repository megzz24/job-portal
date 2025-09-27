import axios from "axios";

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., http://127.0.0.1:8000/api
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token only if request is not public
apiClient.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = getAccessToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Token refresh interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.skipAuth) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/token/refresh/`,
            { refresh: refreshToken }
          );

          const newAccessToken = res.data.access;
          localStorage.setItem("access_token", newAccessToken);

          apiClient.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        } catch (err) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
