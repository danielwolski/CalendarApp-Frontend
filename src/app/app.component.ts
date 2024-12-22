import { Component } from '@angular/core';
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToCalendar() {
    this.router.navigate(['/events-list']);
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
