import { createAction, props } from '@ngrx/store';

export const setCurrentModel = createAction(
  '[CurrentModel] Set Current Model',
  props<{ currentModel: string }>()
);
