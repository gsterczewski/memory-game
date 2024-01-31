import { expect, test, describe, beforeEach } from "vitest";
import { MultiPlayerGame } from "../multi-player-game";
import { GameOptions } from "../game";
import { selectTilesAsync } from "./helpers";
const testOptions: GameOptions = {
  players: 2,
  order: "sequential",
  boardSize: 16,
  theme: "numbers",
  gameDelay: 0,
};
let game2: MultiPlayerGame;
let game3: MultiPlayerGame;
let game4: MultiPlayerGame;
beforeEach(() => {
  game2 = new MultiPlayerGame(testOptions);
  game3 = new MultiPlayerGame({ ...testOptions, players: 3 });
  game4 = new MultiPlayerGame({ ...testOptions, players: 4 });
});

describe("multiplayer game", () => {
  describe("getActivePlayerIndex", () => {
    describe("2 player game", () => {
      test("after 0 moves, returns index of player 1", () => {
        expect(game2.getActivePlayerIndex()).toEqual(0);
      });
      test("after 1 move, returns index of player 2", async () => {
        await selectTilesAsync([0, 1], game2);
        expect(game2.getActivePlayerIndex()).toEqual(1);
      });
      test("after 2 moves, returns index of player 1", async () => {
        await selectTilesAsync([0, 1, 5, 6], game2);
        expect(game2.getActivePlayerIndex()).toEqual(0);
      });
      test("after 3 moves, returns index of player 2", async () => {
        await selectTilesAsync([0, 1, 5, 6, 7, 8], game2);
        expect(game2.getActivePlayerIndex()).toEqual(1);
      });
      test("after even n of moves, returns index of player 1", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], game2);
        expect(game2.getActivePlayerIndex()).toEqual(0);
      });
      test("after odd n of moves, returns index of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          game2
        );
        expect(game2.getActivePlayerIndex()).toEqual(1);
      });
    });
    describe("3 player game", () => {
      test("after 0 moves, returns index of player 1", async () => {
        expect(game3.getActivePlayerIndex()).toEqual(0);
      });
      test("after 1 move, returns index of player 2", async () => {
        await selectTilesAsync([0, 1], game3);
        expect(game3.getActivePlayerIndex()).toEqual(1);
      });
      test("after 2 moves, returns index of player 3", async () => {
        await selectTilesAsync([0, 1, 2, 3], game3);
        expect(game3.getActivePlayerIndex()).toEqual(2);
      });
      test("after 6 moves, returns index of player 1", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], game3);
        expect(game3.getActivePlayerIndex()).toEqual(0);
      });
      test("after 7 moves, returns index of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          game3
        );
        expect(game3.getActivePlayerIndex()).toEqual(1);
      });
      test("after 8 moves, returns index of player 3", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          game3
        );
        expect(game3.getActivePlayerIndex()).toEqual(2);
      });
    });
    describe("4 player game", () => {
      test("after 0 moves, returns index of player 1", async () => {
        expect(game4.getActivePlayerIndex()).toEqual(0);
      });
      test("after 1 move, returns index of player 2", async () => {
        await selectTilesAsync([0, 1], game4);
        expect(game4.getActivePlayerIndex()).toEqual(1);
      });
      test("after 2 moves, returns index of player 3", async () => {
        await selectTilesAsync([0, 1, 2, 3], game4);
        expect(game4.getActivePlayerIndex()).toEqual(2);
      });
      test("after 3 moves, returns index of player 4", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5], game4);
        expect(game4.getActivePlayerIndex()).toEqual(3);
      });
      test("after 8 moves, returns index of player 1", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          game4
        );
        expect(game4.getActivePlayerIndex()).toEqual(0);
      });
      test("after 9 moves, returns index of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1],
          game4
        );
        expect(game4.getActivePlayerIndex()).toEqual(1);
      });
      test("after 10 moves, returns index of player 3", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3],
          game4
        );
        expect(game4.getActivePlayerIndex()).toEqual(2);
      });
      test("after 11 moves, returns index of player 4", async () => {
        await selectTilesAsync(
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 5,
            6,
          ],
          game4
        );
        expect(game4.getActivePlayerIndex()).toEqual(3);
      });
    });
  });
  describe("getScores()", () => {
    test("when game has not yet started, returns n-sized array of 0's, where n = number of players", () => {
      expect(game4.getScores()).toEqual([0, 0, 0, 0]);
    });
    test("when game has started, returns n-sized array of numbers equal to each player score ", async () => {
      await selectTilesAsync([0, 8], game4);
      expect(game4.getScores()).toEqual([1, 0, 0, 0]);
      await selectTilesAsync([1, 9], game4);
      expect(game4.getScores()).toEqual([1, 1, 0, 0]);
      await selectTilesAsync([2, 10], game4);
      expect(game4.getScores()).toEqual([1, 1, 1, 0]);
      await selectTilesAsync([3, 11], game4);
      expect(game4.getScores()).toEqual([1, 1, 1, 1]);
      await selectTilesAsync([4, 12], game4);
      expect(game4.getScores()).toEqual([2, 1, 1, 1]);
      await selectTilesAsync([5, 15], game4);
      expect(game4.getScores()).toEqual([2, 1, 1, 1]);
      await selectTilesAsync([5, 13], game4);
      expect(game4.getScores()).toEqual([2, 1, 2, 1]);
    });
  });
  describe("isOver", () => {
    test("when the game has not started returns false", () => {
      expect(game2.isOver()).toEqual(false);
      expect(game3.isOver()).toEqual(false);
      expect(game4.isOver()).toEqual(false);
    });
    test("when not all tiles are matched returns false", async () => {
      await selectTilesAsync(
        [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14],
        game4
      );
      expect(game4.isOver()).toEqual(false);
    });
    test("when  all tiles are matched returns true", async () => {
      await selectTilesAsync(
        [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15],
        game4
      );
      expect(game4.isOver()).toEqual(true);
    });
  });
  describe("reset()", () => {
    test("it should reset game board to initial state", async () => {
      await selectTilesAsync(
        [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 15],
        game4
      );
      game4.reset();
      expect(game4.getBoard().some((tile) => tile.isMatched)).toEqual(false);
      expect(game4.getBoard().some((tile) => tile.isFlipped)).toEqual(false);
    });
    test("it should reset scores to initial state", async () => {
      await selectTilesAsync(
        [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 15],
        game4
      );
      expect(game4.getScores().some((score) => score > 0)).toEqual(true);
      game4.reset();
      expect(game4.getScores().some((score) => score > 0)).toEqual(false);
    });
    test("it should reset current turn to initial state", async () => {
      await selectTilesAsync([0, 8], game2);
      expect(game2.getActivePlayerIndex()).toEqual(1);
      game2.reset();
      expect(game2.getActivePlayerIndex()).toEqual(0);
    });
  });
});
