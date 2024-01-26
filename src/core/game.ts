import { GameBoard } from "./board";
import { Tile } from "./tile";

export const gameOptions = {
  players: [1, 2, 3, 4],
  theme: ["numbers", "icons"],
  boardSize: [16, 36],
  order: ["random", "sequential"],
  gameSpeed: [0, 1, 2],
} as const;

export const defaultOptions: GameOptions = {
  players: 1,
  theme: "numbers",
  boardSize: 16,
  order: "random",
  gameSpeed: 1,
};

export type GameOptions = {
  [K in keyof typeof gameOptions]: (typeof gameOptions)[K][number];
};

export type SPGameResults = {
  moves: number;
  time: number;
};

export abstract class Game {
  private board: GameBoard;
  protected isGameLocked = false;
  protected GAME_STATUS = {
    NOT_STARTED: "NOT_STARTED",
    STARTED: "STARTED",
    FINISHED: "FINISHED",
  } as const;

  protected currentGameStatus: keyof typeof this.GAME_STATUS;
  protected gameSpeed: number;
  constructor(options: GameOptions) {
    this.board = new GameBoard(options.boardSize);
    this.gameSpeed = options.gameSpeed;
    this.currentGameStatus = this.GAME_STATUS.NOT_STARTED;
    if (options.order === "random") {
      this.board.shuffle();
    }
  }
  protected getTile(index: number): Tile {
    return this.board.getTile(index);
  }
  protected areTilesEqual(tile1: Tile, tile2: Tile): boolean {
    return tile1.getValue() === tile2.getValue();
  }
  protected lockGame() {
    this.isGameLocked = true;
  }
  protected unlockGame() {
    this.isGameLocked = false;
  }
  protected setGameStatus(status: keyof typeof this.GAME_STATUS) {
    this.currentGameStatus = status;
  }
  protected start(cb?: () => void) {
    this.setGameStatus(this.GAME_STATUS.STARTED);
    if (cb) {
      cb();
    }
  }
  protected stop(cb?: () => void) {
    this.setGameStatus(this.GAME_STATUS.FINISHED);
    if (cb) {
      cb();
    }
  }
  public getBoard(): GameBoard["tiles"] {
    return this.board.getTiles();
  }
  public isOver(): boolean {
    return this.currentGameStatus === this.GAME_STATUS.FINISHED;
  }
}
