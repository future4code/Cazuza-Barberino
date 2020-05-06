import { useState, useCallback } from "react";

export const useForm = (
  initialValues: string[]
): [
  Array<string>,
  (index: number) => (value: string) => void,
  Array<Array<string>>,
  (index: number, errors: Array<string>) => number
] => {
  const [values, setValues] = useState<Array<string>>(initialValues);

  const [errors, setErrors] = useState<Array<Array<string>>>(() => {
    const arr: Array<Array<string>> = [];
    arr.length = values.length;
    arr.fill([]);
    return arr;
  });

  const copyArrayWithNewVal = useCallback(
    <T,>(oldArray: Array<T>, index: number, val: T) => {
      const newArray = [...oldArray];
      newArray[index] = val;
      return newArray;
    },
    []
  );

  return [
    values,
    (index: number) => (value: string) => {
      setValues((vals) => copyArrayWithNewVal(vals, index, value));
    },
    errors,
    (index: number, error: Array<string>) => {
      setErrors((errs) => copyArrayWithNewVal(errs, index, error));

      let count = 0;
      error.forEach(() => {
        count++;
      });
      return count;
    },
  ];
};
