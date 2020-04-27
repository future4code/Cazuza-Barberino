import React from "react";
import styled from "styled-components";
import TripCard from "../../Components/TripCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { fetchTrips } from "../../reducers/trips/actions";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Header from "../../Components/Header";

interface Props {}

const Trips = (props: Props) => {
  const triplist = useSelector((state: RootState) => state.trips.list);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (triplist === null) dispatch(fetchTrips());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        {triplist ? (
          triplist.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <LoadingSpinner size="200px" speed={1.5} thickness="20px" />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
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

export default Trips;
