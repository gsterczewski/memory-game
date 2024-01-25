export class Counter {
  count: number;
  constructor() {
    this.count = 0;
  }
  increment(): void {
    this.count++;
  }
  decrement(): void {
    this.count--;
  }
  getCount() {
    return this.count;
  }
  reset() {
    this.count = 0;
  }
}
