import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardingPass } from './boarding-pass.model';
import { Flight } from './flight.model';
import { Ticket } from './ticket.model';

@ObjectType()
export class TicketFlight {
  @Field()
  ticket_no: string;

  @Field(() => Int)
  flight_id: number;

  @Field()
  fare_conditions: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Flight, { nullable: true })
  flight?: Flight;

  @Field(() => Ticket, { nullable: true })
  ticket?: Ticket;

  @Field(() => BoardingPass, { nullable: true })
  boardingPass?: BoardingPass;
}
