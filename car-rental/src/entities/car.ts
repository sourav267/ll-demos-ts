import CarStatus from "../enums/carStatus";
import CarType from "../enums/carType";

class Car {
  private licensePlate: string;
  private make: string;
  private model: string;
  private year: number;
  private mileage: number;
  private type: CarType;
  private status: CarStatus;
  private dailyRate: number;
  private location: string;

  constructor(
    licensePlate: string,
    make: string,
    model: string,
    year: number,
    type: CarType,
    dailyRate: number,
    location: string
  ) {
    this.licensePlate = licensePlate;
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
    this.dailyRate = dailyRate;
    this.location = location;
    this.status = CarStatus.AVAILABLE;
    this.mileage = 0;
  }

  // Getters
  getLicensePlate(): string { return this.licensePlate; }
  getMake(): string { return this.make; }
  getModel(): string { return this.model; }
  getYear(): number { return this.year; }
  getMileage(): number { return this.mileage; }
  getType(): CarType { return this.type; }
  getStatus(): CarStatus { return this.status; }
  getDailyRate(): number { return this.dailyRate; }
  getLocation(): string { return this.location; }

  // Setters
  setStatus(status: CarStatus): void { this.status = status; }
  setMileage(mileage: number): void { this.mileage = mileage; }
  setLocation(location: string): void { this.location = location; }
  setDailyRate(rate: number): void { this.dailyRate = rate; }

  isAvailable(): boolean {
    return this.status === CarStatus.AVAILABLE;
  }
}

export default Car;