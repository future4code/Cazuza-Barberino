import React from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import { StateData } from "../Store";
import { useSelector } from "react-redux";
import {
  TodoState,
  changeName,
  newPanel,
  changeTab,
} from "../Store/TodoReducer";

interface Props {}

const TodoHeader = (props: Props) => {
  const { panels, currentPanel } = useSelector<StateData, TodoState>(
    (state: StateData) => state.todo
  );

  const [tabName, setTabName] = React.useState("");

  const dispatch = useDispatch();

  const tabs = React.useMemo(
    () =>
      panels.map((panel) => {
        const current = panel.id === currentPanel;
        if (current) setTabName(panel.name);
        return (
          <Button
            color="primary"
            variant={current ? "contained" : "text"}
            onClick={() => dispatch(changeTab(panel.id))}
          >
            {panel.name}
          </Button>
        );
      }),
    [panels, currentPanel, dispatch]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (tabName !== "") dispatch(changeName(tabName));
    },
    [dispatch, tabName]
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
        {tabs}
        <Button onClick={() => dispatch(newPanel())}>
          <FiPlus />
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={tabName}
          onBlur={() => {
            if (tabName !== "") dispatch(changeName(tabName));
          }}
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
