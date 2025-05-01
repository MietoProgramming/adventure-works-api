import { BaseRepository } from '../../core/repositories/base.repository';
import { TicketFlight } from '../models/ticket-flight.model';

export interface TicketFlightRepository
  extends BaseRepository<TicketFlight, any> {
  findByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ): Promise<TicketFlight | null>;
  findByTicketNo(ticketNo: string): Promise<TicketFlight[]>;
  findByFlightId(flightId: number): Promise<TicketFlight[]>;
}
