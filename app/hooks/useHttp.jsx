import axios from "axios";
import { sessionStorage } from "~/services/sessionStorage";
import { tokenStorage } from "~/services/tokenStorage";

const baseURL = "http://localhost:8000/api";
const PUBLIC_ENDPOINTS = ["/login", "/register", "/refresh"];

const useHttp = axios.create({ baseURL });

let refreshPromise = null;

function refreshTokens() {
  refreshPromise ??= axios
    .post(`${baseURL}/refresh`, null, {
      headers: { Authorization: `Bearer ${tokenStorage.getRefreshToken()}` },
    })
    .then(({ data }) => tokenStorage.setAccessToken(data.access_token))
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

async function logout() {
  tokenStorage.clear();
  sessionStorage.clear();

  const { router } = await import("~/routes");

  return router.navigate("/login");
}

useHttp.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

useHttp.interceptors.response.use(null, async (error) => {
  const { config, response } = error;

  if (response?.status !== 401 || PUBLIC_ENDPOINTS.includes(config?.url)) {
    return Promise.reject(error);
  }

  if (config._retry) {
    await logout();
    return Promise.reject(error);
  }

  config._retry = true;

  try {
    await refreshTokens();
    return useHttp(config);
  } catch (refreshError) {
    await logout();
    return Promise.reject(refreshError);
  }
});

export default useHttp;
