import { Direction } from "../enums/direction";
import { ElevatorNumber } from "../enums/elevatorNumber";
import { FloorNumber } from "../enums/floor";
import { Display } from "./display";
import { Door } from "./door";
import { InsidePanel } from "./insidePanel";

export class Elevator {
  private elevatorNumber: ElevatorNumber;
  private door: Door;
  private insidePanel: InsidePanel;
  private display: Display;
  private currentFloor: FloorNumber;
  private currentDirection: Direction;
  private requests: Set<FloorNumber>;
  private maxCapacity: number = 680; // kg
  private currentWeight: number = 0;
  private isMoving: boolean = false;

  constructor(elevatorNumber: ElevatorNumber, currentFloor: FloorNumber = FloorNumber.FLOOR_1) {
    this.elevatorNumber = elevatorNumber;
    this.door = new Door();
    this.insidePanel = new InsidePanel();
    this.display = new Display(currentFloor, Direction.IDLE, 0);
    this.currentFloor = currentFloor;
    this.currentDirection = Direction.IDLE;
    this.requests = new Set();
  }

  public getElevatorNumber(): ElevatorNumber {
    return this.elevatorNumber;
  }

  public getCurrentFloor(): FloorNumber {
    return this.currentFloor;
  }

  public getCurrentDirection(): Direction {
    return this.currentDirection;
  }

  public isIdle(): boolean {
    return this.currentDirection === Direction.IDLE && !this.isMoving;
  }

  public addRequest(floor: FloorNumber): void {
    this.requests.add(floor);
    console.log(`Request added for floor ${floor} in elevator ${this.elevatorNumber}`);
  }

  public removeRequest(floor: FloorNumber): void {
    this.requests.delete(floor);
  }

  public hasRequests(): boolean {
    return this.requests.size > 0;
  }

  public getRequests(): FloorNumber[] {
    return Array.from(this.requests).sort((a, b) => a - b);
  }

  public moveToFloor(targetFloor: FloorNumber): Promise<void> {
    return new Promise((resolve) => {
      if (this.currentFloor === targetFloor) {
        console.log(`Elevator ${this.elevatorNumber} is already at floor ${targetFloor}`);
        resolve();
        return;
      }

      this.isMoving = true;
      this.currentDirection = targetFloor > this.currentFloor ? Direction.UP : Direction.DOWN;
      this.display.setDirection(this.currentDirection);

      console.log(`Elevator ${this.elevatorNumber} moving ${this.currentDirection} from floor ${this.currentFloor} to ${targetFloor}`);

      // Simulate movement time
      const floors = Math.abs(targetFloor - this.currentFloor);
      const moveTime = floors * 2000; // 2 seconds per floor

      setTimeout(() => {
        this.currentFloor = targetFloor;
        this.currentDirection = Direction.IDLE;
        this.isMoving = false;
        this.display.setFloorNumber(targetFloor);
        this.display.setDirection(Direction.IDLE);
        this.removeRequest(targetFloor);
        
        console.log(`Elevator ${this.elevatorNumber} arrived at floor ${targetFloor}`);
        resolve();
      }, moveTime);
    });
  }

  public openDoor(): void {
    if (!this.isMoving) {
      this.door.openDoor();
    } else {
      console.log('Cannot open door while elevator is moving');
    }
  }

  public closeDoor(): void {
    this.door.closeDoor();
  }

  public isDoorOpen(): boolean {
    return this.door.isOpen();
  }

  public getInsidePanel(): InsidePanel {
    return this.insidePanel;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public canTakeMoreWeight(additionalWeight: number): boolean {
    return (this.currentWeight + additionalWeight) <= this.maxCapacity;
  }

  public addWeight(weight: number): boolean {
    if (this.canTakeMoreWeight(weight)) {
      this.currentWeight += weight;
      this.display.setWeight(this.currentWeight);
      return true;
    }
    return false;
  }

  public removeWeight(weight: number): void {
    this.currentWeight = Math.max(0, this.currentWeight - weight);
    this.display.setWeight(this.currentWeight);
  }

  public getDistanceFromFloor(floor: FloorNumber): number {
    return Math.abs(this.currentFloor - floor);
  }
}