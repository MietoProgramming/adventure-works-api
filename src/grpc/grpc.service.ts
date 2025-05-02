import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { AircraftService } from '../domains/aircraft/services/aircraft.service';
import { AirportService } from '../domains/airport/services/airport.service';
import { BookingService } from '../domains/booking/services/booking.service';
import { EventBusService } from '../domains/core/events/event-bus.service';
import { PaginationDto } from '../domains/core/models/pagination.dto';
import { FlightService } from '../domains/flight/services/flight.service';
import { TicketFlightService } from '../domains/ticket-flight/services/ticket-flight.service';
import { TicketService } from '../domains/ticket/services/ticket.service';
// Import from specific proto files in the generated directory structure
import { Aircraft, PaginatedAircraftList } from './generated/aircraft';
import { Airport, PaginatedAirportList } from './generated/airport';
import { BookingEvent, PaginatedBookingList } from './generated/booking';
import {
  FlightEvent,
  FlightStatusEvent,
  PaginatedFlightList,
} from './generated/flight';
import { PaginatedTicketList, Ticket } from './generated/ticket';
import {
  PaginatedTicketFlightList,
  TicketFlight,
} from './generated/ticket-flight';
// Import domain event types
import {
  BookingCanceledEvent,
  BookingCreatedEvent,
  BookingUpdatedEvent,
} from '../domains/booking/events/booking.events';
import {
  FlightCreatedEvent,
  FlightStatusChangedEvent,
  FlightUpdatedEvent,
} from '../domains/flight/events/flight.events';

@Injectable()
export class GrpcService implements OnModuleInit {
  constructor(
    private readonly aircraftService: AircraftService,
    private readonly airportService: AirportService,
    private readonly bookingService: BookingService,
    private readonly flightService: FlightService,
    private readonly ticketService: TicketService,
    private readonly ticketFlightService: TicketFlightService,
    private readonly eventBus: EventBusService,
  ) {}

  // Event streams for real-time updates
  private flightCreatedSubject = new Subject<FlightEvent>();
  private flightUpdatedSubject = new Subject<FlightEvent>();
  private flightStatusChangedSubject = new Subject<FlightStatusEvent>();
  private bookingCreatedSubject = new Subject<BookingEvent>();
  private bookingUpdatedSubject = new Subject<BookingEvent>();
  private bookingCanceledSubject = new Subject<BookingEvent>();

  // Observable streams for clients
  flightCreated$ = this.flightCreatedSubject.asObservable();
  flightUpdated$ = this.flightUpdatedSubject.asObservable();
  flightStatusChanged$ = this.flightStatusChangedSubject.asObservable();
  bookingCreated$ = this.bookingCreatedSubject.asObservable();
  bookingUpdated$ = this.bookingUpdatedSubject.asObservable();
  bookingCanceled$ = this.bookingCanceledSubject.asObservable();

  onModuleInit() {
    // Subscribe to domain events and pipe them to our subjects
    this.eventBus
      .ofType<FlightCreatedEvent>('flight.created')
      .subscribe((event: FlightCreatedEvent) => {
        this.flightCreatedSubject.next({
          flight: this.mapDomainFlightToProtoFlight(event.flight),
        });
      });

    this.eventBus
      .ofType<FlightUpdatedEvent>('flight.updated')
      .subscribe((event: FlightUpdatedEvent) => {
        this.flightUpdatedSubject.next({
          flight: this.mapDomainFlightToProtoFlight(event.flight),
        });
      });

    this.eventBus
      .ofType<FlightStatusChangedEvent>('flight.status.changed')
      .subscribe((event: FlightStatusChangedEvent) => {
        this.flightStatusChangedSubject.next({
          flight: this.mapDomainFlightToProtoFlight(event.flight),
          previousStatus: event.previousStatus,
          newStatus: event.newStatus,
        });
      });

    this.eventBus
      .ofType<BookingCreatedEvent>('booking.created')
      .subscribe((event: BookingCreatedEvent) => {
        this.bookingCreatedSubject.next({
          booking: this.mapDomainBookingToProtoBooking(event.booking),
        });
      });

    this.eventBus
      .ofType<BookingUpdatedEvent>('booking.updated')
      .subscribe((event: BookingUpdatedEvent) => {
        this.bookingUpdatedSubject.next({
          booking: this.mapDomainBookingToProtoBooking(event.booking),
        });
      });

    this.eventBus
      .ofType<BookingCanceledEvent>('booking.canceled')
      .subscribe((event: BookingCanceledEvent) => {
        this.bookingCanceledSubject.next({
          booking: this.mapDomainBookingToProtoBooking(event.booking),
        });
      });
  }

