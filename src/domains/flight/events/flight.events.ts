import { DomainEvent } from '../../core/events/domain-event.base';
import { Flight } from '../models/flight.model';

export class FlightCreatedEvent extends DomainEvent {
  readonly flight: Flight;

  constructor(flight: Flight) {
    super('flight.created');
    this.flight = flight;
  }
}

export class FlightUpdatedEvent extends DomainEvent {
  readonly flight: Flight;

  constructor(flight: Flight) {
    super('flight.updated');
    this.flight = flight;
  }
}

export class FlightStatusChangedEvent extends DomainEvent {
  readonly flight: Flight;
  readonly previousStatus: string;
  readonly newStatus: string;

  constructor(flight: Flight, previousStatus: string, newStatus: string) {
    super('flight.status.changed');
    this.flight = flight;
    this.previousStatus = previousStatus;
    this.newStatus = newStatus;
  }
}
