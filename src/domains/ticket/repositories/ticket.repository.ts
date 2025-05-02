import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Ticket } from '../models/ticket.model';

export interface TicketRepository extends BaseRepository<Ticket, string> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<Ticket[] | PaginatedResult<Ticket>>;
  findByTicketNo(ticketNo: string): Promise<Ticket | null>;
  findByBookingRef(bookRef: string): Promise<Ticket[]>;
  create(data: any): Promise<Ticket>;
  update(ticketNo: string, data: any): Promise<Ticket>;
  delete(ticketNo: string): Promise<Ticket>;
}
