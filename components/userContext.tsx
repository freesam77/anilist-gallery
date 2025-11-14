"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SessionUser = { name: string; occupation: string };

type UserContextValue = {
  user: SessionUser | null;
  loading: boolean;
  saveProfile: (next: SessionUser) => Promise<void>;
  clearProfile: () => Promise<void>;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

async function fetchSessionRequest() {
  const res = await fetch("/api/session", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load session");
  return res.json();
}

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async (silent?: boolean) => {
    if (!silent) setLoading(true);
    try {
      const json = await fetchSessionRequest();
      if (json.authenticated) {
        setUser(json.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const saveProfile = useCallback(
    async (next: SessionUser) => {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      await fetchSession(true);
    },
    [fetchSession]
  );

  const clearProfile = useCallback(async () => {
    await fetch("/api/session", { method: "DELETE" });
    await fetchSession(true);
  }, [fetchSession]);

  const value = useMemo(
    () => ({
      user,
      loading,
      saveProfile,
      clearProfile,
      refresh: () => fetchSession(true),
    }),
    [user, loading, saveProfile, clearProfile, fetchSession]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within <UserContextProvider>");
  return ctx;
}
