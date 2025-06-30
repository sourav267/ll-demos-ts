import { DoorAction } from "../enums/doorAction";
import { FloorNumber } from "../enums/floor";
import { DoorButton } from "./doorbutton";
import { ElevatorButton } from "./elevatorButton";
import { IPanel } from "./panel";

export class InsidePanel implements IPanel {
  private elevatorButtons: Map<FloorNumber, ElevatorButton>;
  private doorButtons: Map<DoorAction, DoorButton>;

  constructor() {
    this.elevatorButtons = new Map();
    this.doorButtons = new Map();
    this.initializeButtons();
  }

  private initializeButtons(): void {
    // Initialize elevator buttons for all floors
    Object.values(FloorNumber).forEach(floor => {
      if (typeof floor === 'number') {
        this.elevatorButtons.set(floor, new ElevatorButton(floor));
      }
    });

    // Initialize door buttons
    this.doorButtons.set(DoorAction.OPEN, new DoorButton(DoorAction.OPEN));
    this.doorButtons.set(DoorAction.CLOSE, new DoorButton(DoorAction.CLOSE));
  }

  public pressFloorButton(floorNumber: FloorNumber): boolean {
    const button = this.elevatorButtons.get(floorNumber);
    return button ? button.press() : false;
  }

  public pressDoorButton(doorAction: DoorAction): boolean {
    const button = this.doorButtons.get(doorAction);
    return button ? button.press() : false;
  }

  public getFloorButton(floorNumber: FloorNumber): ElevatorButton | undefined {
    return this.elevatorButtons.get(floorNumber);
  }

  public getDoorButton(doorAction: DoorAction): DoorButton | undefined {
    return this.doorButtons.get(doorAction);
  }

  public getPressedFloors(): FloorNumber[] {
    const pressedFloors: FloorNumber[] = [];
    this.elevatorButtons.forEach((button, floor) => {
      if (button.isPressed()) {
        pressedFloors.push(floor);
      }
    });
    return pressedFloors;
  }
}