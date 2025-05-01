import { Field, ObjectType } from '@nestjs/graphql';
import { Booking } from './booking.model';
import { TicketFlight } from './ticket-flight.model';

@ObjectType()
export class Ticket {
  @Field()
  ticket_no: string;

  @Field()
  book_ref: string;

  @Field()
  passenger_id: string;

  @Field()
  passenger_name: string;

  @Field({ nullable: true })
  contact_data?: string;

  @Field(() => Booking, { nullable: true })
  booking?: Booking;

  @Field(() => [TicketFlight], { nullable: true })
  ticketFlights?: TicketFlight[];
}
