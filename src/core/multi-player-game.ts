import { Game, GameOptions, MemoryGame } from "./game";

export class MultiPlayerGame extends Game implements MemoryGame {
  constructor(options: GameOptions) {
    super(options);
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
    this.lockGame();
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
    this.unlockGame();
  }
  public getTime(): number {
    return 0;
  }
  public getScores(): number[] {
    return this.players.map((player) => player.getScore());
  }
  public getMoves(): number {
    return this.players.reduce((sum, player) => sum + player.getMoves(), 0);
  }
  public reset(): void {
    this.board.reset();
    this.players.forEach((player) => {
      player.reset();
    });
    this.activePlayerIndex = 0;
  }
}
