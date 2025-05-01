import { Field, ObjectType } from '@nestjs/graphql';
import { Ticket } from './ticket.model';

@ObjectType()
export class Booking {
  @Field()
  book_ref: string;

  @Field(() => Date)
  book_date: Date;

  @Field(() => Number)
  total_amount: number;

  @Field(() => [Ticket], { nullable: true })
  tickets?: Ticket[];
}
