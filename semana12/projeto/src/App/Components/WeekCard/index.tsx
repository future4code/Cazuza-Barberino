import React from "react";
import styled from "styled-components";
import Task from "../../../models/Task";

interface Props {
  day: string;
  tasks: Task[];
}

const WeekCard = ({ day, tasks }: Props) => {
  return (
    <Container>
      <h2>{day}</h2>
      {tasks.map((task) => (
        <Li key={task.id}>{task.text}</Li>
      ))}
    </Container>
  );
};

export default WeekCard;

const Container = styled.ul`
  background-color: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  min-height: 200px;
  padding: 12px 8px;
  padding-left: 24px;
`;

const Li = styled.li`
  word-wrap: break-word;
`;
