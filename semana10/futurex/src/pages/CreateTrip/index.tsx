import React from "react";
import styled from "styled-components";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";
import { validNumberInput, validMinValue, validMinLetters } from "../../util";

interface Props {}

const formFields: FormField[] = [
  {
    name: "name",
    label: "Nome",
    validations: [validMinLetters(5)],
  },
  {
    name: "planet",
    label: "Planeta",
    type: "select",
    options: [
      "Mercúrio",
      "Vênus",
      "Marte",
      "Jupiter",
      "Saturno",
      "Netuno",
      "Urano",
      "Plutão",
    ],
  },
  {
    name: "date",
    label: "Data",
    mask: "99/99/99",
    validations: [validMinLetters(8)],
  },
  {
    name: "duration",
    label: "Duração em dias",
    inputRestriction: validNumberInput,
    validations: [validMinValue(50)],
  },
  {
    name: "description",
    label: "Descrição",
    type: "textarea",
    validations: [validMinLetters(30)],
  },
];

const CreateTrip = (props: Props) => {
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

export default CreateTrip;
