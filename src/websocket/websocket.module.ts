import { Module } from '@nestjs/common';
import { DomainModule } from '../domains/domain.module';
import { BookingEventHandler } from './events/handlers/booking-event.handler';
import { FlightEventHandler } from './events/handlers/flight-event.handler';
import { WebsocketGateway } from './gateways/websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [DomainModule],
  providers: [
    WebsocketService,
    WebsocketGateway,
    FlightEventHandler,
    BookingEventHandler,
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}
