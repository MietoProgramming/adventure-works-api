import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Ticket } from '../models/ticket.model';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketRepositoryImpl implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Ticket[] | PaginatedResult<Ticket>> {
    const { page, limit } = new PaginationDto(pagination);
    const skip = (page - 1) * limit;

    const [tickets, total] = await Promise.all([
      this.prisma.tickets.findMany({
        skip,
        take: limit,
        include: {
          bookings: true,
          ticket_flights: true,
        },
      }),
      this.prisma.tickets.count(),
    ]);

    return new PaginatedResult(
      tickets.map((ticket) => ({
        ...ticket,
        ticket_flights: ticket.ticket_flights.map((flight) => ({
          ...flight,
          amount: flight.amount.toNumber(),
        })),
      })),
      total,
      { page, limit },
    );
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.findByTicketNo(id);
  }

  async findByTicketNo(ticketNo: string): Promise<Ticket | null> {
    const ticket = await this.prisma.tickets.findUnique({
      where: { ticket_no: ticketNo },
      include: {
        bookings: true,
        ticket_flights: {
          include: {
            flights: true,
            boarding_passes: true,
          },
        },
      },
    });

    if (!ticket) return null;

    return {
      ...ticket,
      ticket_flights: ticket.ticket_flights.map((flight) => ({
        ...flight,
        amount: flight.amount.toNumber(),
      })),
    };
  }

  async findByBookingRef(bookRef: string): Promise<Ticket[]> {
    const tickets = await this.prisma.tickets.findMany({
      where: { book_ref: bookRef },
      include: {
        bookings: true,
        ticket_flights: true,
      },
    });

    return tickets.map((ticket) => ({
      ...ticket,
      ticket_flights: ticket.ticket_flights.map((flight) => ({
        ...flight,
        amount: flight.amount.toNumber(),
      })),
    }));
  }

  async create(data: Prisma.ticketsCreateInput): Promise<Ticket> {
    const createdTicket = await this.prisma.tickets.create({
      data,
      include: {
        bookings: true,
        ticket_flights: true,
      },
    });

    return {
      ...createdTicket,
      ticket_flights: createdTicket.ticket_flights.map((flight) => ({
        ...flight,
        amount: flight.amount.toNumber(),
      })),
    };
  }

  async update(id: string, data: Prisma.ticketsUpdateInput): Promise<Ticket> {
    const updatedTicket = await this.prisma.tickets.update({
      where: { ticket_no: id },
      data,
      include: {
        bookings: true,
        ticket_flights: true,
      },
    });

    return {
      ...updatedTicket,
      ticket_flights: updatedTicket.ticket_flights.map((flight) => ({
        ...flight,
        amount: flight.amount.toNumber(),
      })),
    };
  }

  async delete(id: string): Promise<Ticket> {
    const deletedTicket = await this.prisma.tickets.delete({
      where: { ticket_no: id },
      include: {
        bookings: true,
        ticket_flights: true,
      },
    });

    return {
      ...deletedTicket,
      ticket_flights: deletedTicket.ticket_flights.map((flight) => ({
        ...flight,
        amount: flight.amount.toNumber(),
      })),
    };
  }
}
