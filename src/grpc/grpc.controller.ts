import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Aircraft,
  AircraftByCodeRequest,
  AircraftList,
} from './generated/src/grpc/proto/aircraft/aircraft';
import {
  Airport,
  AirportByCodeRequest,
  AirportList,
} from './generated/src/grpc/proto/airport/airport';
import {
  Booking,
  BookingByRefRequest,
  BookingEvent,
  BookingList,
} from './generated/src/grpc/proto/booking/booking';
import {
  Flight,
  FlightByIdRequest,
  FlightEvent,
  FlightList,
  FlightStatusEvent,
} from './generated/src/grpc/proto/flight/flight';
import {
  TicketFlight,
  TicketFlightByTicketAndFlightIdRequest,
  TicketFlightList,
} from './generated/src/grpc/proto/ticket-flight/ticket-flight';
import {
  Ticket,
  TicketByNoRequest,
  TicketList,
} from './generated/src/grpc/proto/ticket/ticket';
import { GrpcService } from './grpc.service';

@Controller()
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  // Flight Service
  @GrpcMethod('FlightService', 'GetAllFlights')
  async getAllFlights(): Promise<FlightList> {
    return this.grpcService.getAllFlights();
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
  async getAllBookings(): Promise<BookingList> {
    return this.grpcService.getAllBookings();
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
  async getAllAircrafts(): Promise<AircraftList> {
    return this.grpcService.getAllAircrafts();
  }

  @GrpcMethod('AircraftService', 'GetAircraftByCode')
  async getAircraftByCode(data: AircraftByCodeRequest): Promise<Aircraft> {
    return this.grpcService.getAircraftByCode(data.aircraftCode);
  }

  // Airport Service
  @GrpcMethod('AirportService', 'GetAllAirports')
  async getAllAirports(): Promise<AirportList> {
    return this.grpcService.getAllAirports();
  }

  @GrpcMethod('AirportService', 'GetAirportByCode')
  async getAirportByCode(data: AirportByCodeRequest): Promise<Airport> {
    return this.grpcService.getAirportByCode(data.airportCode);
  }

  // Ticket Service
  @GrpcMethod('TicketService', 'GetAllTickets')
  async getAllTickets(): Promise<TicketList> {
    return this.grpcService.getAllTickets();
  }

  @GrpcMethod('TicketService', 'GetTicketByNo')
  async getTicketByNo(data: TicketByNoRequest): Promise<Ticket> {
    return this.grpcService.getTicketByNo(data.ticketNo);
  }

  // TicketFlight Service
  @GrpcMethod('TicketFlightService', 'GetAllTicketFlights')
  async getAllTicketFlights(): Promise<TicketFlightList> {
    return this.grpcService.getAllTicketFlights();
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
