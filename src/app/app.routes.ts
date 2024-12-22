import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'events-list', component: CalendarComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'events-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'events-list' },
];
