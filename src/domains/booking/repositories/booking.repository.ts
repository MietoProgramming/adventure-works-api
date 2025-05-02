import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { BaseRepository } from '../../core/repositories/base.repository';
import { Booking } from '../models/booking.model';

export interface BookingRepository extends BaseRepository<Booking, string> {
  findAll(
    pagination?: PaginationDto,
  ): Promise<Booking[] | PaginatedResult<Booking>>;
  findByRef(bookRef: string): Promise<Booking | null>;
  create(data: any): Promise<Booking>;
  update(bookRef: string, data: any): Promise<Booking>;
  delete(bookRef: string): Promise<Booking>;
}
