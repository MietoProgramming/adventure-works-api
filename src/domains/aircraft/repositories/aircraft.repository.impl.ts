import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Aircraft } from '../models/aircraft.model';
import { AircraftRepository } from './aircraft.repository';

@Injectable()
export class AircraftRepositoryImpl implements AircraftRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Aircraft[] | PaginatedResult<Aircraft>> {
    const { page, limit } = new PaginationDto(pagination);
    const skip = (page - 1) * limit;

    const [aircrafts, total] = await Promise.all([
      this.prisma.aircrafts_data.findMany({
        skip,
        take: limit,
        include: {
          flights: true,
          seats: true,
        },
      }),
      this.prisma.aircrafts_data.count(),
    ]);

    return new PaginatedResult(aircrafts, total, { page, limit });
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
