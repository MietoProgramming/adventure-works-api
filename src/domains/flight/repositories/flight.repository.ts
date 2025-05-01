import { BaseRepository } from '../../core/repositories/base.repository';
import { Flight } from '../models/flight.model';

export interface FlightRepository extends BaseRepository<Flight, number> {
  findByFlightNumber(flightNo: string): Promise<Flight[]>;
}
