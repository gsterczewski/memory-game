export type Tile = {
  readonly id: string;
  readonly value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameBoard = {
  getBoard(): Tile[];
  reset(): void;
};

export type GridSize = 16 | 36;
export type TileTheme = "numbers" | "icons";
export type GameMode = 1 | 2 | 3 | 4;

export type GameOptions = {
  players: GameMode;
  grid: GridSize;
  theme: TileTheme;
  testMode: boolean;
};

export type SinglePlayerGame = {
  board: Tile[];
  getMatchedTiles(): number;
  getMovesMade(): number;
  flipTile(index: number): void;
  isGameOver(): boolean;
  getTime(): number;
  restart(): void;
};
export type MultiplayerGame = {};
export type Game = SinglePlayerGame | MultiplayerGame;
