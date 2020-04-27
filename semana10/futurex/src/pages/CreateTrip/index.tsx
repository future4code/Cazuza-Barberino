import React from "react";
import styled from "styled-components";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";
import { validNumberInput, validMinValue, validMinLetters } from "../../util";
import { useDispatch } from "react-redux";
import { Routes } from "../../App";
import { replace } from "connected-react-router";
import { Btn } from "../../Components/global-styled";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { createTrip } from "../../services/api";

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
  const [loading, setLoading] = React.useState(false);
  const [postSubmit, setPostSubmit] = React.useState({
    msg: "",
    color: "",
  });

  const dispatch = useDispatch();

  const createTripResponse = (success: boolean) => {
    setLoading(false);
    setPostSubmit(
      success
        ? {
            msg: "Viagem criada com sucesso!",
            color: "green",
          }
        : {
            msg: "Erro na aplicação, tente mais tarde.",
            color: "red",
          }
    );
    if (!success) localStorage.clear();
  };

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) dispatch(replace(Routes.trips));
  }, []);

  const handleSubmit = (values: string[]) => {
    setLoading(true);
    createTrip(values, createTripResponse);
  };

  return (
    <Container>
      <FormWrapper>
        {loading ? (
          <LoadingSpinner />
        ) : postSubmit.msg === "" ? (
          <Forms submitHandler={handleSubmit} fields={formFields} />
        ) : (
          <>
            <ColoredText color={postSubmit.color}>{postSubmit.msg}</ColoredText>
            <Btn
              onClick={() => {
                dispatch(replace(Routes.trips));
              }}
            >
              OK!
            </Btn>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};

interface ColoredTextProps {
  color: string;
}

const ColoredText = styled.p<ColoredTextProps>`
  font-size: 40px;
  color: ${(props) => props.color};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.light};
`;

const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;

  background-color: ${(props) => props.theme.light};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  padding: 100px;
`;

export default CreateTrip;
