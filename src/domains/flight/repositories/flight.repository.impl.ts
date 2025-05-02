import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Flight } from '../models/flight.model';
import { FlightRepository } from './flight.repository';

@Injectable()
export class FlightRepositoryImpl implements FlightRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Flight[] | PaginatedResult<Flight>> {
    const { page, limit } = new PaginationDto(pagination);
    const skip = (page - 1) * limit;

    const [flights, total] = await Promise.all([
      this.prisma.flights.findMany({
        skip,
        take: limit,
        include: {
          aircrafts_data: true,
          airports_data_flights_arrival_airportToairports_data: true,
          airports_data_flights_departure_airportToairports_data: true,
        },
      }),
      this.prisma.flights.count(),
    ]);

    return new PaginatedResult(flights, total, { page, limit });
  }

  async findById(id: number): Promise<Flight | null> {
    return this.prisma.flights.findUnique({
      where: { flight_id: id },
      include: {
        aircrafts_data: true,
        airports_data_flights_arrival_airportToairports_data: true,
        airports_data_flights_departure_airportToairports_data: true,
      },
    });
  }

  async findByFlightNumber(flightNo: string): Promise<Flight[]> {
    return this.prisma.flights.findMany({
      where: { flight_no: flightNo },
      include: {
        aircrafts_data: true,
        airports_data_flights_arrival_airportToairports_data: true,
        airports_data_flights_departure_airportToairports_data: true,
      },
    });
  }

  async create(data: Prisma.flightsCreateInput): Promise<Flight> {
    return this.prisma.flights.create({
      data,
      include: {
        aircrafts_data: true,
        airports_data_flights_arrival_airportToairports_data: true,
        airports_data_flights_departure_airportToairports_data: true,
      },
    });
  }

  async update(id: number, data: Prisma.flightsUpdateInput): Promise<Flight> {
    return this.prisma.flights.update({
      where: { flight_id: id },
      data,
      include: {
        aircrafts_data: true,
        airports_data_flights_arrival_airportToairports_data: true,
        airports_data_flights_departure_airportToairports_data: true,
      },
    });
  }

  async delete(id: number): Promise<Flight> {
    return this.prisma.flights.delete({
      where: { flight_id: id },
      include: {
        aircrafts_data: true,
        airports_data_flights_arrival_airportToairports_data: true,
        airports_data_flights_departure_airportToairports_data: true,
      },
    });
  }
}
