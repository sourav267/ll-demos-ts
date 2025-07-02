import RentalTransaction from "../entities/rentalTransaction";
import CarStatus from "../enums/carStatus";
import RentalStatus from "../enums/rentalStatus";
import ReservationStatus from "../enums/reservationStatus";
import CarInventoryService from "./carInventoryService";
import ReservationService from "./reservationService";

class RentalService {
  private rentals: Map<string, RentalTransaction>;
  private reservationService: ReservationService;
  private carInventoryService: CarInventoryService;

  constructor(reservationService: ReservationService, carInventoryService: CarInventoryService) {
    this.rentals = new Map();
    this.reservationService = reservationService;
    this.carInventoryService = carInventoryService;
  }

  startRental(reservationId: string): RentalTransaction | null {
    const reservation = this.reservationService.getReservation(reservationId);
    if (!reservation || reservation.getStatus() !== ReservationStatus.CONFIRMED) {
      return null;
    }

    const transactionId = this.generateTransactionId();
    const rental = new RentalTransaction(
      transactionId,
      reservationId,
      reservation.getCustomerId(),
      reservation.getCarId(),
      reservation.getStartDate(),
      reservation.getEndDate(),
      reservation.getTotalCost()
    );

    rental.setActualStartDate(new Date());
    this.rentals.set(transactionId, rental);
    
    return rental;
  }

  completeRental(transactionId: string, endMileage: number): boolean {
    const rental = this.rentals.get(transactionId);
    if (!rental || rental.getStatus() !== RentalStatus.ACTIVE) {
      return false;
    }

    rental.setActualEndDate(new Date());
    rental.setStatus(RentalStatus.COMPLETED);
    
    // Update car status and mileage
    const car = this.carInventoryService.getCar(rental.getCarId());
    if (car) {
      car.setMileage(endMileage);
      car.setStatus(CarStatus.AVAILABLE);
    }

    // Calculate additional charges if any (late fees, etc.)
    this.calculateAdditionalCharges(rental);

    return true;
  }

  getRental(transactionId: string): RentalTransaction | undefined {
    return this.rentals.get(transactionId);
  }

  getCustomerRentals(customerId: string): RentalTransaction[] {
    return Array.from(this.rentals.values()).filter(
      rental => rental.getCustomerId() === customerId
    );
  }

  private calculateAdditionalCharges(rental: RentalTransaction): void {
    // Implement logic for additional charges (late fees, damage fees, etc.)
    // This is a simplified example
    const actualEndDate = new Date();
    const plannedEndDate = rental.getEndDate();
    
    if (actualEndDate > plannedEndDate) {
      const lateDays = Math.ceil((actualEndDate.getTime() - plannedEndDate.getTime()) / (1000 * 60 * 60 * 24));
      const lateFee = lateDays * 50; // $50 per late day
      rental.addAdditionalCharges(lateFee);
    }
  }

  private generateTransactionId(): string {
    return 'TXN-' + Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  }
}

export default RentalService;