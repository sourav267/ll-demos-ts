// Ladder Class
class Ladder {
  private start: number;
  private end: number;

  constructor(start: number, end: number) {
    if (start >= end) {
      throw new Error('Ladder start must be less than end');
    }
    this.start = start;
    this.end = end;
  }

  getStart(): number {
    return this.start;
  }

  getEnd(): number {
    return this.end;
  }
}

export default Ladder;