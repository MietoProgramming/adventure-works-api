import { Injectable } from '@nestjs/common';
import { EventBusService } from '../../core/events/event-bus.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import {
  BookingCanceledEvent,
  BookingCreatedEvent,
  BookingUpdatedEvent,
} from '../events/booking.events';
import { Booking } from '../models/booking.model';
import { BookingRepositoryImpl } from '../repositories/booking.repository.impl';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepositoryImpl,
    private readonly eventBus: EventBusService,
  ) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Booking[] | PaginatedResult<Booking>> {
    pagination = new PaginationDto(pagination);
    return this.bookingRepository.findAll(pagination);
  }

  async findByRef(bookRef: string): Promise<Booking | null> {
    return this.bookingRepository.findByRef(bookRef);
  }

  async create(data: any): Promise<Booking> {
    const booking = await this.bookingRepository.create(data);
    this.eventBus.publish(new BookingCreatedEvent(booking));
    return booking;
  }

  async update(bookRef: string, data: any): Promise<Booking> {
    const booking = await this.bookingRepository.update(bookRef, data);
    this.eventBus.publish(new BookingUpdatedEvent(booking));
    return booking;
  }

  async cancel(bookRef: string): Promise<Booking> {
    // In a real application, you might have specific cancellation logic
    const booking = await this.bookingRepository.findByRef(bookRef);
    // Apply cancellation logic here
    if (booking) {
      this.eventBus.publish(new BookingCanceledEvent(booking));
    }
    return booking;
  }

  async delete(bookRef: string): Promise<Booking> {
    return this.bookingRepository.delete(bookRef);
  }
}
