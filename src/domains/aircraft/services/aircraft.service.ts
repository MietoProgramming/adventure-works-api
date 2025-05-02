import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Aircraft } from '../models/aircraft.model';
import { AircraftRepositoryImpl } from '../repositories/aircraft.repository.impl';

@Injectable()
export class AircraftService {
  constructor(private readonly aircraftRepository: AircraftRepositoryImpl) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Aircraft[] | PaginatedResult<Aircraft>> {
    pagination = new PaginationDto(pagination);
    return this.aircraftRepository.findAll(pagination);
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
