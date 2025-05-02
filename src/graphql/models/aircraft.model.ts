import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Flight } from './flight.model';
import { PageInfo } from './pagination.model';
import { Seat } from './seat.model';

@ObjectType()
export class Aircraft {
  @Field()
  aircraft_code: string;

  @Field()
  model: string;

  @Field(() => Float)
  range: number;

  @Field(() => [Flight], { nullable: true })
  flights?: Flight[];

  @Field(() => [Seat], { nullable: true })
  seats?: Seat[];
}

@ObjectType()
export class PaginatedAircrafts {
  @Field(() => [Aircraft])
  data: Aircraft[];

  @Field(() => PageInfo)
  meta: PageInfo;
}
