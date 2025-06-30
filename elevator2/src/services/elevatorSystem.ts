import { Elevator } from "../entities/Elevator";
import { Direction } from "../enums/direction";
import { ElevatorNumber } from "../enums/elevatorNumber";
import { FloorNumber } from "../enums/floor";
import { ElevatorController } from "./ElevatorController";

export class ElevatorSystem {
  private static instance: ElevatorSystem;
  private controller: ElevatorController;

  private constructor() {
    this.controller = new ElevatorController();
  }

  public static getInstance(): ElevatorSystem {
    if (!ElevatorSystem.instance) {
      ElevatorSystem.instance = new ElevatorSystem();
    }
    return ElevatorSystem.instance;
  }

  public requestElevator(sourceFloor: FloorNumber, direction: Direction): Promise<Elevator> {
    return this.controller.requestElevator(sourceFloor, direction);
  }

  public selectFloor(elevatorNumber: ElevatorNumber, targetFloor: FloorNumber): void {
    const elevator = this.controller.getElevator(elevatorNumber);
    if (elevator) {
      this.controller.selectFloor(elevator, targetFloor);
    }
  }

  public getSystemStatus(): string {
    return this.controller.getElevatorStatus();
  }

  public getController(): ElevatorController {
    return this.controller;
  }
}
