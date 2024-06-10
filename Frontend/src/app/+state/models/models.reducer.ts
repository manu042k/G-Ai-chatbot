import { Action, createReducer, on } from '@ngrx/store';
import * as LlmModelActions from './models.actions';
import { LlmModelState } from './models.state';

export const initialState:LlmModelState = {
  data: [""],
  error: null
};

export const llmModelReducer = createReducer(
  initialState,
  on(LlmModelActions.loadDataSuccess, (state, { data }) => ({
    ...state,
    data
  })),
  on(LlmModelActions.loadDataFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

