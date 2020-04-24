import React from "react";
import styled from "styled-components";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";

interface Props {}

const formFields: FormField[] = [
  {
    name: "username",
  },
  {
    name: "password",
  },
];

const Login = (props: Props) => {
  const handleSubmit = (values: string[]) => {
    console.log(values);
  };

  return (
    <Container>
      <LoginWrapper>
        <Forms submitHandler={handleSubmit} fields={formFields} />
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

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 800px;

  background-color: ${(props) => props.theme.light};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  padding: 100px;
`;

export default Login;
