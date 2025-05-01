import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DomainModule } from '../domains/domain.module';
import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';

@Module({
  imports: [
    DomainModule,
    ClientsModule.register([
      {
        name: 'AIRLINE_FLIGHT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.flight',
          protoPath: join(__dirname, 'proto/flight/flight.proto'),
        },
      },
      {
        name: 'AIRLINE_BOOKING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.booking',
          protoPath: join(__dirname, 'proto/booking/booking.proto'),
        },
      },
      {
        name: 'AIRLINE_AIRCRAFT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.aircraft',
          protoPath: join(__dirname, 'proto/aircraft/aircraft.proto'),
        },
      },
      {
        name: 'AIRLINE_AIRPORT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.airport',
          protoPath: join(__dirname, 'proto/airport/airport.proto'),
        },
      },
      {
        name: 'AIRLINE_TICKET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.ticket',
          protoPath: join(__dirname, 'proto/ticket/ticket.proto'),
        },
      },
      {
        name: 'AIRLINE_TICKET_FLIGHT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.ticketflight',
          protoPath: join(__dirname, 'proto/ticket-flight/ticket-flight.proto'),
        },
      },
      {
        name: 'AIRLINE_COMMON_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline.common',
          protoPath: join(__dirname, 'proto/common/common.proto'),
        },
      },
      {
        name: 'AIRLINE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'airline',
          protoPath: join(__dirname, 'proto/airline.proto'),
        },
      },
    ]),
  ],
  controllers: [GrpcController],
  providers: [GrpcService],
  exports: [GrpcService],
})
export class GrpcModule {}
