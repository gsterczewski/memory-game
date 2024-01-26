// import { GameBoard, Tile } from "./types";

// const createTile = (id: string, value: number): Tile => ({
//   id,
//   value,
//   isFlipped: false,
//   isMatched: false,
// });

// function shuffleArray(arr: any[]) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = arr[j];
//     arr[j] = arr[i];
//     arr[i] = temp;
//   }
// }
// export function createBoard(size: number, isSorted = false): GameBoard {
//   const generateID = (index: number) => `tile-${index + 1}`;
//   const generateValue = (boardSize: number, index: number) =>
//     (index % (boardSize / 2)) + 1;
//   const board = Array.from({ length: size }).map((_, index) =>
//     createTile(generateID(index), generateValue(size, index))
//   );
//   if (!isSorted) {
//     shuffleArray(board);
//   }
//   const reset = () => {
//     board.map((tile) => {
//       (tile.isFlipped = false), (tile.isMatched = false);
//     });
//   };
//   return {
//     getBoard: () => board,
//     reset,
//   };
// }

import { Tile } from "./tile";

export class GameBoard {
  private tiles: Tile[];
  constructor(size: number) {
    this.tiles = this.generateBoard(size);
  }
  private generateTileValue(index: number, size: number): number {
    return (index % (size / 2)) + 1;
  }
  private generateTileID(index: number): string {
    return `tile-${index}`;
  }
  private generateBoard(size: number): Tile[] {
    return Array.from({ length: size }).map(
      (_, index) =>
        new Tile(
          this.generateTileID(index),
          this.generateTileValue(index, size)
        )
    );
  }
  public getTile(index: number): Tile {
    return this.tiles[index];
  }
  public getTiles(): Tile[] {
    return this.tiles;
  }
  public shuffle(): void {
    const boardLength = this.tiles.length;
    for (let i = boardLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.tiles[j];
      this.tiles[j] = this.tiles[i];
      this.tiles[i] = temp;
    }
  }
  public reset(): void {
    this.tiles.forEach((tile) => {
      tile.markAsNotFlipped();
      tile.markAsNotMatched();
    });
  }
}
