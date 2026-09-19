const ACCESS_TOKEN_KEY = "godopay.access_token";
const REFRESH_TOKEN_KEY = "godopay.refresh_token";

function isBrowser() {
  return typeof window !== "undefined";
}

function read(key) {
  return isBrowser() ? window.localStorage.getItem(key) : null;
}

export const tokenStorage = {
  getAccessToken() {
    return read(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return read(REFRESH_TOKEN_KEY);
  },

  setTokens({ access_token, refresh_token }) {
    if (!isBrowser()) return;

    window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  },

  setAccessToken(access_token) {
    if (!isBrowser()) return;

    window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  },

  clear() {
    if (!isBrowser()) return;

    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
