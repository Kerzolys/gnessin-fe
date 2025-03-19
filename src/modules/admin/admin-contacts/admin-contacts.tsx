import { useEffect, useState } from "react";
import { useContactsState } from "../../../services/zustand/store";
import { TContact } from "../../../services/types";
import { Preloader } from "../../../components/preloader/preloader";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button/button";
import { Modal } from "../../../components/modal/modal";
import { FormAddContacts } from "./components/form-add-contacts";
import { FormDeleteContact } from "./components/form-delete-contact";
import { FormEditContacts } from "./components/form-edit-contacts";

import styles from "./admin-contacts.module.scss";

export const AdminContacts = () => {
  const { isLoading, contacts, loadContacts } = useContactsState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedContact, setSelectedContact] = useState<null | TContact>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  const handleOpenAdd = () => {
    setIsOpen(true);
    setOpenType("add");
  };
  const handleOpenEdit = (contact: TContact) => {
    setIsOpen(true);
    setOpenType("edit");
    setSelectedContact(contact);
  };
  const handleOpenDelete = (contact: TContact) => {
    setIsOpen(true);
    setOpenType("delete");
    setSelectedContact(contact);
  };
  const handleClose = () => setIsOpen(false);
  const handleBack = () => navigate(-1);
  if (isLoading) return <Preloader />;

  return (
    <div className={styles.container}>
      <div className={styles.container__list}></div>
      {contacts.map((contact) => {
        return (
          <div key={contact.id} className={styles.container__list__item}>
            <h2>{contact.person}</h2>
            <p>{contact.messenger}</p>
            <p>{contact.email}</p>
            <Button
              buttonText="Edit"
              type="button"
              onClick={() => handleOpenEdit(contact)}
            />
            <Button
              buttonText="Delete"
              type="button"
              onClick={() => handleOpenDelete(contact)}
            />
          </div>
        );
      })}
      <Button buttonText="Add" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddContacts onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "delete" && selectedContact && (
        <Modal onClose={handleClose}>
          <FormDeleteContact data={selectedContact} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedContact && (
        <Modal onClose={handleClose}>
          <FormEditContacts data={selectedContact} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
