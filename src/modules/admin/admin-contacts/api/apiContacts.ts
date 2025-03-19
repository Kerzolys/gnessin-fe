import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TContact } from "../../../../services/types";
import { db } from "../../../../services/firebase/firebase";

export const fetchContacts = async (): Promise<TContact[] | null> => {
  const contactsCollection = collection(db, "contacts");
  const contactsSnapshot = await getDocs(contactsCollection);
  const contactsList = await contactsSnapshot.docs.map((doc) => ({
    id: doc.id,
    person: doc.data().person,
    email: doc.data().email,
    messenger: doc.data().messenger,
  }));
  return contactsList;
};

export const addContact = async (contact: TContact): Promise<string | null> => {
  const contactData = {
    person: contact.person,
    email: contact.email,
    messenger: contact.messenger,
  };
  const docRef = await addDoc(collection(db, "contacts"), contactData);
  return docRef.id;
};

export const editContact = async (contact: TContact): Promise<void> => {
  try {
    if (!contact.id) {
      throw new Error("Contact ID is required");
    }
    const docRef = doc(db, "contacts", contact.id);
    await updateDoc(docRef, contact);
  } catch (error) {
    console.error(error);
    throw new Error("Error editing contact");
  }
};

export const deleteContact = async (contactId: string): Promise<void> => {
  try {
    const docRef = doc(db, "contacts", contactId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting contact");
  }
};
