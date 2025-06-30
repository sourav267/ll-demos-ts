import { Direction } from "../enums/direction";
import { ElevatorState } from "../enums/elevatorState";
import { ERequest } from "./Request";

export class Elevator {
  private requestQueue: ERequest[] = [];
  public state: ElevatorState = ElevatorState.IDLE;
  public direction: Direction = Direction.IDLE;

  constructor(public id: number, public currentFloor: number = 0) {}

  addRequest(request: ERequest) {
    this.requestQueue.push(request);
  }

  step() {
    if (this.requestQueue.length === 0) {
      this.state = ElevatorState.IDLE;
      this.direction = Direction.IDLE;
      return;
    }

    const target = this.requestQueue[0].floor;
    if (target > this.currentFloor) {
      this.currentFloor++;
      this.direction = Direction.UP;
      this.state = ElevatorState.MOVING;
    } else if (target < this.currentFloor) {
      this.currentFloor--;
      this.direction = Direction.DOWN;
      this.state = ElevatorState.MOVING;
    } else {
      // At the target floor
      console.log(`Elevator ${this.id} opening doors at floor ${this.currentFloor}`);
      this.requestQueue.shift();
      this.state = ElevatorState.DOORS_OPEN;
      setTimeout(() => {
        this.state = ElevatorState.IDLE;
        this.direction = Direction.IDLE;
      }, 2000);
    }
  }
}