import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: 'events-list', component: CalendarComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: 'events-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'events-list' },
];
