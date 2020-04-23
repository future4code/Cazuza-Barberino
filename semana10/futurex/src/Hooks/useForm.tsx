import { useState } from "react";

export interface FormValue {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: boolean;
}

export const useForm = (
  initialValues: FormValue
): [
  FormValue,
  (e: any) => void,
  FormErrors,
  (name: string, error: boolean) => void
] => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    (Object.keys(initialValues) as Array<keyof typeof initialValues>).reduce(
      (obj, key) => ({
        ...obj,
        [key]: true,
      }),
      {}
    )
  );

  return [
    values,
    (e: any) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    errors,
    (name: string, error: boolean) => {
      setErrors({
        ...errors,
        [name]: error,
      });
    },
  ];
};
