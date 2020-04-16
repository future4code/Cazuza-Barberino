import { Reducer } from "redux";
import api from "../services/api";
import { ThunkAction } from "redux-thunk";
import { StateData } from "../Store";
import { Action } from "redux";

interface TodoList {
  name: string;
  id: string;
}

export interface TodoListState {
  currentlist: string;
  lists: TodoList[];
}

const initialState: TodoListState = {
  currentlist: "",
  lists: [],
};

type ActionTypes =
  | { type: "CREATE_LIST"; listId: string }
  | { type: "CHANGE_LIST"; listId: string }
  | { type: "LOAD_LISTS"; lists: RawList[] };

export const todoListReducer: Reducer<TodoListState, ActionTypes> = (
  state = initialState,
  action
): TodoListState => {
  switch (action.type) {
    case "CREATE_LIST":
      return {
        ...state,
        lists: [...state.lists, { name: "New Panel", id: action.listId }],
      };
    case "CHANGE_LIST":
      return {
        ...state,
        currentlist: action.listId,
      };
    case "LOAD_LISTS":
      const arr: TodoList[] = action.lists.map((list) => ({
        name: list.text,
        id: list.id,
      }));
      return {
        currentlist: arr[0].id,
        lists: arr,
      };
    default:
      return state;
  }
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateData,
  unknown,
  Action<string>
>;

interface RawList {
  id: string;
  done: boolean;
  text: string;
}

export const changeList = (id: string): ActionTypes => ({
  type: "CHANGE_LIST",
  listId: id,
});

const loadLists = (lists: RawList[]): ActionTypes => ({
  type: "LOAD_LISTS",
  lists,
});

export const fetchLists = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("cazuza/todos");
    dispatch(loadLists(response.data.todos));
  } catch (err) {
    alert("Fetch " + err);
  }
};

export const createList = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.post("cazuza/todos", {
      text: "New Panel",
    });

    dispatch<ActionTypes>({
      type: "CREATE_LIST",
      listId: response.data.todo.id,
    });
  } catch (err) {
    alert("Create " + err);
  }
};
