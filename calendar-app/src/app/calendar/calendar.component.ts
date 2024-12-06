import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysInMonth: Date[] = [];
  events: { date: Date; title: string }[] = [
    { date: new Date(2024, 11, 6), title: 'Spotkanie' },
    { date: new Date(2024, 11, 8), title: 'Warsztat' }
  ];

  ngOnInit(): void {
    this.generateDaysInMonth();
  }

  generateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // Pierwszy dzień miesiąca
    const firstDayOfMonth = new Date(year, month, 1);

    // Ostatni dzień miesiąca
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Dni do wyświetlenia
    const days: Date[] = [];

    // Dodaj puste miejsca przed początkiem miesiąca
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Poniedziałek jako pierwszy
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(new Date(year, month, i - firstDayIndex + 1));
    }

    // Dodaj dni miesiąca
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

  selectDay(day: Date): void {
    console.log('Wybrano dzień:', day);
  }

  getEventsForDay(day: Date): { date: Date; title: string }[] {
    return this.events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  }
}
