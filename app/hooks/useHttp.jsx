import axios from "axios";
import { notifyError } from "~/services/errorNotifier";
import { clearSession } from "~/services/session";
import { tokenStorage } from "~/services/tokenStorage";
import { getErrorMessage, hasFieldErrors } from "~/utils/httpError";

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

useHttp.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function reportError(error) {
  if (hasFieldErrors(error)) return;

  notifyError(getErrorMessage(error));
}

useHttp.interceptors.response.use(null, async (error) => {
  const { config, response } = error;

  if (response?.status !== 401 || PUBLIC_ENDPOINTS.includes(config?.url)) {
    reportError(error);

    return Promise.reject(error);
  }

  if (config._retry) {
    await clearSession();

    return Promise.reject(error);
  }

  config._retry = true;

  try {
    await refreshTokens();
    return useHttp(config);
  } catch (refreshError) {
    await clearSession();
    return Promise.reject(refreshError);
  }
});

export default useHttp;
