import Board from "../entities/board";
import Dice from "../entities/dice";
import Ladder from "../entities/ladder";
import Player from "../entities/player";
import Snake from "../entities/snake";
import GameStatus from "../enums/gameStatus";

// Game Class - Main game controller
class SnakeAndLadderGame {
  private board: Board;
  private players: Player[];
  private dice: Dice;
  private currentPlayerIndex: number;
  private gameStatus: GameStatus;
  private winner: Player | null;

  constructor(boardSize: number, playerNames: string[]) {
    this.board = new Board(boardSize);
    this.players = playerNames.map((name, index) => new Player(`player_${index}`, name));
    this.dice = new Dice();
    this.currentPlayerIndex = 0;
    this.gameStatus = GameStatus.NOT_STARTED;
    this.winner = null;
  }

  addSnake(head: number, tail: number): void {
    const snake = new Snake(head, tail);
    this.board.addSnake(snake);
  }

  addLadder(start: number, end: number): void {
    const ladder = new Ladder(start, end);
    this.board.addLadder(ladder);
  }

  startGame(): void {
    if (this.players.length < 2) {
      throw new Error('At least 2 players required to start the game');
    }
    this.gameStatus = GameStatus.IN_PROGRESS;
  }

  playTurn(): {
    player: Player;
    diceRoll: number;
    oldPosition: number;
    newPosition: number;
    specialMove?: 'snake' | 'ladder';
    gameWon: boolean;
  } | null {
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      return null;
    }

    const currentPlayer = this.players[this.currentPlayerIndex];
    const diceRoll = this.dice.roll();
    const oldPosition = currentPlayer.getCurrentPosition();
    let newPosition = oldPosition + diceRoll;

    // Check if move is valid (doesn't exceed board size)
    if (newPosition > this.board.getSize()) {
      newPosition = oldPosition; // Stay at current position
    }

    let specialMove: 'snake' | 'ladder' | undefined;

    // Check for ladder
    if (this.board.hasLadder(newPosition)) {
      newPosition = this.board.getLadderEnd(newPosition);
      specialMove = 'ladder';
    }
    // Check for snake
    else if (this.board.hasSnake(newPosition)) {
      newPosition = this.board.getSnakeEnd(newPosition);
      specialMove = 'snake';
    }

    currentPlayer.setCurrentPosition(newPosition);

    // Check for win condition
    const gameWon = newPosition === this.board.getSize();
    if (gameWon) {
      this.winner = currentPlayer;
      this.gameStatus = GameStatus.FINISHED;
    }

    // Move to next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

    return {
      player: currentPlayer,
      diceRoll,
      oldPosition,
      newPosition,
      specialMove,
      gameWon
    };
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  getGameStatus(): GameStatus {
    return this.gameStatus;
  }

  getWinner(): Player | null {
    return this.winner;
  }

  getBoard(): Board {
    return this.board;
  }

  getPlayers(): Player[] {
    return [...this.players]; // Return copy to prevent external modification
  }

  // Reset game to initial state
  resetGame(): void {
    this.players.forEach(player => player.setCurrentPosition(0));
    this.currentPlayerIndex = 0;
    this.gameStatus = GameStatus.NOT_STARTED;
    this.winner = null;
  }

  // Get current game state for display
  getGameState(): {
    status: GameStatus;
    currentPlayer: string;
    playerPositions: { [playerName: string]: number };
    winner: string | null;
  } {
    const playerPositions: { [playerName: string]: number } = {};
    this.players.forEach(player => {
      playerPositions[player.getName()] = player.getCurrentPosition();
    });

    return {
      status: this.gameStatus,
      currentPlayer: this.gameStatus === GameStatus.IN_PROGRESS ? 
        this.getCurrentPlayer().getName() : '',
      playerPositions,
      winner: this.winner ? this.winner.getName() : null
    };
  }
}

export default SnakeAndLadderGame;