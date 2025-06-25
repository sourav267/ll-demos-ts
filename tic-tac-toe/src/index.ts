import readline from 'readline';
// @ts-ignore
import { Player } from './entities/player';
// @ts-ignore
import { Game } from './entities/game';
import { Symbol } from './enums/symbol';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const player1 = new Player('Alice', Symbol.X);
const player2 = new Player('Bob', Symbol.O);
const game = new Game(player1, player2);

function askMove() {
  rl.question('Enter row and col (e.g., 1 2): ', input => {
    const [row, col] = input.split(' ').map(Number);
    const isOver = game.play(row, col);
    if (isOver) rl.close();
    else askMove();
  });
}

askMove();
