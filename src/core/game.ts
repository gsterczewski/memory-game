import { GameBoard } from "./board";
import { GameEngine } from "./game-engine";
import { Tile } from "./tile";
import { Player } from "./player";

export interface MemoryGame {
  selectTile(index: number): Promise<void>;
  getBoard(): GameBoard["tiles"];
  isOver(): boolean;
  reset(): void;
  getMoves(): number;
  getScores(): number[];
  getTime(): number;
  getActivePlayerID(): string;
}

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

type Callback = () => void;

export abstract class Game {
  protected board: GameBoard;
  protected engine: GameEngine;
  protected tilesToMatch: number;
  protected playersCount: number;
  protected isGameLocked = false;
  protected players: Player[];
  protected activePlayerIndex = 0;

  protected GAME_STATUS = {
    NOT_STARTED: "NOT_STARTED",
    STARTED: "STARTED",
    FINISHED: "FINISHED",
  } as const;
  protected currentGameStatus: keyof typeof this.GAME_STATUS;

  constructor(options: GameOptions) {
    this.board = new GameBoard(options.boardSize);
    this.engine = new GameEngine(options.gameDelay);
    this.players = this.initPlayers(options.players);
    this.playersCount = options.players;

    this.tilesToMatch = options.boardSize / 2;
    this.currentGameStatus = this.GAME_STATUS.NOT_STARTED;
    if (options.order === "random") {
      this.board.shuffle();
    }
  }
  private initPlayers(playersCount: number): Player[] {
    return Array.from({ length: playersCount }).map(
      (_, index) => new Player(`player-${index + 1}`)
    );
  }
  protected changeActivePlayer() {
    if (this.activePlayerIndex === this.playersCount - 1) {
      this.activePlayerIndex = 0;
    } else {
      this.activePlayerIndex += 1;
    }
  }
  protected getActivePlayer(): Player {
    return this.players[this.activePlayerIndex];
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
  public getActivePlayerID(): string {
    return this.getActivePlayer().getID();
  }
  public getBoard(): GameBoard["tiles"] {
    return this.board.getTiles();
  }
  public isOver(): boolean {
    return this.currentGameStatus === this.GAME_STATUS.FINISHED;
  }
}
