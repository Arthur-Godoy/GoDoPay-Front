const USER_KEY = "godopay.user";

function isBrowser() {
  return typeof window !== "undefined";
}

export const sessionStorage = {
  getUser() {
    if (!isBrowser()) return null;

    const stored = window.localStorage.getItem(USER_KEY);

    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  setUser(user) {
    if (!isBrowser()) return;

    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear() {
    if (!isBrowser()) return;

    window.localStorage.removeItem(USER_KEY);
  },
};
