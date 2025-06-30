import { FloorNumber } from "../enums/floor";
import { OutsidePanel } from "./outsidePanel";

export class Floor {
  private floorNumber: FloorNumber;
  private outsidePanel: OutsidePanel;

  constructor(floorNumber: FloorNumber) {
    this.floorNumber = floorNumber;
    this.outsidePanel = new OutsidePanel();
  }

  public getFloorNumber(): FloorNumber {
    return this.floorNumber;
  }

  public getOutsidePanel(): OutsidePanel {
    return this.outsidePanel;
  }
}