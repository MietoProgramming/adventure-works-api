import { DomainEvent } from '../../core/events/domain-event.base';
import { Booking } from '../models/booking.model';

export class BookingCreatedEvent extends DomainEvent {
  readonly booking: Booking;

  constructor(booking: Booking) {
    super('booking.created');
    this.booking = booking;
  }
}

export class BookingUpdatedEvent extends DomainEvent {
  readonly booking: Booking;

  constructor(booking: Booking) {
    super('booking.updated');
    this.booking = booking;
  }
}

export class BookingCanceledEvent extends DomainEvent {
  readonly booking: Booking;

  constructor(booking: Booking) {
    super('booking.canceled');
    this.booking = booking;
  }
}
