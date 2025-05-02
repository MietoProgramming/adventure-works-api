import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Airport } from '../models/airport.model';

export interface AirportRepository extends BaseRepository<Airport, string> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<Airport[] | PaginatedResult<Airport>>;
  findByCode(airportCode: string): Promise<Airport | null>;
  update(code: string, data: any): Promise<Airport>;
  delete(code: string): Promise<Airport>;
}
