import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;  // Określa, czy modal ma być widoczny
  @Input() selectedDate: string = '';    // Data, którą chcesz przekazać do EventDetailsComponent
  @Output() closeModal: EventEmitter<void> = new EventEmitter(); // Emituje event do zamknięcia modala

  close(): void {
    this.closeModal.emit();
  }
}
