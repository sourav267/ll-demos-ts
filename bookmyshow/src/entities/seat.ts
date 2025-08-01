import { SeatStatus, SeatType } from "../enums/enum";

class Seat {
  private id: string;
  private row: string;
  private number: number;
  private type: SeatType;
  private status: SeatStatus;
  private price: number;

  constructor(id: string, row: string, number: number, type: SeatType, price: number) {
    this.id = id;
    this.row = row;
    this.number = number;
    this.type = type;
    this.status = SeatStatus.AVAILABLE;
    this.price = price;
  }

  getId(): string { return this.id; }
  getRow(): string { return this.row; }
  getNumber(): number { return this.number; }
  getType(): SeatType { return this.type; }
  getStatus(): SeatStatus { return this.status; }
  getPrice(): number { return this.price; }
  getSeatNumber(): string { return `${this.row}${this.number}`; }

  isAvailable(): boolean {
    return this.status === SeatStatus.AVAILABLE;
  }

  reserve(): boolean {
    if (this.status === SeatStatus.AVAILABLE) {
      this.status = SeatStatus.RESERVED;
      return true;
    }
    return false;
  }

  book(): boolean {
    if (this.status === SeatStatus.RESERVED) {
      this.status = SeatStatus.BOOKED;
      return true;
    }
    return false;
  }

  release(): boolean {
    if (this.status === SeatStatus.RESERVED) {
      this.status = SeatStatus.AVAILABLE;
      return true;
    }
    return false;
  }
}

export default Seat;