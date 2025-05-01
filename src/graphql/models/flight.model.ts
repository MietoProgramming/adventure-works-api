import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Aircraft } from './aircraft.model';
import { Airport } from './airport.model';
import { TicketFlight } from './ticket-flight.model';

@ObjectType()
export class Flight {
  @Field(() => Int)
  flight_id: number;

  @Field()
  flight_no: string;

  @Field(() => Date)
  scheduled_departure: Date;

  @Field(() => Date)
  scheduled_arrival: Date;

  @Field()
  departure_airport: string;

  @Field()
  arrival_airport: string;

  @Field()
  status: string;

  @Field()
  aircraft_code: string;

  @Field(() => Date, { nullable: true })
  actual_departure?: Date;

  @Field(() => Date, { nullable: true })
  actual_arrival?: Date;

  @Field(() => Aircraft, { nullable: true })
  aircraft?: Aircraft;

  @Field(() => Airport, { nullable: true })
  departureAirport?: Airport;

  @Field(() => Airport, { nullable: true })
  arrivalAirport?: Airport;

  @Field(() => [TicketFlight], { nullable: true })
  ticketFlights?: TicketFlight[];
}
