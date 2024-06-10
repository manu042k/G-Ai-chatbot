import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadData } from '../+state/models/models.actions';
import { Observable } from 'rxjs';
import { selectData, selectError } from '../+state/models/models.selectors';
import { selectTemperature } from '../+state/temperature/temperature.selectors';
import { setTemperature } from '../+state/temperature/temperature.actions';
import { selectCurrentModel } from '../+state/current-model/currentModel.selectors';
import { setCurrentModel } from '../+state/current-model/currentModel.actions';
import { clearList, uploadFile } from '../+state/ingestedFiles/ingestedFiles.action';
import { removeMessage } from '../+state/message/message.action';
import { selectList } from '../+state/ingestedFiles/ingestedFiles.selectors';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  size = 0.5
  data$: Observable<string[]>;
  error$: Observable<Error | null>;
  temperature$: Observable<number>;
  currentModel$: Observable<string>;
  list$?: Observable<string[]>;

  constructor(private store: Store) {
    this.store.dispatch(loadData());
    this.data$ = this.store.select(selectData);
    this.error$ = this.store.select(selectError);
    this.temperature$ = this.store.select(selectTemperature);
    this.currentModel$ = this.store.select(selectCurrentModel);

    this.list$ = this.store.select(selectList);
  }
  public onValueChangedslider(event: Event) {
    const temperature: number = parseFloat((event.target as HTMLInputElement).value);
    this.store.dispatch(setTemperature({ temperature }))
  }

  public onValueChanged(event: Event) {
    console.log((event.target as HTMLInputElement).value)
    const currentModel: string = (event.target as HTMLInputElement).value;
    this.store.dispatch(setCurrentModel({ currentModel }));
  }

  public uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  public handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.files);
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile: File = inputElement.files[0];

      this.store.dispatch(uploadFile({ file: selectedFile }));
    }
  }

  public clearList() {
    this.store.dispatch(clearList());
  }
  public clearChat() {
    this.store.dispatch(removeMessage());
  }
}
