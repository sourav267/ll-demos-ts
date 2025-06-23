import { ParkingSpot } from "./parkingSpot";
import { Vehicle } from "./vehicle";

export class ParkingFloor {
    private floorNumber: number;
    private parkingSpots: Map<number, ParkingSpot>;

    constructor(floorNumber: number) {
        this.floorNumber = floorNumber;
        this.parkingSpots = new Map();
    }

    addParkingSpot(spot: ParkingSpot): void {
        this.parkingSpots.set(spot.getSpotNumber(), spot);
    }

    findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
        for (const spot of this.parkingSpots.values()) {
            if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
                return spot;
            }
        }
        return null;
    }

    getParkingSpot(spotNumber: number): ParkingSpot | null {
        return this.parkingSpots.get(spotNumber) || null;
    }

    getAvailableSpotCount(): number {
        let count = 0;
        for (const spot of this.parkingSpots.values()) {
            if (spot.isAvailable()) {
                count++;
            }
        }
        return count;
    }
}
