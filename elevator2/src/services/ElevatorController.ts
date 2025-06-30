import { Elevator } from "../entities/Elevator";
import { ElevatorRequest } from "../entities/elevatorRequest";
import { Direction } from "../enums/direction";
import { ElevatorNumber } from "../enums/elevatorNumber";
import { FloorNumber } from "../enums/floor";
import {Floor} from "../entities/floor";

export class ElevatorController {
  private elevators: Map<ElevatorNumber, Elevator>;
  private floors: Map<FloorNumber, Floor>;
  private pendingRequests: ElevatorRequest[];

  constructor() {
    this.elevators = new Map();
    this.floors = new Map();
    this.pendingRequests = [];
    this.initializeSystem();
  }

  private initializeSystem(): void {
    // Initialize elevators
    Object.values(ElevatorNumber).forEach(elevatorNum => {
      this.elevators.set(elevatorNum, new Elevator(elevatorNum));
    });

    // Initialize floors
    Object.values(FloorNumber).forEach(floorNum => {
      if (typeof floorNum === 'number') {
        this.floors.set(floorNum, new Floor(floorNum));
      }
    });
  }

  public requestElevator(sourceFloor: FloorNumber, direction: Direction): Promise<Elevator> {
    console.log(`Elevator requested at floor ${sourceFloor} going ${direction}`);
    
    const bestElevator = this.findBestElevator(sourceFloor, direction);
    
    if (bestElevator) {
      return this.dispatchElevator(bestElevator, sourceFloor);
    } else {
      throw new Error('No available elevator');
    }
  }

  private findBestElevator(sourceFloor: FloorNumber, direction: Direction): Elevator | null {
    let bestElevator: Elevator | null = null;
    let minDistance = Infinity;

    this.elevators.forEach(elevator => {
      if (elevator.isIdle() || this.isSameDirection(elevator, direction)) {
        const distance = elevator.getDistanceFromFloor(sourceFloor);
        if (distance < minDistance) {
          minDistance = distance;
          bestElevator = elevator;
        }
      }
    });

    return bestElevator;
  }

  private isSameDirection(elevator: Elevator, requestDirection: Direction): boolean {
    return elevator.getCurrentDirection() === requestDirection;
  }

  private async dispatchElevator(elevator: Elevator, targetFloor: FloorNumber): Promise<Elevator> {
    elevator.addRequest(targetFloor);
    await elevator.moveToFloor(targetFloor);
    elevator.openDoor();
    
    // Auto-close door after 5 seconds
    setTimeout(() => {
      elevator.closeDoor();
    }, 5000);

    return elevator;
  }

  public selectFloor(elevator: Elevator, targetFloor: FloorNumber): void {
    elevator.addRequest(targetFloor);
    elevator.getInsidePanel().pressFloorButton(targetFloor);
    this.processElevatorRequests(elevator);
  }

  private async processElevatorRequests(elevator: Elevator): Promise<void> {
    const requests = elevator.getRequests();
    
    if (requests.length === 0) return;

    // Sort requests based on current direction
    const sortedRequests = this.sortRequestsByDirection(requests, elevator.getCurrentFloor(), elevator.getCurrentDirection());

    for (const floor of sortedRequests) {
      await elevator.moveToFloor(floor);
      elevator.openDoor();
      
      // Simulate passenger loading/unloading time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      elevator.closeDoor();
    }
  }

  private sortRequestsByDirection(requests: FloorNumber[], currentFloor: FloorNumber, direction: Direction): FloorNumber[] {
    if (direction === Direction.UP) {
      return requests.filter(f => f >= currentFloor).sort((a, b) => a - b)
        .concat(requests.filter(f => f < currentFloor).sort((a, b) => b - a));
    } else if (direction === Direction.DOWN) {
      return requests.filter(f => f <= currentFloor).sort((a, b) => b - a)
        .concat(requests.filter(f => f > currentFloor).sort((a, b) => a - b));
    } else {
      return requests.sort((a, b) => 
        Math.abs(a - currentFloor) - Math.abs(b - currentFloor)
      );
    }
  }

  public getElevator(elevatorNumber: ElevatorNumber): Elevator | undefined {
    return this.elevators.get(elevatorNumber);
  }

  public getFloor(floorNumber: FloorNumber): Floor | undefined {
    return this.floors.get(floorNumber);
  }

  public getAllElevators(): Elevator[] {
    return Array.from(this.elevators.values());
  }

  public getElevatorStatus(): string {
    let status = 'Elevator System Status:\n';
    this.elevators.forEach(elevator => {
      status += `${elevator.getElevatorNumber()}: Floor ${elevator.getCurrentFloor()}, Direction: ${elevator.getCurrentDirection()}, Requests: [${elevator.getRequests().join(', ')}]\n`;
    });
    return status;
  }
}