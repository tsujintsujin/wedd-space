"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// Single shared source of truth for "who's logged in" on the client. Beyond
// the initial fetch and Supabase's own auth events, it also re-checks
// whenever the tab regains focus/visibility — without that, a session
// change made elsewhere (another tab, an expiry, a logout) would sit stale
// in this tab's UI until a manual hard reload.
export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const refresh = () => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
        setLoading(false);
      });
    };

    refresh();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", refresh);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return { user, loading };
}
