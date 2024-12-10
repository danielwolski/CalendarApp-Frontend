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
    console.log(this.eventRequest)
    this.eventService.addEvent(this.eventRequest).subscribe({
      next: (response) => {
        console.log('Wydarzenie utworzone:', response);
      },
      error: (err) => {
        console.error('Błąd podczas tworzenia wydarzenia:', err);
      },
    });
  }
}