  // Helper methods to map domain models to proto types
  private mapDomainFlightToProtoFlight(flight: any): any {
    return {
      id: flight.flight_id,
      flightNo: flight.flight_no,
      scheduledDeparture: flight.scheduled_departure?.toString() || '',
      scheduledArrival: flight.scheduled_arrival?.toString() || '',
      departureAirport: flight.departure_airport,
      arrivalAirport: flight.arrival_airport,
      status: flight.status || '',
      aircraftCode: flight.aircraft_code,
      actualDeparture: flight.actual_departure || 0,
      actualArrival: flight.actual_arrival || 0,
    };
  }

  private mapDomainBookingToProtoBooking(booking: any): any {
    return {
      bookRef: booking.book_ref,
      bookDate: booking.book_date?.toString() || '',
      totalAmount: booking.total_amount || 0,
    };
  }

  private createPageInfo(paginatedResult: any): any {
    if (!paginatedResult.meta) {
      return {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 1,
      };
    }

    return {
      totalItems: paginatedResult.meta.totalItems,
      itemCount: paginatedResult.meta.itemCount,
      itemsPerPage: paginatedResult.meta.itemsPerPage,
      totalPages: paginatedResult.meta.totalPages,
      currentPage: paginatedResult.meta.currentPage,
    };
  }

  // Flight methods
  async getAllFlights(request: any): Promise<PaginatedFlightList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.flightService.findAll(pagination);

