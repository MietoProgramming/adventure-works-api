import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { EventBusService } from '../../../domains/core/events/event-bus.service';
import {
  FlightCreatedEvent,
  FlightStatusChangedEvent,
  FlightUpdatedEvent,
} from '../../../domains/flight/events/flight.events';
import { WebsocketGateway } from '../../gateways/websocket.gateway';

@Injectable()
export class FlightEventHandler implements OnModuleInit {
  private server: Server;

  constructor(
    private readonly eventBus: EventBusService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  onModuleInit() {
    // Get the server instance from the gateway
    this.server = this.websocketGateway.server;

    // Subscribe to flight creation events
    this.eventBus
      .ofType<FlightCreatedEvent>('flight.created')
      .subscribe((event: FlightCreatedEvent) => {
        this.server.emit('flightCreated', { flight: event.flight });
        // Also send to specific room for those interested only in flight creations
        this.server
          .to('flight-events')
          .emit('flightCreated', { flight: event.flight });
      });

    // Subscribe to flight update events
    this.eventBus
      .ofType<FlightUpdatedEvent>('flight.updated')
      .subscribe((event: FlightUpdatedEvent) => {
        this.server.emit('flightUpdated', { flight: event.flight });
        this.server
          .to('flight-events')
          .emit('flightUpdated', { flight: event.flight });
      });

    // Subscribe to flight status change events
    this.eventBus
      .ofType<FlightStatusChangedEvent>('flight.status.changed')
      .subscribe((event: FlightStatusChangedEvent) => {
        this.server.emit('flightStatusChanged', {
          flight: event.flight,
          previousStatus: event.previousStatus,
          newStatus: event.newStatus,
        });
        this.server.to('flight-events').emit('flightStatusChanged', {
          flight: event.flight,
          previousStatus: event.previousStatus,
          newStatus: event.newStatus,
        });
        // Additional room for status-specific events
        this.server
          .to(`flight-status-${event.flight.flight_id}`)
          .emit('flightStatusChanged', {
            flight: event.flight,
            previousStatus: event.previousStatus,
            newStatus: event.newStatus,
          });
      });
  }
}
