import { Player } from './player';

export class Move {
  constructor(
    public player: Player,
    public row: number,
    public col: number
  ) {}
}
