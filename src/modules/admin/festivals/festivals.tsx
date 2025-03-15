import { useEffect, useState } from "react";
import { useFestivalsState } from "../../../services/zustand/store";
import styles from "./festivals.module.scss";
import { TFestival } from "../../../services/types";
import { useNavigate } from "react-router-dom";
import { Preloader } from "../../../components/preloader/preloader";
import { ModalFestival } from "../../festival/components/modal-festival/modal-festival";
import { Button } from "../../../components/button/button";
import { Modal } from "../../../components/modal/modal";
import { FormAddFestival } from "./components/form-add-festival";
import { FormDeleteFestival } from "./components/form-delete-festival";
import { FormEditFestival } from "./components/form-edit-festival";

export const Festivals = () => {
  const { isLoading, festivals, loadFestivals } = useFestivalsState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"edit" | "add" | "delete" | null>(
    null
  );
  const [selectedFestival, setSelectedFestival] = useState<null | TFestival>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadFestivals();
  }, []);

  const handleBack = () => navigate(-1);
  const handleClose = () => setIsOpen(false);
  const handleOpenAdd = () => {
    setIsOpen(true);
    setOpenType("add");
  };
  const handleOpenEdit = (festival: TFestival) => {
    setSelectedFestival(festival);
    setOpenType("edit");
    setIsOpen(true);
  };
  const handleOpenDelete = (festival: TFestival) => {
    setSelectedFestival(festival);
    setOpenType("delete");
    setIsOpen(true);
  };
  if (isLoading) return <Preloader />;

  return (
    <div className={styles.container}>
      <div className={styles.container__list}></div>
      {festivals.map((f) => {
        return (
          <div className={styles.container__list__item}>
            <ModalFestival data={f} />
            <Button
              buttonText="Edit"
              type="button"
              onClick={() => handleOpenEdit(f)}
            />
            <Button
              buttonText="Delete"
              type="button"
              onClick={() => handleOpenDelete(f)}
            />
          </div>
        );
      })}
      <Button buttonText="Add" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddFestival onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "delete" && selectedFestival && (
        <Modal onClose={handleClose}>
          <FormDeleteFestival data={selectedFestival} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedFestival && (
        <Modal onClose={handleClose}>
          <FormEditFestival data={selectedFestival} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
