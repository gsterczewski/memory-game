import { expect, test, describe } from "vitest";

import { GameOptions } from "./game";
import { createGame } from "./createGame";
import { MultiPlayerGame } from "./multi-player-game";

describe("multiplayer game", () => {
  describe("getCurrentPlayer()", () => {
    test.todo(
      "it should return number representing correct player's turn after n-moves",
      () => {}
    );
  });
  describe("selectTile()", () => {
    test.todo(
      "it should not change the game state when selecting already matched tile",
      () => {}
    );
    test.todo(
      "it should switch current player to the next one after selecting second tile in a turn by current player",
      () => {}
    );
    test.todo(
      "it should not switch current player to the next one after selecting first tile by current player",
      () => {}
    );
    test.todo(
      "it should increase current player score after selecting 2 tiles with the same value",
      () => {}
    );
    test.todo(
      "it should not increase current player score after selecting 2 tiles with different value ",
      () => {}
    );
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
