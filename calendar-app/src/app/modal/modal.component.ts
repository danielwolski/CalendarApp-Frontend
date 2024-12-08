import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';

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
export class ModalComponent {
  @Input() isVisible: boolean = false; 
  @Input() selectedDate: string = '';  
  @Output() closeModal: EventEmitter<void> = new EventEmitter(); 

  isAddEventFormVisible: boolean = false;

  close(): void {
    this.closeModal.emit();
  }

  openAddEventFormModal(): void {
    this.isAddEventFormVisible = true;
  }

  closeAddEventFormModal(): void {
    this.isAddEventFormVisible = false;
  }
}
