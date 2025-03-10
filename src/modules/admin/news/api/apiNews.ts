import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TNews } from "../../../../services/types";
import { db } from "../../../../services/firebase/firebase";


export const fetchNews = async (): Promise<TNews[] | null> => {
  const newsCollection = collection(db, "news");
  const newsSnapshot = await getDocs(newsCollection);
  const newsList = await newsSnapshot.docs.map((doc) => ({
    date: doc.data().date,
    shortDescription: doc.data().shortDescription,
    description: doc.data().description,
    id: doc.id,
    title: doc.data().title,
    photos: doc.data().photos,
  }));

  return newsList;
};

export const addNews = async (news: TNews): Promise<string | null> => {
  const newsData = {
    date: news.date,
    shortDescription: news.shortDescription,
    description: news.description,
    title: news.title,
    photos: news.photos,
  };
  const docRef = await addDoc(collection(db, "news"), newsData);
  return docRef.id;
};

export const editNews = async (news: TNews): Promise<void> => {
  try {
    if (!news.id) {
      throw new Error("News ID is required");
    }
    const docRef = doc(db, "news", news.id);
    await updateDoc(docRef, news);
  } catch (error) {
    console.error(error);
    throw new Error("Error editing news");
  }
};

export const deleteNews = async (newsId: string): Promise<void> => {
  try {
    const docRef = doc(db, "news", newsId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting news");
  }
};
