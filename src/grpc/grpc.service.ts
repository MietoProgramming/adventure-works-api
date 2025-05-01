import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { AircraftService } from '../domains/aircraft/services/aircraft.service';
import { AirportService } from '../domains/airport/services/airport.service';
import { BookingService } from '../domains/booking/services/booking.service';
import { EventBusService } from '../domains/core/events/event-bus.service';
import { FlightService } from '../domains/flight/services/flight.service';
import { TicketFlightService } from '../domains/ticket-flight/services/ticket-flight.service';
import { TicketService } from '../domains/ticket/services/ticket.service';
// Import from specific proto files in the generated directory structure
import {
  Aircraft,
  AircraftList,
} from './generated/src/grpc/proto/aircraft/aircraft';
import {
  Airport,
  AirportList,
} from './generated/src/grpc/proto/airport/airport';
import {
  BookingEvent,
  BookingList,
} from './generated/src/grpc/proto/booking/booking';
import {
  FlightEvent,
  FlightList,
  FlightStatusEvent,
} from './generated/src/grpc/proto/flight/flight';
import {
  TicketFlight,
  TicketFlightList,
} from './generated/src/grpc/proto/ticket-flight/ticket-flight';
import { Ticket, TicketList } from './generated/src/grpc/proto/ticket/ticket';
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

  // Flight methods
  async getAllFlights(): Promise<FlightList> {
    const flights = await this.flightService.findAll();
    return {
      flights: flights.map((flight) =>
        this.mapDomainFlightToProtoFlight(flight),
      ),
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
  async getAllBookings(): Promise<BookingList> {
    const bookings = await this.bookingService.findAll();
    return {
      bookings: bookings.map((booking) =>
        this.mapDomainBookingToProtoBooking(booking),
      ),
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
  async getAllAircrafts(): Promise<AircraftList> {
    const aircrafts = await this.aircraftService.findAll();
    return {
      aircrafts: aircrafts.map((aircraft) => ({
        aircraftCode: aircraft.aircraft_code,
        model: String(aircraft.model),
        range: aircraft.range,
      })),
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
  async getAllAirports(): Promise<AirportList> {
    const airports = await this.airportService.findAll();
    return {
      airports: airports.map((airport) => ({
        airportCode: airport.airport_code,
        airportName: String(airport.airport_name),
        city: String(airport.city),
        timezone: airport.timezone,
      })),
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
  async getAllTickets(): Promise<TicketList> {
    const tickets = await this.ticketService.findAll();
    return {
      tickets: tickets.map((ticket) => ({
        ticketNo: ticket.ticket_no,
        bookRef: ticket.book_ref,
        passengerId: ticket.passenger_id,
        passengerName: ticket.passenger_name,
        contactData: String(ticket.contact_data),
      })),
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
  async getAllTicketFlights(): Promise<TicketFlightList> {
    const ticketFlights = await this.ticketFlightService.findAll();
    return {
      ticketFlights: ticketFlights.map((tf) => ({
        ticketNo: tf.ticket_no,
        flightId: tf.flight_id,
        fareConditions: tf.fare_conditions,
        amount: tf.amount,
      })),
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
