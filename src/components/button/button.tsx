import styles from "./button.module.scss";

export type ButonProps = {
  buttonText: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
  extraClassname?: string;
  children?: React.ReactNode
};

export const Button: React.FC<ButonProps> = ({
  buttonText,
  type = "button",
  disabled,
  onClick,
  extraClassname,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${extraClassname || ""}`}
    >
      {buttonText}
    </button>
  );
};
