import React from "react";
import styled from "styled-components";
import InputField, { FormField } from "../../Components/InputField";
import { useForm, FormValue } from "../../Hooks/useForm";
import { Btn } from "../../Components/global-styled";

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

  interface refi {
    wtf: () => void;
  }

  const refs = React.useRef<React.RefObject<refi>[]>([]);

  React.useEffect(() => {
    refs.current.length = fields.length;
    refs.current.fill({ current: null });
  }, [fields.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (refs.current) refs.current[0].current?.wtf();
    const hasError = Object.values(errors).reduce((out, error) => {
      return out || error;
    }, false);
    if (hasError) return;
    submitHandler(formInput);
  };

  return (
    <Container onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <InputField
          field={field}
          value={formInput[field.name]}
          changeHandler={setFormInput}
          fontSize="20px"
          onError={setErrors}
          ref={refs.current[i]}
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
