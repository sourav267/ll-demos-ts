import { VehicleType } from "../enums/vehicleTypes";
import { Vehicle } from "./vehicle";
import { Car } from "./vehicle";
import { Motorcycle } from "./vehicle";
import { Truck } from "./vehicle";

export class VehicleFactory {
    static createVehicle(vehicleType: VehicleType, licensePlate: string): Vehicle {
        switch (vehicleType) {
            case VehicleType.CAR:
                return new Car(licensePlate);
            case VehicleType.MOTORCYCLE:
                return new Motorcycle(licensePlate);
            case VehicleType.TRUCK:
                return new Truck(licensePlate);
            default:
                throw new Error(`Unknown vehicle type: ${vehicleType}`);
        }
    }
}