import Snake from "./snake";
import Ladder from "./ladder";
import Position from "./position";

// Board Class
class Board {
  private size: number;
  private snakes: Map<number, Snake>;
  private ladders: Map<number, Ladder>;

  constructor(size: number) {
    this.size = size;
    this.snakes = new Map();
    this.ladders = new Map();
  }

  addSnake(snake: Snake): void {
    if (snake.getHead() > this.size || snake.getTail() < 1) {
      throw new Error('Snake positions out of board bounds');
    }
    this.snakes.set(snake.getHead(), snake);
  }

  addLadder(ladder: Ladder): void {
    if (ladder.getEnd() > this.size || ladder.getStart() < 1) {
      throw new Error('Ladder positions out of board bounds');
    }
    this.ladders.set(ladder.getStart(), ladder);
  }

  getSize(): number {
    return this.size;
  }

  hasSnake(position: number): boolean {
    return this.snakes.has(position);
  }

  hasLadder(position: number): boolean {
    return this.ladders.has(position);
  }

  getSnakeEnd(position: number): number {
    const snake = this.snakes.get(position);
    return snake ? snake.getTail() : position;
  }

  getLadderEnd(position: number): number {
    const ladder = this.ladders.get(position);
    return ladder ? ladder.getEnd() : position;
  }

  // Convert position to 2D coordinates for display
  getCoordinates(position: number): Position {
    if (position === 0) return { row: -1, col: -1 }; // Starting position
    
    const row = Math.floor((position - 1) / Math.sqrt(this.size));
    const col = (position - 1) % Math.sqrt(this.size);
    
    // For odd rows, reverse the column order (snake pattern)
    const adjustedCol = row % 2 === 1 ? Math.sqrt(this.size) - 1 - col : col;
    
    return { row: Math.floor(Math.sqrt(this.size)) - 1 - row, col: adjustedCol };
  }
}

export default Board;
