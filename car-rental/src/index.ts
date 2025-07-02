import Car from "./entities/car";
import Customer from "./entities/customer";
import Payment from "./entities/payment";
import RentalTransaction from "./entities/rentalTransaction";
import Reservation from "./entities/reservation";
import SearchCriteria from "./entities/searchCriteria";
import CarType from "./enums/carType";
import PaymentMethod from "./enums/paymentMethod";
import PaymentStatus from "./enums/paymentStatus";
import ReservationStatus from "./enums/reservationStatus";
import Address from "./interface/address";
import CarInventoryService from "./services/carInventoryService";
import CustomerService from "./services/customerService";
import PaymentService from "./services/paymentService";
import RentalService from "./services/rentalService";
import ReservationService from "./services/reservationService";

class CarRentalSystem {
  private carInventoryService: CarInventoryService;
  private customerService: CustomerService;
  private reservationService: ReservationService;
  private paymentService: PaymentService;
  private rentalService: RentalService;
  private static instance: CarRentalSystem;

  private constructor() {
    this.carInventoryService = new CarInventoryService();
    this.customerService = new CustomerService();
    this.reservationService = new ReservationService(this.carInventoryService);
    this.paymentService = new PaymentService();
    this.rentalService = new RentalService(this.reservationService, this.carInventoryService);
  }

  static getInstance(): CarRentalSystem {
    if (!CarRentalSystem.instance) {
      CarRentalSystem.instance = new CarRentalSystem();
    }
    return CarRentalSystem.instance;
  }

  // Car Management
  addCar(car: Car): void {
    this.carInventoryService.addCar(car);
  }

  searchCars(criteria: SearchCriteria): Car[] {
    return this.carInventoryService.searchCars(criteria);
  }

  // Customer Management
  registerCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer);
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.customerService.getCustomer(customerId);
  }

  // Reservation Management
  makeReservation(
    customerId: string,
    carId: string,
    startDate: Date,
    endDate: Date,
    pickupLocation: string,
    dropoffLocation: string
  ): Reservation | null {
    return this.reservationService.createReservation(
      customerId, carId, startDate, endDate, pickupLocation, dropoffLocation
    );
  }

  confirmReservation(reservationId: string): boolean {
    return this.reservationService.updateReservationStatus(reservationId, ReservationStatus.CONFIRMED);
  }

  cancelReservation(reservationId: string): boolean {
    const cancelled = this.reservationService.cancelReservation(reservationId);
    if (cancelled) {
      // Process refund if payment was made
      const payments = this.paymentService.getPaymentsByReservation(reservationId);
      payments.forEach(payment => {
        if (payment.getStatus() === PaymentStatus.COMPLETED) {
          this.paymentService.refundPayment(payment.getPaymentId());
        }
      });
    }
    return cancelled;
  }

  // Payment Management
  processPayment(
    reservationId: string,
    customerId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    paymentDetails: Map<string, string>
  ): Payment {
    const payment = this.paymentService.processPayment(
      reservationId, customerId, amount, paymentMethod, paymentDetails
    );
    
    // If payment is successful, confirm the reservation
    if (payment.getStatus() === PaymentStatus.COMPLETED) {
      this.confirmReservation(reservationId);
    }
    
    return payment;
  }

  // Rental Management
  startRental(reservationId: string): RentalTransaction | null {
    return this.rentalService.startRental(reservationId);
  }

  completeRental(transactionId: string, endMileage: number): boolean {
    return this.rentalService.completeRental(transactionId, endMileage);
  }

  // Utility Methods
  getCustomerReservations(customerId: string): Reservation[] {
    return this.reservationService.getCustomerReservations(customerId);
  }

  getCustomerRentals(customerId: string): RentalTransaction[] {
    return this.rentalService.getCustomerRentals(customerId);
  }
}

// ============================================================================
// DEMO USAGE
// ============================================================================

// Initialize the system
const carRentalSystem = CarRentalSystem.getInstance();

// Add some cars
const car1 = new Car('ABC-123', 'Toyota', 'Camry', 2022, CarType.INTERMEDIATE, 50, 'New York');
const car2 = new Car('DEF-456', 'BMW', 'X5', 2023, CarType.LUXURY, 120, 'New York');
carRentalSystem.addCar(car1);
carRentalSystem.addCar(car2);

// Register a customer
const customerAddress: Address = {
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'USA'
};

const customer = new Customer(
  'CUST-001',
  'John Doe',
  customerAddress,
  'john@example.com',
  '+1234567890',
  'DL123456789',
  '4111111111111111'
);

carRentalSystem.registerCustomer(customer);

// Search for cars
const searchCriteria = new SearchCriteria('New York', undefined, undefined, CarType.INTERMEDIATE);
const availableCars = carRentalSystem.searchCars(searchCriteria);
console.log('Available cars:', availableCars.length);

// Make a reservation
const startDate = new Date('2024-12-01');
const endDate = new Date('2024-12-05');
const reservation = carRentalSystem.makeReservation(
  'CUST-001',
  'ABC-123',
  startDate,
  endDate,
  'New York Airport',
  'New York Airport'
);

if (reservation) {
  console.log('Reservation created:', reservation.getReservationId());
  
  // Process payment
  const paymentDetails = new Map<string, string>();
  paymentDetails.set('cardNumber', '4111111111111111');
  paymentDetails.set('expiryDate', '12/25');
  paymentDetails.set('cvv', '123');
  
  const payment = carRentalSystem.processPayment(
    reservation.getReservationId(),
    'CUST-001',
    reservation.getTotalCost(),
    PaymentMethod.CREDIT_CARD,
    paymentDetails
  );
  
  console.log('Payment status:', payment.getStatus());
  
  if (payment.getStatus() === PaymentStatus.COMPLETED) {
    // Start rental
    const rental = carRentalSystem.startRental(reservation.getReservationId());
    if (rental) {
      console.log('Rental started:', rental.getTransactionId());
      
      // Complete rental
      const completed = carRentalSystem.completeRental(rental.getTransactionId(), 1500);
      console.log('Rental completed:', completed);
    }
  }
}