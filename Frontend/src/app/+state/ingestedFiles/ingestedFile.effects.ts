import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  uploadFile,
  uploadFileSuccess,
  uploadFileFailure,
  addStringToList,
} from './ingestedFiles.action';
import { Store } from '@ngrx/store';
import { LlmConnectorService } from 'src/app/service/llm-connector.service';

@Injectable()
export class FileEffects {
  constructor(
    private actions$: Actions,
    private llmModelService: LlmConnectorService,
    private store: Store
  ) { }

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadFile),
      switchMap(({ file }) =>
        this.llmModelService.uploadDoc(file).pipe(
          map((response) => {
            this.store.dispatch(addStringToList({ item: file.name }));
            return uploadFileSuccess({ response });
          }),
          catchError((error) => of(uploadFileFailure({ error })))
        )
      )
    )
  );
}
