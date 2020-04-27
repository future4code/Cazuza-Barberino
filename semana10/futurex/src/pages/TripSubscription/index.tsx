import { replace } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Routes } from "../../App";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { RootState } from "../../reducers";
import { clearSubscribeID } from "../../reducers/trips/actions";
import { applyToTrip } from "../../services/api";
import { validMinLetters, validMinValue, validNumberInput } from "../../util";
import { countryList } from "../../util/variousCountryListFormats";
import { Btn } from "../../Components/global-styled";

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
  const tripID = useSelector((state: RootState) => state.trips.subscribeID);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [postSubmit, setPostSubmit] = React.useState({
    msg: "",
    color: "",
  });

  React.useEffect(() => {
    if (tripID === "") {
      dispatch(replace(Routes.trips));
    }
  });

  const applyResponse = (success: boolean) => {
    setLoading(false);
    setPostSubmit(
      success
        ? {
            msg: "Aplicação realizada com sucesso!",
            color: "green",
          }
        : {
            msg: "Erro na aplicação, tente mais tarde.",
            color: "red",
          }
    );
  };

  const handleSubmit = (value: string[]) => {
    applyToTrip(tripID, value, applyResponse);
    setLoading(true);
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
                dispatch(clearSubscribeID());
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

export default TripSubscription;
