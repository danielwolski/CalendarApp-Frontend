import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { EventDetailsComponent } from './event-details/event-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events-list', pathMatch: 'full' },
  { path: 'events-list', component: CalendarComponent },
  { path: 'event-details/:date', component: EventDetailsComponent },
  { path: '**', redirectTo: 'events-list' },
];
