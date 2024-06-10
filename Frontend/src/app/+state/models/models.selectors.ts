import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LlmModelState } from './models.state';

export const selectLlmModelState = createFeatureSelector<LlmModelState>('llmModel');
export const selectData = createSelector(selectLlmModelState, state => state.data);
export const selectError = createSelector(selectLlmModelState, state => state.error);

