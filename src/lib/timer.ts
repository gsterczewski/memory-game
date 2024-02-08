import { Counter } from "./counter";

export class Timer {
  private counter: Counter;
  private interval = 0;
  constructor() {
    this.counter = new Counter();
  }

  public start(): void {
    this.interval = setInterval(() => this.counter.increment(), 1000);
  }
  public stop(): void {
    clearInterval(this.interval);
  }
  public getTime(): number {
    return this.counter.getCount();
  }
  public reset(): void {
    this.stop();
    this.counter.reset();
  }
}
