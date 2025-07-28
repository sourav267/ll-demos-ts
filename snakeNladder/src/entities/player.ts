// Player Class
class Player {
  private id: string;
  private name: string;
  private currentPosition: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.currentPosition = 0;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
  }
}

export default Player;