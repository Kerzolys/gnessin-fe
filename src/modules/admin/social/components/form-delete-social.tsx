import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TSocial } from "../../../../services/types";
import { useSocialState } from "../../../../services/zustand/store";

export const FormDeleteSocial = ({
  data,
  onCancel,
}: {
  data: TSocial;
  onCancel: () => void;
}) => {
  const { isLoading, deleteSocial } = useSocialState();
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteSocial(data.id);
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
      onClick: () => onCancel(),
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
