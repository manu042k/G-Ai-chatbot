import { createAction, props } from '@ngrx/store';

export const addStringToList = createAction(
  '[List] Add String To List',
  props<{ item: string }>()
);

export const clearList = createAction('[List] Clear List'  );
export const uploadFile = createAction('[File] Upload', props<{ file: File }>()); 
export const uploadFileSuccess = createAction('[File] Upload Success', props<{ response: any }>());
export const uploadFileFailure = createAction('[File] Upload Failure', props<{ error: Error }>()); 