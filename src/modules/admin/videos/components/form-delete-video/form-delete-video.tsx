import { ButtonProps } from "../../../../../components/button/button";
import { Form } from "../../../../../components/form/form";
import { InputProps } from "../../../../../components/input/input";
import { Preloader } from "../../../../../components/preloader/preloader";
import { TVideo } from "../../../../../services/types";
import { useVideosState } from "../../../../../services/zustand/store";

export const FormDeleteVideo = ({
  data,
  onCancel,
}: {
  data: TVideo;
  onCancel: () => void;
}) => {
  const { isLoading, deleteVideo } = useVideosState();
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteVideo(data.id);
    onCancel();
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
    <>
      <Form inputs={inputs} buttons={buttons} onSubmit={handleSubmit} formName="Вы уверены?" />
    </>
  );
};
