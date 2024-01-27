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
  describe("getActivePlayerID", () => {
    describe("2 player game", () => {
      test("after 0 moves, returns id of player 1", () => {
        expect(game2.getActivePlayerID()).toEqual("player-1");
      });
      test("after 1 move, returns id of player 2", async () => {
        await selectTilesAsync([0, 1], game2);
        expect(game2.getActivePlayerID()).toEqual("player-2");
      });
      test("after 2 moves, returns id of player 1", async () => {
        await selectTilesAsync([0, 1, 5, 6], game2);
        expect(game2.getActivePlayerID()).toEqual("player-1");
      });
      test("after 3 moves, returns id of player 2", async () => {
        await selectTilesAsync([0, 1, 5, 6, 7, 8], game2);
        expect(game2.getActivePlayerID()).toEqual("player-2");
      });
      test("after even n of moves, returns id of player 1", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], game2);
        expect(game2.getActivePlayerID()).toEqual("player-1");
      });
      test("after odd n of moves, returns id of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          game2
        );
        expect(game2.getActivePlayerID()).toEqual("player-2");
      });
    });
    describe("3 player game", () => {
      test("after 0 moves, returns id of player 1", async () => {
        expect(game3.getActivePlayerID()).toEqual("player-1");
      });
      test("after 1 move, returns id of player 2", async () => {
        await selectTilesAsync([0, 1], game3);
        expect(game3.getActivePlayerID()).toEqual("player-1");
      });
      test("after 2 moves, returns id of player 3", async () => {
        await selectTilesAsync([0, 1, 2, 3], game3);
        expect(game3.getActivePlayerID()).toEqual("player-2");
      });
      test("after 6 moves, returns id of player 1", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], game3);
        expect(game3.getActivePlayerID()).toEqual("player-1");
      });
      test("after 7 moves, returns id of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          game3
        );
        expect(game3.getActivePlayerID()).toEqual("player-2");
      });
      test("after 8 moves, returns id of player 3", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          game3
        );
        expect(game3.getActivePlayerID()).toEqual("player-3");
      });
    });
    describe("4 player game", () => {
      test("after 0 moves, returns id of player 1", async () => {
        expect(game4.getActivePlayerID()).toEqual("player-1");
      });
      test("after 1 move, returns id of player 2", async () => {
        await selectTilesAsync([0, 1], game4);
        expect(game4.getActivePlayerID()).toEqual("player-2");
      });
      test("after 2 moves, returns id of player 3", async () => {
        await selectTilesAsync([0, 1, 2, 3], game4);
        expect(game4.getActivePlayerID()).toEqual("player-3");
      });
      test("after 3 moves, returns id of player 4", async () => {
        await selectTilesAsync([0, 1, 2, 3, 4, 5], game4);
        expect(game4.getActivePlayerID()).toEqual("player-4");
      });
      test("after 8 moves, returns id of player 1", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          game4
        );
        expect(game4.getActivePlayerID()).toEqual("player-1");
      });
      test("after 9 moves, returns id of player 2", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1],
          game4
        );
        expect(game4.getActivePlayerID()).toEqual("player-2");
      });
      test("after 10 moves, returns id of player 3", async () => {
        await selectTilesAsync(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3],
          game4
        );
        expect(game4.getActivePlayerID()).toEqual("player-3");
      });
      test("after 11 moves, returns id of player 4", async () => {
        await selectTilesAsync(
          [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 5,
            6,
          ],
          game4
        );
        expect(game4.getActivePlayerID()).toEqual("player-4");
      });
    });
  });
  describe("getScores()", () => {
    test("when game has not yet started, it should return n-sized array of 0's, where n = number of players", () => {
      expect(game4.getScores()).toEqual([0, 0, 0, 0]);
    });
    test("when game has started, it should return n-sized array of numbers equal to each player score ", async () => {
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
  describe("reset()", () => {
    test.todo("it should reset game board to initial state", () => {});
    test.todo("it should reset scores to initial state", () => {});
    test.todo("it should reset current turn to initial state", () => {});
  });
});
