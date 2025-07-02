import PaymentMethod from "../enums/paymentMethod";
import PaymentStatus from "../enums/paymentStatus";

class Payment {
  private paymentId: string;
  private reservationId: string;
  private customerId: string;
  private amount: number;
  private paymentMethod: PaymentMethod;
  private status: PaymentStatus;
  private transactionDate: Date;
  private paymentDetails: Map<string, string>;

  constructor(
    paymentId: string,
    reservationId: string,
    customerId: string,
    amount: number,
    paymentMethod: PaymentMethod
  ) {
    this.paymentId = paymentId;
    this.reservationId = reservationId;
    this.customerId = customerId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = PaymentStatus.PENDING;
    this.transactionDate = new Date();
    this.paymentDetails = new Map();
  }

  // Getters
  getPaymentId(): string { return this.paymentId; }
  getReservationId(): string { return this.reservationId; }
  getAmount(): number { return this.amount; }
  getStatus(): PaymentStatus { return this.status; }
  getPaymentMethod(): PaymentMethod { return this.paymentMethod; }

  setStatus(status: PaymentStatus): void { this.status = status; }
  addPaymentDetails(key: string, value: string): void {
    this.paymentDetails.set(key, value);
  }
}

export default Payment;