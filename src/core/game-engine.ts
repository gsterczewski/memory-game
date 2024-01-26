import { Tile } from "./tile";
import { delay } from "../lib/delayed";

export type RoundResult = {
  score: 0 | 1;
  moves: 0 | 1;
};
export class GameEngine {
  private delaySeconds = 0;
  private firstTile: Tile | null = null;
  private secondTile: Tile | null = null;
  constructor(delaySeconds: number) {
    this.delaySeconds = delaySeconds;
  }

  private flipTile(tile: Tile) {
    tile.isFlipped = true;
  }
  private markTilesAsNotFlipped() {
    this.firstTile!.isFlipped = false;
    this.secondTile!.isFlipped = false;
  }
  private markTilesAsMatched() {
    this.firstTile!.isMatched = true;
    this.secondTile!.isMatched = true;
  }

  private evaluateTiles(): Promise<RoundResult> {
    if (this.firstTile!.getID() === this.secondTile!.getID())
      return Promise.resolve({ score: 0, moves: 0 });
    if (this.firstTile!.getValue() === this.secondTile!.getValue()) {
      this.markTilesAsMatched();
      this.markTilesAsNotFlipped();
      return Promise.resolve({ score: 1, moves: 1 });
    }
    return delay(() => {
      this.markTilesAsNotFlipped();
    }, this.delaySeconds).then(() => {
      return Promise.resolve({ score: 0, moves: 1 });
    });
  }
  public async setTile(tile: Tile): Promise<RoundResult> {
    this.flipTile(tile);
    if (this.firstTile) {
      this.secondTile = tile;
      const result = await this.evaluateTiles();
      return result;
    } else {
      this.firstTile = tile;
      return Promise.resolve({ moves: 0, score: 0 });
    }
  }
  public reset(): void {
    this.firstTile = null;
    this.secondTile = null;
  }
}
