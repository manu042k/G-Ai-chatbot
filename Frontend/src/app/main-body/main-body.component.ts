import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageState } from '../+state/message/message.state';
import { Store } from '@ngrx/store';
import { selectError, selectIsLoading, selectMessages } from '../+state/message/message.selector';
import { addMessage } from '../+state/message/message.action';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.scss',
})
export class MainBodyComponent {
  public loading$: Observable<boolean>;
  public messageList$: Observable<MessageState[]>;
  public currentContent: string = '';
  public errorMessage$: Observable<Error | null>;

  constructor(private store: Store) {
    this.messageList$ = this.store.select(selectMessages);
    this.loading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectError);
  }
  dis: boolean = false;

  call(event: Event) {
    this.dis = true;
    console.log("click", event);
  }
  public onValueChanged(event: Event) {

    this.currentContent = (event.target as HTMLInputElement).value;

  }

  public enableSendButton() {
    return this.currentContent.length > 0 ? true : false;
  }



  public sendMessage() {

    const message: MessageState = { content: this.currentContent, type: 'You' }
    this.store.dispatch(addMessage({ message }));
    this.currentContent = '';
  }
}
