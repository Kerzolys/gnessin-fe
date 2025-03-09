import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TPhoto } from "../../../../services/types";
import { usePhotosState } from "../../../../services/zustand/store";

export const FormDeletePhoto = ({
  data,
  onCancel,
}: {
  data: TPhoto;
  onCancel: () => void;
}) => {
  const { isLoading, deletePhoto } = usePhotosState();
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deletePhoto(data.id);

    onCancel();
  };
  const inputs: InputProps[] = [];
  const buttons: ButtonProps[] = [
    {
      buttonText: "Delete",
      type: "submit",
    },
    {
      buttonText: "Cancel",
      type: "button",
      onClick: () => onCancel(),
    },
  ];
  if (isLoading) return <Preloader />;

  return (
    <Form
      inputs={inputs}
      buttons={buttons}
      onSubmit={handleSubmit}
      formName="Вы уверены?"
    />
  );
};
