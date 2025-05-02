import { Injectable } from '@nestjs/common';
import { EventBusService } from '../../core/events/event-bus.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import {
  FlightCreatedEvent,
  FlightStatusChangedEvent,
  FlightUpdatedEvent,
} from '../events/flight.events';
import { Flight } from '../models/flight.model';
import { FlightRepositoryImpl } from '../repositories/flight.repository.impl';

@Injectable()
export class FlightService {
  constructor(
    private readonly flightRepository: FlightRepositoryImpl,
    private readonly eventBus: EventBusService,
  ) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Flight[] | PaginatedResult<Flight>> {
    pagination = new PaginationDto(pagination);
    return this.flightRepository.findAll(pagination);
  }

  async findById(id: number): Promise<Flight | null> {
    return this.flightRepository.findById(id);
  }

  async findByFlightNumber(flightNo: string): Promise<Flight[]> {
    return this.flightRepository.findByFlightNumber(flightNo);
  }

  async create(data: any): Promise<Flight> {
    const flight = await this.flightRepository.create(data);
    this.eventBus.publish(new FlightCreatedEvent(flight));
    return flight;
  }

  async update(id: number, data: any): Promise<Flight> {
    const oldFlight = await this.flightRepository.findById(id);
    const flight = await this.flightRepository.update(id, data);

    // Publish general update event
    this.eventBus.publish(new FlightUpdatedEvent(flight));

    // If status has changed, publish a status changed event
    if (oldFlight && data.status && oldFlight.status !== data.status) {
      this.eventBus.publish(
        new FlightStatusChangedEvent(flight, oldFlight.status, flight.status),
      );
    }

    return flight;
  }

  async delete(id: number): Promise<Flight> {
    return this.flightRepository.delete(id);
  }
}
