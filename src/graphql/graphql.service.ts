import { Injectable } from '@nestjs/common';
import { AircraftService } from '../domains/aircraft/services/aircraft.service';
import { AirportService } from '../domains/airport/services/airport.service';
import { BookingService } from '../domains/booking/services/booking.service';
import { PaginationDto } from '../domains/core/models/pagination.dto';
import { FlightService } from '../domains/flight/services/flight.service';
import { TicketFlightService } from '../domains/ticket-flight/services/ticket-flight.service';
import { TicketService } from '../domains/ticket/services/ticket.service';
import { PaginationInput } from './models/pagination.model';

@Injectable()
export class GraphqlService {
  constructor(
    private readonly aircraftService: AircraftService,
    private readonly airportService: AirportService,
    private readonly bookingService: BookingService,
    private readonly flightService: FlightService,
    private readonly ticketService: TicketService,
    private readonly ticketFlightService: TicketFlightService,
  ) {}

  // Flight methods
  async findAllFlights(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.flightService.findAll(paginationDto);
  }

  async findFlightById(id: number) {
    return this.flightService.findById(id);
  }

  // Booking methods
  async findAllBookings(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.bookingService.findAll(paginationDto);
  }

  async findBookingByRef(bookRef: string) {
    return this.bookingService.findByRef(bookRef);
  }

  // Aircraft methods
  async findAllAircrafts(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.aircraftService.findAll(paginationDto);
  }

  async findAircraftByCode(aircraftCode: string) {
    return this.aircraftService.findByCode(aircraftCode);
  }

  // Airport methods
  async findAllAirports(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.airportService.findAll(paginationDto);
  }

  async findAirportByCode(airportCode: string) {
    return this.airportService.findByCode(airportCode);
  }

  // Ticket methods
  async findAllTickets(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.ticketService.findAll(paginationDto);
  }

  async findTicketByNo(ticketNo: string) {
    return this.ticketService.findByTicketNo(ticketNo);
  }

  // TicketFlight methods
  async findAllTicketFlights(pagination?: PaginationInput) {
    const paginationDto = new PaginationDto(pagination);
    return this.ticketFlightService.findAll(paginationDto);
  }

  async findTicketFlightByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ) {
    return this.ticketFlightService.findByTicketAndFlightId(ticketNo, flightId);
  }
}
