import { createReducer, on } from '@ngrx/store';
import {
  addStringToList,
  clearList,
  uploadFileSuccess,
  uploadFileFailure,
} from './ingestedFiles.action';
import { ListState } from './ingestedFiles.state';

export const initialState: ListState = {
  list: [],
};
 
export const listReducer = createReducer(
  initialState,
  on(addStringToList, (state, { item }) => ({
    ...state,
    list: [...state.list, item],
  })),

  on(clearList, (state) => ({
    ...state,
    list: [],
  }))
);

export interface FileState {
  loading: boolean;
  error: Error|null;
}

export const initialFileState: FileState = {
  loading: false,
  error: null,
};

export const fileReducer = createReducer(
  initialFileState,
  on(uploadFileSuccess, (state) => ({ ...state, loading: false, error: null })),
  on(uploadFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
