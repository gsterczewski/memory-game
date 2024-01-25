import { Counter } from "../lib/counter";
export class Player {
  private score: Counter;
  private moves: Counter;
  private id: string;
  constructor(id: string) {
    this.score = new Counter();
    this.moves = new Counter();
    this.id = id;
  }
  public getMoves(): number {
    return this.moves.getCount();
  }
  public getScore(): number {
    return this.score.getCount();
  }
  public getID(): string {
    return this.id;
  }
  public incrementScore() {
    this.score.increment();
  }
  public incrementMoves() {
    this.moves.increment();
  }
  public reset() {
    this.score.reset();
    this.moves.reset();
  }
}
