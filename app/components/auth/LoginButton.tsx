"use client";

import { useState } from "react";

export default function LoginButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    const width = 500;
    const height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "/auth/popup-start",
      "wedd-space-login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      // Popup blocked — fall back to a normal same-window redirect.
      window.location.href = "/auth/popup-start";
      return;
    }

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        setLoading(false);
        window.location.reload();
      }
    }, 400);
  };

  return (
    <button type="button" onClick={handleLogin} disabled={loading} className={className}>
      {loading ? "Waiting for Google…" : "Log in with Google"}
    </button>
  );
}
