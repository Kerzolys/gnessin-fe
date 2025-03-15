import { useState } from "react";
import { ButtonProps } from "../../../../../components/button/button";
import { Form } from "../../../../../components/form/form";
import { InputProps } from "../../../../../components/input/input";
import { Preloader } from "../../../../../components/preloader/preloader";
import { THeroEvent } from "../../../../../services/types";
import { useHeroEvent } from "../../../../../services/zustand/store";

export const FormEditEvent = ({
  data,
  onCancel,
}: {
  data: THeroEvent;
  onCancel: () => void;
}) => {
  const [values, setValues] = useState<THeroEvent>({
    title: data.title,
    date: data.date,
  });
  const { isLoading, editHeroEvent } = useHeroEvent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editHeroEvent({ ...values, id: data.id });
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
      onChange: handleChange,
      value: values.title,
    },
    {
      name: "date",
      type: "text",
      placeholder: "data",
      onChange: handleChange,
      value: values.date,
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
      onClick: onCancel,
    },
  ];

  if (isLoading) return <Preloader />;

  return <Form inputs={inputs} buttons={buttons} onSubmit={handleSubmit} formName="Edit event" />;
};
