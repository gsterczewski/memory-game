import { GameOptions, GridSize, Tile } from "./types";
import { createBoard } from "./board";

export const defaultOptions: GameOptions = {
  players: 1,
  grid: 16,
  theme: "numbers",
  testMode: false,
};

interface Timer {
  start(): void;
  stop(): void;
  getTime(): number;
  reset(): void;
  hasStarted(): boolean;
}

function timer(): Timer {
  let time = 0;
  let interval = 0;
  let hasStarted = false;
  const incrementTime = () => {
    time++;
  };
  const start = () => {
    interval = setInterval(incrementTime, 1000);
    hasStarted = true;
  };
  const stop = () => {
    clearInterval(interval);
  };
  const reset = () => {
    time = 0;
    hasStarted = false;
    clearInterval(interval);
  };
  const getTime = () => time;
  return {
    getTime,
    start,
    stop,
    reset,
    hasStarted: () => hasStarted,
  };
}

function singlePlayerGame(grid: GridSize, testMode: boolean) {
  const board = createBoard(grid, testMode);
  const tilesToMatch = grid / 2;
  let movesMade = 0;
  let matchedTiles = 0;
  let flippedTile: Tile | null = null;
  const clock = timer();

  const getTile = (tileIndex: number) => board[tileIndex];
  const tilesMatch = (tile1: Tile, tile2: Tile): boolean =>
    tile1.value === tile2.value;
  const incrementMoves = () => {
    movesMade += 1;
  };
  const incrementScore = () => {
    matchedTiles++;
  };
  const markTilesAsMatched = (tile1: Tile, tile2: Tile) => {
    tile1.isMatched = true;
    tile2.isMatched = true;
  };
  const markTilesAsNotFlipped = (tile1: Tile, tile2: Tile) => {
    tile1.isFlipped = false;
    tile2.isFlipped = false;
  };
  const flipTile = (tileIndex: number): void => {
    if (!clock.hasStarted()) {
      clock.start();
    }
    const tile = getTile(tileIndex);
    tile.isFlipped = true;

    if (tile.isMatched) return;
    if (flippedTile) {
      incrementMoves();
      if (tilesMatch(tile, flippedTile)) {
        incrementScore();
        markTilesAsMatched(flippedTile, tile);
        markTilesAsNotFlipped(flippedTile, tile);
        if (isGameOver()) {
          clock.stop();
        }
      } else {
        markTilesAsNotFlipped(flippedTile, tile);
      }
      flippedTile = null;
    } else {
      flippedTile = tile;
    }
  };
  const isGameOver = () => matchedTiles === tilesToMatch;
  return {
    board,
    getMatchedTiles: () => matchedTiles,
    getMovesMade: () => movesMade,
    flipTile,
    isGameOver,
    getTime: () => clock.getTime(),
  };
}
export function createGame(options?: GameOptions) {
  const testMode = options?.testMode || defaultOptions.testMode;
  const grid = options?.grid || defaultOptions.grid;
  return singlePlayerGame(grid, testMode);
}
