import { useState } from "react";
import { TFestival, TPhoto } from "../../../../services/types";
import styles from "./modal-festival.module.scss";
import { Modal } from "../../../../components/modal/modal";

export const ModalFestival = ({ data }: { data: TFestival }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<TPhoto | null>(null);

  const handleOpen = (photo: TPhoto) => {
    setIsOpen(true);
    setSelectedPhoto(photo);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedPhoto(null);
  };
  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <h3>Композиторы:</h3>
      <p>{data.composers.join(", ")}</p>
      <h3>Исполнители:</h3>
      <p>{data.performers.join(", ")}</p>
      <h3>Лекторы:</h3>
      <p>{data.lectors.join(", ")}</p>
      <h3>Мероприятия:</h3>
      <p>
        {data.events.map((event: string) => {
          return <p>{event}</p>;
        })}
      </p>
      {data.image.map((image) => {
        return (
          <img
            className={styles.container__image}
            src={image.src}
            alt="Festival image"
            onClick={() => handleOpen(image)}
          />
        );
      })}
      {isOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container__modal}>
            <img
              className={styles.container__image_modal}
              src={selectedPhoto?.src}
              alt="Festival image"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
