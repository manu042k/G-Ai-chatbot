import { createReducer, on } from "@ngrx/store";
import { LoadingState, MessageState, MessageStateDetails } from "./message.state";
import { addMessage, sendMessageFailure, removeMessage, sendMessageSuccess, startLoading, stopLoading } from "./message.action";

export const initialMessageStateDetails: MessageStateDetails = {
  messageState: [{
    content: "Hello, How can I help you?",
    type: 'LLM'
  }],
  error: null,
  isLoading: false

}

export const messageReducer = createReducer(
  initialMessageStateDetails,
  on(addMessage, (state, { message }) => ({
    ...state,
    messageState: [...state.messageState, message]
  })),
  on(removeMessage, (state) => ({
    ...state,
    messageState: [{
      content: "Hello, How can I help you?",
      type: 'LLM'
    }]
  })),
  on(sendMessageSuccess, (state, { message }) => ({
    ...state,
    messageState: [...state.messageState, message]
  })),
  on(sendMessageFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(startLoading, (state) => ({
    ...state,
    isLoading: true
  })),
  on(stopLoading, (state) => ({
    ...state,
    isLoading: false
  })),
)

