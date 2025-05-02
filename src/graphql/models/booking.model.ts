import { Field, Float, ObjectType } from '@nestjs/graphql';
import { PageInfo } from './pagination.model';
import { Ticket } from './ticket.model';

@ObjectType()
export class Booking {
  @Field()
  book_ref: string;

  @Field()
  book_date: Date;

  @Field(() => Float)
  total_amount: number;

  @Field(() => [Ticket], { nullable: true })
  tickets?: Ticket[];
}

@ObjectType()
export class PaginatedBookings {
  @Field(() => [Booking])
  data: Booking[];

  @Field(() => PageInfo)
  meta: PageInfo;
}
