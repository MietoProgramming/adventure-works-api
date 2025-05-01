import { BaseRepository } from '../../core/repositories/base.repository';
import { Booking } from '../models/booking.model';

export interface BookingRepository extends BaseRepository<Booking, string> {
  findByRef(bookRef: string): Promise<Booking | null>;
}
