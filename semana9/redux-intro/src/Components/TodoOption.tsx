import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateData } from "../Store";
import {
  completeAllTodo,
  deleteCompletedTodo,
  changeFilter,
  searchTodo,
} from "../Store/TodoReducer";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

interface Props {
  totalTodos: number;
  doneTodos: number;
}

function TodoOption({ totalTodos, doneTodos }: Props) {
  const { filter, search } = useSelector((state: StateData) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeFilter("all"));
    };
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Zoom in={doneTodos < totalTodos}>
          <Button
            fullWidth={true}
            variant="contained"
            onClick={() => dispatch(completeAllTodo())}
          >
            Marcar todas como completas
          </Button>
        </Zoom>
      </Grid>
      <Grid item xs={4}>
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
      </Grid>
      <Grid item xs={4}>
        <Zoom in={doneTodos > 0}>
          <Button
            fullWidth={true}
            variant="contained"
            onClick={() => dispatch(deleteCompletedTodo())}
          >
            Remover completas
          </Button>
        </Zoom>
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="normal"
          fullWidth={true}
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(searchTodo(e.target.value))
          }
        />
      </Grid>
    </Grid>
  );
}

export default TodoOption;
