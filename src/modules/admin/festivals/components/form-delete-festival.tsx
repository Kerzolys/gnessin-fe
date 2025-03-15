import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TFestival } from "../../../../services/types";
import { useFestivalsState } from "../../../../services/zustand/store";

export const FormDeleteFestival = ({
  data,
  onCancel,
}: {
  data: TFestival;
  onCancel: () => void;
}) => {
  const { isLoading, deleteFestival } = useFestivalsState();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteFestival(data.id);
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
