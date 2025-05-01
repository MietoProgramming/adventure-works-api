import { Aircraft } from '../../aircraft/models/aircraft.model';

export class Seat {
  aircraft_code: string;
  seat_no: string;
  fare_conditions: string;
  aircraft?: Aircraft;
}
