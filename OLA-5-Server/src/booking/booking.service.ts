// bookings.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const createdBooking = new this.bookingModel(createBookingDto);
      return await createdBooking.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-throw BadRequestException, which includes the validation details
      }
      if (error.name === 'ValidationError' && error.errors) {
        const validationErrors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));

        throw new BadRequestException({
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        });
      }

      throw new BadRequestException({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
