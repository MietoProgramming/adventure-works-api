import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Ticket } from '../models/ticket.model';
import { TicketRepositoryImpl } from '../repositories/ticket.repository.impl';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepositoryImpl) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Ticket[] | PaginatedResult<Ticket>> {
    pagination = new PaginationDto(pagination);
    return this.ticketRepository.findAll(pagination);
  }

  async findByTicketNo(ticketNo: string): Promise<Ticket | null> {
    return this.ticketRepository.findByTicketNo(ticketNo);
  }

  async findByBookingRef(bookRef: string): Promise<Ticket[]> {
    return this.ticketRepository.findByBookingRef(bookRef);
  }

  async create(data: any): Promise<Ticket> {
    return this.ticketRepository.create(data);
  }

  async update(ticketNo: string, data: any): Promise<Ticket> {
    return this.ticketRepository.update(ticketNo, data);
  }

  async delete(ticketNo: string): Promise<Ticket> {
    return this.ticketRepository.delete(ticketNo);
  }
}
