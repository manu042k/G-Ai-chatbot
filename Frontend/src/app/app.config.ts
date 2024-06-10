import { ApplicationConfig } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { LlmModelEffects } from './+state/models/models.effects';
import { provideStore } from '@ngrx/store';
import { llmModelReducer } from './+state/models/models.reducer';
import { temperatureReducer } from './+state/temperature/temperature.reducer';
import { currentModelReducer } from './+state/current-model/currentModel.reducer';
import { messageReducer } from './+state/message/message.reducers';
import { fileReducer, listReducer } from './+state/ingestedFiles/ingestedFiles.reducers';
import { MessageEffects } from './+state/message/message.effects';
import { FileEffects } from './+state/ingestedFiles/ingestedFile.effects';

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(),
    provideStore({
      llmModel: llmModelReducer,
      temperature: temperatureReducer,
      currentModel: currentModelReducer,
      messages: messageReducer,
      fileloader: fileReducer,
      list: listReducer,


    }),
    provideEffects([LlmModelEffects, MessageEffects, FileEffects]),

    provideStoreDevtools({ maxAge: 25, logOnly: true }),
  ],
};
