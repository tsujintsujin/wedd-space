import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/app/components/auth/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ?? user.email;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">
        Dashboard
      </p>
      <h1 className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-ink md:text-5xl">
        Welcome, {displayName}.
      </h1>
      <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-muted">
        Your wedding page builder isn&apos;t built yet &mdash; but you&apos;re
        logged in, and this session is real.
      </p>
      <LogoutButton className="mt-10 cursor-pointer border border-ink/25 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-wine hover:text-wine" />
    </main>
  );
}
