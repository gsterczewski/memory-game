import { Player } from "./player";
import { Game, GameOptions } from "./game";

export class MultiPlayerGame extends Game {
  private players: Player[];
  private playersCount: number;
  private activePlayerIndex = 0;
  private tilesToMatch: number;
  constructor(options: GameOptions) {
    super(options);
    this.playersCount = options.players;
    this.players = this.initPlayers(options.players);
    this.tilesToMatch = options.boardSize / 2;
  }
  private initPlayers(playersCount: number): Player[] {
    return Array.from({ length: playersCount }).map(
      (_, index) => new Player(`player-${index + 1}`)
    );
  }

  private changeActivePlayer() {
    if (this.activePlayerIndex === this.playersCount - 1) {
      this.activePlayerIndex = 0;
    } else {
      this.activePlayerIndex += 1;
    }
  }
  private getActivePlayer(): Player {
    return this.players[this.activePlayerIndex];
  }
  private incrementScore() {
    this.getActivePlayer().incrementScore();
  }
  private areAllTilesMatched(): boolean {
    return (
      this.getScores().reduce((sum, val) => sum + val, 0) === this.tilesToMatch
    );
  }
  public async selectTile(tileIndex: number) {
    if (tileIndex < 0 || tileIndex > this.getBoard().length - 1) return;
    if (this.isGameLocked) return;
    if (this.currentGameStatus !== this.GAME_STATUS.STARTED) {
      this.start();
    }
    const { moves, score } = await this.engine.setTile(this.getTile(tileIndex));
    if (score) {
      this.incrementScore();
    }
    if (moves) {
      this.changeActivePlayer();
    }
    if (this.areAllTilesMatched()) {
      this.stop();
    }
  }
  public getActivePlayerID(): string {
    return this.getActivePlayer().getID();
  }
  public getScores(): number[] {
    return this.players.map((player) => player.getScore());
  }
  public reset(): void {
    this.board.reset();
    this.players.forEach((player) => {
      player.reset();
    });
    this.activePlayerIndex = 0;
  }
}
