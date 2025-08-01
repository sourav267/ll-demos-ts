import { BookingStatus, PaymentStatus } from "../enums/enum";
import Payment from "./payment";
import { Customer } from "./person";
import Seat from "./seat";
import Show from "./show";

class Booking {
  private id: string;
  private customer: Customer;
  private show: Show;
  private seats: Seat[];
  private status: BookingStatus;
  private bookingTime: Date;
  private totalAmount: number;
  private payment?: Payment;

  constructor(id: string, customer: Customer, show: Show, seats: Seat[]) {
    this.id = id;
    this.customer = customer;
    this.show = show;
    this.seats = seats;
    this.status = BookingStatus.PENDING;
    this.bookingTime = new Date();
    this.totalAmount = this.calculateTotalAmount();
  }

  getId(): string { return this.id; }
  getCustomer(): Customer { return this.customer; }
  getShow(): Show { return this.show; }
  getSeats(): Seat[] { return this.seats; }
  getStatus(): BookingStatus { return this.status; }
  getBookingTime(): Date { return this.bookingTime; }
  getTotalAmount(): number { return this.totalAmount; }
  getPayment(): Payment | undefined { return this.payment; }

  private calculateTotalAmount(): number {
    return this.seats.reduce((total, seat) => total + seat.getPrice(), 0);
  }

  reserveSeats(): boolean {
    // Try to reserve all seats atomically
    const reservedSeats: Seat[] = [];
    
    for (const seat of this.seats) {
      if (seat.reserve()) {
        reservedSeats.push(seat);
      } else {
        // Release already reserved seats if any seat reservation fails
        reservedSeats.forEach(reservedSeat => reservedSeat.release());
        return false;
      }
    }
    return true;
  }

  confirmBooking(payment: Payment): boolean {
    if (payment.processPayment()) {
      this.payment = payment;
      this.status = BookingStatus.CONFIRMED;
      
      // Book all reserved seats
      this.seats.forEach(seat => seat.book());
      this.customer.addBooking(this);
      return true;
    } else {
      this.cancelBooking();
      return false;
    }
  }

  cancelBooking(): boolean {
    if (this.status === BookingStatus.PENDING) {
      this.seats.forEach(seat => seat.release());
    }
    
    this.status = BookingStatus.CANCELLED;
    
    if (this.payment && this.payment.getStatus() === PaymentStatus.COMPLETED) {
      return this.payment.refund();
    }
    
    return true;
  }

  isExpired(): boolean {
    const now = new Date();
    const expirationTime = new Date(this.bookingTime.getTime() + 15 * 60000); // 15 minutes
    return now > expirationTime && this.status === BookingStatus.PENDING;
  }
}

export default Booking;