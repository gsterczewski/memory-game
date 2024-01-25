import { expect, test, describe, beforeEach } from "vitest";

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
  describe("selectTile()", () => {
    test("calling it with invalid argument does not throw error", () => {
      expect(() => game16Ordered.selectTile(-1)).not.toThrow();
    });
    test("calling it with the index of the same object twice in a row, does not change the object's state ", () => {
      const tile = game16Ordered.selectTile(0);
      expect(tile?.isFlipped).toEqual(true);
      expect(tile?.isMatched).toEqual(false);
      game16Ordered.selectTile(0);
      expect(tile?.isFlipped).toEqual(true);
      expect(tile?.isMatched).toEqual(false);
    });

    test("calling it with index of an object that has 'isMatched' prop set to true does not change the object's state", () => {
      const tile1 = game16Ordered.selectTile(0);
      const tile2 = game16Ordered.selectTile(8);
      expect(tile1?.isMatched).toEqual(true);
      expect(tile2?.isMatched).toEqual(true);
      game16Ordered.selectTile(0);
      game16Ordered.selectTile(8);
      expect(tile1?.isMatched).toEqual(true);
      expect(tile1?.isFlipped).toEqual(false);
      expect(tile2?.isMatched).toEqual(true);
      expect(tile2?.isFlipped).toEqual(false);
    });
    test("calling it with index of an object as first in the turn, sets the object's prop 'isFlipped' to true", () => {
      const tile1 = game16Ordered.selectTile(0);
      expect(tile1?.isFlipped).toEqual(true);
      game16Ordered.selectTile(2);
      game16Ordered.selectTile(3);
      game16Ordered.selectTile(5);
      const tile2 = game16Ordered.selectTile(4);
      expect(tile2?.isFlipped).toEqual(true);
    });
    test("calling it with index of an object that has the same 'value' as the previously selected object in the turn, sets 'isMatched' prop to true, and 'isFlipped' prop to false, on both objects", () => {
      const turn = [game16Ordered.selectTile(2), game16Ordered.selectTile(10)];
      turn.forEach((tile) => {
        expect(tile?.isMatched).toEqual(true);
        expect(tile?.isFlipped).toEqual(false);
      });
    });
    test("calling it with index of an object that has different 'value' as the object previously selected in the turn, produce 'isFlipped' and 'isMatched' props as false on both objects", () => {
      const turn = [game16Ordered.selectTile(4), game16Ordered.selectTile(2)];
      turn.forEach((tile) => {
        expect(tile?.isFlipped).toEqual(false);
        expect(tile?.isMatched).toEqual(false);
      });
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
    test("after odd n calls to selectTile() method, returns (n-1)/2", () => {
      game16Random.selectTile(0);
      game16Random.selectTile(1);
      game16Random.selectTile(2);
      expect(game16Random.getMoves()).toEqual(1);
      game16Random.selectTile(5);
      expect(game16Random.getMoves()).toEqual(2);
      game16Random.selectTile(8);
      expect(game16Random.getMoves()).toEqual(2);
    });
    test("after even n calls to selectTile() method, returns n/2", () => {
      game16Random.selectTile(0);
      game16Random.selectTile(1);
      expect(game16Random.getMoves()).toEqual(1);
      game16Random.selectTile(2);
      game16Random.selectTile(5);
      expect(game16Random.getMoves()).toEqual(2);
    });
  });
  describe("getMatchedTiles()", () => {
    test("after 0 calls to selectTile(), returns 0", () => {
      expect(game16Random.getMatchedTiles()).toEqual(0);
      expect(game36Random.getMatchedTiles()).toEqual(0);
    });
    test("after selecting n pairs of values, returns n", () => {
      expect(game16Ordered.getMatchedTiles()).toEqual(0);
      game16Ordered.selectTile(0);
      game16Ordered.selectTile(8);
      expect(game16Ordered.getMatchedTiles()).toEqual(1);
      game16Ordered.selectTile(1);
      game16Ordered.selectTile(9);
      game16Ordered.selectTile(2);
      game16Ordered.selectTile(10);
      game16Ordered.selectTile(3);
      game16Ordered.selectTile(11);
      expect(game16Ordered.getMatchedTiles()).toEqual(4);
      game16Ordered.selectTile(4);
      game16Ordered.selectTile(12);
      game16Ordered.selectTile(5);
      game16Ordered.selectTile(13);
      game16Ordered.selectTile(6);
      game16Ordered.selectTile(14);
      game16Ordered.selectTile(7);
      game16Ordered.selectTile(15);
      expect(game16Ordered.getMatchedTiles()).toEqual(8);
    });
    test("after selecting the same pair of values more than 1, returns 1", () => {
      game16Ordered.selectTile(0);
      game16Ordered.selectTile(8);
      game16Ordered.selectTile(8);
      game16Ordered.selectTile(0);
      expect(game16Ordered.getMatchedTiles()).toEqual(1);
    });
  });
});
