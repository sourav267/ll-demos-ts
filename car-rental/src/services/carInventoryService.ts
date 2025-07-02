import Car from "../entities/car";
import SearchCriteria from "../entities/searchCriteria";
import CarStatus from "../enums/carStatus";

class CarInventoryService {
  private cars: Map<string, Car>;

  constructor() {
    this.cars = new Map();
  }

  addCar(car: Car): void {
    this.cars.set(car.getLicensePlate(), car);
  }

  removeCar(licensePlate: string): boolean {
    return this.cars.delete(licensePlate);
  }

  getCar(licensePlate: string): Car | undefined {
    return this.cars.get(licensePlate);
  }

  getAllCars(): Car[] {
    return Array.from(this.cars.values());
  }

  getAvailableCars(): Car[] {
    return Array.from(this.cars.values()).filter(car => car.isAvailable());
  }

  searchCars(criteria: SearchCriteria): Car[] {
    let availableCars = this.getAvailableCars();

    if (criteria.location) {
      availableCars = availableCars.filter(car => 
        car.getLocation().toLowerCase().includes(criteria.location!.toLowerCase())
      );
    }

    if (criteria.carType) {
      availableCars = availableCars.filter(car => car.getType() === criteria.carType);
    }

    if (criteria.minPrice !== undefined) {
      availableCars = availableCars.filter(car => car.getDailyRate() >= criteria.minPrice!);
    }

    if (criteria.maxPrice !== undefined) {
      availableCars = availableCars.filter(car => car.getDailyRate() <= criteria.maxPrice!);
    }

    return availableCars;
  }

  updateCarStatus(licensePlate: string, status: CarStatus): boolean {
    const car = this.cars.get(licensePlate);
    if (car) {
      car.setStatus(status);
      return true;
    }
    return false;
  }
}
export default CarInventoryService;