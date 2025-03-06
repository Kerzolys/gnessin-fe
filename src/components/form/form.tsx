import { Button, ButtonProps } from "../button/button";
import { Input, InputProps } from "../input/input";

import styles from "./form.module.scss";

type FormProps = {
  inputs: InputProps[];
  buttons: ButtonProps[];
  onSubmit: (data: React.FormEvent) => void;
  extraClassname?: string;
};

export const Form: React.FC<FormProps> = ({
  inputs,
  buttons,
  onSubmit,
  extraClassname,
}) => {
  return (
    <form
      className={`${styles.form} ${extraClassname || ""}`}
      onSubmit={onSubmit}
    >
      {inputs.map((input) => (
        <Input key={input.name} {...input} />
      ))}
      {buttons.map((button) => (
        <Button key={button.buttonText} {...button} />
      ))}
    </form>
  );
};
