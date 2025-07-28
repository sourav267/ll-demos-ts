import SnakeAndLadderGame from "../implementation/SnakeAndLadderGame";

// Game Builder for easy setup
class GameBuilder {
  private game: SnakeAndLadderGame;

  constructor(boardSize: number, playerNames: string[]) {
    this.game = new SnakeAndLadderGame(boardSize, playerNames);
  }

  addSnake(head: number, tail: number): GameBuilder {
    this.game.addSnake(head, tail);
    return this;
  }

  addLadder(start: number, end: number): GameBuilder {
    this.game.addLadder(start, end);
    return this;
  }

  build(): SnakeAndLadderGame {
    return this.game;
  }
}

export default GameBuilder;
