"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, isFirebaseInitialized } from "@/lib/firebase-init";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseInitialized()) {
      setLoading(false);
      return;
    }

    // Set persistence before listening to auth state
    setPersistence(auth, browserLocalPersistence).catch(() => {
      // Persistence might fail in some environments
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
      throw err;
    }
  };

  return { user, loading, error, login, register, logout };
}
