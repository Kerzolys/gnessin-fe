import styles from './input.module.scss'

export type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  extraClassname?: string;
  disabled?: boolean;
  name: string;
};

export const Input: React.FC<InputProps> = ({
    value,
    placeholder,
    onChange,
    type = "text",
    extraClassname,
    disabled,
    name,
  }) => {
    return (
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
  }
