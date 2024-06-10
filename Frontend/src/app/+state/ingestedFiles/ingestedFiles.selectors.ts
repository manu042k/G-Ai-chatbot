import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FileState } from './ingestedFiles.reducers';
import { ListState } from './ingestedFiles.state';


export const selectListState = createFeatureSelector<ListState>('list');

export const selectList = createSelector(
  selectListState,
  (state: ListState) => state?.list
);


export const selectFileState = createFeatureSelector<FileState>('file');

export const selectFileLoading = createSelector(
  selectFileState,
  (state: FileState) => state?.loading
);
export const selectFileUploadError = createSelector(
  selectFileState,
  (state: FileState) => state?.error
);

