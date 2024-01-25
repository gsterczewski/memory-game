import { Counter } from "../lib/counter";
import { Timer } from "../lib/timer";
import { Game, GameOptions, SPGameResults } from "./game";
import { Tile } from "./tile";
import delayed from "../lib/delayed";

export class SinglePlayerGame extends Game {
  private readonly MS_IN_SECOND = 1000;
  private timer: Timer;
  private moves = new Counter();
  private previousTile: Tile | undefined;
  private matchedTiles = new Counter();
  private tilesToMatch: number;
  constructor(options: GameOptions) {
    super(options);
    this.timer = new Timer();
    this.tilesToMatch = options.boardSize / 2;
  }
  private start(): void {
    this.timer.start();
    this.isGameStarted = true;
  }
  private stop(): void {
    this.timer.stop();
    this.setGameAsOver();
  }
  private incrementMoves() {
    this.moves.increment();
  }
  private incrementMatchedTiles() {
    this.matchedTiles.increment();
  }
  private areAllTilesMatched(): boolean {
    return this.matchedTiles.count === this.tilesToMatch;
  }
  private handleMatchedTiles(tile1: Tile, tile2: Tile) {
    this.incrementMatchedTiles();
    tile1.markAsMatched();
    tile2.markAsMatched();
    tile1.markAsNotFlipped();
    tile2.markAsNotFlipped();
    this.previousTile = undefined;
    if (this.areAllTilesMatched()) {
      this.stop();
    }
  }
  private handleMismatchedTiles(tile1: Tile, tile2: Tile) {
    tile1.markAsNotFlipped();
    tile2.markAsNotFlipped();
    this.previousTile = undefined;
  }

  public selectTile(tileIndex: number) {
    if (this.isGameLocked) return;
    if (!this.isGameStarted) {
      this.start();
    }

    const tile = this.getTile(tileIndex);
    if (tile.isMatched) return;

    tile.markAsFlipped();

    if (this.previousTile) {
      this.incrementMoves();
      if (this.areTilesEqual(tile, this.previousTile)) {
        this.handleMatchedTiles(tile, this.previousTile);
      } else {
        if (this.gameSpeed === 0) {
          this.handleMismatchedTiles(tile, this.previousTile);
        } else {
          this.lockGame();
          delayed(() => {
            this.handleMismatchedTiles(tile, this.previousTile!);
            this.unlockGame();
          }, this.MS_IN_SECOND * this.gameSpeed);
        }
      }
    } else {
      this.previousTile = tile;
    }
  }

  public getMoves() {
    return this.moves.getCount();
  }
  public getTime() {
    return this.timer.getTime();
  }
  public getMatchedTiles(): number {
    return this.matchedTiles.count;
  }
  public reset(): void {
    this.matchedTiles.reset();
    this.timer.reset();
    this.moves.reset();
    this.isOver = false;
  }

  public getResults(): SPGameResults {
    return Object.freeze({
      time: this.getTime(),
      moves: this.getMoves(),
    });
  }
}
