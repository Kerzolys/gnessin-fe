import { useState } from "react";
import { TContact } from "../../../../services/types";
import { useContactsState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Preloader } from "../../../../components/preloader/preloader";

export const FormAddContacts = ({ onCancel }: { onCancel: () => void }) => {
  const { isLoading, addContact } = useContactsState();
  const [values, setValues] = useState<TContact>({
    person: "",
    messenger: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact(values);
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      name: "person",
      type: "text",
      placeholder: "Person's name",
      value: values.person,
      onChange: handleChange,
    },
    {
      name: "messenger",
      type: "text",
      placeholder: "Messenger handle",
      value: values.messenger,
      onChange: handleChange,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      value: values.email,
      onChange: handleChange,
    },
  ];

  const buttons: ButtonProps[] = [
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
    <Form
      inputs={inputs}
      buttons={buttons}
      onSubmit={handleSubmit}
      formName="Add contact"
    />
  );
};
