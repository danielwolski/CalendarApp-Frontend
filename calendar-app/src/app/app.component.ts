import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <h1>Moja aplikacja Angular</h1>
    <app-calendar></app-calendar>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
