import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import {
  BookingCanceledEvent,
  BookingCreatedEvent,
  BookingUpdatedEvent,
} from '../../../domains/booking/events/booking.events';
import { EventBusService } from '../../../domains/core/events/event-bus.service';
import { WebsocketGateway } from '../../gateways/websocket.gateway';

@Injectable()
export class BookingEventHandler implements OnModuleInit {
  private server: Server;

  constructor(
    private readonly eventBus: EventBusService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  onModuleInit() {
    // Get the server instance from the gateway
    this.server = this.websocketGateway.server;

    // Subscribe to booking creation events
    this.eventBus
      .ofType<BookingCreatedEvent>('booking.created')
      .subscribe((event: BookingCreatedEvent) => {
        this.server.emit('bookingCreated', { booking: event.booking });
        // Also send to specific room for those interested only in booking creations
        this.server
          .to('booking-events')
          .emit('bookingCreated', { booking: event.booking });
      });

    // Subscribe to booking update events
    this.eventBus
      .ofType<BookingUpdatedEvent>('booking.updated')
      .subscribe((event: BookingUpdatedEvent) => {
        this.server.emit('bookingUpdated', { booking: event.booking });
        this.server
          .to('booking-events')
          .emit('bookingUpdated', { booking: event.booking });
        // Also notify specific booking room
        this.server
          .to(`booking-${event.booking.book_ref}`)
          .emit('bookingUpdated', {
            booking: event.booking,
          });
      });

    // Subscribe to booking cancellation events
    this.eventBus
      .ofType<BookingCanceledEvent>('booking.canceled')
      .subscribe((event: BookingCanceledEvent) => {
        this.server.emit('bookingCanceled', { booking: event.booking });
        this.server
          .to('booking-events')
          .emit('bookingCanceled', { booking: event.booking });
        // Also notify specific booking room
        this.server
          .to(`booking-${event.booking.book_ref}`)
          .emit('bookingCanceled', {
            booking: event.booking,
          });
      });
  }
}
