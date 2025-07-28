// Snake Class
class Snake {
  private head: number;
  private tail: number;

  constructor(head: number, tail: number) {
    if (head <= tail) {
      throw new Error('Snake head must be greater than tail');
    }
    this.head = head;
    this.tail = tail;
  }

  getHead(): number {
    return this.head;
  }

  getTail(): number {
    return this.tail;
  }
}

export default Snake;