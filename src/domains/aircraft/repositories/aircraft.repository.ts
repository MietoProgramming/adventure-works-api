import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Aircraft } from '../models/aircraft.model';

export interface AircraftRepository extends BaseRepository<Aircraft, string> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<Aircraft[] | PaginatedResult<Aircraft>>;
  findByCode(aircraftCode: string): Promise<Aircraft | null>;
  create(data: any): Promise<Aircraft>;
  update(code: string, data: any): Promise<Aircraft>;
  delete(code: string): Promise<Aircraft>;
}
