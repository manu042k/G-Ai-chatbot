import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TemperatureState } from './temperature.state';



export const selectTemperatureState = createFeatureSelector<TemperatureState>('temperature');


export const selectTemperature = createSelector(
  selectTemperatureState,
  (state) => state.temperature
);
