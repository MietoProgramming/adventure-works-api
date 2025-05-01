import { Field, ObjectType } from '@nestjs/graphql';
import { Aircraft } from './aircraft.model';

@ObjectType()
export class Seat {
  @Field()
  aircraft_code: string;

  @Field()
  seat_no: string;

  @Field()
  fare_conditions: string;

  @Field(() => Aircraft, { nullable: true })
  aircraft?: Aircraft;
}
