import { Field, ObjectType } from '@nestjs/graphql';
import { Flight } from './flight.model';

@ObjectType()
export class FlightStatusChange {
  @Field(() => Flight)
  flight: Flight;

  @Field()
  previousStatus: string;

  @Field()
  newStatus: string;
}
