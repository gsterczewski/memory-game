export class Tile {
  public isFlipped = false;
  public isMatched = false;
  constructor(private readonly id: string, private readonly value: number) {}
  markAsFlipped() {
    this.isFlipped = true;
  }
  markAsNotFlipped() {
    this.isFlipped = false;
  }
  markAsMatched() {
    this.isMatched = true;
  }
  markAsNotMatched() {
    this.isMatched = false;
  }
  getValue() {
    return this.value;
  }
  getID() {
    return this.id;
  }
}
