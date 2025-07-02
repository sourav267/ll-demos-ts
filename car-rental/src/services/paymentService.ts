import Payment from "../entities/payment";
import PaymentMethod from "../enums/paymentMethod";
import PaymentStatus from "../enums/paymentStatus";

class PaymentService {
  private payments: Map<string, Payment>;

  constructor() {
    this.payments = new Map();
  }

  processPayment(
    reservationId: string,
    customerId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    paymentDetails: Map<string, string>
  ): Payment {
    const paymentId = this.generatePaymentId();
    const payment = new Payment(paymentId, reservationId, customerId, amount, paymentMethod);
    
    // Add payment details
    paymentDetails.forEach((value, key) => {
      payment.addPaymentDetails(key, value);
    });

    // Simulate payment processing
    const isPaymentSuccessful = this.simulatePaymentProcessing(paymentMethod, paymentDetails);
    
    if (isPaymentSuccessful) {
      payment.setStatus(PaymentStatus.COMPLETED);
    } else {
      payment.setStatus(PaymentStatus.FAILED);
    }

    this.payments.set(paymentId, payment);
    return payment;
  }

  getPayment(paymentId: string): Payment | undefined {
    return this.payments.get(paymentId);
  }

  getPaymentsByReservation(reservationId: string): Payment[] {
    return Array.from(this.payments.values()).filter(
      payment => payment.getReservationId() === reservationId
    );
  }

  refundPayment(paymentId: string): boolean {
    const payment = this.payments.get(paymentId);
    if (payment && payment.getStatus() === PaymentStatus.COMPLETED) {
      payment.setStatus(PaymentStatus.REFUNDED);
      return true;
    }
    return false;
  }

  private generatePaymentId(): string {
    return 'PAY-' + Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  }

  private simulatePaymentProcessing(
    paymentMethod: PaymentMethod, 
    paymentDetails: Map<string, string>
  ): boolean {
    // Simulate payment processing logic
    // In real implementation, this would integrate with payment gateways
    return Math.random() > 0.1; // 90% success rate for simulation
  }
}

export default PaymentService;