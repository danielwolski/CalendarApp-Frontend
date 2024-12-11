import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Event, CreateEventRequest, EventDetails } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  private eventsUpdatedSubject = new Subject<void>();

  eventsUpdated$ = this.eventsUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventDetailsByDay(day: string): Observable<EventDetails[]> {
    const params = new HttpParams().set('date', day);
    return this.http.get<EventDetails[]>(`${this.apiUrl}/by-day`, { params });
  }

  addEvent(request: CreateEventRequest): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, request).pipe(
      tap(() => this.eventsUpdatedSubject.next())
    );
  }

  removeEvent(eventId: number): Observable<void> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.eventsUpdatedSubject.next())
    );
  }
}
