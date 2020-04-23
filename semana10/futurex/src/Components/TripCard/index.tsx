import React from "react";
import styled from "styled-components";
import { Btn } from "../global-styled";

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

const TripCard = ({ trip }: Props) => {
  const { name, description, planet, durationInDays, date } = trip;
  return (
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
      <Btn color="secondary">Inscrever-se</Btn>
    </Container>
  );
};

const Container = styled.div`
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

export default TripCard;
