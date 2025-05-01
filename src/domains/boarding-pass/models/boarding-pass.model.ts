import { TicketFlight } from '../../ticket-flight/models/ticket-flight.model';

export class BoardingPass {
  ticket_no: string;
  flight_id: number;
  boarding_no: number;
  seat_no: string;
  ticket_flight?: TicketFlight;
}
