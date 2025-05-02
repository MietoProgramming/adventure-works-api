import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Airport } from '../models/airport.model';
import { AirportRepositoryImpl } from '../repositories/airport.repository.impl';

@Injectable()
export class AirportService {
  constructor(private readonly airportRepository: AirportRepositoryImpl) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Airport[] | PaginatedResult<Airport>> {
    pagination = new PaginationDto(pagination);
    return this.airportRepository.findAll(pagination);
  }

  async findByCode(airportCode: string): Promise<Airport | null> {
    return this.airportRepository.findByCode(airportCode);
  }

  async update(code: string, data: any): Promise<Airport> {
    return this.airportRepository.update(code, data);
  }

  async delete(code: string): Promise<Airport> {
    return this.airportRepository.delete(code);
  }
}
