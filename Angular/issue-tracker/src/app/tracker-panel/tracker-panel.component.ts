import { Component, input, OnInit, signal } from '@angular/core';
import { Ticket, TicketStatus } from '../models/ticket.model';
import { TrackerCardComponent } from '../tracker-card/tracker-card.component';
import { TrackerDetailsComponent } from '../tracker-details/tracker-details.component';

@Component({
  selector: 'app-tracker-panel',
  standalone: true,
  imports: [TrackerCardComponent, TrackerDetailsComponent],
  templateUrl: './tracker-panel.component.html',
  styleUrl: './tracker-panel.component.scss',
})
export class TrackerPanelComponent implements OnInit {
  readonly ticketStatus = TicketStatus;

  ticketList = input<Ticket[]>([]);
  filteredTickets = signal<Ticket[]>([]);
  selectedTicket = signal<Ticket>(null);
  isDetailsShown = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    console.log(this.ticketList());

    this.filteredTickets.set(this.ticketList());
  }

  selectedTicketEvent(selectedTicekt: Ticket) {
    this.selectedTicket.set(selectedTicekt);
    this.isDetailsShown.set(true);
  }

  onHideOutputEvent() {
    this.isDetailsShown.set(false);
  }

  filterTickets(status: TicketStatus) {
    this.filteredTickets.set(
      this.ticketList().filter((ticket) => ticket.status === status)
    );
    this.isDetailsShown.set(false);
  }

  resetTickets() {
    this.filteredTickets.set(this.ticketList());
    this.isDetailsShown.set(false);
  }
}
