import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { ModalComponent } from '../modal/modal.component';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [
    CommonModule, 
    ModalComponent],
  standalone: true
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: Date[] = [];
  events: Event[] = [];

  isModalVisible: boolean = false;
  selectedDate: string = '';

  constructor(private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.generateDaysInMonth();
    this.loadEvents();

    this.eventService.eventsUpdated$.subscribe(() => {
      this.loadEvents();
    });
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

  openEventDetails(date: Date): void {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    this.selectedDate = `${year}-${month}-${day}`;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  getTime(dateTimeString: String) {
    return dateTimeString.split('T')[1].split(':')[0] + ":" + dateTimeString.split('T')[1].split(':')[1];
  }
}
