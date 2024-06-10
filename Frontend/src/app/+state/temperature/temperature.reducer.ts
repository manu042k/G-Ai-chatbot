import { createReducer, on } from "@ngrx/store";
import { TemperatureState } from "./temperature.state";
import { setTemperature } from "./temperature.actions"

export const initialTemperature: TemperatureState = {
  temperature: 0.5
}

export const temperatureReducer = createReducer(
  initialTemperature,
  on(setTemperature, (state, { temperature }) => ({
    ...state,
    temperature
  }))
);

