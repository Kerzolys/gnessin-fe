import { useEffect, useState } from "react";
import { TNews, TPhoto } from "../../../../services/types";
import {
  useNewsState,
  usePhotosState,
} from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { Button, ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Modal } from "../../../../components/modal/modal";
import { Preloader } from "../../../../components/preloader/preloader";

import styles from "./form-add-news.module.scss";
import classNames from "classnames";

export const FormAddNews = ({ onCancel }: { onCancel: () => void }) => {
  const { isLoading, addNews } = useNewsState();
  const { photos, loadPhotos } = usePhotosState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, setValues] = useState<TNews>({
    title: "",
    shortDescription: "",
    description: "",
    date: "",
    photos: [],
  });
  const [selectedPhotos, setSelectedPhotos] = useState<TPhoto[]>([]);

  useEffect(() => {
    loadPhotos();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOpenPhotos = () => {
    setIsOpen(true);
  };

  const handlePhotoSelect = (photo: TPhoto) => {
    setValues({ ...values, photos: [...values.photos, photo] });
    setSelectedPhotos((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === photo.id);
      return isAlreadySelected
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, photo];
    });
  };

  const handleDeleteFromSelected = (photo: TPhoto) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setValues((prevValues) => ({
      ...prevValues,
      photos: prevValues.photos.filter((p) => p.id !== photo.id),
    }));
  };

  const handleBack = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNews({ ...values });
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "News title",
      value: values.title,
      onChange: handleChange,
    },
    {
      name: "shortDescription",
      type: "text",
      placeholder: "Short description",
      value: values.shortDescription,
      onChange: handleChange,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Description",
      value: values.description,
      onChange: handleChange,
      isTextInput: true,
    },
    {
      name: "date",
      type: "text",
      placeholder: "Date",
      value: values.date,
      onChange: handleChange,
    },
  ];

  const buttons: ButtonProps[] = [
    {
      buttonText: "Выбрать фото из загруженных",
      type: "button",
      onClick: handleOpenPhotos,
    },
    {
      buttonText: "Add",
      type: "submit",
    },
    {
      buttonText: "Cancel",
      type: "button",
      onClick: onCancel,
    },
  ];
  if (isLoading) return <Preloader />;
  return (
    <>
      <Form
        inputs={inputs}
        buttons={buttons}
        onSubmit={handleSubmit}
        formName="Add news"
      />
  <div>
        {selectedPhotos.length > 0 && (
          <div className={styles.selectedPhotos}>
            {selectedPhotos.map((photo) => (
              <div className={styles.selectedPhotos__container}>
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.title}
                className={styles.selectedPhotos__photo}
                />
              <Button
              buttonText="&times;"
              onClick={() => handleDeleteFromSelected(photo)}
              type="button"
              extraClassname={styles.selectedPhotos__photo__button}
              />
              </div>
            ))}
            
          </div>
        )}
      </div>
      {isOpen && photos && photos.length > 0 && (
        <Modal onClose={onCancel}>
          <div className={styles.container}>
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.title}
                onClick={() => handlePhotoSelect(photo)}
                className={classNames(styles.container__photo, {
                  [styles.container__photo_selected]: selectedPhotos.some(
                    (p) => p.id === photo.id
                  ),
                })}
              />
            ))}
            <Button buttonText="Back" onClick={handleBack} type="button" />
          </div>
        </Modal>
      )}
    </>
  );
};
