import { createAction, props } from '@ngrx/store';

export const setTemperature = createAction(
    '[temperature] Set Current temperature',
    props<{ temperature: number }>()
);
