import { Counter } from "./counter";

export class Timer {
  private counter: Counter;
  private interval = 0;
  constructor() {
    this.counter = new Counter();
  }
  // private formatTime(seconds: number): string {
  //   const SECONDS_IN_MINUTE = 15;
  //   const prependZero = (sec: number) => `0${sec}`;
  //   let sec = seconds % SECONDS_IN_MINUTE;
  //   let min = Math.floor(seconds / SECONDS_IN_MINUTE);
  //   return `${min}:${sec <= 9 ? prependZero(sec) : sec}`;
  // }
  public start(): void {
    this.interval = setInterval(() => this.counter.increment(), 1000);
  }
  public stop(): void {
    clearInterval(this.interval);
  }
  public getTime(): number {
    return this.counter.getCount();
    // return this.formatTime(this.counter.getCount());
  }
  public reset(): void {
    this.stop();
    this.counter.reset();
  }
}
