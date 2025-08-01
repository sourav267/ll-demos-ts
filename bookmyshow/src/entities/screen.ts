import Seat from "./seat";

class Screen {
  private id: string;
  private name: string;
  private totalSeats: number;
  private seats: Map<string, Seat>;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.seats = new Map();
    this.totalSeats = 0;
  }

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getTotalSeats(): number { return this.totalSeats; }

  addSeat(seat: Seat): void {
    this.seats.set(seat.getId(), seat);
    this.totalSeats++;
  }

  getSeat(seatId: string): Seat | undefined {
    return this.seats.get(seatId);
  }

  getAllSeats(): Seat[] {
    return Array.from(this.seats.values());
  }

  getAvailableSeats(): Seat[] {
    return this.getAllSeats().filter(seat => seat.isAvailable());
  }

  getAvailableSeatsCount(): number {
    return this.getAvailableSeats().length;
  }
}

export default Screen;