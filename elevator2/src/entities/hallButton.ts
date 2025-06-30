import { Direction } from "../enums/direction";

export class HallButton implements IButton {
  private status: boolean = false;
  private direction: Direction;

  constructor(direction: Direction) {
    this.direction = direction;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public setDirection(direction: Direction): void {
    this.direction = direction;
  }

  public isPressed(): boolean {
    return this.status;
  }

  public press(): boolean {
    this.status = !this.status;
    console.log(`Hall button (${this.direction}) pressed: ${this.status}`);
    return this.status;
  }

  public reset(): void {
    this.status = false;
  }
}