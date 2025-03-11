import { useEffect, useState } from "react";
import { TNews, TPhoto } from "../../../../services/types";
import {
  useNewsState,
  usePhotosState,
} from "../../../../services/zustand/store";
import { Button, ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Modal } from "../../../../components/modal/modal";
import classNames from "classnames";

import styles from "./form-edit-news.module.scss";
import { Preloader } from "../../../../components/preloader/preloader";

export const FormEditNews = ({
  data,
  onCancel,
}: {
  data: TNews;
  onCancel: () => void;
}) => {
  const { isLoading, editNews } = useNewsState();
  const { photos, loadPhotos } = usePhotosState();
  const [values, setValues] = useState<TNews>({
    title: data.title,
    shortDescription: data.shortDescription,
    description: data.description,
    date: data.date,
    photos: data.photos,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<TPhoto[]>(data.photos);

  useEffect(() => {
    loadPhotos();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editNews({ ...values, id: data.id });
    onCancel();
  };
  const handleOpenPhotos = () => {
    setIsOpen(true);
  };

  const handleBack = () => setIsOpen(false);

  const handlePhotoSelect = (photo: TPhoto) => {
    setSelectedPhotos((prev) => {
      const isAreadySelected = prev.some((p) => p.id === photo.id);
      const updatedPhotos = isAreadySelected
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, photo];

      setValues((prevValues) => ({ ...prevValues, photos: updatedPhotos }));
      return updatedPhotos;
    });
  };

  const inputs = [
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
      buttonText: "Save",
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
        formName="Edit news"
      />
      <div>
        {selectedPhotos.length > 0 && (
          <div className={styles.selectedPhotos}>
            {selectedPhotos.map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.title}
                className={styles.selectedPhotos__photo}
              />
            ))}
          </div>
        )}
      </div>
      {isOpen && (
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
