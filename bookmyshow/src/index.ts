import Movie from "./entities/movies";
import { Admin, Customer } from "./entities/person";
import Show from "./entities/show";
import Theater from "./entities/theater";
import { PaymentMethod } from "./enums/enum";
import BookingService from "./service/booking";

class BookMyShowSystem {
  // private searchService: SearchService;
  private bookingService: BookingService;
  private customers: Map<string, Customer>;
  private admins: Map<string, Admin>;
  private movies: Movie[];
  private theaters: Theater[];
  private shows: Show[];

  constructor() {
    this.customers = new Map();
    this.admins = new Map();
    this.movies = [];
    this.theaters = [];
    this.shows = [];
    // this.searchService = new SearchService(this.shows);
    this.bookingService = new BookingService();
  }

  // User Management
  registerCustomer(id: string, name: string, email: string, phone: string): Customer {
    const customer = new Customer(id, name, email, phone);
    this.customers.set(id, customer);
    return customer;
  }

  registerAdmin(id: string, name: string, email: string, phone: string): Admin {
    const admin = new Admin(id, name, email, phone);
    this.admins.set(id, admin);
    return admin;
  }

  // Content Management
  addMovie(movie: Movie): void {
    this.movies.push(movie);
  }

  addTheater(theater: Theater): void {
    this.theaters.push(theater);
  }

  // addShow(show: Show): void {
  //   this.shows.push(show);
  //   this.searchService = new SearchService(this.shows); // Refresh search service
  // }

  // Search Operations
  // searchMovies(criteria: SearchCriteria): Show[] {
  //   return this.searchService.searchShows(criteria);
  // }

  // getMoviesInCity(city: string): Movie[] {
  //   return this.searchService.getMoviesInCity(city);
  // }

  // getTheatersForMovie(movieId: string, city: string): Theater[] {
  //   return this.searchService.getTheatersForMovie(movieId, city);
  // }

  // getShowsForMovieAndTheater(movieId: string, theaterId: string, date: Date): Show[] {
  //   return this.searchService.getShowsForMovieAndTheater(movieId, theaterId, date);
  // }

  // Booking Operations
  bookTickets(customerId: string, showId: string, seatIds: string[]): Booking | null {
    const customer = this.customers.get(customerId);
    const show = this.shows.find(s => s.getId() === showId);

    if (!customer || !show) {
      return null;
    }

    return this.bookingService.createBooking(customer, show, seatIds);
  }

  confirmBooking(bookingId: string, paymentMethod: PaymentMethod): boolean {
    return this.bookingService.confirmBooking(bookingId, paymentMethod);
  }

  cancelBooking(bookingId: string): boolean {
    return this.bookingService.cancelBooking(bookingId);
  }
}