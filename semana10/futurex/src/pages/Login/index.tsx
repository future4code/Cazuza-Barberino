import React from "react";
import styled from "styled-components";
import InputField from "../../Components/InputField";
import { useForm } from "../../Hooks/useForm";
import { validNotEmptyInput, capitalize } from "../../util";

interface Props {}

interface FormField {
  name: string;
  label?: string;
  initialValue?: string;
  validations?: Array<(inputValue: string) => [boolean, string]>;
}

const formFields: FormField[] = [
  {
    name: "username",
  },
  {
    name: "password",
  },
];

const Login = (props: Props) => {
  const [formInput, setFormInput, errors, setErrors] = useForm(
    formFields.reduce(
      (obj, field) => ({
        ...obj,
        [field.name]: "",
      }),
      {}
    )
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(errors);
  };

  return (
    <Container>
      <LoginWrapper onSubmit={handleSubmit}>
        {formFields.map((field) => (
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
        <button type="submit">Enviar</button>
      </LoginWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.light};
`;

const LoginWrapper = styled.form`
  width: 100%;
  max-width: 800px;

  background-color: ${(props) => props.theme.light};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  padding: 100px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default Login;
