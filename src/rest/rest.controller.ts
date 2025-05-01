import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RestService } from './rest.service';

@ApiTags('REST API')
@Controller('api')
export class RestController {
  constructor(private readonly restService: RestService) {}

  // Flight endpoints
  @ApiOperation({ summary: 'Get all flights' })
  @Get('flights')
  findAllFlights() {
    return this.restService.findAllFlights();
  }

  @ApiOperation({ summary: 'Get a flight by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @Get('flights/:id')
  findFlightById(@Param('id', ParseIntPipe) id: number) {
    return this.restService.findFlightById(id);
  }

  // Booking endpoints
  @ApiOperation({ summary: 'Get all bookings' })
  @Get('bookings')
  findAllBookings() {
    return this.restService.findAllBookings();
  }

  @ApiOperation({ summary: 'Get a booking by reference' })
  @ApiParam({ name: 'bookRef', type: 'string' })
  @Get('bookings/:bookRef')
  findBookingByRef(@Param('bookRef') bookRef: string) {
    return this.restService.findBookingByRef(bookRef);
  }

  // Aircraft endpoints
  @ApiOperation({ summary: 'Get all aircrafts' })
  @Get('aircrafts')
  findAllAircrafts() {
    return this.restService.findAllAircrafts();
  }

  @ApiOperation({ summary: 'Get an aircraft by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @Get('aircrafts/:code')
  findAircraftByCode(@Param('code') code: string) {
    return this.restService.findAircraftByCode(code);
  }

  // Airport endpoints
  @ApiOperation({ summary: 'Get all airports' })
  @Get('airports')
  findAllAirports() {
    return this.restService.findAllAirports();
  }

  @ApiOperation({ summary: 'Get an airport by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @Get('airports/:code')
  findAirportByCode(@Param('code') code: string) {
    return this.restService.findAirportByCode(code);
  }

  // Ticket endpoints
  @ApiOperation({ summary: 'Get all tickets' })
  @Get('tickets')
  findAllTickets() {
    return this.restService.findAllTickets();
  }

  @ApiOperation({ summary: 'Get a ticket by number' })
  @ApiParam({ name: 'ticketNo', type: 'string' })
  @Get('tickets/:ticketNo')
  findTicketByNo(@Param('ticketNo') ticketNo: string) {
    return this.restService.findTicketByNo(ticketNo);
  }

  // TicketFlight endpoints
  @ApiOperation({ summary: 'Get all ticket flights' })
  @Get('ticket-flights')
  findAllTicketFlights() {
    return this.restService.findAllTicketFlights();
  }

  @ApiOperation({
    summary: 'Get a ticket flight by ticket number and flight ID',
  })
  @ApiParam({ name: 'ticketNo', type: 'string' })
  @ApiParam({ name: 'flightId', type: 'number' })
  @Get('ticket-flights/:ticketNo/:flightId')
  findTicketFlightByTicketAndFlightId(
    @Param('ticketNo') ticketNo: string,
    @Param('flightId', ParseIntPipe) flightId: number,
  ) {
    return this.restService.findTicketFlightByTicketAndFlightId(
      ticketNo,
      flightId,
    );
  }
}
