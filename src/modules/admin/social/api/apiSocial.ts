import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../../services/firebase/firebase";
import { TSocial } from "../../../../services/types";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const fetchSocial = async (): Promise<TSocial[] | null> => {
  const socialCollection = collection(db, "social");
  const socialSnapshot = await getDocs(socialCollection);
  const socialList = await socialSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    url: doc.data().url,
    image: doc.data().image,
  }));

  return socialList;
};

const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `social-icons/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const addSocial = async (social: {
  name: string;
  url: string;
  file?: File;
}) => {
  const imageUrl = social.file ? await uploadImage(social.file) : "";
  const docRef = await addDoc(collection(db, "social"), {
    name: social.name,
    url: social.url,
    image: imageUrl,
  });

  return docRef.id;
};

export const editSocial = async (social: TSocial, newFile?: File) => {
  try {
    if (!social.id) {
      throw new Error("Social ID is required");
    }
    const docRef = doc(db, "social", social.id);
    if (newFile) {
      const oldDoc = await getDoc(docRef);
      const oldImage = oldDoc.data()?.image;

      if (oldImage) {
        const oldImageRef = ref(storage, oldImage);
        await deleteObject(oldImageRef);
      }

      const storageRef = ref(storage, `social-icons/${newFile.name}`);
      await uploadBytes(storageRef, newFile);
      const newImageUrl = await getDownloadURL(storageRef);

      await updateDoc(docRef, { ...social, image: newImageUrl });
    } else {
      await updateDoc(docRef, social);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Error editing social media");
  }
};

export const deleteSocial = async (socialId: string) => {
  try {
    const docRef = doc(db, "social", socialId);
    const docSnapshot = await getDoc(docRef);
    const imageUrl = docSnapshot.data()?.image;

    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    await deleteDoc(docRef);
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting social");
  }
};
