import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { TicketFlight } from '../models/ticket-flight.model';
import { TicketFlightRepositoryImpl } from '../repositories/ticket-flight.repository.impl';

@Injectable()
export class TicketFlightService {
  constructor(
    private readonly ticketFlightRepository: TicketFlightRepositoryImpl,
  ) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<TicketFlight[] | PaginatedResult<TicketFlight>> {
    pagination = new PaginationDto(pagination);
    return this.ticketFlightRepository.findAll(pagination);
  }

  async findByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ): Promise<TicketFlight | null> {
    return this.ticketFlightRepository.findByTicketAndFlightId(
      ticketNo,
      flightId,
    );
  }

  async findByTicketNo(ticketNo: string): Promise<TicketFlight[]> {
    return this.ticketFlightRepository.findByTicketNo(ticketNo);
  }

  async findByFlightId(flightId: number): Promise<TicketFlight[]> {
    return this.ticketFlightRepository.findByFlightId(flightId);
  }

  async create(data: any): Promise<TicketFlight> {
    return this.ticketFlightRepository.create(data);
  }

  async update(
    id: { ticket_no: string; flight_id: number },
    data: any,
  ): Promise<TicketFlight> {
    return this.ticketFlightRepository.update(id, data);
  }

  async delete(id: {
    ticket_no: string;
    flight_id: number;
  }): Promise<TicketFlight> {
    return this.ticketFlightRepository.delete(id);
  }
}
