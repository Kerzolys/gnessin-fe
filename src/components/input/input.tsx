import styles from "./input.module.scss";

export type InputProps = {
  value?: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  extraClassname?: string;
  disabled?: boolean;
  name: string;
  isTextInput?: boolean;
  maxLength?: number;
};

export const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  type = "text",
  extraClassname,
  disabled,
  name,
  isTextInput = false,
  maxLength,
}) => {
  return isTextInput ? (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${styles.textarea} ${extraClassname}`}
      disabled={disabled}
      name={name}
      maxLength={maxLength}
    />
  ) : (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${styles.input} ${extraClassname}`}
      disabled={disabled}
      name={name}
    />
  );
};
