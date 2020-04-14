import { Action, Reducer } from "redux";

const initialState: string = "";

export interface FormAction extends Action<ActionType> {
  payload: Partial<string>;
}

const CHANGE_INPUT = "CHANGE_INPUT";

type ActionType = typeof CHANGE_INPUT;

export const formReducer: Reducer<string, FormAction> = (
  state: string = initialState,
  action
): string => {
  switch (action.type) {
    case CHANGE_INPUT:
      return action.payload;
    default:
      return state;
  }
};

export const changeInput = (value: string) => ({
  type: CHANGE_INPUT,
  payload: value,
});
