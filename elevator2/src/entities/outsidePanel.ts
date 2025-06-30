import { Direction } from "../enums/direction";
import { HallButton } from "./hallButton";

export class OutsidePanel implements IPanel {
  private hallButtons: Map<Direction, HallButton>;

  constructor() {
    this.hallButtons = new Map();
    this.hallButtons.set(Direction.UP, new HallButton(Direction.UP));
    this.hallButtons.set(Direction.DOWN, new HallButton(Direction.DOWN));
  }

  public pressButton(direction: Direction): boolean {
    const button = this.hallButtons.get(direction);
    return button ? button.press() : false;
  }

  public getButton(direction: Direction): HallButton | undefined {
    return this.hallButtons.get(direction);
  }

  public isButtonPressed(direction: Direction): boolean {
    const button = this.hallButtons.get(direction);
    return button ? button.isPressed() : false;
  }
}