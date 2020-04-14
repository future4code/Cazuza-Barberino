import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateData } from "../Store";
import {
  completeAllTodo,
  deleteCompletedTodo,
  changeFilter,
} from "../Store/TodoReducer";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

interface Props {
  totalTodos: number;
  doneTodos: number;
}

function TodoOption({ totalTodos, doneTodos }: Props) {
  const filter = useSelector((state: StateData) => state.todo.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeFilter("all"));
    };
  }, [dispatch]);

  return (
    <Box display="flex">
      <Zoom in={doneTodos < totalTodos}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => dispatch(completeAllTodo())}
        >
          Marcar todas como completas
        </Button>
      </Zoom>

      <Select
        variant="outlined"
        fullWidth={true}
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value as string))}
      >
        <MenuItem value="all">all</MenuItem>
        <MenuItem value="done">done</MenuItem>
        <MenuItem value="undone">undone</MenuItem>
      </Select>

      <Zoom in={doneTodos > 0}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => dispatch(deleteCompletedTodo())}
        >
          Remover completas
        </Button>
      </Zoom>
    </Box>
  );
}

export default TodoOption;
