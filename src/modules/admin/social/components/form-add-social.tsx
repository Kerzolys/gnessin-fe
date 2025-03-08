import { useState } from "react";
import { TSocial } from "../../../../services/types";
import { useSocialState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Preloader } from "../../../../components/preloader/preloader";

export const FormAddSocial = ({ onCancel }: { onCancel: () => void }) => {
  const { addSocial, isLoading } = useSocialState();
  const [values, setValues] = useState<Omit<TSocial, "image">>({
    name: "",
    url: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    addSocial({ ...values, file } as TSocial & { file: File });
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
      formName="Add Social Media"
    />
  );
};
