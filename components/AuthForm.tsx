"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

function cleanUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 24);
}

async function ensureVyroProfile(
  supabase: ReturnType<typeof createClient>,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> },
  requestedUsername?: string
) {
  const { data: existing, error: lookupError } = await supabase
    .from("vyro_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (existing) return;

  const metadataUsername =
    typeof user.user_metadata?.username === "string" ? user.user_metadata.username : "";
  const emailName = user.email?.split("@")[0] ?? "";
  const rawUsername = requestedUsername || metadataUsername || emailName || "creator";
  const base = cleanUsername(rawUsername);
  const username = base.length >= 3 ? base : `vyro${user.id.slice(0, 7)}`;
  const displayName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name.slice(0, 40)
      : username;

  const { error: insertError } = await supabase.from("vyro_profiles").insert({
    id: user.id,
    username,
    display_name: displayName,
  });

  if (insertError?.code === "23505") {
    const uniqueUsername = `${username.slice(0, 15)}_${user.id.slice(0, 7)}`;
    const { error: retryError } = await supabase.from("vyro_profiles").insert({
      id: user.id,
      username: uniqueUsername,
      display_name: displayName,
    });
    if (retryError) throw retryError;
    return;
  }

  if (insertError) throw insertError;
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const normalizedUsername = cleanUsername(username);
    if (mode === "signup" && normalizedUsername.length < 3) {
      setError("Dein Benutzername muss mindestens 3 Zeichen haben.");
      return;
    }
    if (password.length < 8) {
      setError("Dein Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              username: normalizedUsername,
              display_name: normalizedUsername,
              app: "vyro",
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.session && data.user) {
          await ensureVyroProfile(supabase, data.user, normalizedUsername);
          router.replace("/");
          router.refresh();
          return;
        }

        setMessage("Dein Konto wurde angelegt. Bestätige deine E-Mail und melde dich danach hier an.");
        setMode("signin");
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;
      if (!data.user) throw new Error("Anmeldung fehlgeschlagen. Bitte versuche es erneut.");

      await ensureVyroProfile(supabase, data.user);
      router.replace("/");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Es ist ein unbekannter Fehler aufgetreten.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-[30px] border border-white/10 bg-[#111217] p-6 shadow-glow sm:p-8">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-black">
          V
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-violet-300">VYRO</p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {mode === "signin" ? "Willkommen zurück" : "Dein VYRO-Konto"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {mode === "signin" ? "Melde dich an und entdecke neue Videos." : "Erstelle dein Konto und werde Teil von VYRO."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <label className="block text-sm text-zinc-300">
            Benutzername
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              minLength={3}
              maxLength={24}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400"
              placeholder="deinname"
            />
          </label>
        )}

        <label className="block text-sm text-zinc-300">
          E-Mail
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400"
            placeholder="name@example.com"
          />
        </label>

        <label className="block text-sm text-zinc-300">
          Passwort
          <input
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-violet-400"
            placeholder="Mindestens 8 Zeichen"
          />
        </label>

        {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        {message && <p role="status" className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-100">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Einen Moment ..." : mode === "signin" ? "Anmelden" : "Konto erstellen"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        {mode === "signin" ? "Noch kein Konto?" : "Du hast schon ein Konto?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
            setMessage("");
          }}
          className="font-semibold text-violet-300 hover:text-white"
        >
          {mode === "signin" ? "Registrieren" : "Anmelden"}
        </button>
      </p>
    </div>
  );
}
