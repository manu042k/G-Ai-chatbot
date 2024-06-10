import { createReducer, on } from "@ngrx/store";
import { CurrentModelState } from "./currentModel.state";
import { setCurrentModel } from "./currentModel.actions";

export const initialState: CurrentModelState = {
  currentModel: 'mistral:latest'
};

export const currentModelReducer = createReducer(
  initialState,
  on(setCurrentModel, (state, { currentModel }) => ({
    ...state,
    currentModel
  }))
);

