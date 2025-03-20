import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { TEvent } from "../../../../services/types";
import { db } from "../../../../services/firebase/firebase";

export const fetchEvent = async (): Promise<TEvent | null> => {
  const eventCollection = collection(db, "event");
  const eventSnapshot = await getDocs(eventCollection);
  const eventList = await eventSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    date: doc.data().date,
    conditions: doc.data().conditions,
  }));
  return eventList[0];
};


export const addEvent = async (event: TEvent): Promise<string | null> => {
    const eventData = {
        title: event.title,
        description: event.description,
        date: event.date,
        conditions: event.conditions,
    }
    const docRef = await addDoc(collection(db, "event"), eventData);
    return docRef.id;
};

export const editEvent = async (event: TEvent): Promise<void> => {
    try {
        if (!event.id) {
            throw new Error("Event ID is required");
        }
        const docRef = doc(db, "event", event.id);
        await updateDoc(docRef, event);
    } catch (err) {
        console.error(err);
        throw new Error("Error editing event");
    }
}

export const deleteEvent = async (eventId: string): Promise<void> => {
    try {
        const docRef = doc(db, "event", eventId);
        await deleteDoc(docRef);
    } catch (err) {
        console.error(err);
        throw new Error("Error deleting event");
    }
}