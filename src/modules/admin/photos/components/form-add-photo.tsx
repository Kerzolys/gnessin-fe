import { useState } from "react";
import { TPhoto } from "../../../../services/types";
import { usePhotosState } from "../../../../services/zustand/store";
import { InputProps } from "../../../../components/input/input";
import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { Preloader } from "../../../../components/preloader/preloader";

export const FormAddPhoto = ({ onCancel }: { onCancel: () => void }) => {
  const { addPhoto, isLoading } = usePhotosState();
  const [values, setValues] = useState<Omit<TPhoto, "src">>({
    title: "",
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
    if (!file) {
      alert("Please select a file");
      return;
    }
    await addPhoto({ ...values, file } as TPhoto & { file: File });
    
    onCancel();
  };
  const inputs: InputProps[] = [
    {
      name: "title",
      type: "text",
      placeholder: "Photo title",
      value: values.title,
      onChange: handleChange,
    },
    {
      name: "file",
      type: "file",
      placeholder: "Select a photo",
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
      formName="Add photo"
    />
  );
};
