import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Aircraft } from '../models/aircraft.model';
import { AircraftRepository } from './aircraft.repository';

@Injectable()
export class AircraftRepositoryImpl implements AircraftRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Aircraft[]> {
    return this.prisma.aircrafts_data.findMany({
      include: {
        seats: true,
      },
    });
  }

  async findById(id: string): Promise<Aircraft | null> {
    return this.findByCode(id);
  }

  async findByCode(aircraftCode: string): Promise<Aircraft | null> {
    return this.prisma.aircrafts_data.findUnique({
      where: { aircraft_code: aircraftCode },
      include: {
        seats: true,
        flights: true,
      },
    });
  }

  async create(data: Prisma.aircrafts_dataCreateInput): Promise<Aircraft> {
    return this.prisma.aircrafts_data.create({
      data,
      include: {
        seats: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.aircrafts_dataUpdateInput,
  ): Promise<Aircraft> {
    return this.prisma.aircrafts_data.update({
      where: { aircraft_code: id },
      data,
      include: {
        seats: true,
      },
    });
  }

  async delete(id: string): Promise<Aircraft> {
    return this.prisma.aircrafts_data.delete({
      where: { aircraft_code: id },
      include: {
        seats: true,
      },
    });
  }
}
