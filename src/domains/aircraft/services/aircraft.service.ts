import { Injectable } from '@nestjs/common';
import { Aircraft } from '../models/aircraft.model';
import { AircraftRepositoryImpl } from '../repositories/aircraft.repository.impl';

@Injectable()
export class AircraftService {
  constructor(private readonly aircraftRepository: AircraftRepositoryImpl) {}

  async findAll(): Promise<Aircraft[]> {
    return this.aircraftRepository.findAll();
  }

  async findByCode(aircraftCode: string): Promise<Aircraft | null> {
    return this.aircraftRepository.findByCode(aircraftCode);
  }

  async create(data: any): Promise<Aircraft> {
    return this.aircraftRepository.create(data);
  }

  async update(code: string, data: any): Promise<Aircraft> {
    return this.aircraftRepository.update(code, data);
  }

  async delete(code: string): Promise<Aircraft> {
    return this.aircraftRepository.delete(code);
  }
}
