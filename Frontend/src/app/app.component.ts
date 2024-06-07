import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Frontend';
  size = 0.5
  dis: boolean = false;

  call(event: Event) {
    this.dis = true;
    console.log(event);
  }
}
