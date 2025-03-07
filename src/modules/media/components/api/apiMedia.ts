import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TVideo } from "../../../../services/types";
import { db } from "../../../../services/firebase/firebase";

export const fetchVideos = async (): Promise<TVideo[] | null> => {
  const videosCollection = collection(db, "videos");
  const videosSnapshot = await getDocs(videosCollection);
  const videosList = await videosSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    videoSrc: doc.data().videoSrc,
  }));

  return videosList;
};

export const editVideo = async (video: TVideo) => {
  try {
    if (!video.id) {
      throw new Error("Video ID is required");
    }
    const docRef = doc(db, "videos", video.id);
    await updateDoc(docRef, { ...video });
  } catch (err) {
    console.error(err);
    throw new Error("Error editing video");
  }
};

export const addVideo = async (video: TVideo) => {
  const docRef = await addDoc(collection(db, "videos"), {
    title: video.title,
    videoSrc: video.videoSrc,
  });
  return docRef.id;
};

export const deleteVideo = async (videoId: string) => {
  try {
    const docRef = doc(db, "videos", videoId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting video");
  }
};
