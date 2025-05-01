import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TicketFlight } from './ticket-flight.model';

@ObjectType()
export class BoardingPass {
  @Field()
  ticket_no: string;

  @Field(() => Int)
  flight_id: number;

  @Field(() => Int)
  boarding_no: number;

  @Field()
  seat_no: string;

  @Field(() => TicketFlight, { nullable: true })
  ticketFlight?: TicketFlight;
}
