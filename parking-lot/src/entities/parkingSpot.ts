import { ParkingSpotStatus } from "../enums/parkingSpotStatus";
import { ParkingSpotType } from "../enums/parkingSpotType";
import { Vehicle } from "./vehicle";


export class ParkingSpot {
    private spotNumber: number;
    private spotType: ParkingSpotType;
    private status: ParkingSpotStatus;
    private vehicle: Vehicle | null;

    constructor(spotNumber: number, spotType: ParkingSpotType) {
        this.spotNumber = spotNumber;
        this.spotType = spotType;
        this.status = ParkingSpotStatus.AVAILABLE;
        this.vehicle = null;
    }

    getSpotNumber(): number {
        return this.spotNumber;
    }

    getSpotType(): ParkingSpotType {
        return this.spotType;
    }

    getStatus(): ParkingSpotStatus {
        return this.status;
    }

    getVehicle(): Vehicle | null {
        return this.vehicle;
    }

    isAvailable(): boolean {
        return this.status === ParkingSpotStatus.AVAILABLE;
    }

    parkVehicle(vehicle: Vehicle): boolean {
        if (!this.isAvailable() || !vehicle.canFitInSpot(this)) {
            return false;
        }

        this.vehicle = vehicle;
        this.status = ParkingSpotStatus.OCCUPIED;
        return true;
    }

    removeVehicle(): Vehicle | null {
        if (this.status !== ParkingSpotStatus.OCCUPIED) {
            return null;
        }

        const vehicle = this.vehicle;
        this.vehicle = null;
        this.status = ParkingSpotStatus.AVAILABLE;
        return vehicle;
    }
}
