import { BookingStatus } from "../enums/enum";
import Booking from "./booking";
import Movie from "./movies";
import Show from "./show";
import Theater from "./theater";

class Person{
  private id: string;
  private name: string;
  private email: string;
  private phone: string;

  constructor(id: string, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getEmail(): string { return this.email; }
  getPhone(): string { return this.phone; }
}

class Customer extends Person {
  private bookings: Booking[];

  constructor(id: string, name: string, email: string, phone: string) {
    super(id, name, email, phone);
    this.bookings = [];
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  getActiveBookings(): Booking[] {
    return this.bookings.filter(booking => 
      booking.getStatus() === BookingStatus.CONFIRMED
    );
  }
}

class Admin extends Person {
  constructor(id: string, name: string, email: string, phone: string) {
    super(id, name, email, phone);
  }

  addMovie(movie: Movie): boolean {
    // Implementation for adding movie
    return true;
  }

  addShow(show: Show): boolean {
    // Implementation for adding show
    return true;
  }

  addTheater(theater: Theater): boolean {
    // Implementation for adding theater
    return true;
  }
}
export default Person;
export { Customer, Admin };