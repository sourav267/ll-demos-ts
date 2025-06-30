import { Direction } from "../enums/direction";
import { FloorNumber } from "../enums/floor";

export class ElevatorRequest {
  public readonly sourceFloor: FloorNumber;
  public readonly destinationFloor: FloorNumber;
  public readonly direction: Direction;
  public readonly timestamp: Date;

  constructor(sourceFloor: FloorNumber, destinationFloor: FloorNumber, direction: Direction) {
    this.sourceFloor = sourceFloor;
    this.destinationFloor = destinationFloor;
    this.direction = direction;
    this.timestamp = new Date();
  }
}