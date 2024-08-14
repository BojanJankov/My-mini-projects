export enum TicketStatus {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: TicketStatus;
}
