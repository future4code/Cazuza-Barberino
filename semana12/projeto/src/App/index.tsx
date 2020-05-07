import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import { fetchTasksRequested } from "../reducers/planner/actions";
import Header from "./Components/Header";
import WeekCard from "./Components/WeekCard";

const App = () => {
  const dispatch = useDispatch();

  const { fetchingTasks, tasks } = useSelector(
    (state: RootState) => state.planner
  );

  React.useEffect(() => {
    dispatch(fetchTasksRequested());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <WeekGrid>
        {fetchingTasks
          ? "loading"
          : Object.entries(tasks).map(([day, tasks]) => (
              <WeekCard key={day} day={day} tasks={tasks} />
            ))}
      </WeekGrid>
    </Container>
  );
};

export default App;

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;

  display: grid;
  grid-template-rows: 48px 1fr;

  background-color: white;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 24px;
  place-content: start;
  align-items: flex-start;
`;
