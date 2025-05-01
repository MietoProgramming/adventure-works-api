import { Injectable } from '@nestjs/common';
import { Airport } from '../models/airport.model';
import { AirportRepositoryImpl } from '../repositories/airport.repository.impl';

@Injectable()
export class AirportService {
  constructor(private readonly airportRepository: AirportRepositoryImpl) {}

  async findAll(): Promise<Airport[]> {
    return this.airportRepository.findAll();
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
