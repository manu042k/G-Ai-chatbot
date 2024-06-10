import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { NavComponent } from './nav/nav.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent, SidenavComponent, MainBodyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Frontend';


}
