import { Action, Reducer, Dispatch } from "redux";

const initialState: string = "";

export interface FormAction extends Action<ActionType> {
  payload: Partial<string>;
}

export enum ActionType {
  ChangeInput,
}

export const formReducer: Reducer<string, FormAction> = (
  state: string = initialState,
  action
): string => {
  switch (action.type) {
    case ActionType.ChangeInput:
      return action.payload;
    default:
      return state;
  }
};

export class FormDispatch {
  private readonly dispatch: Dispatch<FormAction>;

  constructor(dispatch: Dispatch<FormAction>) {
    this.dispatch = dispatch;
  }

  changeInput = (value: string) =>
    this.dispatch({ type: ActionType.ChangeInput, payload: value });
}
