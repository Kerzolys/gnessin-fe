import { useState } from "react";
import { TVideo } from "../../../../../services/types";
import { useVideosState } from "../../../../../services/zustand/store";
import { InputProps } from "../../../../../components/input/input";
import { ButtonProps } from "../../../../../components/button/button";
import { Form } from "../../../../../components/form/form";
import { Preloader } from "../../../../../components/preloader/preloader";

export const FormAddVideo = ({ onCancel }: { onCancel: () => void }) => {
  const { isLoading, addVideo } = useVideosState();
  const [values, setValues] = useState<TVideo>({
    title: "",
    videoSrc: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addVideo(values);
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      placeholder: "Video title",
      value: values.title,
      onChange: handleChange,
      name: "title",
    },
    {
      placeholder: "Video URL",
      value: values.videoSrc,
      onChange: handleChange,
      name: "videoSrc",
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

  return <Form inputs={inputs} buttons={buttons} onSubmit={handleSubmit} formName="Add video" />;
};
