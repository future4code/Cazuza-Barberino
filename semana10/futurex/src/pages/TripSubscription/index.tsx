import React from "react";
import styled from "styled-components";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";
import { validMinLetters, validNumberInput, validMinValue } from "../../util";
import { countryList } from "../../util/variousCountryListFormats";

interface Props {}

const formFields: FormField[] = [
  {
    name: "name",
    validations: [validMinLetters(3)],
  },
  {
    name: "age",
    validations: [validMinValue(18)],
    inputRestriction: validNumberInput,
  },
  {
    name: "applicationText",
    type: "textarea",
    validations: [validMinLetters(30)],
  },
  {
    name: "profession",
    validations: [validMinLetters(10)],
  },
  {
    name: "country",
    type: "select",
    options: countryList,
  },
];

const TripSubscription = (props: Props) => {
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

export default TripSubscription;
