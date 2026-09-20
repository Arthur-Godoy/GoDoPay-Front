import { useCallback, useState } from "react";

const HIDDEN_BALANCE_KEY = "godopay.hide_balance";

export function useBalanceCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(
    () => window.localStorage.getItem(HIDDEN_BALANCE_KEY) === "true",
  );

  const openMenu = useCallback((event) => setAnchorEl(event.currentTarget), []);

  const closeMenu = useCallback(() => setAnchorEl(null), []);

  const openSwitcher = useCallback(() => {
    setAnchorEl(null);
    setIsSwitcherOpen(true);
  }, []);

  const closeSwitcher = useCallback(() => setIsSwitcherOpen(false), []);

  const toggleHidden = useCallback(() => {
    setIsHidden((previous) => {
      const next = !previous;

      window.localStorage.setItem(HIDDEN_BALANCE_KEY, String(next));

      return next;
    });
  }, []);

  return {
    anchorEl,
    openMenu,
    closeMenu,
    isSwitcherOpen,
    openSwitcher,
    closeSwitcher,
    isHidden,
    toggleHidden,
  };
}
