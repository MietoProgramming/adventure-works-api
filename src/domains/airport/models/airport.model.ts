import { Prisma } from '@prisma/client';
import { Flight } from '../../flight/models/flight.model';

export class Airport {
  airport_code: string;
  airport_name: Prisma.JsonValue;
  city: Prisma.JsonValue;
  timezone: string;
  flights_departure?: Flight[];
  flights_arrival?: Flight[];
}
