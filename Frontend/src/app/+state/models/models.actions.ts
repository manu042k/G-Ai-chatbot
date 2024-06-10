import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[LlmModel] Load Data');
export const loadDataSuccess = createAction('[LlmModel] Load Data Success', props<{ data: string[] }>());
export const loadDataFailure = createAction('[LlmModel] Load Data Failure', props<{ error: any }>());