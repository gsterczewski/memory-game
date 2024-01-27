import { expect, test, describe, beforeEach } from "vitest";
import { selectTilesAsync, sleep } from "./helpers";
import { GameOptions } from "../game";
import { createGame } from "../createGame";
import { SinglePlayerGame } from "../single-player-game";

const testOptions: GameOptions = {
  players: 1,
  boardSize: 16,
  theme: "numbers",
  order: "sequential",
  gameDelay: 0,
};

let game16Ordered: SinglePlayerGame;
let game36Ordered: SinglePlayerGame;
let game16Random: SinglePlayerGame;
let game36Random: SinglePlayerGame;

beforeEach(() => {
  game16Ordered = createGame(testOptions) as SinglePlayerGame;
  game36Ordered = createGame({
    ...testOptions,
    boardSize: 36,
  }) as SinglePlayerGame;
  game16Random = createGame({
    ...testOptions,
    order: "random",
  }) as SinglePlayerGame;
  game36Random = createGame({
    ...testOptions,
    order: "random",
    boardSize: 36,
  }) as SinglePlayerGame;
});
describe("SinglePlayerGame", () => {
  describe("getBoard()", () => {
    test("returns array of correct size", () => {
      expect(game16Ordered.getBoard().length).toEqual(16);
      expect(game36Ordered.getBoard().length).toEqual(36);
    });
    test("all items in returned array have required properties ", () => {
      const requiredProperties = ["value", "isMatched", "isFlipped", "id"];
      game16Ordered.getBoard().forEach((tile) => {
        requiredProperties.forEach((prop) => {
          expect(tile).toHaveProperty(prop);
        });
      });
    });
    test("all objects in returned array have precisely 1 matching pair with the same value of prop 'value'", () => {
      const values16: Set<number> = new Set();
      const values36: Set<number> = new Set();

      let matchedValues16 = 0;
      let matchedValues36 = 0;
      game16Random.getBoard().forEach((tile) => {
        if (values16.has(tile.getValue())) {
          matchedValues16++;
        } else {
          values16.add(tile.getValue());
        }
      });
      game36Random.getBoard().forEach((tile) => {
        if (values36.has(tile.getValue())) {
          matchedValues36++;
        } else {
          values36.add(tile.getValue());
        }
      });

      expect(matchedValues16).toEqual(8);
      expect(matchedValues36).toEqual(18);
    });
    test("returned array is in random order", () => {
      const order16 = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      const values16 = game16Random.getBoard().map((tile) => tile.getValue());
      expect(values16).not.toEqual(order16);
    });
  });

  describe("getMoves()", () => {
    test("after 0 calls to selectTile() method, returns 0", () => {
      expect(game16Random.getMoves()).toEqual(0);
    });
    test("after 1 call to selectTile() method, returns 0", () => {
      game16Random.selectTile(0);
      expect(game16Random.getMoves()).toEqual(0);
    });
    test("after odd n calls to selectTile() method, returns (n-1)/2", async () => {
      await selectTilesAsync([0, 1, 2], game16Random);
      expect(game16Random.getMoves()).toEqual(1);

      await selectTilesAsync([5, 8], game16Random);
      expect(game16Random.getMoves()).toEqual(2);
    });
    test("after even n calls to selectTile() method, returns n/2", async () => {
      await selectTilesAsync([0, 1], game16Random);
      expect(game16Random.getMoves()).toEqual(1);

      await selectTilesAsync([2, 5], game16Random);
      expect(game16Random.getMoves()).toEqual(2);
    });
  });
  describe("getScores()", () => {
    test("after 0 calls to selectTile(), returns 0", () => {
      expect(game16Random.getScores()[0]).toEqual(0);
    });
    test("after selecting n pairs of values, returns n", async () => {
      expect(game16Ordered.getScores()[0]).toEqual(0);
      await selectTilesAsync([0, 8], game16Ordered);
      expect(game16Ordered.getScores()[0]).toEqual(1);

      await selectTilesAsync([1, 9, 2, 10, 3, 11], game16Ordered);
      expect(game16Ordered.getScores()[0]).toEqual(4);

      await selectTilesAsync([4, 12, 5, 13, 6, 14, 7, 15], game16Ordered);
      expect(game16Ordered.getScores()[0]).toEqual(8);
    });
    test("after selecting the same pair of values more than 1, returns 1", async () => {
      await selectTilesAsync([0, 8, 8, 0], game16Ordered);
      expect(game16Ordered.getScores()[0]).toEqual(1);
    });
  });
  describe("isOver()", () => {
    test("returns false when not all tiles are matched", async () => {
      const tilesToFlip = [0, 8, 2, 9, 3, 10, 4, 15, 6, 13];
      await selectTilesAsync(tilesToFlip, game16Ordered);
      expect(game16Ordered.isOver()).toEqual(false);
    });
    test("returns true when all tiles are matched", async () => {
      const tilesToFlip = [
        0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15,
      ];
      await selectTilesAsync(tilesToFlip, game16Ordered);
      expect(game16Ordered.isOver()).toEqual(true);
    });
  });
  describe("reset()", () => {
    test("sets matched tiles to 0", async () => {
      await selectTilesAsync([0, 8, 5, 13], game16Ordered);
      expect(game16Ordered.getScores()[0]).toEqual(2);
      game16Ordered.reset();
      expect(game16Ordered.getScores()[0]).toEqual(0);
    });
    test("sets moves to 0", async () => {
      await selectTilesAsync([0, 8, 5, 13, 1, 3, 7], game16Ordered);
      expect(game16Ordered.getMoves()).toEqual(3);
      game16Ordered.reset();
      expect(game16Ordered.getMoves()).toEqual(0);
    });
    test("sets time to 0", async () => {
      await game16Ordered.selectTile(0);
      await sleep(1000);
      expect(game16Ordered.getTime()).toBeGreaterThan(0);
      game16Ordered.reset();
      expect(game16Ordered.getTime()).toEqual(0);
    });
    test("resets board to initial state", async () => {
      await selectTilesAsync([0, 8, 5, 13, 1, 3, 7], game16Ordered);
      expect(
        game16Ordered
          .getBoard()
          .some((tile) => tile.isMatched || tile.isFlipped)
      ).toEqual(true);
      game16Ordered.reset();
      expect(
        game16Ordered
          .getBoard()
          .some((tile) => tile.isMatched || tile.isFlipped)
      ).toEqual(false);
    });
  });
});
