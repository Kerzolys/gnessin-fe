import { create } from "zustand";
import { THeroEvent, TUser, TVideo } from "../types";
import { loginUser, logoutUser } from "../api/api";

import { auth } from "../firebase/firebase";
import { editHeroEvent, fetchHeroEvent } from "../../modules/hero/api/apiHero";
import {
  addVideo,
  deleteVideo,
  editVideo,
  fetchVideos,
} from "../../modules/media/components/api/apiMedia";

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

type HeroEventState = {
  heroEvent: THeroEvent | null;
  isLoading: boolean;
  error: string | null;
  setHeroEvent: (heroEvent: THeroEvent) => void;
  setError: (error: string | null) => void;
  loadHeroEvent: () => void;
  editHeroEvent: (heroEvent: THeroEvent) => void;
};

export const useHeroEvent = create<HeroEventState>((set) => ({
  heroEvent: null,
  isLoading: false,
  error: null,
  setHeroEvent: (heroEvent) => set({ heroEvent }),
  setError: (error) => set({ error }),
  loadHeroEvent: async () => {
    // set({ isLoading: true, error: null });
    set((state) => ({
      isLoading: !state.heroEvent, // Загружаем только если данных нет
      error: null,
    }));
    try {
      const heroEvent = await fetchHeroEvent();
      if (heroEvent) {
        set({ heroEvent, isLoading: false });
      } else {
        set({ error: "Error fetching hero event", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  editHeroEvent: async (heroEvent) => {
    set({ heroEvent });
    try {
      await editHeroEvent(heroEvent.id!, heroEvent);
      set({ heroEvent, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

type VideosState = {
  videos: TVideo[] | [];
  isLoading: boolean;
  error: string | null;
  loadVideos: () => void;
  editVideo: (video: TVideo) => void;
  addVideo: (video: TVideo) => void;
  deleteVideo: (videoId: string) => void;
};

export const useVideosState = create<VideosState>((set) => ({
  videos: [],
  isLoading: false,
  error: null,
  loadVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const videos = await fetchVideos();
      if (videos) {
        set({ videos, isLoading: false });
      } else {
        set({ error: "Error fetching videos", isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
  editVideo: async (video) => {
    set({ isLoading: true, error: null });
    try {
      await editVideo(video);
      set((state) => ({
        videos: state.videos.map((v) => (v.id === video.id ? video : v)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  addVideo: async (video) => {
    set({ isLoading: true, error: null });
    try {
      const newVideoId = await addVideo(video);
      set((state) => ({
        videos: [...state.videos, { ...video, id: newVideoId }],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  deleteVideo: async (videoId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteVideo(videoId);
      set((state) => ({
        videos: state.videos.filter((v) => v.id !== videoId),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
