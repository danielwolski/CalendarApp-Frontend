import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, 
            HttpClientModule],
  template: `
    <app-calendar></app-calendar>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
