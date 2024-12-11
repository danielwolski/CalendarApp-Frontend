import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet]
})
export class AppComponent {
  constructor(private router: Router) {}

  goToCalendar() {
    this.router.navigate(['/events-list']);
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }
}
