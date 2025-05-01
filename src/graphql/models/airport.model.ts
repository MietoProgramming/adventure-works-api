import { Field, ObjectType } from '@nestjs/graphql';
import { Flight } from './flight.model';

@ObjectType()
export class Airport {
  @Field()
  airport_code: string;

  @Field()
  airport_name: string;

  @Field()
  city: string;

  @Field()
  timezone: string;

  @Field(() => [Flight], { nullable: true })
  departures?: Flight[];

  @Field(() => [Flight], { nullable: true })
  arrivals?: Flight[];
}
