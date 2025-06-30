import { DoorAction } from "../enums/doorAction";

export class DoorButton implements IButton {
  private status: boolean = false;
  private doorAction: DoorAction;

  constructor(doorAction: DoorAction) {
    this.doorAction = doorAction;
  }

  public getDoorAction(): DoorAction {
    return this.doorAction;
  }

  public setDoorAction(doorAction: DoorAction): void {
    this.doorAction = doorAction;
  }

  public isPressed(): boolean {
    return this.status;
  }

  public press(): boolean {
    this.status = !this.status;
    console.log(`Door button (${this.doorAction}) pressed: ${this.status}`);
    return this.status;
  }
}