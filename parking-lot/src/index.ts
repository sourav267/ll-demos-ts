
import { ParkingLot } from './services/parkingLot';
import { ParkingFloor } from './entities/parkingFloor';
import { ParkingSpot } from './entities/parkingSpot';
import { ParkingSpotType } from './enums/parkingSpotType';
import { VehicleType } from './enums/vehicleTypes';
import { VehicleFactory } from './entities/vehicleFactory';

function initializeParkingLot(): ParkingLot {
    const parkingLot = new ParkingLot("City Center Parking", "123 Main St");

    // Create floors
    const floor1 = new ParkingFloor(1);
    const floor2 = new ParkingFloor(2);

    // Add spots to floor 1
    floor1.addParkingSpot(new ParkingSpot(101, ParkingSpotType.MOTORCYCLE));
    floor1.addParkingSpot(new ParkingSpot(102, ParkingSpotType.COMPACT));
    floor1.addParkingSpot(new ParkingSpot(103, ParkingSpotType.LARGE));

    // Add spots to floor 2
    floor2.addParkingSpot(new ParkingSpot(201, ParkingSpotType.COMPACT));
    floor2.addParkingSpot(new ParkingSpot(202, ParkingSpotType.LARGE));

    parkingLot.addFloor(floor1);
    parkingLot.addFloor(floor2);

    return parkingLot;
}

const parkingLot = initializeParkingLot();
const car = VehicleFactory.createVehicle(VehicleType.CAR, "ABC123");
const motorcycle = VehicleFactory.createVehicle(VehicleType.MOTORCYCLE, "XYZ789");

const carTicket = parkingLot.parkVehicle(car);
const motorcycleTicket = parkingLot.parkVehicle(motorcycle);

console.log(`Car parked: ${carTicket?.getTicketId()}`);
console.log(`Motorcycle parked: ${motorcycleTicket?.getTicketId()}`);
console.log(`Available spots: ${parkingLot.getAvailableSpotCount()}`);