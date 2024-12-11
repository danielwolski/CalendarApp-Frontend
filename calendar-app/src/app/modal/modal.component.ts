import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { EventDetails } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [
    CommonModule,
    AddEventModalComponent
  ],
  standalone: true
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false; 
  @Input() selectedDate: string = '';  
  @Output() closeModal: EventEmitter<void> = new EventEmitter(); 

  eventDetails: EventDetails[] = [];
  isAddEventFormVisible: boolean = false;

  constructor(private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.eventsUpdated$.subscribe(() => {
      this.loadEventDetails();
    });
  }

  ngOnChanges(): void {
    this.loadEventDetails();
  }

  close(): void {
    this.closeModal.emit();
  }

  openAddEventFormModal(): void {
    this.isAddEventFormVisible = true;
  }

  closeAddEventFormModal(): void {
    this.isAddEventFormVisible = false;
  }

  loadEventDetails(): void {
    this.eventService.getEventDetailsByDay(this.selectedDate).subscribe((data: EventDetails[]) => {
      this.eventDetails = data;
    });
  }

  getTime(dateTimeString: String) {
    return  dateTimeString.split('T')[1];
  }

  removeEvent(eventId: number) {
    this.eventService.removeEvent(eventId).subscribe(() => {});
  }
}
