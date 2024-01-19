import { GridSize, Tile } from "./types";
import { createBoard } from "./board";
import { ref, reactive } from "vue";
import timer from "../lib/timer";
import delayed from "../lib/delayed";

export default function singlePlayerGame(grid: GridSize, testMode: boolean) {
  const gameBoard = createBoard(grid, testMode);
  const board = reactive(gameBoard.getBoard());
  const tilesToMatch = grid / 2;
  const clock = timer();

  let movesMade = ref(0);
  let matchedTiles = ref(0);
  let flippedTile: Tile | null = null;
  let isBoardLocked = false;

  const lockBoard = () => {
    isBoardLocked = true;
  };
  const unlockBoard = () => {
    isBoardLocked = false;
  };
  const getTile = (tileIndex: number) => board[tileIndex];
  const tilesMatch = (tile1: Tile, tile2: Tile): boolean =>
    tile1.value === tile2.value;
  const incrementMoves = () => {
    movesMade.value += 1;
  };
  const incrementScore = () => {
    matchedTiles.value++;
  };
  const markTilesAsMatched = (tile1: Tile, tile2: Tile) => {
    tile1.isMatched = true;
    tile2.isMatched = true;
  };
  const markTilesAsNotFlipped = (tile1: Tile, tile2: Tile) => {
    tile1.isFlipped = false;
    tile2.isFlipped = false;
  };
  const handleMatchedTiles = (tile1: Tile, tile2: Tile) => {
    incrementScore();
    markTilesAsMatched(tile1, tile2);
    markTilesAsNotFlipped(tile1, tile2);
    if (isGameOver()) {
      clock.stop();
    }
  };
  const handleMismatchedTiles = (tile1: Tile, tile2: Tile) => {
    markTilesAsNotFlipped(tile1, tile2);
    flippedTile = null;
  };
  const flipTile = (tileIndex: number): void => {
    if (isBoardLocked) return;
    if (!clock.hasStarted()) clock.start();

    const tile = getTile(tileIndex);
    if (tile.isMatched) return;
    tile.isFlipped = true;

    if (flippedTile) {
      incrementMoves();
      if (tilesMatch(tile, flippedTile)) handleMatchedTiles(flippedTile, tile);

      /* skip timeout in tests*/
      if (testMode) {
        handleMismatchedTiles(flippedTile, tile);
      } else {
        lockBoard();
        delayed(() => {
          handleMismatchedTiles(flippedTile!, tile);
          unlockBoard();
        }, 1000);
      }
    } else {
      flippedTile = tile;
    }
  };
  const isGameOver = () => matchedTiles.value === tilesToMatch;
  const restart = () => {
    clock.reset();
    gameBoard.reset();
    movesMade.value = 0;
    matchedTiles.value = 0;
  };
  return {
    board,
    getMatchedTiles: () => matchedTiles.value,
    getMovesMade: () => movesMade.value,
    flipTile,
    isGameOver,
    getTime: () => clock.getTime(),
    restart,
  };
}
