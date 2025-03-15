import { useState } from "react";
import { ButtonProps } from "../../../../../components/button/button";
import { Form } from "../../../../../components/form/form";
import { InputProps } from "../../../../../components/input/input";
import { Preloader } from "../../../../../components/preloader/preloader";
import { TVideo } from "../../../../../services/types";
import { useVideosState } from "../../../../../services/zustand/store";

export const FormEditVideo = ({
  data,
  onCancel,
}: {
  data: TVideo;
  onCancel: () => void;
}) => {
  const { isLoading, editVideo } = useVideosState();
  const [values, setValues] = useState<TVideo>({
    id: data.id,
    title: data.title,
    videoSrc: data.videoSrc,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editVideo(values);
    onCancel();
  };
  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Video title",
      onChange: handleChange,
      value: values.title,
    },
    {
      name: "videoSrc",
      type: "text",
      placeholder: "Video source URL",
      onChange: handleChange,
      value: values.videoSrc,
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
  return (
    <Form
      inputs={inputs}
      buttons={buttons}
      onSubmit={handleSubmit}
      formName="Edit video"
    />
  );
};
