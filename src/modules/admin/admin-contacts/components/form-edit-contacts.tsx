import { useState } from "react";
import { TContact } from "../../../../services/types";
import { useContactsState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Preloader } from "../../../../components/preloader/preloader";
import { Form } from "../../../../components/form/form";

export const FormEditContacts = ({
  data,
  onCancel,
}: {
  data: TContact;
  onCancel: () => void;
}) => {
  const { isLoading, editContact } = useContactsState();
  const [values, setValues] = useState<TContact>({
    person: data.person,
    messenger: data.messenger,
    email: data.email,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editContact({ ...values, id: data.id });
    onCancel();
  };
  const inputs: InputProps[] = [
    {
      name: "person",
      type: "text",
      placeholder: "Person",
      value: values.person,
      onChange: handleChange,
    },
    {
      name: "messenger",
      type: "text",
      placeholder: "Messenger",
      value: values.messenger,
      onChange: handleChange,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: values.email,
      onChange: handleChange,
    },
  ];
  const buttons: ButtonProps[] = [
    {
      buttonText: "Save",
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
      formName="Edit contact"
    />
  );
};
