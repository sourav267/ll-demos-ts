import { FloorNumber } from "../enums/floor";
import { IButton } from "./button";

export class ElevatorButton implements IButton {
  private status: boolean = false;
  private floorNumber: FloorNumber;

  constructor(floorNumber: FloorNumber) {
    this.floorNumber = floorNumber;
  }

  public getFloorNumber(): FloorNumber {
    return this.floorNumber;
  }

  public setFloorNumber(floorNumber: FloorNumber): void {
    this.floorNumber = floorNumber;
  }

  public isPressed(): boolean {
    return this.status;
  }

  public press(): boolean {
    this.status = !this.status;
    console.log(`Elevator button for floor ${this.floorNumber} pressed: ${this.status}`);
    return this.status;
  }

  public reset(): void {
    this.status = false;
  }
}
