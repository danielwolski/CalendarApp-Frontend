import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './authorization/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet]
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goToCalendar() {
    this.router.navigate(['/events-list']);
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
