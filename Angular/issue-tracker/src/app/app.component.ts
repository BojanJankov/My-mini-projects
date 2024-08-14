import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrackerPanelComponent } from './tracker-panel/tracker-panel.component';
import { Ticket, TicketStatus } from './models/ticket.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrackerPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ticketList: Ticket[] = [
    {
      id: 1,
      title: 'Mouse doesnt work',
      description: 'My mouse stopped working. Please help!',
      assignee: 'Jon Doe',
      status: TicketStatus.NEW,
    },
    {
      id: 2,
      title: 'Monitor doesnt work',
      description: 'My monitor stopped working. Please help!',
      assignee: 'Jane Doe',
      status: TicketStatus.NEW,
    },
    {
      id: 3,
      title: 'Keyboard doesnt work',
      description:
        'My keyboard stopped working. I spilled soda on it. Please help!',
      assignee: 'Jack Smith',
      status: TicketStatus.IN_PROGRESS,
    },
    {
      id: 4,
      title: 'Car doesnt work',
      description: 'My car stopped working. I spilled soda on it. Please help!',
      assignee: 'Jon Doe',
      status: TicketStatus.IN_PROGRESS,
    },
    {
      id: 5,
      title: 'Computer doesnt work',
      description:
        'My computer stopped working. It fell from the third floor! Please help!',
      assignee: 'Nick Jacobs',
      status: TicketStatus.DONE,
    },
  ];
}
