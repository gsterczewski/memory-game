import { expect, test, describe, beforeEach } from "vitest";
import { GameBoard } from "./board";

let board16: GameBoard;
let board36: GameBoard;
beforeEach(() => {
  board16 = new GameBoard(16);
  board36 = new GameBoard(36);
});
describe("GameBoard", () => {
  test("generates 4x4 game board", () => {
    expect(board16.getTiles().length).toEqual(16);
  });
  test("generates 6x6 game board", () => {
    expect(board36.getTiles().length).toEqual(36);
  });

  test("GameBoard.shuffle() shuffles tiles ", () => {
    const board2 = new GameBoard(36);
    board36.shuffle();
    board2.shuffle();
    const order = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    const values1 = board36.getTiles().map((tile) => tile.getValue());
    const values2 = board2.getTiles().map((tile) => tile.getValue());
    expect(values1).not.toEqual(order);
    expect(values2).not.toEqual(values1);
  });
  test("GameBoard.getTiles() returns array with correct number of tiles", () => {
    expect(board16.getTiles().length).toEqual(16);
    expect(board36.getTiles().length).toEqual(36);
  });
  test("GameBoard.getTile(index) returns correct tile", () => {
    const tilesToCheck = [0, 8, 9, 15];
    const expectedValues = [1, 1, 2, 8];
    tilesToCheck.forEach((tile, index) => {
      expect(board16.getTile(tile).getValue()).toEqual(expectedValues[index]);
    });
  });
  describe("reset()", () => {
    test("sets 'isFlipped' prop on all tiles to false", () => {
      const tilesToFlip = [0, 8, 9, 15];
      tilesToFlip.forEach((tile) => {
        board16.getTile(tile).markAsFlipped();
      });
      expect(board16.getTiles().some((tile) => tile.isFlipped)).toEqual(true);
      board16.reset();
      expect(
        board16.getTiles().every((tile) => tile.isFlipped === false)
      ).toEqual(true);
    });
    test("sets 'isMatched' prop on all tiles to false", () => {
      const tilesToMatch = [0, 8, 9, 15];
      tilesToMatch.forEach((tile) => {
        board16.getTile(tile).markAsMatched();
      });
      expect(board16.getTiles().some((tile) => tile.isMatched)).toEqual(true);
      board16.reset();
      expect(
        board16.getTiles().every((tile) => tile.isMatched === false)
      ).toEqual(true);
    });
  });
});
