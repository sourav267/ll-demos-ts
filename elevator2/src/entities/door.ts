import { DoorAction } from "../enums/doorAction";

export class Door {
  private doorAction: DoorAction;

  constructor(doorAction: DoorAction = DoorAction.CLOSE) {
    this.doorAction = doorAction;
  }

  public openDoor(): void {
    this.doorAction = DoorAction.OPEN;
    console.log('Door opened');
  }

  public closeDoor(): void {
    this.doorAction = DoorAction.CLOSE;
    console.log('Door closed');
  }

  public getDoorAction(): DoorAction {
    return this.doorAction;
  }

  public isOpen(): boolean {
    return this.doorAction === DoorAction.OPEN;
  }
}