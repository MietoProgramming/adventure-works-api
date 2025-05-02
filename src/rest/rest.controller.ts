import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination.dto';
import { RestService } from './rest.service';

@ApiTags('REST API')
@Controller('api')
export class RestController {
  constructor(private readonly restService: RestService) {}

  // Flight endpoints
  @ApiOperation({ summary: 'Get all flights' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('flights')
  findAllFlights(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllFlights(pagination);
  }

  @ApiOperation({ summary: 'Get a flight by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @Get('flights/:id')
  findFlightById(@Param('id', ParseIntPipe) id: number) {
    return this.restService.findFlightById(id);
  }

  // Booking endpoints
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('bookings')
  findAllBookings(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllBookings(pagination);
  }

  @ApiOperation({ summary: 'Get a booking by reference' })
  @ApiParam({ name: 'bookRef', type: 'string' })
  @Get('bookings/:bookRef')
  findBookingByRef(@Param('bookRef') bookRef: string) {
    return this.restService.findBookingByRef(bookRef);
  }

  // Aircraft endpoints
  @ApiOperation({ summary: 'Get all aircrafts' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('aircrafts')
  findAllAircrafts(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllAircrafts(pagination);
  }

  @ApiOperation({ summary: 'Get an aircraft by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @Get('aircrafts/:code')
  findAircraftByCode(@Param('code') code: string) {
    return this.restService.findAircraftByCode(code);
  }

  // Airport endpoints
  @ApiOperation({ summary: 'Get all airports' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('airports')
  findAllAirports(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllAirports(pagination);
  }

  @ApiOperation({ summary: 'Get an airport by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @Get('airports/:code')
  findAirportByCode(@Param('code') code: string) {
    return this.restService.findAirportByCode(code);
  }

  // Ticket endpoints
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('tickets')
  findAllTickets(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllTickets(pagination);
  }

  @ApiOperation({ summary: 'Get a ticket by number' })
  @ApiParam({ name: 'ticketNo', type: 'string' })
  @Get('tickets/:ticketNo')
  findTicketByNo(@Param('ticketNo') ticketNo: string) {
    return this.restService.findTicketByNo(ticketNo);
  }

  // TicketFlight endpoints
  @ApiOperation({ summary: 'Get all ticket flights' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (1-indexed)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page, max 1000',
  })
  @Get('ticket-flights')
  findAllTicketFlights(@Query() pagination: PaginationQueryDto) {
    return this.restService.findAllTicketFlights(pagination);
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
