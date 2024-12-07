import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  date: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('EventDetailsComponent initialized');
    this.date = this.route.snapshot.paramMap.get('date') || '';
    console.log('Received date:', this.date); 
  }
}
