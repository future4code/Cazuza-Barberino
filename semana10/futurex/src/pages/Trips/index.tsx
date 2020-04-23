import React from "react";
import styled from "styled-components";
import TripCard from "../../Components/TripCard";

interface Props {}

const Trips = (props: Props) => {
  return (
    <Container>
      {triplist.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
      {triplist.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
      {triplist.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.dark};
  width: 100%;
  max-width: 800px;
  flex: 1;
  display: flex;
  align-self: center;
  flex-direction: column;
  padding: 20px;
  row-gap: 20px;
  box-shadow: inset 0 0 10px black;
`;

const triplist = [
  {
    id: "C8buI5iiXUOuh0PUt6w2",
    date: "21/12/20",
    name: "Multi luau em Jupiter",
    description: "Noite mágica, com vista para as 69 luas de Jupiter",
    planet: "Jupiter",
    durationInDays: 540,
  },
  {
    id: "DrXlhi4Y6pmHQBpe5CX2",
    name: "Picnic de Inverno em Plutão",
    description:
      "Único tour que fazemos em planeta anão no sistema solar! Levem casacos que a previsão é de −230 °C",
    planet: "Plutão",
    durationInDays: 980,
    date: "21/12/20",
  },
  {
    id: "d48LXHvSmniUU9iIyL0f",
    name: "Festança Marciana",
    description: "Uma viagem bem legal, na melhor época de marte",
    planet: "Marte",
    durationInDays: 228,
    date: "21/12/21",
  },
  {
    id: "g9EcRV3brI0DVAuvy1sn",
    name: "Surfando em Netuno",
    description: "Nenhum surfista intergalático pode ficar fora dessa!",
    planet: "Netuno",
    durationInDays: 540,
    date: "21/12/20",
  },
];

export default Trips;
