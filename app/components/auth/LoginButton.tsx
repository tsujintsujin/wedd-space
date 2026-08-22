"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting…" : "Log in with Google"}
    </button>
  );
}
