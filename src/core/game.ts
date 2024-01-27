import { GameBoard } from "./board";
import { GameEngine } from "./game-engine";
import { Tile } from "./tile";

export const gameOptions = {
  players: [1, 2, 3, 4],
  theme: ["numbers", "icons"],
  boardSize: [16, 36],
  order: ["random", "sequential"],
  gameDelay: [0, 1, 2],
} as const;

export const defaultOptions: GameOptions = {
  players: 1,
  theme: "numbers",
  boardSize: 16,
  order: "random",
  gameDelay: 1,
};

export type GameOptions = {
  [K in keyof typeof gameOptions]: (typeof gameOptions)[K][number];
};

export type SPGameResults = {
  moves: number;
  time: number;
};

type Callback = () => void;

export abstract class Game {
  protected board: GameBoard;
  protected engine: GameEngine;

  protected isGameLocked = false;

  protected GAME_STATUS = {
    NOT_STARTED: "NOT_STARTED",
    STARTED: "STARTED",
    FINISHED: "FINISHED",
  } as const;
  protected currentGameStatus: keyof typeof this.GAME_STATUS;

  constructor(options: GameOptions) {
    this.board = new GameBoard(options.boardSize);
    this.engine = new GameEngine(options.gameDelay);
    this.currentGameStatus = this.GAME_STATUS.NOT_STARTED;
    if (options.order === "random") {
      this.board.shuffle();
    }
  }
  protected getTile(index: number): Tile {
    return this.board.getTile(index);
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
  protected start(cb?: Callback) {
    this.setGameStatus(this.GAME_STATUS.STARTED);
    if (cb) {
      cb();
    }
  }
  protected stop(cb?: Callback) {
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
