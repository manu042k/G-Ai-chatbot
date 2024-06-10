import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageStateDetails } from './message.state';





export const selectMessageState = createFeatureSelector<MessageStateDetails>('messages');

export const selectMessages = createSelector(
  selectMessageState,
  (state) => state.messageState
);


export const selectIsLoading = createSelector(selectMessageState, (state) => state?.isLoading);
export const selectError = createSelector(selectMessageState, (state) => state?.error);

