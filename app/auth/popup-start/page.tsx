"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

// Runs inside the login popup window only — kicks off the Google OAuth
// redirect from there, so the opener window never navigates away.
export default function PopupStartPage() {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/auth/popup-close` },
    });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Redirecting to Google…</p>
    </main>
  );
}
