import { useEffect, useState } from "react";
import { TFestival, TPhoto } from "../../../../services/types";
import {
  useFestivalsState,
  usePhotosState,
} from "../../../../services/zustand/store";
import styles from "./form-add-festival.module.scss";
import { Form } from "../../../../components/form/form";
import { Modal } from "../../../../components/modal/modal";
import classNames from "classnames";
import { InputProps } from "../../../../components/input/input";
import { Button, ButtonProps } from "../../../../components/button/button";

export const FormEditFestival = ({
  data,
  onCancel,
}: {
  data: TFestival;
  onCancel: () => void;
}) => {
  const { isLoading, editFestival } = useFestivalsState();
  const { photos, loadPhotos } = usePhotosState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<TPhoto[]>(data.image);
  const [values, setValues] = useState<TFestival>({
    title: data.title,
    description: data.description,
    composers: data.composers,
    performers: data.performers,
    lectors: data.lectors,
    events: data.events,
    image: data.image,
  });
  useEffect(() => {
    loadPhotos();
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: ["composers", "performers", "lectors", "events"].includes(name)
        ? value.split(",")
        : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editFestival({ ...values, id: data.id });
    onCancel();
  };
  const handleOpenPhotos = () => {
    setIsOpen(true);
  };
  const handleBack = () => setIsOpen(false);

  const handlePhotoSelect = (photo: TPhoto) => {
    setSelectedPhotos((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === photo.id);
      const updatedPhotos = isAlreadySelected
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, photo];

      setValues((prevValues) => ({ ...prevValues, image: updatedPhotos }));
      return updatedPhotos;
    });
  };

  const handleDeleteFromSelected = (photo: TPhoto) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setValues((prevValues) => ({
      ...prevValues,
      image: prevValues.image.filter((p) => p.id !== photo.id),
    }));
  };

  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Festival title",
      value: values.title,
      onChange: handleChange,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Festival description",
      value: values.description,
      onChange: handleChange,
      isTextInput: true,
    },
    {
      name: "composers",
      type: "text",
      placeholder: "Composers (comma-separated)",
      value: values.composers.join(", "),
      onChange: handleChange,
    },
    {
      name: "performers",
      type: "text",
      placeholder: "Performers (comma-separated)",
      value: values.performers.join(", "),
      onChange: handleChange,
    },
    {
      name: "lectors",
      type: "text",
      placeholder: "Lectors (comma-separated)",
      value: values.lectors.join(", "),
      onChange: handleChange,
    },
    {
      name: "events",
      type: "text",
      placeholder: "Events (comma-separated)",
      value: values.events.join(", "),
      onChange: handleChange,
    },
  ];
  const buttons: ButtonProps[] = [
    {
      buttonText: "Выбрать из загруженных фотографий",
      type: "button",
      disabled: isLoading,
      onClick: handleOpenPhotos,
    },
    {
      buttonText: "Save",
      type: "submit",
      disabled: isLoading,
    },
    {
      buttonText: "Cancel",
      type: "button",
      onClick: onCancel,
    },
  ];

  return (
    <>
      <Form
        inputs={inputs}
        buttons={buttons}
        onSubmit={handleSubmit}
        formName="Edit festival"
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
      {isOpen && (
        <Modal onClose={handleBack}>
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
