import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../services/firebase/firebase";
import { TFestival } from "../../../../services/types";

export const fetchFestivals = async (): Promise<TFestival[] | null> => {
  const festivalsCollection = collection(db, "festivals");
  const festivalsSnapshot = await getDocs(festivalsCollection);
  const festivalsList = await festivalsSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    composers: doc.data().composers,
    performers: doc.data().performers,
    lectors: doc.data().lectors,
    events: doc.data().events,
    image: doc.data().image,
  }));
  return festivalsList;
};

export const addFestival = async (
  festival: TFestival
): Promise<string | null> => {
  const festivalData = {
    title: festival.title,
    description: festival.description,
    composers: festival.composers,
    performers: festival.performers,
    lectors: festival.lectors,
    events: festival.events,
    image: festival.image,
  };
  const docRef = await addDoc(collection(db, "festivals"), festivalData);
  return docRef.id;
};

export const editFestival = async (festival: TFestival): Promise<void> => {
  try {
    if (!festival.id) {
      throw new Error("Festival ID is required");
    }
    const docRef = doc(db, "festivals", festival.id);
    await updateDoc(docRef, festival);
  } catch (err) {
    console.error(err);
    throw new Error("Error editing festival");
  }
};

export const deleteFestival = async (festivalId: string): Promise<void> => {
  try {
    const docRef = doc(db, "festivals", festivalId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting festival");
  }
};
