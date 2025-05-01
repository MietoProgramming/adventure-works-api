import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  BookingCanceledEvent,
  BookingCreatedEvent,
  BookingUpdatedEvent,
} from '../domains/booking/events/booking.events';
import { EventBusService } from '../domains/core/events/event-bus.service';
import {
  FlightCreatedEvent,
  FlightStatusChangedEvent,
  FlightUpdatedEvent,
} from '../domains/flight/events/flight.events';
import { GraphqlService } from './graphql.service';
import { Aircraft } from './models/aircraft.model';
import { Airport } from './models/airport.model';
import { Booking } from './models/booking.model';
import { FlightStatusChange } from './models/flight-status-change.model';
import { Flight } from './models/flight.model';
import { TicketFlight } from './models/ticket-flight.model';
import { Ticket } from './models/ticket.model';

// Define subscription event names
export const FLIGHT_CREATED = 'flightCreated';
export const FLIGHT_UPDATED = 'flightUpdated';
export const FLIGHT_STATUS_CHANGED = 'flightStatusChanged';
export const BOOKING_CREATED = 'bookingCreated';
export const BOOKING_UPDATED = 'bookingUpdated';
export const BOOKING_CANCELED = 'bookingCanceled';

@Resolver()
export class GraphqlResolver implements OnModuleInit {
  constructor(
    private readonly graphqlService: GraphqlService,
    private readonly eventBus: EventBusService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  // Set up listeners for domain events when module initializes
  onModuleInit() {
    // Subscribe to flight events
    this.eventBus
      .ofType<FlightCreatedEvent>('flight.created')
      .subscribe((event: FlightCreatedEvent) => {
        this.pubSub.publish(FLIGHT_CREATED, { flightCreated: event.flight });
      });

    this.eventBus
      .ofType<FlightUpdatedEvent>('flight.updated')
      .subscribe((event: FlightUpdatedEvent) => {
        this.pubSub.publish(FLIGHT_UPDATED, { flightUpdated: event.flight });
      });

    this.eventBus
      .ofType<FlightStatusChangedEvent>('flight.status.changed')
      .subscribe((event: FlightStatusChangedEvent) => {
        this.pubSub.publish(FLIGHT_STATUS_CHANGED, {
          flightStatusChanged: {
            flight: event.flight,
            previousStatus: event.previousStatus,
            newStatus: event.newStatus,
          },
        });
      });

    // Subscribe to booking events
    this.eventBus
      .ofType<BookingCreatedEvent>('booking.created')
      .subscribe((event: BookingCreatedEvent) => {
        this.pubSub.publish(BOOKING_CREATED, { bookingCreated: event.booking });
      });

    this.eventBus
      .ofType<BookingUpdatedEvent>('booking.updated')
      .subscribe((event: BookingUpdatedEvent) => {
        this.pubSub.publish(BOOKING_UPDATED, { bookingUpdated: event.booking });
      });

    this.eventBus
      .ofType<BookingCanceledEvent>('booking.canceled')
      .subscribe((event: BookingCanceledEvent) => {
        this.pubSub.publish(BOOKING_CANCELED, {
          bookingCanceled: event.booking,
        });
      });
  }

  // Flight queries
  @Query(() => [Flight], { name: 'flights' })
  findAllFlights() {
    return this.graphqlService.findAllFlights();
  }

  @Query(() => Flight, { name: 'flight' })
  findFlightById(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlService.findFlightById(id);
  }

  // Booking queries
  @Query(() => [Booking], { name: 'bookings' })
  findAllBookings() {
    return this.graphqlService.findAllBookings();
  }

  @Query(() => Booking, { name: 'booking' })
  findBookingByRef(@Args('bookRef') bookRef: string) {
    return this.graphqlService.findBookingByRef(bookRef);
  }

  // Aircraft queries
  @Query(() => [Aircraft], { name: 'aircrafts' })
  findAllAircrafts() {
    return this.graphqlService.findAllAircrafts();
  }

  @Query(() => Aircraft, { name: 'aircraft' })
  findAircraftByCode(@Args('aircraftCode') aircraftCode: string) {
    return this.graphqlService.findAircraftByCode(aircraftCode);
  }

  // Airport queries
  @Query(() => [Airport], { name: 'airports' })
  findAllAirports() {
    return this.graphqlService.findAllAirports();
  }

  @Query(() => Airport, { name: 'airport' })
  findAirportByCode(@Args('airportCode') airportCode: string) {
    return this.graphqlService.findAirportByCode(airportCode);
  }

  // Ticket queries
  @Query(() => [Ticket], { name: 'tickets' })
  findAllTickets() {
    return this.graphqlService.findAllTickets();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findTicketByNo(@Args('ticketNo') ticketNo: string) {
    return this.graphqlService.findTicketByNo(ticketNo);
  }

  // TicketFlight queries
  @Query(() => [TicketFlight], { name: 'ticketFlights' })
  findAllTicketFlights() {
    return this.graphqlService.findAllTicketFlights();
  }

  @Query(() => TicketFlight, { name: 'ticketFlight' })
  findTicketFlightByTicketAndFlightId(
    @Args('ticketNo') ticketNo: string,
    @Args('flightId', { type: () => Int }) flightId: number,
  ) {
    return this.graphqlService.findTicketFlightByTicketAndFlightId(
      ticketNo,
      flightId,
    );
  }

  // Subscriptions
  @Subscription(() => Flight, { name: 'flightCreated' })
  subscribeToFlightCreated() {
    return (this.pubSub as any).asyncIterator(FLIGHT_CREATED);
  }

  @Subscription(() => Flight, { name: 'flightUpdated' })
  subscribeToFlightUpdated() {
    return (this.pubSub as any).asyncIterator(FLIGHT_UPDATED);
  }

  @Subscription(() => FlightStatusChange, { name: 'flightStatusChanged' })
  subscribeToFlightStatusChanged() {
    return (this.pubSub as any).asyncIterator(FLIGHT_STATUS_CHANGED);
  }

  @Subscription(() => Booking, { name: 'bookingCreated' })
  subscribeToBookingCreated() {
    return (this.pubSub as any).asyncIterator(BOOKING_CREATED);
  }

  @Subscription(() => Booking, { name: 'bookingUpdated' })
  subscribeToBookingUpdated() {
    return (this.pubSub as any).asyncIterator(BOOKING_UPDATED);
  }

  @Subscription(() => Booking, { name: 'bookingCanceled' })
  subscribeToBookingCanceled() {
    return (this.pubSub as any).asyncIterator(BOOKING_CANCELED);
  }
}
