import { ButtonProps } from "../../../../components/button/button";
import { Form } from "../../../../components/form/form";
import { InputProps } from "../../../../components/input/input";
import { Preloader } from "../../../../components/preloader/preloader";
import { TNews } from "../../../../services/types";
import { useNewsState } from "../../../../services/zustand/store";

export const FormDeleteNews = ({
  onCancel,
  data,
}: {
  data: TNews;
  onCancel: () => void;
}) => {
  const { isLoading, deleteNews } = useNewsState();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (data.id) await deleteNews(data.id);
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
      }
    ]
    if(isLoading) return <Preloader />
    return <Form inputs={inputs} buttons={buttons} onSubmit={handleSubmit} formName="Вы уверены?"/>
};
