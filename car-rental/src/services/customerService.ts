import Customer from "../entities/customer";

class CustomerService {
  private customers: Map<string, Customer>;

  constructor() {
    this.customers = new Map();
  }

  addCustomer(customer: Customer): void {
    this.customers.set(customer.getCustomerId(), customer);
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }

  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }

  updateCustomer(customerId: string, updatedCustomer: Customer): boolean {
    if (this.customers.has(customerId)) {
      this.customers.set(customerId, updatedCustomer);
      return true;
    }
    return false;
  }

  deleteCustomer(customerId: string): boolean {
    return this.customers.delete(customerId);
  }
}

export default CustomerService;