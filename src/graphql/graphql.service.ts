import { Injectable } from '@nestjs/common';
import { AircraftService } from '../domains/aircraft/services/aircraft.service';
import { AirportService } from '../domains/airport/services/airport.service';
import { BookingService } from '../domains/booking/services/booking.service';
import { FlightService } from '../domains/flight/services/flight.service';
import { TicketFlightService } from '../domains/ticket-flight/services/ticket-flight.service';
import { TicketService } from '../domains/ticket/services/ticket.service';

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
  async findAllFlights() {
    return this.flightService.findAll();
  }

  async findFlightById(id: number) {
    return this.flightService.findById(id);
  }

  // Booking methods
  async findAllBookings() {
    return this.bookingService.findAll();
  }

  async findBookingByRef(bookRef: string) {
    return this.bookingService.findByRef(bookRef);
  }

  // Aircraft methods
  async findAllAircrafts() {
    return this.aircraftService.findAll();
  }

  async findAircraftByCode(aircraftCode: string) {
    return this.aircraftService.findByCode(aircraftCode);
  }

  // Airport methods
  async findAllAirports() {
    return this.airportService.findAll();
  }

  async findAirportByCode(airportCode: string) {
    return this.airportService.findByCode(airportCode);
  }

  // Ticket methods
  async findAllTickets() {
    return this.ticketService.findAll();
  }

  async findTicketByNo(ticketNo: string) {
    return this.ticketService.findByTicketNo(ticketNo);
  }

  // TicketFlight methods
  async findAllTicketFlights() {
    return this.ticketFlightService.findAll();
  }

  async findTicketFlightByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ) {
    return this.ticketFlightService.findByTicketAndFlightId(ticketNo, flightId);
  }
}
