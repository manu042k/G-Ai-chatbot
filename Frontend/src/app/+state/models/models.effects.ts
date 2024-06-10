import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LlmModelActions from './models.actions';
import { LlmConnectorService } from 'src/app/service/llm-connector.service';

@Injectable()
export class LlmModelEffects {

  constructor(
    private actions$: Actions,
    private llmModelService: LlmConnectorService
  ) { }

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(LlmModelActions.loadData),
    mergeMap(() => this.llmModelService.getLLMModels().pipe(
      map(data => LlmModelActions.loadDataSuccess({ data })),
      catchError(error => of(LlmModelActions.loadDataFailure({ error })))
    )),
  ));


}