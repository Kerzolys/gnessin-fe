import { useState } from "react";
import { TEvent } from "../../../../services/types";
import { useEventState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Preloader } from "../../../../components/preloader/preloader";
import { Form } from "../../../../components/form/form";

export const FormAddEvent = ({ onCancel }: { onCancel: () => void }) => {
  const { isLoading, addEvent } = useEventState();
  const [values, setValues] = useState<TEvent>({
    title: "",
    description: "",
    date: "",
    conditions: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(values);
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Event title",
      value: values.title,
      onChange: handleChange,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Event description",
      value: values.description,
      onChange: handleChange,
      isTextInput: true,
    },
    {
      name: "date",
      type: "text",
      placeholder: "Event date",
      value: values.date,
      onChange: handleChange,
    },
    {
      name: "conditions",
      type: "text",
      placeholder: "Event conditions",
      value: values.conditions,
      onChange: handleChange,
      isTextInput: true,
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

  if(isLoading) return <Preloader />

  return <Form inputs={inputs} buttons={buttons} onSubmit={handleSubmit} formName="Add event" />
};
