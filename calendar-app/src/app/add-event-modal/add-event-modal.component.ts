import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../services/event.service';
import { CreateEventRequest } from '../models/event.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css',
  standalone: true
})
export class AddEventModalComponent {
  @Input() isVisible: boolean = false; 
  @Input() selectedDate: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter(); 

  eventRequest: CreateEventRequest = {
    title: '',
    startTime: '',
    endTime: '',
    description: '',
  };

  constructor(private eventService: EventService
  ) {}
  
  close(): void {
    this.closeModal.emit();
  }

  confirmCreateEvent(): void {
    this.eventService.addEvent(this.eventRequest, this.selectedDate).subscribe({
      next: (response) => {
        console.log('Event created:', response);
      },
      error: (err) => {
        console.error('Error during creating event:', err);
      },
    });
  }
}
