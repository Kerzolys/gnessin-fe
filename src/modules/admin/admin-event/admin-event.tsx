import { useEffect, useState } from "react";
import { useEventState } from "../../../services/zustand/store";
import { TEvent } from "../../../services/types";
import { Preloader } from "../../../components/preloader/preloader";

import styles from "./event.module.scss";
import { Button } from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modal/modal";
import { FormAddEvent } from "./components/form-add-event";
import { FormDeleteEvent } from "./components/form-delete-event";
import { FormEditEvent } from "./components/form-edit-event";

export const AdminEvent = () => {
  const { isLoading, event, loadEvent } = useEventState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<null | TEvent>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvent();
  }, []);

  const handleOpenAdd = () => {
    setIsOpen(true);
    setOpenType("add");
  };
  const handleOpenEdit = (event: TEvent) => {
    setIsOpen(true);
    setOpenType("edit");
    setSelectedEvent(event);
  };
  const handleOpenDelete = (event: TEvent) => {
    setIsOpen(true);
    setOpenType("delete");
    setSelectedEvent(event);
  };

  const handleBack = () => navigate(-1);
  const handleClose = () => setIsOpen(false);

  if (isLoading) return <Preloader />;

  return (
    <div className={styles.container}>
      <div className={styles.container__list}></div>
      {event && (
        <div className={styles.container__event}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>{event.conditions}</p>
          <Button
            buttonText="Edit"
            type="button"
            onClick={() => handleOpenEdit(event)}
          />
          <Button
            buttonText="Delete"
            type="button"
            onClick={() => handleOpenDelete(event)}
          />
        </div>
      )}
      <Button buttonText="Add" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddEvent onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "delete" && selectedEvent && (
        <Modal onClose={handleClose}>
          <FormDeleteEvent data={selectedEvent} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedEvent && (
        <Modal onClose={handleClose}>
          <FormEditEvent data={selectedEvent} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
