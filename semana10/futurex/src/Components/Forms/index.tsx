import React from "react";
import styled from "styled-components";
import InputField, { FormField } from "../../Components/InputField";
import { useForm } from "../../Hooks/useForm";
import { Btn } from "../../Components/global-styled";
import { validNotEmptyInput, capitalize } from "../../util";

interface Props {
  fields: FormField[];
  submitHandler: (values: string[]) => void;
}

const Forms = ({ fields, submitHandler }: Props) => {
  const [formInput, setFormInput, errors, setErrors] = useForm(
    fields.map((field) => (field.initialValue ? field.initialValue : ""))
  );

  const labels = React.useMemo(() => {
    const arr: string[] = [];
    arr.length = fields.length;
    fields.forEach((field, i) => {
      arr[i] = field.label || capitalize(field.name);
    });
    return arr;
  }, [fields]);

  const checkForErrors = React.useCallback(
    (index: number) => (label: string) => {
      const fieldValidations = fields[index].validations;
      let errArray: string[] = [];
      if (fieldValidations) {
        fieldValidations.forEach((validation) => {
          const [valid, errorMsg] = validation(formInput[index]);
          if (!valid) errArray.push(label + " " + errorMsg);
        });
      }

      if (true) {
        const [valid, errorMsg] = validNotEmptyInput(formInput[index]);
        if (!valid) errArray.push(label + " " + errorMsg);
      }
      return setErrors(index, errArray);
    },
    [fields, formInput, setErrors]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasError = false;
    for (let i = 0; i < fields.length; i++) {
      const nErrors = checkForErrors(i)(labels[i]);
      console.log(i + " " + nErrors);
      hasError = hasError || nErrors > 0;
    }
    if (hasError) return;
    submitHandler(formInput);
  };

  return (
    <Container onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <InputField
          field={field}
          value={formInput[i]}
          changeHandler={setFormInput(i)}
          fontSize="20px"
          errors={errors[i]}
          checkForErrors={checkForErrors(i)}
          label={labels[i]}
        />
      ))}
      <Btn as="button" type="submit">
        Enviar
      </Btn>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default Forms;
