import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TEvent } from "../../../../services/types";
import { useEventState } from "../../../../services/zustand/store";

export const FormDeleteEvent = ({
  data,
  onCancel,
}: {
  data: TEvent;
  onCancel: () => void;
}) => {
  const { isLoading, deleteEvent } = useEventState();
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteEvent(data.id);
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
      onClick: onCancel,
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
