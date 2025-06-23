import { ParkingFloor } from "../entities/parkingFloor";
import { Vehicle } from "../entities/vehicle";
import {ParkingTicket} from "../entities/parkingTicket";

export class ParkingLot {
  private name: string;
  private address: string;
  private floors: Map<number, ParkingFloor>;
  private activeTickets: Map<string, ParkingTicket>;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
    this.floors = new Map();
    this.activeTickets = new Map();
  }

  addFloor(floor: ParkingFloor): void {
    this.floors.set(floor['floorNumber'], floor);
  }

  parkVehicle(vehicle: Vehicle): ParkingTicket | null {
    // Find available spot across all floors
    for (const floor of this.floors.values()) {
      const availableSpot = floor.findAvailableSpot(vehicle);
      if (availableSpot && availableSpot.parkVehicle(vehicle)) {
        const ticket = new ParkingTicket(vehicle.getLicensePlate(), availableSpot.getSpotNumber());
        this.activeTickets.set(ticket.getTicketId(), ticket);
        return ticket;
      }
    }
    return null; // No available spot
  }

  unparkVehicle(ticketId: string): boolean {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) {
      return false;
    }

    // Find the parking spot and remove vehicle
    for (const floor of this.floors.values()) {
      const spot = floor.getParkingSpot(ticket.getSpotNumber());
      if (spot && spot.getVehicle()?.getLicensePlate() === ticket.getLicensePlate()) {
        spot.removeVehicle();
        ticket.markExit();
        this.activeTickets.delete(ticketId);
        return true;
      }
    }
    return false;
  }

  calculateParkingFee(ticketId: string): number {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) {
      return 0;
    }

    const duration = ticket.calculateParkingDuration();
    // Simple fee structure: $5 per hour
    return duration * 5;
  }

  getAvailableSpotCount(): number {
    let totalCount = 0;
    for (const floor of this.floors.values()) {
      totalCount += floor.getAvailableSpotCount();
    }
    return totalCount;
  }

  isFull(): boolean {
    return this.getAvailableSpotCount() === 0;
  }
}
