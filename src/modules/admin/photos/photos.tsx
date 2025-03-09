import { useEffect, useState } from "react";
import styles from "./photos.module.scss";
import { usePhotosState } from "../../../services/zustand/store";
import { Preloader } from "../../../components/preloader/preloader";
import { Button } from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { TPhoto } from "../../../services/types";
import { Modal } from "../../../components/modal/modal";
import { FormAddPhoto } from "./components/form-add-photo";
import { FormDeletePhoto } from "./components/form-delete-photo";

export const Photos = () => {
  const { loadPhotos, isLoading, photos } = usePhotosState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpentType] = useState<"add" | "delete" | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<null | TPhoto>(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadPhotos();
  }, []);
  const handleBack = () => navigate(-1);
  const handleOpenAdd = () => {
    setIsOpen(true);
    setOpentType("add");
  };
  const handleOpenDelete = (photo: TPhoto) => {
    setIsOpen(true);
    setOpentType("delete");
    setSelectedPhoto(photo);
  };

  if (isLoading) return <Preloader />;

  const handleClose = () => setIsOpen(false);
  return (
    <div className={styles.container}>
      <div className={styles.container__photosList}>
        {photos.map((photo) => (
          <div className={styles.container__photosList__photo}>
            <img key={photo.id} src={photo.src} alt={photo.title} />
            <Button
              buttonText="Delete"
              type="button"
              onClick={() => handleOpenDelete(photo)}
            />
          </div>
        ))}
      </div>
      <Button buttonText="Add photo" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <div>
          <Modal onClose={handleClose}>
            <FormAddPhoto onCancel={handleClose} />
          </Modal>
        </div>
      )}
      {isOpen && openType === "delete" && selectedPhoto && (
        <Modal onClose={handleClose}>
          <FormDeletePhoto data={selectedPhoto} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
