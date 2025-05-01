import { Prisma } from '@prisma/client';
import { Booking } from '../../booking/models/booking.model';
import { TicketFlight } from '../../ticket-flight/models/ticket-flight.model';

export class Ticket {
  ticket_no: string;
  book_ref: string;
  passenger_id: string;
  passenger_name: string;
  contact_data?: Prisma.JsonValue;
  booking?: Booking;
  ticket_flights?: TicketFlight[];
}
