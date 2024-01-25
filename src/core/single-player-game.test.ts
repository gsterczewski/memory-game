import { expect, test, describe } from "vitest";

import { GameOptions } from "./game";
import { createGame } from "./createGame";
import { SinglePlayerGame } from "./single-player-game";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const testOptions: GameOptions = {
  players: 1,
  boardSize: 16,
  theme: "numbers",
  order: "sequential",
  gameSpeed: 0,
};

describe("Game", () => {
  describe("Single player game", () => {
    test("board order is random", () => {
      const game = createGame({ ...testOptions, order: "random" });
      const game2 = createGame({ ...testOptions, order: "random" });
      const order = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      const values1 = game.getBoard().map((tile) => tile.getValue());
      const values2 = game2.getBoard().map((tile) => tile.getValue());
      expect(values1).not.toEqual(order);
      expect(values2).not.toEqual(values1);
    });
    test("game keeps track of number of moves made by the player", () => {
      const game = createGame(testOptions) as SinglePlayerGame;
      const tilesToSelect = [0, 8, 1, 9, 5];
      tilesToSelect.forEach((tile) => {
        game.selectTile(tile);
      });
      expect(game.getMoves()).toEqual(2);
    });
    test("game keeps track of number of matched tiles by the player", () => {
      const game = createGame(testOptions) as SinglePlayerGame;
      const tilesToSelect = [0, 8, 1, 9, 5];
      tilesToSelect.forEach((tile) => {
        game.selectTile(tile);
      });
      expect(game.getMatchedTiles()).toEqual(2);
    });
    test("game can be restarted with current settings", () => {
      const game = createGame(testOptions) as SinglePlayerGame;
      const tilesToSelect = [0, 8, 1, 9];
      tilesToSelect.forEach((tile) => {
        game.selectTile(tile);
      });
      game.reset();
      expect(game.isOver).toEqual(false);
      expect(game.getTime()).toEqual(0);
      expect(game.getMoves()).toEqual(0);
      expect(game.getMatchedTiles()).toEqual(0);
    });
    test("game keeps track of elapsed time", async () => {
      const game = createGame(testOptions) as SinglePlayerGame;

      const start = Date.now();
      game.selectTile(0);
      await sleep(4000);
      const end = Date.now();
      const gameTime = game.getTime();
      const time = (end - start) / 1000;

      expect(gameTime).toBeGreaterThan(0);
      expect(gameTime).toEqual(Math.floor(time) - 1);
    });
    test("after all tiles are matched, game is over, and final results are generated", () => {
      const tilesToMatch = [
        0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15,
      ];
      const game = createGame({
        ...testOptions,
        gameSpeed: 1,
      }) as SinglePlayerGame;
      tilesToMatch.forEach((tile) => {
        game.selectTile(tile);
      });
      expect(game.isOver).toEqual(true);
      const results = game.getResults();
      expect(results).toHaveProperty("time");
      expect(results).toHaveProperty("moves");
      expect(results.moves).toEqual(8);
    });
  });
});
