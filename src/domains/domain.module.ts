import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventBusService } from './core/events/event-bus.service';

// Import repositories
import { AircraftRepositoryImpl } from './aircraft/repositories/aircraft.repository.impl';
import { AirportRepositoryImpl } from './airport/repositories/airport.repository.impl';
import { BookingRepositoryImpl } from './booking/repositories/booking.repository.impl';
import { FlightRepositoryImpl } from './flight/repositories/flight.repository.impl';
import { TicketFlightRepositoryImpl } from './ticket-flight/repositories/ticket-flight.repository.impl';
import { TicketRepositoryImpl } from './ticket/repositories/ticket.repository.impl';

// Import services
import { AircraftService } from './aircraft/services/aircraft.service';
import { AirportService } from './airport/services/airport.service';
import { BookingService } from './booking/services/booking.service';
import { FlightService } from './flight/services/flight.service';
import { TicketFlightService } from './ticket-flight/services/ticket-flight.service';
import { TicketService } from './ticket/services/ticket.service';

@Module({
  providers: [
    PrismaService,
    EventBusService,

    // Repository implementations
    AircraftRepositoryImpl,
    AirportRepositoryImpl,
    BookingRepositoryImpl,
    FlightRepositoryImpl,
    TicketRepositoryImpl,
    TicketFlightRepositoryImpl,

    // Domain services
    AircraftService,
    AirportService,
    BookingService,
    FlightService,
    TicketService,
    TicketFlightService,
  ],
  exports: [
    // Export domain services to be used by other modules
    AircraftService,
    AirportService,
    BookingService,
    FlightService,
    TicketService,
    TicketFlightService,
    EventBusService,
  ],
})
export class DomainModule {}
