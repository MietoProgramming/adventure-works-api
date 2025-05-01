import { Ticket } from '../../ticket/models/ticket.model';

export class Booking {
  book_ref: string;
  book_date: Date;
  total_amount: number;
  tickets?: Ticket[];
}
