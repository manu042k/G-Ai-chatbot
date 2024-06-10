import { createAction, props } from '@ngrx/store';
import { MessageState } from './message.state';

export const addMessage = createAction(
  '[Chatbot] Add Message',
  props<{ message: MessageState }>()
);

export const sendMessageSuccess = createAction(
  '[Chatbot] Send Message Success',
  props<{ message: MessageState }>()
);

export const sendMessageFailure = createAction(
  '[Chatbot] Send Message Failure',
  props<{ error: any }>()
);

export const removeMessage = createAction('[Chatbot] Remove Message');

export const startLoading = createAction('[Loading] Start Loading');
export const stopLoading = createAction('[Loading] Stop Loading');
