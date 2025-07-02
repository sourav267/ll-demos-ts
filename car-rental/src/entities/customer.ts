import Address from "../interface/address";
import Person from "../interface/person";

class Customer implements Person {
  private customerId: string;
  name: string;
  address: Address;
  email: string;
  phone: string;
  private licenseNumber: string;
  private creditCard: string;

  constructor(
    customerId: string,
    name: string,
    address: Address,
    email: string,
    phone: string,
    licenseNumber: string,
    creditCard: string
  ) {
    this.customerId = customerId;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.licenseNumber = licenseNumber;
    this.creditCard = creditCard;
  }

  getCustomerId(): string { return this.customerId; }
  getLicenseNumber(): string { return this.licenseNumber; }
  getCreditCard(): string { return this.creditCard; }
}

export default Customer;