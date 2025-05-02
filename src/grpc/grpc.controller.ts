import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Aircraft,
  AircraftByCodeRequest,
  GetAllAircraftsRequest,
  PaginatedAircraftList,
} from './generated/aircraft';
import {
  Airport,
  AirportByCodeRequest,
  GetAllAirportsRequest,
  PaginatedAirportList,
} from './generated/airport';
import {
  Booking,
  BookingByRefRequest,
  BookingEvent,
  GetAllBookingsRequest,
  PaginatedBookingList,
} from './generated/booking';
import {
  Flight,
  FlightByIdRequest,
  FlightEvent,
  FlightStatusEvent,
  GetAllFlightsRequest,
  PaginatedFlightList,
} from './generated/flight';
import {
  GetAllTicketsRequest,
  PaginatedTicketList,
  Ticket,
  TicketByNoRequest,
} from './generated/ticket';
import {
  GetAllTicketFlightsRequest,
  PaginatedTicketFlightList,
  TicketFlight,
  TicketFlightByTicketAndFlightIdRequest,
} from './generated/ticket-flight';
import { GrpcService } from './grpc.service';

@Controller()
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  // Flight Service
  @GrpcMethod('FlightService', 'GetAllFlights')
  async getAllFlights(
    request: GetAllFlightsRequest,
  ): Promise<PaginatedFlightList> {
    return this.grpcService.getAllFlights(request);
  }

  @GrpcMethod('FlightService', 'GetFlightById')
  async getFlightById(data: FlightByIdRequest): Promise<Flight> {
    return this.grpcService.getFlightById(data.id);
  }

  @GrpcStreamMethod('FlightService', 'StreamFlightCreated')
  streamFlightCreated(): Observable<FlightEvent> {
    return this.grpcService.streamFlightCreated();
  }

  @GrpcStreamMethod('FlightService', 'StreamFlightUpdated')
  streamFlightUpdated(): Observable<FlightEvent> {
    return this.grpcService.streamFlightUpdated();
  }

  @GrpcStreamMethod('FlightService', 'StreamFlightStatusChanged')
  streamFlightStatusChanged(): Observable<FlightStatusEvent> {
    return this.grpcService.streamFlightStatusChanged();
  }

  // Booking Service
  @GrpcMethod('BookingService', 'GetAllBookings')
  async getAllBookings(
    request: GetAllBookingsRequest,
  ): Promise<PaginatedBookingList> {
    return this.grpcService.getAllBookings(request);
  }

  @GrpcMethod('BookingService', 'GetBookingByRef')
  async getBookingByRef(data: BookingByRefRequest): Promise<Booking> {
    return this.grpcService.getBookingByRef(data.bookRef);
  }

  @GrpcStreamMethod('BookingService', 'StreamBookingCreated')
  streamBookingCreated(): Observable<BookingEvent> {
    return this.grpcService.streamBookingCreated();
  }

  @GrpcStreamMethod('BookingService', 'StreamBookingUpdated')
  streamBookingUpdated(): Observable<BookingEvent> {
    return this.grpcService.streamBookingUpdated();
  }

  @GrpcStreamMethod('BookingService', 'StreamBookingCanceled')
  streamBookingCanceled(): Observable<BookingEvent> {
    return this.grpcService.streamBookingCanceled();
  }

  // Aircraft Service
  @GrpcMethod('AircraftService', 'GetAllAircrafts')
  async getAllAircrafts(
    request: GetAllAircraftsRequest,
  ): Promise<PaginatedAircraftList> {
    return this.grpcService.getAllAircrafts(request);
  }

  @GrpcMethod('AircraftService', 'GetAircraftByCode')
  async getAircraftByCode(data: AircraftByCodeRequest): Promise<Aircraft> {
    return this.grpcService.getAircraftByCode(data.aircraftCode);
  }

  // Airport Service
  @GrpcMethod('AirportService', 'GetAllAirports')
  async getAllAirports(
    request: GetAllAirportsRequest,
  ): Promise<PaginatedAirportList> {
    return this.grpcService.getAllAirports(request);
  }

  @GrpcMethod('AirportService', 'GetAirportByCode')
  async getAirportByCode(data: AirportByCodeRequest): Promise<Airport> {
    return this.grpcService.getAirportByCode(data.airportCode);
  }

  // Ticket Service
  @GrpcMethod('TicketService', 'GetAllTickets')
  async getAllTickets(
    request: GetAllTicketsRequest,
  ): Promise<PaginatedTicketList> {
    return this.grpcService.getAllTickets(request);
  }

  @GrpcMethod('TicketService', 'GetTicketByNo')
  async getTicketByNo(data: TicketByNoRequest): Promise<Ticket> {
    return this.grpcService.getTicketByNo(data.ticketNo);
  }

  // TicketFlight Service
  @GrpcMethod('TicketFlightService', 'GetAllTicketFlights')
  async getAllTicketFlights(
    request: GetAllTicketFlightsRequest,
  ): Promise<PaginatedTicketFlightList> {
    return this.grpcService.getAllTicketFlights(request);
  }

  @GrpcMethod('TicketFlightService', 'GetTicketFlightByTicketAndFlightId')
  async getTicketFlightByTicketAndFlightId(
    data: TicketFlightByTicketAndFlightIdRequest,
  ): Promise<TicketFlight> {
    return this.grpcService.getTicketFlightByTicketAndFlightId(
      data.ticketNo,
      data.flightId,
    );
  }
}