    let flights = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      flights = result.data.map((flight) =>
        this.mapDomainFlightToProtoFlight(flight),
      );
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      flights = result.map((flight) =>
        this.mapDomainFlightToProtoFlight(flight),
      );
    }

    return {
      flights: flights,
      pageInfo: pageInfo,
    };
  }

  async getFlightById(id: number): Promise<any> {
    const flight = await this.flightService.findById(id);
    return this.mapDomainFlightToProtoFlight(flight);
  }

  streamFlightCreated(): Observable<FlightEvent> {
    return this.flightCreated$;
  }

  streamFlightUpdated(): Observable<FlightEvent> {
    return this.flightUpdated$;
  }

  streamFlightStatusChanged(): Observable<FlightStatusEvent> {
    return this.flightStatusChanged$;
  }

  // Booking methods
  async getAllBookings(request: any): Promise<PaginatedBookingList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.bookingService.findAll(pagination);

    let bookings = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      bookings = result.data.map((booking) =>
        this.mapDomainBookingToProtoBooking(booking),
      );
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      bookings = result.map((booking) =>
        this.mapDomainBookingToProtoBooking(booking),
      );
    }

    return {
      bookings: bookings,
      pageInfo: pageInfo,
    };
  }

  async getBookingByRef(bookRef: string): Promise<any> {
    const booking = await this.bookingService.findByRef(bookRef);
    return this.mapDomainBookingToProtoBooking(booking);
  }

  streamBookingCreated(): Observable<BookingEvent> {
    return this.bookingCreated$;
  }

  streamBookingUpdated(): Observable<BookingEvent> {
    return this.bookingUpdated$;
  }

  streamBookingCanceled(): Observable<BookingEvent> {
    return this.bookingCanceled$;
  }

  // Aircraft methods
  async getAllAircrafts(request: any): Promise<PaginatedAircraftList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.aircraftService.findAll(pagination);

    let aircrafts = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      aircrafts = result.data.map((aircraft) => ({
        aircraftCode: aircraft.aircraft_code,
        model: String(aircraft.model),
        range: aircraft.range,
      }));
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      aircrafts = result.map((aircraft) => ({
        aircraftCode: aircraft.aircraft_code,
        model: String(aircraft.model),
        range: aircraft.range,
      }));
    }

    return {
      aircrafts: aircrafts,
      pageInfo: pageInfo,
    };
  }

  async getAircraftByCode(aircraftCode: string): Promise<Aircraft> {
    const aircraft = await this.aircraftService.findByCode(aircraftCode);
    return {
      aircraftCode: aircraft.aircraft_code,
      model: String(aircraft.model),
      range: aircraft.range,
    };
  }

  // Airport methods
  async getAllAirports(request: any): Promise<PaginatedAirportList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.airportService.findAll(pagination);

    let airports = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      airports = result.data.map((airport) => ({
        airportCode: airport.airport_code,
        airportName: String(airport.airport_name),
        city: String(airport.city),
        timezone: airport.timezone,
      }));
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      airports = result.map((airport) => ({
        airportCode: airport.airport_code,
        airportName: String(airport.airport_name),
        city: String(airport.city),
        timezone: airport.timezone,
      }));
    }

    return {
      airports: airports,
      pageInfo: pageInfo,
    };
  }

  async getAirportByCode(airportCode: string): Promise<Airport> {
    const airport = await this.airportService.findByCode(airportCode);
    return {
      airportCode: airport.airport_code,
      airportName: String(airport.airport_name),
      city: String(airport.city),
      timezone: airport.timezone,
    };
  }

  // Ticket methods
  async getAllTickets(request: any): Promise<PaginatedTicketList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.ticketService.findAll(pagination);

    let tickets = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      tickets = result.data.map((ticket) => ({
        ticketNo: ticket.ticket_no,
        bookRef: ticket.book_ref,
        passengerId: ticket.passenger_id,
        passengerName: ticket.passenger_name,
        contactData: String(ticket.contact_data),
      }));
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      tickets = result.map((ticket) => ({
        ticketNo: ticket.ticket_no,
        bookRef: ticket.book_ref,
        passengerId: ticket.passenger_id,
        passengerName: ticket.passenger_name,
        contactData: String(ticket.contact_data),
      }));
    }

    return {
      tickets: tickets,
      pageInfo: pageInfo,
    };
  }

  async getTicketByNo(ticketNo: string): Promise<Ticket> {
    const ticket = await this.ticketService.findByTicketNo(ticketNo);
    return {
      ticketNo: ticket.ticket_no,
      bookRef: ticket.book_ref,
      passengerId: ticket.passenger_id,
      passengerName: ticket.passenger_name,
      contactData: String(ticket.contact_data),
    };
  }

  // TicketFlight methods
  async getAllTicketFlights(request: any): Promise<PaginatedTicketFlightList> {
    const pagination = new PaginationDto({
      page: request.pagination?.page || 1,
      limit: Math.min(request.pagination?.limit || 100, 1000),
    });

    const result = await this.ticketFlightService.findAll(pagination);

    let ticketFlights = [];
    let pageInfo = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: pagination.limit,
      totalPages: 0,
      currentPage: pagination.page,
    };

    if ('data' in result && Array.isArray(result.data)) {
      ticketFlights = result.data.map((tf) => ({
        ticketNo: tf.ticket_no,
        flightId: tf.flight_id,
        fareConditions: tf.fare_conditions,
        amount: tf.amount,
      }));
      pageInfo = this.createPageInfo(result);
    } else if (Array.isArray(result)) {
      ticketFlights = result.map((tf) => ({
        ticketNo: tf.ticket_no,
        flightId: tf.flight_id,
        fareConditions: tf.fare_conditions,
        amount: tf.amount,
      }));
    }

    return {
      ticketFlights: ticketFlights,
      pageInfo: pageInfo,
    };
  }

  async getTicketFlightByTicketAndFlightId(
    ticketNo: string,
    flightId: number,
  ): Promise<TicketFlight> {
    const ticketFlight = await this.ticketFlightService.findByTicketAndFlightId(
      ticketNo,
      flightId,
    );
    return {
      ticketNo: ticketFlight.ticket_no,
      flightId: ticketFlight.flight_id,
      fareConditions: ticketFlight.fare_conditions,
      amount: ticketFlight.amount,
    };
  }
}
