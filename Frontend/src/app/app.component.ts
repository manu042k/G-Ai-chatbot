import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NavComponent, SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Frontend';
}
