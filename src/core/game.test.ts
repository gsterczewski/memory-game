import { expect, test, describe } from "vitest";
import { createGame } from "./game";
import { GridSize } from "./types";
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
const createTestGame = (size: GridSize) =>
  createGame({ grid: size, testMode: true, theme: "numbers", players: 1 });
describe("Single player game", () => {
  describe("game board", () => {
    test("player can choose 4x4 board", () => {
      const game = createTestGame(16);
      expect(game.board.length).toEqual(16);
    });
    test("player can choose 6x6 board", () => {
      const game = createTestGame(36);
      expect(game.board.length).toEqual(36);
    });
    test("board order is random", () => {
      const game1 = createGame();
      const game2 = createGame();
      const order = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      const values1 = game1.board.map((tile) => tile.value);
      const values2 = game2.board.map((tile) => tile.value);
      expect(values1).not.toEqual(order);
      expect(values2).not.toEqual(values1);
    });
  });
  describe("game control", () => {
    test("player can restart the game with current settings", () => {
      const game = createTestGame(16);
      const tilesToMatch = [0, 8, 1, 9];
      tilesToMatch.forEach((tile) => {
        game.flipTile(tile);
      });
      tilesToMatch.forEach((tile) => {
        expect(game.board[tile].isMatched).toBe(true);
      });
      expect(game.getMovesMade()).toEqual(2);
      expect(game.getMatchedTiles()).toEqual(2);
      game.restart();
      expect(game.getMovesMade()).toEqual(0);
      expect(game.getMatchedTiles()).toEqual(0);
      game.board.forEach((tile) => {
        expect(tile.isFlipped).toBe(false);
        expect(tile.isMatched).toBe(false);
      });
    });
  });
  describe("game score", () => {
    test("player can see current moves made", () => {
      const game = createTestGame(16);
      expect(game.getMovesMade()).toEqual(0);
      game.flipTile(0);
      game.flipTile(1);
      game.flipTile(5);
      game.flipTile(8);

      expect(game.getMovesMade()).toEqual(2);
      game.flipTile(9);
      expect(game.getMovesMade()).toEqual(2);
      game.flipTile(2);
      expect(game.getMovesMade()).toEqual(3);
    });
    test("player can see current matched tiles", () => {
      const game = createTestGame(16);
      expect(game.getMatchedTiles()).toEqual(0);
      game.flipTile(0);
      game.flipTile(9);
      expect(game.getMatchedTiles()).toEqual(0);
      game.flipTile(0);
      game.flipTile(8);
      expect(game.getMatchedTiles()).toEqual(1);
      game.flipTile(1);
      game.flipTile(9);
      game.flipTile(2);
      game.flipTile(10);
      expect(game.getMatchedTiles()).toEqual(3);
      game.flipTile(3);
      game.flipTile(11);
      game.flipTile(4);
      game.flipTile(12);
      game.flipTile(5);
      game.flipTile(13);
      game.flipTile(6);
      game.flipTile(14);
      game.flipTile(7);
      game.flipTile(15);
      expect(game.getMatchedTiles()).toEqual(8);
    });
    test("if all tiles are matched game should be over and player can see total moves made", () => {
      const game = createTestGame(16);
      game.flipTile(0);
      game.flipTile(8);
      game.flipTile(1);
      game.flipTile(9);
      game.flipTile(2);
      game.flipTile(10);
      game.flipTile(3);
      game.flipTile(11);
      game.flipTile(4);
      game.flipTile(12);
      game.flipTile(5);
      game.flipTile(13);
      game.flipTile(6);
      game.flipTile(14);
      game.flipTile(7);
      game.flipTile(15);
      expect(game.isGameOver()).toEqual(true);
      expect(game.getMatchedTiles()).toEqual(8);
      expect(game.getMovesMade()).toEqual(8);
    });
    test("player can see current game time", async () => {
      const game = createGame();

      const start = Date.now();
      game.flipTile(0);
      await sleep(4000);
      const end = Date.now();
      const gameTime = game.getTime();
      const time = (end - start) / 1000;

      expect(gameTime).toBeGreaterThan(0);
      expect(gameTime).toEqual(Math.floor(time) - 1);
    });
    test("if all tiles are matched player can see final game time", async () => {
      const game = createTestGame(16);
      const delay = 2000;
      game.flipTile(0);
      await sleep(delay);
      game.flipTile(8);
      game.flipTile(1);
      game.flipTile(9);
      game.flipTile(2);
      game.flipTile(10);
      game.flipTile(3);
      game.flipTile(11);
      game.flipTile(4);
      game.flipTile(12);
      game.flipTile(5);
      game.flipTile(13);
      game.flipTile(6);
      game.flipTile(14);
      game.flipTile(7);
      game.flipTile(15);
      expect(game.isGameOver()).toEqual(true);
      expect(game.getTime()).toBeGreaterThanOrEqual(delay / 1000 - 1);
    });
  });
});
