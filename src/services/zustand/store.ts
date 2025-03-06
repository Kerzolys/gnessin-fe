import { create } from "zustand";
import { TUser } from "../types";
import { loginUser, logoutUser } from "../api/api";

import { auth } from "../firebase/firebase";

type AuthState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  setUser: (uset: TUser) => void;
  setError: (error: string | null) => void;
  restoreSession: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await loginUser(email, password);
      if (userCredential) {
        const token = await userCredential.user.getIdToken();
        const user: TUser = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || "",
          email: userCredential.user.email || "",
          password: "",
          refreshToken: userCredential.user.refreshToken,
          token,
        };
        localStorage.setItem("refreshToken", user.refreshToken);
        console.log(user);
        set({ user, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutUser();
      localStorage.removeItem("refreshToken");
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setError: (error) => set({ error }),
  restoreSession: () => {
    set({ isLoading: true });

    const refreshToken = localStorage.getItem("refreshToken");

    auth.onAuthStateChanged(async (user) => {
      if (user && refreshToken) {
        const token = await user.getIdToken();
        const userData: TUser = {
          id: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          password: "",
          refreshToken: user.refreshToken,
          token,
        };
        set({ user: userData, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
  },
}));
