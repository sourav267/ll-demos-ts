import { ParkingSpotType } from "../enums/parkingSpotType";
import { VehicleType } from "../enums/vehicleTypes";
import { ParkingSpot } from "./parkingSpot";

export abstract class Vehicle {
    protected licensePlate: string;
    protected vehicleType: VehicleType;

    constructor(licensePlate: string, vehicleType: VehicleType) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    getVehicleType(): VehicleType {
        return this.vehicleType;
    }

    abstract canFitInSpot(spot: ParkingSpot): boolean;
}

// Concrete Vehicle classes
export class Car extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.CAR);
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        return spot.getSpotType() === ParkingSpotType.COMPACT ||
            spot.getSpotType() === ParkingSpotType.LARGE;
    }
}

export class Motorcycle extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.MOTORCYCLE);
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        return true; // Motorcycle can fit in any spot
    }
}

export class Truck extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.TRUCK);
    }

    canFitInSpot(spot: ParkingSpot): boolean {
        return spot.getSpotType() === ParkingSpotType.LARGE;
    }
}