import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TContact } from "../../../../services/types";
import { useContactsState } from "../../../../services/zustand/store";

export const FormDeleteContact = ({
  data,
  onCancel,
}: {
  data: TContact;
  onCancel: () => void;
}) => {
  const { isLoading, deleteContact } = useContactsState();
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteContact(data.id);
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
