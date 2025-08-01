import { PaymentMethod, PaymentStatus } from "../enums/enum";

class Payment {
  private id: string;
  private amount: number;
  private method: PaymentMethod;
  private status: PaymentStatus;
  private transactionId: string;
  private timestamp: Date;

  constructor(
    id: string,
    amount: number,
    method: PaymentMethod,
    transactionId: string
  ) {
    this.id = id;
    this.amount = amount;
    this.method = method;
    this.status = PaymentStatus.PENDING;
    this.transactionId = transactionId;
    this.timestamp = new Date();
  }

  getId(): string { return this.id; }
  getAmount(): number { return this.amount; }
  getMethod(): PaymentMethod { return this.method; }
  getStatus(): PaymentStatus { return this.status; }
  getTransactionId(): string { return this.transactionId; }
  getTimestamp(): Date { return this.timestamp; }

  processPayment(): boolean {
    // Simulate payment processing
    try {
      // Payment gateway integration logic here
      this.status = PaymentStatus.COMPLETED;
      return true;
    } catch (error) {
      this.status = PaymentStatus.FAILED;
      return false;
    }
  }

  refund(): boolean {
    if (this.status === PaymentStatus.COMPLETED) {
      this.status = PaymentStatus.REFUNDED;
      return true;
    }
    return false;
  }
}

export default Payment;