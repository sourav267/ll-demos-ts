import GameBuilder from "./builder/gamebuilder";
import GameStatus from "./enums/gameStatus";
import SnakeAndLadderGame from "./implementation/SnakeAndLadderGame";

// Example Usage and Demo
function createStandardGame(): SnakeAndLadderGame {
  const game = new GameBuilder(100, ['Alice', 'Bob', 'Charlie'])
    // Add some snakes
    .addSnake(99, 78)
    .addSnake(95, 75)
    .addSnake(92, 88)
    .addSnake(89, 68)
    .addSnake(74, 53)
    .addSnake(64, 60)
    .addSnake(62, 19)
    .addSnake(49, 11)
    .addSnake(46, 25)
    .addSnake(16, 6)
    
    // Add some ladders
    .addLadder(2, 38)
    .addLadder(7, 14)
    .addLadder(8, 31)
    .addLadder(15, 26)
    .addLadder(21, 42)
    .addLadder(28, 84)
    .addLadder(36, 44)
    .addLadder(51, 67)
    .addLadder(71, 91)
    .addLadder(78, 98)
    .build();

  return game;
}

// Demo function
function playGameDemo(): void {
  const game = createStandardGame();
  game.startGame();

  console.log('🎮 Snake and Ladder Game Started!');
  console.log(`Players: ${game.getPlayers().map(p => p.getName()).join(', ')}`);
  console.log('Board Size: 100\n');

  let turnCount = 0;
  const maxTurns = 100; // Prevent infinite games

  while (game.getGameStatus() === GameStatus.IN_PROGRESS && turnCount < maxTurns) {
    const result = game.playTurn();
    
    if (result) {
      turnCount++;
      console.log(`Turn ${turnCount}:`);
      console.log(`${result.player.getName()} rolled ${result.diceRoll}`);
      console.log(`Moved from ${result.oldPosition} to ${result.newPosition}`);
      
      if (result.specialMove === 'snake') {
        console.log('🐍 Oh no! Hit a snake!');
      } else if (result.specialMove === 'ladder') {
        console.log('🪜 Great! Climbed a ladder!');
      }
      
      if (result.gameWon) {
        console.log(`🎉 ${result.player.getName()} wins the game!`);
      }
      
      console.log('---');
    }
  }

  const finalState = game.getGameState();
  console.log('Final Positions:');
  Object.entries(finalState.playerPositions).forEach(([name, position]) => {
    console.log(`${name}: ${position}`);
  });
}

// Uncomment the line below to run the demo
playGameDemo();