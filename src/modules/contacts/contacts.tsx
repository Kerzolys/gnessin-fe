import { useEffect } from "react";
import { useContactsState } from "../../services/zustand/store";
import { Line } from "../../components/line/line";

import styles from "./contacts.module.scss";
import { ContactItem } from "./components/contact-item";
import { Preloader } from "../../components/preloader/preloader";

export const Contacts = () => {
  const { isLoading, loadContacts, contacts } = useContactsState();

  useEffect(() => {
    loadContacts();
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.container}>
      <Line isForward />
      <div className={styles.container__contactsList}>
        {contacts.map((contact) => {
          return <ContactItem data={contact} />;
        })}
      </div>
      <Line isForward={false} />
    </div>
  );
};
