import { BaseRepository } from '../../core/repositories/base.repository';
import { Aircraft } from '../models/aircraft.model';

export interface AircraftRepository extends BaseRepository<Aircraft, string> {
  findByCode(aircraftCode: string): Promise<Aircraft | null>;
}
