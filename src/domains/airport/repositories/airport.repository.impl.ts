import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Airport } from '../models/airport.model';
import { AirportRepository } from './airport.repository';

@Injectable()
export class AirportRepositoryImpl implements AirportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Airport[] | PaginatedResult<Airport>> {
    const { page, limit } = new PaginationDto(pagination);
    const skip = (page - 1) * limit;

    const [airports, total] = await Promise.all([
      this.prisma.airports_data.findMany({
        skip,
        take: limit,
        include: {
          flights_flights_arrival_airportToairports_data: true,
          flights_flights_departure_airportToairports_data: true,
        },
      }),
      this.prisma.airports_data.count(),
    ]);

    return new PaginatedResult(airports, total, { page, limit });
  }

  async findById(id: string): Promise<Airport | null> {
    return this.findByCode(id);
  }

  async findByCode(airportCode: string): Promise<Airport | null> {
    return this.prisma.airports_data.findUnique({
      where: { airport_code: airportCode },
      include: {
        flights_flights_arrival_airportToairports_data: true,
        flights_flights_departure_airportToairports_data: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.airports_dataUpdateInput,
  ): Promise<Airport> {
    return this.prisma.airports_data.update({
      where: { airport_code: id },
      data,
    });
  }

  async delete(id: string): Promise<Airport> {
    return this.prisma.airports_data.delete({
      where: { airport_code: id },
    });
  }
}
