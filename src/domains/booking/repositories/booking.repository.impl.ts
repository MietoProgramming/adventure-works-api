import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../../core/models/pagination.dto';
import { Booking } from '../models/booking.model';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingRepositoryImpl implements BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    pagination?: PaginationDto,
  ): Promise<Booking[] | PaginatedResult<Booking>> {
    const { page, limit } = new PaginationDto(pagination);
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      this.prisma.bookings.findMany({
        skip,
        take: limit,
        include: {
          tickets: true,
        },
      }),
      this.prisma.bookings.count(),
    ]);
    const mappedBookings = bookings.map((booking) => ({
      ...booking,
      total_amount: booking.total_amount.toNumber(),
    }));
    return new PaginatedResult(mappedBookings, total, { page, limit });
  }

  async findById(id: string): Promise<Booking | null> {
    return this.findByRef(id);
  }

  async findByRef(bookRef: string): Promise<Booking | null> {
    const booking = await this.prisma.bookings.findUnique({
      where: { book_ref: bookRef },
      include: {
        tickets: true,
      },
    });

    if (!booking) return null;

    return {
      ...booking,
      total_amount: booking.total_amount.toNumber(),
    };
  }

  async create(data: Prisma.bookingsCreateInput): Promise<Booking> {
    const booking = await this.prisma.bookings.create({
      data,
      include: {
        tickets: true,
      },
    });

    return {
      ...booking,
      total_amount: booking.total_amount.toNumber(),
    };
  }

  async update(id: string, data: Prisma.bookingsUpdateInput): Promise<Booking> {
    const booking = await this.prisma.bookings.update({
      where: { book_ref: id },
      data,
      include: {
        tickets: true,
      },
    });

    return {
      ...booking,
      total_amount: booking.total_amount.toNumber(),
    };
  }

  async delete(id: string): Promise<Booking> {
    const booking = await this.prisma.bookings.delete({
      where: { book_ref: id },
      include: {
        tickets: true,
      },
    });

    return {
      ...booking,
      total_amount: booking.total_amount.toNumber(),
    };
  }
}
