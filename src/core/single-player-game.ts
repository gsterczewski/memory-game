import { Timer } from "../lib/timer";
import { Game, GameOptions, SPGameResults } from "./game";
import { Player } from "./player";

export class SinglePlayerGame extends Game {
  private timer: Timer;
  private player: Player;
  private tilesToMatch: number;
  constructor(options: GameOptions) {
    super(options);
    this.timer = new Timer();
    this.tilesToMatch = options.boardSize / 2;
    this.player = new Player("player-1");
  }

  private areAllTilesMatched(): boolean {
    return this.player.getScore() === this.tilesToMatch;
  }

  public async selectTile(tileIndex: number) {
    if (tileIndex < 0 || tileIndex > this.getBoard().length - 1) return;
    if (this.isGameLocked) return;
    if (this.currentGameStatus !== this.GAME_STATUS.STARTED) {
      this.start(() => {
        this.timer.start();
      });
    }
    const { moves, score } = await this.engine.setTile(this.getTile(tileIndex));
    if (moves) {
      this.player.incrementMoves();
    }
    if (score) {
      this.player.incrementScore();
    }
    if (this.areAllTilesMatched()) {
      this.stop(() => {
        this.timer.stop();
      });
    }
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
    this.board.reset();
    this.setGameStatus(this.GAME_STATUS.NOT_STARTED);
  }

  public getResults(): SPGameResults {
    return Object.freeze({
      time: this.getTime(),
      moves: this.player.getMoves(),
    });
  }
}
