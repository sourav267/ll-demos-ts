import { Player } from './player';
import { Board } from './board';
import { Move } from './move';

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
  }

  play(row: number, col: number): boolean {
    const player = this.players[this.currentPlayerIndex];
    const cell = this.board.getCell(row, col);

    if (!cell.isEmpty()) {
      console.log('Cell is already taken!');
      return false;
    }

    cell.setSymbol(player.symbol);
    this.board.print();

    if (this.checkWinner(player)) {
      console.log(`${player.name} wins!`);
      return true;
    }

    if (this.board.isFull()) {
      console.log('Draw!');
      return true;
    }

    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    return false;
  }

  private checkWinner(player: Player): boolean {
    const size = this.board.getSize();
    const sym = player.symbol;

    // Rows and Columns
    for (let i = 0; i < size; i++) {
      if (
        [...Array(size).keys()].every(j => this.board.getCell(i, j).getSymbol() === sym) ||
        [...Array(size).keys()].every(j => this.board.getCell(j, i).getSymbol() === sym)
      ) return true;
    }

    // Diagonals
    if ([...Array(size).keys()].every(i => this.board.getCell(i, i).getSymbol() === sym)) return true;
    if ([...Array(size).keys()].every(i => this.board.getCell(i, size - 1 - i).getSymbol() === sym)) return true;

    return false;
  }
}
