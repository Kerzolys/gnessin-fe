import { create } from "zustand";
import {
  TContact,
  TFestival,
  THeroEvent,
  TNews,
  TPhoto,
  TSocial,
  TUser,
  TVideo,
} from "../types";
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
import {
  addNews,
  deleteNews,
  editNews,
  fetchNews,
} from "../../modules/admin/news/api/apiNews";
import {
  addFestival,
  deleteFestival,
  editFestival,
  fetchFestivals,
} from "../../modules/admin/festivals/api/apiFestival";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "../../modules/admin/admin-contacts/api/apiContacts";

type AuthState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isSessionRestored: boolean;
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
  isSessionRestored: false,
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
  restoreSession: async () => {
    set({ isLoading: true });

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isSessionRestored: true, // Флаг установлен
        });
        return;
      }

      try {
        const token = await user.getIdToken();
        const userData: TUser = {
          id: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          password: "",
          refreshToken: user.refreshToken,
          token,
        };
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          isSessionRestored: true, // Флаг установлен
        });
      } catch (err: any) {
        console.log("Ошибка при получении токена", err.message);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isSessionRestored: true, // Флаг установлен
        });
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

type NewsState = {
  news: TNews[] | [];
  isLoading: boolean;
  error: string | null;
  loadNews: () => void;
  addNews: (news: TNews) => void;
  deleteNews: (newsId: string) => void;
  editNews: (news: TNews) => void;
};

export const useNewsState = create<NewsState>((set) => ({
  news: [],
  isLoading: false,
  error: null,
  loadNews: async () => {
    set({ isLoading: true, error: null });
    const news = await fetchNews();
    if (news) {
      set({ news: news, isLoading: false });
    } else {
      set({ error: "Error fetching news", isLoading: false });
    }
  },
  addNews: async (news: TNews, file?: File) => {
    set({ isLoading: true, error: null });
    console.log(file);
    try {
      const newNewsId = await addNews(news);
      if (newNewsId) {
        set((state) => ({
          news: [...state.news, { ...news, id: newNewsId }],
          isLoading: false,
        }));
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  editNews: async (news: TNews) => {
    set({ isLoading: true, error: null });
    try {
      await editNews(news);
      set((state) => ({
        news: state.news?.map((n) =>
          n.id === news.id ? { ...n, ...news } : n
        ),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteNews: async (newsId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteNews(newsId);
      set((state) => ({
        news: state.news?.filter((n) => n.id !== newsId),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

type FestivalsState = {
  festivals: TFestival[] | [];
  isLoading: boolean;
  error: string | null;
  loadFestivals: () => void;
  addFestival: (festival: TFestival) => void;
  deleteFestival: (festivalId: string) => void;
  editFestival: (festival: TFestival) => void;
};

export const useFestivalsState = create<FestivalsState>((set) => ({
  festivals: [],
  isLoading: false,
  error: null,
  loadFestivals: async () => {
    set({ isLoading: true, error: null });
    const festivals = await fetchFestivals();
    if (festivals) {
      set({ festivals: festivals, isLoading: false });
    } else {
      set({ error: "Error fetching festivals", isLoading: false });
    }
  },
  addFestival: async (festival: TFestival) => {
    set({ isLoading: true, error: null });
    try {
      await addFestival(festival);
      set((state) => ({
        festivals: [...state.festivals, festival],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  editFestival: async (festival: TFestival) => {
    set({ isLoading: true, error: null });
    try {
      await editFestival(festival);
      set((state) => ({
        festivals: state.festivals?.map((f) =>
          f.id === festival.id ? { ...f, ...festival } : f
        ),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteFestival: async (festivalId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteFestival(festivalId);
      set((state) => ({
        festivals: state.festivals?.filter((f) => f.id !== festivalId),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

type ContactsState = {
  contacts: TContact[] | [];
  isLoading: boolean;
  error: string | null;
  loadContacts: () => void;
  addContact: (contact: TContact) => void;
  deleteContact: (contactId: string) => void;
  editContact: (contact: TContact) => void;
};

export const useContactsState = create<ContactsState>((set) => ({
  contacts: [],
  isLoading: false,
  error: null,
  loadContacts: async () => {
    set({ isLoading: true, error: null });
    const contacts = await fetchContacts();
    if (contacts) {
      set({ contacts: contacts, isLoading: false });
    } else {
      set({ error: "Error fetching contacts", isLoading: false });
    }
  },
  addContact: async (contact: TContact) => {
    set({ isLoading: true, error: null });
    try {
      await addContact(contact);
      set((state) => ({
        contacts: [...state.contacts, contact],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteContact: async (contactId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteContact(contactId);
      set((state) => ({
        contacts: state.contacts?.filter((c) => c.id !== contactId),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  editContact: async (contact: TContact) => {
    set({ isLoading: true, error: null });
    try {
      await editContact(contact);
      set((state) => ({
        contacts: state.contacts?.map((c) =>
          c.id === contact.id ? { ...c, ...contact } : c
        ),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
