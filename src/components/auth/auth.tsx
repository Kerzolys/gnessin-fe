import { useState } from "react";
import { InputProps } from "../input/input";
import { ButtonProps } from "../button/button";
import { Form } from "../form/form";
import { useAuth } from "../../services/zustand/store";
import { registerUser } from "../../services/api/api";

export type AuthProps = {
  isRegister: boolean;
};

export const Auth: React.FC<AuthProps> = ({ isRegister }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      registerUser(values.email, values.password);
    } else {
      login(values.email, values.password);
    }
  };

  const inputs: InputProps[] = [
    {
      placeholder: "email",
      value: values.email,
      onChange: handleChange,
      name: "email",
      type: "email",
    },
    {
      placeholder: "password",
      value: values.password,
      onChange: handleChange,
      name: "password",
      type: "password",
    },
  ];
  const buttons: ButtonProps[] = [
    {
      buttonText: isRegister ? "Register" : "Login",
      type: "submit",
    },
  ];

  return (
    <Form
      inputs={inputs}
      buttons={buttons}
      onSubmit={handleSubmit}
      formName={isRegister ? "Sign up" : "Sign in"}
    />
  );
};
