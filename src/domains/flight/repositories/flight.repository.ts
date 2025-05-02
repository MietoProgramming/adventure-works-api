import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Flight } from '../models/flight.model';

export interface FlightRepository extends BaseRepository<Flight, number> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<Flight[] | PaginatedResult<Flight>>;
  findById(id: number): Promise<Flight | null>;
  findByFlightNumber(flightNo: string): Promise<Flight[]>;
  create(data: any): Promise<Flight>;
  update(id: number, data: any): Promise<Flight>;
  delete(id: number): Promise<Flight>;
}
