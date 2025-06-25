import { Cell } from './cell';

export class Board {
  private size: number;
  private grid: Cell[][];

  constructor(size: number = 3) {
    this.size = size;
    this.grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => new Cell())
    );
  }

  getSize(): number {
    return this.size;
  }

  getCell(row: number, col: number): Cell {
    return this.grid[row][col];
  }

  print(): void {
    console.clear();
    for (let row of this.grid) {
      console.log(row.map(cell => cell.getSymbol()).join(' | '));
    }
    console.log('\n');
  }

  isFull(): boolean {
    return this.grid.every(row =>
      row.every(cell => !cell.isEmpty())
    );
  }
}
