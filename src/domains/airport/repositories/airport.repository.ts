import { BaseRepository } from '../../core/repositories/base.repository';
import { Airport } from '../models/airport.model';

export interface AirportRepository extends BaseRepository<Airport, string> {
  findByCode(airportCode: string): Promise<Airport | null>;
}
