import { Aircraft } from '../../aircraft/models/aircraft.model';
import { Airport } from '../../airport/models/airport.model';
import { TicketFlight } from '../../ticket-flight/models/ticket-flight.model';

export class Flight {
  flight_id: number;
  flight_no: string;
  scheduled_departure: Date;
  scheduled_arrival: Date;
  departure_airport: string;
  arrival_airport: string;
  status: string;
  aircraft_code: string;
  actual_departure?: Date;
  actual_arrival?: Date;
  aircraft?: Aircraft;
  departure_airport_data?: Airport;
  arrival_airport_data?: Airport;
  ticket_flights?: TicketFlight[];
}
