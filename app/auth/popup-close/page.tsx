"use client";

import { useEffect } from "react";

// Landing spot after a successful popup login — closes itself immediately;
// the opener window notices the popup closed and refreshes its own session.
export default function PopupClosePage() {
  useEffect(() => {
    window.close();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Logged in — you can close this window.
      </p>
    </main>
  );
}
