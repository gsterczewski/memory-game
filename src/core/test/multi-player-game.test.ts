import { expect, test, describe, beforeEach } from "vitest";
import { MultiPlayerGame } from "../multi-player-game";
import { GameOptions } from "../game";
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
  describe.todo("getActivePlayerID", () => {
    describe("2 player game", () => {
      test("after 0 moves, returns id of player 1", async () => {});
      test("after 1 move, returns id of player 2", async () => {});
      test("after 2 moves, returns id of player 1", async () => {});
      test("after 3 moves, returns id of player 2", async () => {});
      test("after even n of moves, returns id of player 1", async () => {});
      test("after odd n of moves, returns id of player 2", async () => {});
    });
    describe("3 player game", () => {
      test("after 0 moves, returns id of player 1", async () => {});
      test("after 1 move, returns id of player 2", async () => {});
      test("after 2 moves, returns id of player 3", async () => {});
      test("after [3,6,9] moves, returns id of player 1", async () => {});
      test("after [4,7,10] moves, returns id of player 2", async () => {});
      test("after [5,8,11] moves, returns id of player 3", async () => {});
    });
    describe("4 player game", () => {
      test("after 0 moves, returns id of player 1", async () => {});
      test("after 1 move, returns id of player 2", async () => {});
      test("after 2 moves, returns id of player 3", async () => {});
      test("after 3 moves, returns id of player 4", async () => {});
      test("after [4,8,12] moves, returns id of player 1", async () => {});
      test("after [5,9,13] moves, returns id of player 2", async () => {});
      test("after [6,10,14] moves, returns id of player 3", async () => {});
      test("after [7,11,15] moves, returns id of player 4", async () => {});
    });
  });
  describe("getScores()", () => {
    test.todo(
      "when game has not yet started, it should return n-sized array of 0's, where n = number of players",
      () => {}
    );
    test.todo(
      "when game has started, it should return n-sized array of numbers equal to each player score "
    );
  });
  describe("reset()", () => {
    test.todo("it should reset game board to initial state", () => {});
    test.todo("it should reset scores to initial state", () => {});
    test.todo("it should reset current turn to initial state", () => {});
  });
});
