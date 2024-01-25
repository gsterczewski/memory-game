import { expect, test, describe } from "vitest";
import { GameBoard } from "./board";

describe("GameBoard", () => {
  test("generates 4x4 game board", () => {
    const board = new GameBoard(16);
    expect(board.getTiles().length).toEqual(16);
  });
  test("generates 6x6 game board", () => {
    const board = new GameBoard(36);
    expect(board.getTiles().length).toEqual(36);
  });

  test("GameBoard.shuffle() shuffles tiles ", () => {
    const board = new GameBoard(36);
    const board2 = new GameBoard(36);
    board.shuffle();
    board2.shuffle();
    const order = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    const values1 = board.getTiles().map((tile) => tile.getValue());
    const values2 = board2.getTiles().map((tile) => tile.getValue());
    expect(values1).not.toEqual(order);
    expect(values2).not.toEqual(values1);
  });
  test("GameBoard.getTiles() returns array with correct number of tiles", () => {
    const tiles16 = new GameBoard(16).getTiles();
    const tiles36 = new GameBoard(36).getTiles();
    expect(tiles16.length).toEqual(16);
    expect(tiles36.length).toEqual(36);
  });
  test("GameBoard.getTile(index) returns correct tile", () => {
    const board = new GameBoard(16);
    const expectedTile1Value = 1;
    const expectedTile2Value = 8;
    const tile1 = board.getTile(0);
    const tile2 = board.getTile(15);
    expect(tile1.getValue()).toEqual(expectedTile1Value);
    expect(tile2.getValue()).toEqual(expectedTile2Value);
  });
});
