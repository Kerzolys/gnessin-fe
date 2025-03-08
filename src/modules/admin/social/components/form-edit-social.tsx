import { useState } from "react";
import { TSocial } from "../../../../services/types";
import { useSocialState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Preloader } from "../../../../components/preloader/preloader";

export const FormEditSocial = ({
  data,
  onCancel,
}: {
  data: TSocial;
  onCancel: () => void;
}) => {
  const { editSocial, isLoading } = useSocialState();
  const [values, setValues] = useState<Omit<TSocial, "image">>({
    name: data.name,
    url: data.url,
  });
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const socialWithFile = { ...data, ...values, file };
    await editSocial(socialWithFile);
    onCancel();
  };

  const inputs: InputProps[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Social network name",
      value: values.name,
      onChange: handleChange,
    },
    {
      name: "url",
      type: "url",
      placeholder: "Social network URL",
      value: values.url,
      onChange: handleChange,
    },
    {
      name: "image",
      type: "file",
      placeholder: "Social network image URL",
      onChange: handleFileChange,
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
      formName="Edit Social"
    />
  );
};
