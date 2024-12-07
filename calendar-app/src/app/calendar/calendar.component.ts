import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule],
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: Date[] = [];
  events: Event[] = [];

  isModalVisible: boolean = false;  // Określa, czy modal ma być widoczny
  selectedDate: string = '';        // Data, która będzie przekazywana do modala

  constructor(private eventService: EventService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.generateDaysInMonth();
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  generateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);

    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days: Date[] = [];

    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(new Date(year, month, i - firstDayIndex + 1));
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    this.daysInMonth = days;
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateDaysInMonth();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateDaysInMonth();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  getEventsForDay(day: Date): Event[] {
    return this.events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  }

   // Funkcja do otwierania modala
   openEventDetails(date: Date): void {
    this.selectedDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');
    this.isModalVisible = true;  // Ustawia modal na widoczny
  }

  // Funkcja do zamknięcia modala
  closeModal(): void {
    this.isModalVisible = false;  // Ukrywa modal
  }
}
