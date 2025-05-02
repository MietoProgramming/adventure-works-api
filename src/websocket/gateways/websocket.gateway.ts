import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PaginationDto } from '../../domains/core/models/pagination.dto';
import { WebsocketService } from '../websocket.service';

interface SocketWithAuth extends Socket {
  clientId?: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: SocketWithAuth) {
    const clientId = client.id;
    client.clientId = clientId;
    console.log(`Client connected: ${clientId}`);
  }

  handleDisconnect(client: SocketWithAuth) {
    console.log(`Client disconnected: ${client.clientId}`);
  }

  // Flight events
  @SubscribeMessage('findAllFlights')
  async findAllFlights(@MessageBody() paginationParams?: PaginationParams) {
    const pagination = new PaginationDto(paginationParams);
    const flights = await this.websocketService.findAllFlights(pagination);
    this.server.emit('flights', flights);
    return flights;
  }

  @SubscribeMessage('findFlightById')
  async findFlightById(@MessageBody() id: number) {
    const flight = await this.websocketService.findFlightById(id);
    return flight;
  }

  // Booking events
  @SubscribeMessage('findAllBookings')
  async findAllBookings(@MessageBody() paginationParams?: PaginationParams) {
    const pagination = new PaginationDto(paginationParams);
    const bookings = await this.websocketService.findAllBookings(pagination);
    this.server.emit('bookings', bookings);
    return bookings;
  }

  @SubscribeMessage('findBookingByRef')
  async findBookingByRef(@MessageBody() bookRef: string) {
    const booking = await this.websocketService.findBookingByRef(bookRef);
    return booking;
  }

  // Aircraft events
  @SubscribeMessage('findAllAircrafts')
  async findAllAircrafts(@MessageBody() paginationParams?: PaginationParams) {
    const pagination = new PaginationDto(paginationParams);
    const aircrafts = await this.websocketService.findAllAircrafts(pagination);
    this.server.emit('aircrafts', aircrafts);
    return aircrafts;
  }

  @SubscribeMessage('findAircraftByCode')
  async findAircraftByCode(@MessageBody() aircraftCode: string) {
    const aircraft =
      await this.websocketService.findAircraftByCode(aircraftCode);
    return aircraft;
  }

  // Airport events
  @SubscribeMessage('findAllAirports')
  async findAllAirports(@MessageBody() paginationParams?: PaginationParams) {
    const pagination = new PaginationDto(paginationParams);
    const airports = await this.websocketService.findAllAirports(pagination);
    this.server.emit('airports', airports);
    return airports;
  }

  @SubscribeMessage('findAirportByCode')
  async findAirportByCode(@MessageBody() airportCode: string) {
    const airport = await this.websocketService.findAirportByCode(airportCode);
    return airport;
  }

  // Ticket events
  @SubscribeMessage('findAllTickets')
  async findAllTickets(@MessageBody() paginationParams?: PaginationParams) {
    const pagination = new PaginationDto(paginationParams);
    const tickets = await this.websocketService.findAllTickets(pagination);
    this.server.emit('tickets', tickets);
    return tickets;
  }

  @SubscribeMessage('findTicketByNo')
  async findTicketByNo(@MessageBody() ticketNo: string) {
    const ticket = await this.websocketService.findTicketByNo(ticketNo);
    return ticket;
  }

  // Ticket Flight events
  @SubscribeMessage('findAllTicketFlights')
  async findAllTicketFlights(
    @MessageBody() paginationParams?: PaginationParams,
  ) {
    const pagination = new PaginationDto(paginationParams);
    const ticketFlights =
      await this.websocketService.findAllTicketFlights(pagination);
    this.server.emit('ticketFlights', ticketFlights);
    return ticketFlights;
  }

  @SubscribeMessage('findTicketFlightByTicketAndFlightId')
  async findTicketFlightByTicketAndFlightId(
    @MessageBody() data: { ticketNo: string; flightId: number },
  ) {
    const ticketFlight =
      await this.websocketService.findTicketFlightByTicketAndFlightId(
        data.ticketNo,
        data.flightId,
      );
    return ticketFlight;
  }

  // Room management
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    client.join(room);
    return { event: 'joinRoom', data: { room, clientId: client.clientId } };
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    client.leave(room);
    return { event: 'leaveRoom', data: { room, clientId: client.clientId } };
  }
}
