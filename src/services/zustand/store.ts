import { create } from "zustand";
import { THeroEvent, TPhoto, TSocial, TUser, TVideo } from "../types";
import { loginUser, logoutUser } from "../api/api";

import { auth } from "../firebase/firebase";
import { editHeroEvent, fetchHeroEvent } from "../../modules/hero/api/apiHero";
import {
  addVideo,
  deleteVideo,
  editVideo,
  fetchVideos,
} from "../../modules/media/api/apiMedia";
import {
  addSocial,
  deleteSocial,
  editSocial,
  fetchSocial,
} from "../../modules/admin/social/api/apiSocial";
import {
  addPhoto,
  deletePhoto,
  fetchPhotos,
} from "../../modules/admin/photos/api/apiPhotos";

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

type SocialState = {
  social: TSocial[] | [];
  isLoading: boolean;
  error: string | null;
  loadSocial: () => void;
  editSocial: (social: TSocial) => void;
  addSocial: (social: TSocial) => void;
  deleteSocial: (socialId: string) => void;
};

export const useSocialState = create<SocialState>((set) => ({
  social: [],
  isLoading: false,
  error: null,
  loadSocial: async () => {
    set({ isLoading: true, error: null });
    try {
      const social = await fetchSocial();
      if (social) {
        set({ social, isLoading: false });
      } else {
        set({ error: "Error fetching social media", isLoading: false });
      }
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },
  editSocial: async (social: TSocial, file?: File) => {
    set({ isLoading: true, error: null });
    try {
      await editSocial(social, file);
      set((state) => ({
        social: state.social?.map((s) =>
          s.id === social.id ? { ...s, ...social } : s
        ),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  addSocial: async (social: TSocial & { file?: File }) => {
    set({ isLoading: true, error: null });
    try {
      const { file, ...socialData } = social;
      const newSocialId = await addSocial({ ...socialData, file });

      set((state) => ({
        social: [...state.social, { ...socialData, id: newSocialId }],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteSocial: async (socialId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteSocial(socialId);
      set((state) => ({
        social: state.social?.filter((s) => s.id !== socialId),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

type PhotosState = {
  photos: TPhoto[] | [];
  isLoading: boolean;
  error: string | null;
  loadPhotos: () => void;
  addPhoto: (photo: TPhoto) => Promise<void>;
  deletePhoto: (photoId: string) => void;
};

export const usePhotosState = create<PhotosState>((set) => ({
  photos: [],
  isLoading: false,
  error: null,
  loadPhotos: async () => {
    set({ isLoading: true, error: null });
    try {
      const photos = await fetchPhotos();
      if (photos) {
        set({ photos: photos, isLoading: false, error: null });
      } else {
        set({ error: "Error fetching photos", isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  addPhoto: async (photo: TPhoto & { file?: File }) => {
    set({ isLoading: true, error: null });
    try {
      const { file, ...photoData } = photo;
      const newPhotoId = await addPhoto({ ...photoData, file });
      set((state) => ({
        photos: [...state.photos, { ...photoData, id: newPhotoId }],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  deletePhoto: async (photoId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deletePhoto(photoId);
      set((state) => ({
        photos: state.photos?.filter((photo) => photo.id !== photoId),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
