import React from "react";
import styled from "styled-components";
import { Btn } from "../global-styled";
import { decideCandidate } from "../../services/api";
import LoadingSpinner from "../../Components/LoadingSpinner";

interface Props {
  approved: boolean;
  tripID: string;
  decideAction: (approve: boolean, id: string) => void;
  candidate: {
    id: string;
    applicationText: string;
    profession: string;
    age: number;
    name: string;
    country: string;
  };
}

const CandidateCard = ({
  approved,
  tripID,
  candidate,
  decideAction,
}: Props) => {
  const { name, applicationText, age, profession, country, id } = candidate;
  const [loading, setLoading] = React.useState(false);

  const decideResponse = (approve: boolean) => () => {
    setLoading(false);
    decideAction(approve, id);
  };

  const onDecide = (approve: boolean) => {
    setLoading(true);
    decideCandidate(tripID, id, approve, decideResponse(approve));
  };

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
      {!approved && (
        <BtnWrapper>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Btn onClick={() => onDecide(true)}>Aceitar</Btn>
              <Btn onClick={() => onDecide(false)}>Rejeitar</Btn>
            </>
          )}
        </BtnWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 2px solid black;
  padding: 0 20px;
  max-height: 110px;
  height: 110px;
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 3;
`;

const BtnWrapper = styled(Wrapper)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export default CandidateCard;
