import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { LlmConnectorService } from 'src/app/service/llm-connector.service';
import { selectCurrentModel } from '../current-model/currentModel.selectors';
import { selectTemperature } from '../temperature/temperature.selectors';
import {
  addMessage,
  sendMessageSuccess,
  sendMessageFailure,
  startLoading,
  stopLoading,
} from './message.action';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private llmModelService: LlmConnectorService,
    private store: Store
  ) { }




  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(addMessage),
    withLatestFrom(this.store.pipe(select(selectCurrentModel)), this.store.pipe(select(selectTemperature))),
    tap(([actions, currentModel, temperature]) => {
      this.store.dispatch(startLoading());
    }),
    switchMap(([action, currentModel, temperature]) =>
      this.llmModelService.chat(action.message.content, currentModel, temperature).pipe(
        map(response => {
          this.store.dispatch(stopLoading());
          return sendMessageSuccess({
            message: { content: response, type: 'LLM' },
          });
        }),
        catchError(error => {
          this.store.dispatch(stopLoading());
          return of(sendMessageFailure({ error }));
        })
      )
    )
  ));
}
