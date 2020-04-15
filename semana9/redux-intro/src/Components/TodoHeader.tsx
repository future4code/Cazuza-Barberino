import React from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { StateData } from "../Store";
import { useSelector } from "react-redux";
import { createList, changeList } from "../Store/todoListReducer";

interface Props {}

const TodoHeader = (props: Props) => {
  const { currentlist, lists } = useSelector((state: StateData) => state.lists);

  const [tabName, setTabName] = React.useState("");

  const dispatch = useDispatch();

  const tabs = React.useMemo(
    () =>
      lists.map((list) => {
        const current = list.id === currentlist;
        if (current) setTabName(list.name);
        return (
          <Grid key={list.id} item xs={3}>
            <Button
              fullWidth={true}
              color="primary"
              variant={current ? "contained" : "text"}
              onClick={() => dispatch(changeList(list.id))}
            >
              {list.name}
            </Button>
          </Grid>
        );
      }),
    [lists, currentlist, dispatch]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  return (
    <Box
      width="100%"
      bgcolor="white"
      boxShadow={1}
      marginBottom="3px"
      padding="10px 20px"
      display="flex"
      flexDirection="column"
    >
      <Box marginBottom="5px">
        <Grid container>
          {tabs}
          <Grid item xs={3}>
            <Button
              variant="outlined"
              fullWidth={false}
              onClick={() => dispatch(createList())}
            >
              <Add />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={tabName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTabName(e.target.value)
          }
          variant="outlined"
        />
      </form>
    </Box>
  );
};

export default TodoHeader;
