import { Elevator } from "../entities/Elevator";
import { ERequest } from "../entities/Request";
import { RequestType } from "../enums/requestType";
import {Direction} from "../enums/direction";

export class ElevatorController {
  constructor(public elevators: Elevator[]) {}

  handleExternalRequest(floor: number, direction: Direction) {
    const request = new ERequest(floor, direction, RequestType.EXTERNAL);
    const chosenElevator = this.assignElevator(request);
    chosenElevator.addRequest(request);
  }

  handleInternalRequest(elevatorId: number, floor: number) {
    const request = new ERequest(floor, null, RequestType.INTERNAL);
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) {
      elevator.addRequest(request);
    }
  }

  assignElevator(request: ERequest): Elevator {
    let minDistance = Number.MAX_VALUE;
    let chosenElevator = this.elevators[0];

    for (const elevator of this.elevators) {
      const distance = Math.abs(elevator.currentFloor - request.floor);
      if (distance < minDistance) {
        minDistance = distance;
        chosenElevator = elevator;
      }
    }

    return chosenElevator;
  }

  step() {
    for (const elevator of this.elevators) {
      elevator.step();
    }
  }
}