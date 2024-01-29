import { Timer } from "../lib/timer";
import { Game, GameOptions, MemoryGame } from "./game";
import { Player } from "./player";

export class SinglePlayerGame extends Game implements MemoryGame {
  private timer: Timer;
  private player: Player;
  constructor(options: GameOptions) {
    super(options);
    this.timer = new Timer();
    this.player = this.players[0];
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
    this.lockGame();
    const { moves, score } = await this.engine.setTile(this.getTile(tileIndex));
    if (score) {
      this.player.incrementScore();
    }
    if (moves) {
      this.player.incrementMoves();
    }
    if (this.areAllTilesMatched()) {
      this.stop(() => {
        this.timer.stop();
      });
    }
    this.unlockGame();
  }

  public getMoves() {
    return this.player.getMoves();
  }
  public getTime() {
    return this.timer.getTime();
  }
  public getScores(): number[] {
    return [this.player.getScore()];
  }
  public reset(): void {
    this.timer.reset();
    this.player.reset();
    this.board.reset();
    this.setGameStatus(this.GAME_STATUS.NOT_STARTED);
  }
}
