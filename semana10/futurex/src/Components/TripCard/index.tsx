import React from "react";
import styled, { css } from "styled-components";
import { Btn } from "../global-styled";
import CandidateCard from "../CandidateCard";

interface Props {
  trip: {
    id: string;
    date: string;
    name: string;
    description: string;
    planet: string;
    durationInDays: number;
  };
}

const candidates = [
  {
    id: "NAOp5L3Wuunexq9SbUso",
    applicationText: "Quero muuuuuuito ir!!!",
    profession: "Chefe",
    age: 20,
    name: "Astrodev",
    country: "Brasil",
  },
];

const TripCard = ({ trip }: Props) => {
  const { name, description, planet, durationInDays, date } = trip;

  const [showCandidates, setShowCandidates] = React.useState(false);

  return (
    <div>
      <Container>
        <TripDataWrapper>
          <div>
            <h2>{name}</h2>
            <h4>{description}</h4>
          </div>
          <div>
            <p>
              <strong>Planeta: </strong>
              {planet}.
            </p>
            <p>
              <strong>Duração: </strong>
              {durationInDays} dias.
            </p>
            <p>
              <strong>Data: </strong>
              {date}
            </p>
          </div>
        </TripDataWrapper>
        <BtnWrapper>
          <Btn color="secondary">Inscrever-se</Btn>
          <Btn color="secondary" onClick={() => setShowCandidates((c) => !c)}>
            {!showCandidates ? "Mostrar " : "Esconder "}Candidatos
          </Btn>
        </BtnWrapper>
      </Container>
      <CandidateContainer
        nOfCandidates={candidates.length}
        showCandidates={showCandidates}
      >
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </CandidateContainer>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: ${(props) => props.theme.light};
  display: flex;
  align-items: flex-start;
  padding: 20px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.secondary};
`;

const TripDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
  width: 500px;
  row-gap: 20px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  flex: 1;
`;

interface CandidateContainerProps {
  showCandidates: boolean;
  nOfCandidates: number;
}

const CandidateContainer = styled.div<CandidateContainerProps>`
  width: 95%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.light};
  padding: 20px;
  overflow: hidden;
  transition: 0.3s;
  height: ${(props) => `${props.nOfCandidates * 110 + 40}px`};
  ${(props) =>
    !props.showCandidates &&
    css`
      height: 0;
      padding: 0 20px;
    `};
`;

export default TripCard;
