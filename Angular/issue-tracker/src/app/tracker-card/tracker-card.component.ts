import { Component, input, output } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracker-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracker-card.component.html',
  styleUrl: './tracker-card.component.scss',
})
export class TrackerCardComponent {
  ticket = input.required<Ticket>();
  onTicketSelect = output<Ticket>();

  onClickSelect() {
    this.onTicketSelect.emit(this.ticket());
  }
}
