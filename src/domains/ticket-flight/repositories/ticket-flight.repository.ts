import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { TicketFlight } from '../models/ticket-flight.model';

export interface TicketFlightRepository
  extends BaseRepository<TicketFlight, any> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<TicketFlight[] | PaginatedResult<TicketFlight>>;
  findByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ): Promise<TicketFlight | null>;
  findByTicketNo(ticketNo: string): Promise<TicketFlight[]>;
  findByFlightId(flightId: number): Promise<TicketFlight[]>;
}
