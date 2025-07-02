import RentalStatus from "../enums/rentalStatus";

class RentalTransaction {
  private transactionId: string;
  private reservationId: string;
  private customerId: string;
  private carId: string;
  private startDate: Date;
  private endDate: Date;
  private actualStartDate?: Date;
  private actualEndDate?: Date;
  private status: RentalStatus;
  private totalCost: number;
  private additionalCharges: number;
  private createdAt: Date;

  constructor(
    transactionId: string,
    reservationId: string,
    customerId: string,
    carId: string,
    startDate: Date,
    endDate: Date,
    totalCost: number
  ) {
    this.transactionId = transactionId;
    this.reservationId = reservationId;
    this.customerId = customerId;
    this.carId = carId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalCost = totalCost;
    this.status = RentalStatus.ACTIVE;
    this.additionalCharges = 0;
    this.createdAt = new Date();
  }

  // Getters
  getTransactionId(): string { return this.transactionId; }
  getReservationId(): string { return this.reservationId; }
  getCustomerId(): string { return this.customerId; }
  getCarId(): string { return this.carId; }
  getStatus(): RentalStatus { return this.status; }
  getTotalCost(): number { return this.totalCost; }
  getAdditionalCharges(): number { return this.additionalCharges; }
  getEndDate(): Date { return this.endDate; }

  setStatus(status: RentalStatus): void { this.status = status; }
  setActualStartDate(date: Date): void { this.actualStartDate = date; }
  setActualEndDate(date: Date): void { this.actualEndDate = date; }
  addAdditionalCharges(amount: number): void { this.additionalCharges += amount; }

  getFinalCost(): number {
    return this.totalCost + this.additionalCharges;
  }
}

export default RentalTransaction;
