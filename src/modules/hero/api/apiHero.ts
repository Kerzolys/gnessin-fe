import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { THeroEvent } from "../../../services/types";

export const fetchHeroEvent = async (): Promise<THeroEvent | null> => {
  const querySnapshot = await getDocs(collection(db, "heroEvent"));
  const heroEvent = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as THeroEvent),
  }))[0];

  return heroEvent;
};

export const editHeroEvent = async (id: string, updateData: THeroEvent) => {
  console.log(id, updateData);
  const docRef = doc(db, "heroEvent", id);
  await updateDoc(docRef, updateData);
};
