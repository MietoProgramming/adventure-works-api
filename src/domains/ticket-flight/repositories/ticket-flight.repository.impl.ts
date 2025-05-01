import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { TicketFlight } from '../models/ticket-flight.model';
import { TicketFlightRepository } from './ticket-flight.repository';

@Injectable()
export class TicketFlightRepositoryImpl implements TicketFlightRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TicketFlight[]> {
    const ticketFlights = await this.prisma.ticket_flights.findMany({
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return ticketFlights.map((tf) => this.mapToModel(tf));
  }

  async findById(id: {
    ticket_no: string;
    flight_id: number;
  }): Promise<TicketFlight | null> {
    return this.findByTicketAndFlightId(id.ticket_no, id.flight_id);
  }

  async findByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ): Promise<TicketFlight | null> {
    const ticketFlight = await this.prisma.ticket_flights.findUnique({
      where: {
        ticket_no_flight_id: {
          ticket_no: ticketNo,
          flight_id: flightId,
        },
      },
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    if (!ticketFlight) return null;

    return this.mapToModel(ticketFlight);
  }

  async findByTicketNo(ticketNo: string): Promise<TicketFlight[]> {
    const ticketFlights = await this.prisma.ticket_flights.findMany({
      where: { ticket_no: ticketNo },
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return ticketFlights.map((tf) => this.mapToModel(tf));
  }

  async findByFlightId(flightId: number): Promise<TicketFlight[]> {
    const ticketFlights = await this.prisma.ticket_flights.findMany({
      where: { flight_id: flightId },
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return ticketFlights.map((tf) => this.mapToModel(tf));
  }

  async create(data: Prisma.ticket_flightsCreateInput): Promise<TicketFlight> {
    const ticketFlight = await this.prisma.ticket_flights.create({
      data,
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return this.mapToModel(ticketFlight);
  }

  async update(
    id: { ticket_no: string; flight_id: number },
    data: Prisma.ticket_flightsUpdateInput,
  ): Promise<TicketFlight> {
    const ticketFlight = await this.prisma.ticket_flights.update({
      where: {
        ticket_no_flight_id: {
          ticket_no: id.ticket_no,
          flight_id: id.flight_id,
        },
      },
      data,
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return this.mapToModel(ticketFlight);
  }

  async delete(id: {
    ticket_no: string;
    flight_id: number;
  }): Promise<TicketFlight> {
    const ticketFlight = await this.prisma.ticket_flights.delete({
      where: {
        ticket_no_flight_id: {
          ticket_no: id.ticket_no,
          flight_id: id.flight_id,
        },
      },
      include: {
        flights: true,
        tickets: true,
        boarding_passes: true,
      },
    });

    return this.mapToModel(ticketFlight);
  }

  private mapToModel(ticketFlight: any): TicketFlight {
    return {
      ...ticketFlight,
      amount: ticketFlight.amount.toNumber(),
    };
  }
}
