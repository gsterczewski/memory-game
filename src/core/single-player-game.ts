import { Timer } from "../lib/timer";
import { Game, GameOptions, SPGameResults } from "./game";
import { Tile } from "./tile";
import { Player } from "./player";
import delayed from "../lib/delayed";

export class SinglePlayerGame extends Game {
  private readonly MS_IN_SECOND = 1000;
  private timer: Timer;
  private previousTile: Tile | undefined;
  private player: Player;
  private tilesToMatch: number;
  constructor(options: GameOptions) {
    super(options);
    this.timer = new Timer();
    this.tilesToMatch = options.boardSize / 2;
    this.player = new Player("player-1");
  }

  private incrementMoves() {
    this.player.incrementMoves();
  }

  private areAllTilesMatched(): boolean {
    return this.player.getScore() === this.tilesToMatch;
  }
  private handleMatchedTiles(tile1: Tile, tile2: Tile) {
    this.player.incrementScore();
    tile1.markAsMatched();
    tile2.markAsMatched();
    tile1.markAsNotFlipped();
    tile2.markAsNotFlipped();
    this.previousTile = undefined;
    if (this.areAllTilesMatched()) {
      this.stop(() => {
        this.timer.stop();
      });
    }
  }
  private handleMismatchedTiles(tile1: Tile, tile2: Tile) {
    tile1.markAsNotFlipped();
    tile2.markAsNotFlipped();
    this.previousTile = undefined;
  }

  public selectTile(tileIndex: number): Tile | undefined {
    if (tileIndex < 0 || tileIndex > this.getBoard().length - 1) return;
    if (this.isGameLocked) return;
    if (this.currentGameStatus !== this.GAME_STATUS.STARTED) {
      this.start(() => {
        this.timer.start();
      });
    }

    const tile = this.getTile(tileIndex);
    if (this.previousTile?.getID() === tile.getID()) return;
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
    return tile;
  }

  public getMoves() {
    return this.player.getMoves();
  }
  public getTime() {
    return this.timer.getTime();
  }
  public getMatchedTiles(): number {
    return this.player.getScore();
  }
  public reset(): void {
    this.timer.reset();
    this.player.reset();
    this.setGameStatus(this.GAME_STATUS.NOT_STARTED);
  }

  public getResults(): SPGameResults {
    return Object.freeze({
      time: this.getTime(),
      moves: this.player.getMoves(),
    });
  }
}
