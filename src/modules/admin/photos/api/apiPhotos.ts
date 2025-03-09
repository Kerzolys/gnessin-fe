import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../../../services/firebase/firebase";
import { TPhoto } from "../../../../services/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const uploadPhoto = async (file: File) => {
  const storageRef = ref(storage, `photos/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const fetchPhotos = async (): Promise<TPhoto[] | null> => {
  const photosCollection = collection(db, "photos");
  const photosSnapshot = await getDocs(photosCollection);
  const photosList = await photosSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    src: doc.data().src,
  }));
  return photosList;
};

export const addPhoto = async (photo: {
  title: string;
  src: string;
  file?: File;
}) => {
  const imageUrl = photo.file ? await uploadPhoto(photo.file) : "";
  const docRef = await addDoc(collection(db, "photos"), {
    title: photo.title,
    src: imageUrl,
  });

  return docRef.id;
};

export const deletePhoto = async (photoId: string) => {
  try {
    const docRef = doc(db, "photos", photoId);
    const docSnapshot = await getDoc(docRef);
    const imageUrl = docSnapshot.data()?.src;
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    await deleteDoc(docRef);
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting photo");
  }
};
