import { GameBoard, Tile } from "./types";

const createTile = (id: string, value: number): Tile => ({
  id,
  value,
  isFlipped: false,
  isMatched: false,
});
function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
export function createBoard(size: number, isSorted = false): GameBoard {
  const generateID = (index: number) => `tile-${index + 1}`;
  const generateValue = (boardSize: number, index: number) =>
    (index % (boardSize / 2)) + 1;
  const board = Array.from({ length: size }).map((_, index) =>
    createTile(generateID(index), generateValue(size, index))
  );
  if (!isSorted) {
    shuffleArray(board);
  }
  return board;
}
