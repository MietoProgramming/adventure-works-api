import { Injectable } from '@nestjs/common';
import { Ticket } from '../models/ticket.model';
import { TicketRepositoryImpl } from '../repositories/ticket.repository.impl';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepositoryImpl) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.findAll();
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
