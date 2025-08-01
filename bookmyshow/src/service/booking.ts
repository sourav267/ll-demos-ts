import Booking from "../entities/booking";
import Payment from "../entities/payment";
import { Customer } from "../entities/person";
import Seat from "../entities/seat";
import { PaymentMethod } from "../enums/enum";

class BookingService {
  private activeBookings: Map<string, Booking>;
  private reservationTimeout: number = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.activeBookings = new Map();
    this.startExpirationChecker();
  }

  createBooking(customer: Customer, show: Show, seatIds: string[]): Booking | null {
    const seats = seatIds.map(seatId => show.getScreen().getSeat(seatId)).filter(seat => seat !== undefined) as Seat[];
    
    if (seats.length !== seatIds.length) {
      throw new Error('Some seats not found');
    }

    const booking = new Booking(
      this.generateBookingId(),
      customer,
      show,
      seats
    );

    if (booking.reserveSeats()) {
      this.activeBookings.set(booking.getId(), booking);
      return booking;
    }

    return null;
  }

  confirmBooking(bookingId: string, paymentMethod: PaymentMethod): boolean {
    const booking = this.activeBookings.get(bookingId);
    if (!booking) {
      return false;
    }

    const payment = new Payment(
      this.generatePaymentId(),
      booking.getTotalAmount(),
      paymentMethod,
      this.generateTransactionId()
    );

    const success = booking.confirmBooking(payment);
    if (success) {
      this.activeBookings.delete(bookingId);
    }

    return success;
  }

  cancelBooking(bookingId: string): boolean {
    const booking = this.activeBookings.get(bookingId);
    if (booking) {
      const success = booking.cancelBooking();
      this.activeBookings.delete(bookingId);
      return success;
    }
    return false;
  }

  private startExpirationChecker(): void {
    setInterval(() => {
      const expiredBookings: string[] = [];
      
      this.activeBookings.forEach((booking, bookingId) => {
        if (booking.isExpired()) {
          booking.cancelBooking();
          expiredBookings.push(bookingId);
        }
      });

      expiredBookings.forEach(bookingId => {
        this.activeBookings.delete(bookingId);
      });
    }, 60000); // Check every minute
  }

  private generateBookingId(): string {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  private generatePaymentId(): string {
    return 'PAY' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  private generateTransactionId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
}

export default BookingService;