import { Booking } from '../domains/booking/models/booking.model';
import { Flight } from '../domains/flight/models/flight.model';

// Re-exporting the domain events from their original locations
export {
  FlightCreatedEvent,
  FlightStatusChangedEvent,
  FlightUpdatedEvent,
} from '../domains/flight/events/flight.events';

export {
  BookingCanceledEvent,
  BookingCreatedEvent,
  BookingUpdatedEvent,
} from '../domains/booking/events/booking.events';

// Type definitions for gRPC message payloads
export interface FlightEventPayload {
  flight: Flight;
}

export interface FlightStatusEventPayload {
  flight: Flight;
  previousStatus: string;
  newStatus: string;
}

export interface BookingEventPayload {
  booking: Booking;
}
