import { Prisma } from '@prisma/client';

// Import related models
import { Seat } from 'src/domains/core/models/seat.model';
import { Flight } from '../../flight/models/flight.model';

export class Aircraft {
  aircraft_code: string;
  model: Prisma.JsonValue;
  range: number;
  seats?: Seat[];
  flights?: Flight[];
}
