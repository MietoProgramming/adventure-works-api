import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Airport } from '../models/airport.model';
import { AirportRepository } from './airport.repository';

@Injectable()
export class AirportRepositoryImpl implements AirportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Airport[]> {
    return this.prisma.airports_data.findMany();
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

  // async create(data: Prisma.airports_dataCreateInput): Promise<Airport> {
  //   return this.prisma.airports_data.create({
  //     data,
  //   });
  // }

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
