import React from "react";
import styled from "styled-components";
import InputField from "../../Components/InputField";
import { useForm, FormValue } from "../../Hooks/useForm";
import { validNotEmptyInput, capitalize } from "../../util";
import { Btn } from "../../Components/global-styled";

export interface FormField {
  name: string;
  label?: string;
  initialValue?: string;
  validations?: Array<(inputValue: string) => [boolean, string]>;
}

interface Props {
  fields: FormField[];
  submitHandler: (values: FormValue) => void;
}

const Forms = ({ fields, submitHandler }: Props) => {
  const [formInput, setFormInput, errors, setErrors] = useForm(
    fields.reduce(
      (obj, field) => ({
        ...obj,
        [field.name]: field.initialValue || "",
      }),
      {}
    )
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = Object.values(errors).reduce((out, error) => {
      return out || error;
    }, false);
    if (hasError) return;
    submitHandler(formInput);
  };

  return (
    <Container onSubmit={handleSubmit}>
      {fields.map((field) => (
        <InputField
          name={field.name}
          label={field.label || capitalize(field.name)}
          value={formInput[field.name]}
          changeHandler={setFormInput}
          fontSize="20px"
          onBlurValidation={{
            onError: setErrors,
            validations: [...(field.validations || []), validNotEmptyInput],
          }}
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
