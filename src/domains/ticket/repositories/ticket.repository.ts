import { BaseRepository } from '../../core/repositories/base.repository';
import { Ticket } from '../models/ticket.model';

export interface TicketRepository extends BaseRepository<Ticket, string> {
  findByTicketNo(ticketNo: string): Promise<Ticket | null>;
  findByBookingRef(bookRef: string): Promise<Ticket[]>;
}
