import { Field, ObjectType } from '@nestjs/graphql';
import { Flight } from './flight.model';
import { Seat } from './seat.model';

@ObjectType()
export class Aircraft {
  @Field()
  aircraft_code: string;

  @Field()
  model: string;

  @Field(() => Number)
  range: number;

  @Field(() => [Flight], { nullable: true })
  flights?: Flight[];

  @Field(() => [Seat], { nullable: true })
  seats?: Seat[];
}
