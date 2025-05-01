import { BoardingPass } from '../../boarding-pass/models/boarding-pass.model';
import { Flight } from '../../flight/models/flight.model';
import { Ticket } from '../../ticket/models/ticket.model';

export class TicketFlight {
  ticket_no: string;
  flight_id: number;
  fare_conditions: string;
  amount: number;
  ticket?: Ticket;
  flight?: Flight;
  boarding_passes?: BoardingPass;
}
