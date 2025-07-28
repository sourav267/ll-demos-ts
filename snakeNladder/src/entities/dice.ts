// Dice Class
class Dice {
  private sides: number;

  constructor(sides: number = 6) {
    this.sides = sides;
  }

  roll(): number {
    return Math.floor(Math.random() * this.sides) + 1;
  }

  getSides(): number {
    return this.sides;
  }
}

export default Dice;
