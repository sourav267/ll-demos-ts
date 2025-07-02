import Reservation from "../entities/reservation";
import CarStatus from "../enums/carStatus";
import ReservationStatus from "../enums/reservationStatus";
import CarInventoryService from "./carInventoryService";

class ReservationService {
  private reservations: Map<string, Reservation>;
  private carInventoryService: CarInventoryService;

  constructor(carInventoryService: CarInventoryService) {
    this.reservations = new Map();
    this.carInventoryService = carInventoryService;
  }

  createReservation(
    customerId: string,
    carId: string,
    startDate: Date,
    endDate: Date,
    pickupLocation: string,
    dropoffLocation: string
  ): Reservation | null {
    const car = this.carInventoryService.getCar(carId);
    if (!car || !car.isAvailable()) {
      return null;
    }

    const reservationId = this.generateReservationId();
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalCost = duration * car.getDailyRate();

    const reservation = new Reservation(
      reservationId,
      customerId,
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      totalCost
    );

    this.reservations.set(reservationId, reservation);
    this.carInventoryService.updateCarStatus(carId, CarStatus.RENTED);
    
    return reservation;
  }

  getReservation(reservationId: string): Reservation | undefined {
    return this.reservations.get(reservationId);
  }

  getCustomerReservations(customerId: string): Reservation[] {
    return Array.from(this.reservations.values()).filter(
      reservation => reservation.getCustomerId() === customerId
    );
  }

  updateReservationStatus(reservationId: string, status: ReservationStatus): boolean {
    const reservation = this.reservations.get(reservationId);
    if (reservation) {
      reservation.setStatus(status);
      
      // If reservation is cancelled, make car available again
      if (status === ReservationStatus.CANCELLED) {
        this.carInventoryService.updateCarStatus(reservation.getCarId(), CarStatus.AVAILABLE);
      }
      
      return true;
    }
    return false;
  }

  cancelReservation(reservationId: string): boolean {
    return this.updateReservationStatus(reservationId, ReservationStatus.CANCELLED);
  }

  private generateReservationId(): string {
    return 'RES-' + Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  }
}

export default ReservationService;