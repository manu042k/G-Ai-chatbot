export interface MessageState {
        content: string;
        type: string | 'You' | 'LLM';
}

export interface LoadingState {
        isLoading: boolean;
}


export interface MessageStateDetails {
        messageState: MessageState[];
        error: Error | null;
        isLoading: boolean;
}  