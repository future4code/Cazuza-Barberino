import React from "react";
import styled from "styled-components";
import { Btn } from "../global-styled";

interface Props {
  candidate: {
    id: string;
    applicationText: string;
    profession: string;
    age: number;
    name: string;
    country: string;
  };
}

const CandidateCard = ({ candidate }: Props) => {
  const { name, applicationText, age, profession, country } = candidate;
  return (
    <Container>
      <Wrapper>
        <h2>{name}</h2>
        <h3>{applicationText}</h3>
      </Wrapper>
      <Wrapper>
        <p>
          <strong>Idade: </strong>
          {age}
        </p>
        <p>
          <strong>Profissão: </strong>
          {profession}
        </p>
        <p>
          <strong>País: </strong>
          {country}
        </p>
      </Wrapper>
      <BtnWrapper>
        <Btn>Aceitar</Btn>
        <Btn>Rejeitar</Btn>
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 3;
`;

const BtnWrapper = styled(Wrapper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export default CandidateCard;
