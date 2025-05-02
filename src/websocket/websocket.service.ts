import { Injectable } from '@nestjs/common';
import { AircraftService } from '../domains/aircraft/services/aircraft.service';
import { AirportService } from '../domains/airport/services/airport.service';
import { BookingService } from '../domains/booking/services/booking.service';
import { PaginationDto } from '../domains/core/models/pagination.dto';
import { FlightService } from '../domains/flight/services/flight.service';
import { TicketFlightService } from '../domains/ticket-flight/services/ticket-flight.service';
import { TicketService } from '../domains/ticket/services/ticket.service';

@Injectable()
export class WebsocketService {
  constructor(
    private readonly aircraftService: AircraftService,
    private readonly airportService: AirportService,
    private readonly bookingService: BookingService,
    private readonly flightService: FlightService,
    private readonly ticketService: TicketService,
    private readonly ticketFlightService: TicketFlightService,
  ) {}

  // Flight methods
  async findAllFlights(pagination?: PaginationDto) {
    return this.flightService.findAll(pagination);
  }

  async findFlightById(id: number) {
    return this.flightService.findById(id);
  }

  // Booking methods
  async findAllBookings(pagination?: PaginationDto) {
    return this.bookingService.findAll(pagination);
  }

  async findBookingByRef(bookRef: string) {
    return this.bookingService.findByRef(bookRef);
  }

  // Aircraft methods
  async findAllAircrafts(pagination?: PaginationDto) {
    return this.aircraftService.findAll(pagination);
  }

  async findAircraftByCode(aircraftCode: string) {
    return this.aircraftService.findByCode(aircraftCode);
  }

  // Airport methods
  async findAllAirports(pagination?: PaginationDto) {
    return this.airportService.findAll(pagination);
  }

  async findAirportByCode(airportCode: string) {
    return this.airportService.findByCode(airportCode);
  }

  // Ticket methods
  async findAllTickets(pagination?: PaginationDto) {
    return this.ticketService.findAll(pagination);
  }

  async findTicketByNo(ticketNo: string) {
    return this.ticketService.findByTicketNo(ticketNo);
  }

  // TicketFlight methods
  async findAllTicketFlights(pagination?: PaginationDto) {
    return this.ticketFlightService.findAll(pagination);
  }

  async findTicketFlightByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ) {
    return this.ticketFlightService.findByTicketAndFlightId(ticketNo, flightId);
  }
}
