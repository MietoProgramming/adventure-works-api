import { PaginatedResult, PaginationDto } from '../models/pagination.dto';

export interface BaseRepository<T, ID> {
  findAll(pagination?: PaginationDto): Promise<T[] | PaginatedResult<T>>;
  findById(id: ID): Promise<T | null>;
  create?(data: any): Promise<T>;
  update(id: ID, data: any): Promise<T>;
  delete(id: ID): Promise<T>;
}
