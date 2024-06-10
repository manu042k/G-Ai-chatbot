import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentModelState } from './currentModel.state';


export const selectCurrentModelState = createFeatureSelector<CurrentModelState>('currentModel');


export const selectCurrentModel = createSelector(
  selectCurrentModelState,
  (state) => state.currentModel
);
