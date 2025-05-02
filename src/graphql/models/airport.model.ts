import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Flight } from './flight.model';
import { PageInfo } from './pagination.model';

@ObjectType()
export class Airport {
  @Field()
  airport_code: string;

  @Field()
  airport_name: string;

  @Field()
  city: string;

  @Field(() => Float, { nullable: true })
  coordinates_lon?: number;

  @Field(() => Float, { nullable: true })
  coordinates_lat?: number;

  @Field()
  timezone: string;

  @Field(() => [Flight], { nullable: true })
  departureFlights?: Flight[];

  @Field(() => [Flight], { nullable: true })
  arrivalFlights?: Flight[];
}

@ObjectType()
export class PaginatedAirports {
  @Field(() => [Airport])
  data: Airport[];

  @Field(() => PageInfo)
  meta: PageInfo;
}
