import React from "react";
import styled from "styled-components";
import weekdays from "../../../data/weekdays";
import { useDispatch } from "react-redux";
import { addTask } from "../../../reducers/planner/actions";
import { uuid } from "uuidv4";

const Header = () => {
  const [inputValues, setInputValues] = React.useState({
    text: "",
    day: "Monday",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValues({ ...inputValues, text: "" });
    dispatch(
      addTask({
        id: uuid(),
        text: inputValues.text,
        day: inputValues.day,
      })
    );
  };

  return (
    <Container data-testid="form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={inputValues.text}
        name="text"
        type="text"
        required
      />
      <select onChange={handleChange} value={inputValues.day} name="day" id="">
        {weekdays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <button type="submit">Criar Tarefa</button>
    </Container>
  );
};

export default Header;

const Container = styled.form`
  background-color: ${({ theme }) => theme.main};
  display: grid;
  place-content: center;
  grid-auto-flow: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;
