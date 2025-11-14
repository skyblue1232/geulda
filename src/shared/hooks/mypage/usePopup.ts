'use client';

import { useState } from 'react';

export const usePopup = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return {
    showLogoutPopup,
    showLoginPopup,
    openLogout: () => setShowLogoutPopup(true),
    openLogin: () => setShowLoginPopup(true),
    closeLogout: () => setShowLogoutPopup(false),
    closeLogin: () => setShowLoginPopup(false),
  };
};
