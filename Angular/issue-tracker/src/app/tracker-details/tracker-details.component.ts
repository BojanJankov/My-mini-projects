import { Component, input, output } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracker-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracker-details.component.html',
  styleUrl: './tracker-details.component.scss',
})
export class TrackerDetailsComponent {
  selectedTicket = input<Ticket>();

  hideOutput = output();

  onClickClear() {
    this.hideOutput.emit();
  }
}
