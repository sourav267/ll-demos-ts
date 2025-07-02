import ReservationStatus from "../enums/reservationStatus";

class Reservation {
  private reservationId: string;
  private customerId: string;
  private carId: string;
  private startDate: Date;
  private endDate: Date;
  private pickupLocation: string;
  private dropoffLocation: string;
  private status: ReservationStatus;
  private totalCost: number;
  private createdAt: Date;

  constructor(
    reservationId: string,
    customerId: string,
    carId: string,
    startDate: Date,
    endDate: Date,
    pickupLocation: string,
    dropoffLocation: string,
    totalCost: number
  ) {
    this.reservationId = reservationId;
    this.customerId = customerId;
    this.carId = carId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.totalCost = totalCost;
    this.status = ReservationStatus.PENDING;
    this.createdAt = new Date();
  }

  // Getters
  getReservationId(): string { return this.reservationId; }
  getCustomerId(): string { return this.customerId; }
  getCarId(): string { return this.carId; }
  getStartDate(): Date { return this.startDate; }
  getEndDate(): Date { return this.endDate; }
  getPickupLocation(): string { return this.pickupLocation; }
  getDropoffLocation(): string { return this.dropoffLocation; }
  getStatus(): ReservationStatus { return this.status; }
  getTotalCost(): number { return this.totalCost; }
  getCreatedAt(): Date { return this.createdAt; }

  setStatus(status: ReservationStatus): void { this.status = status; }

  getDurationInDays(): number {
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

export default Reservation;