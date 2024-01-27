import { describe, test, beforeEach, expect } from "vitest";
import { GameEngine } from "../game-engine";
import { Tile } from "../tile";

let engine: GameEngine;
let tile1: Tile;
let tile2: Tile;
let tile3: Tile;
beforeEach(() => {
  tile1 = new Tile("tile-1", 1);
  tile2 = new Tile("tile-2", 2);
  tile3 = new Tile("tile-3", 1);
  engine = new GameEngine(0);
});
describe("GameEngine", () => {
  describe("setTile()", () => {
    test("returns { moves:1, score:0 } after setting 2 tiles with different values", async () => {
      await engine.setTile(tile1);
      const { score, moves } = await engine.setTile(tile2);
      expect(score).toEqual(0);
      expect(moves).toEqual(1);
    });
    test("returns { moves:1, score:1 } after setting 2 tiles with the same value", async () => {
      await engine.setTile(tile1);
      const { score, moves } = await engine.setTile(tile3);
      expect(score).toEqual(1);
      expect(moves).toEqual(1);
    });
    test("returns { moves:0, score:0 } after setting first tile", async () => {
      const { score, moves } = await engine.setTile(tile1);
      expect(score).toEqual(0);
      expect(moves).toEqual(0);
    });
    test("returns { moves:0, score:0 } after setting tile with the same id twice in a row", async () => {
      await engine.setTile(tile1);
      const { score, moves } = await engine.setTile(tile1);
      expect(score).toEqual(0);
      expect(moves).toEqual(0);
    });
    test("after setting first tile, sets 'isFlipped' prop on this tile to true", async () => {
      await engine.setTile(tile1);
      expect(tile1.isFlipped).toEqual(true);
    });
    test("after setting 2 tiles with different values, 'isFlipped' prop on both tiles is set to false", async () => {
      await engine.setTile(tile1);
      await engine.setTile(tile2);
      expect(tile1.isFlipped).toEqual(false);
      expect(tile1.isFlipped).toEqual(false);
    });
    test("after setting 2 tiles with different values, 'isMatched' prop on both tiles is set to false", async () => {
      await engine.setTile(tile1);
      await engine.setTile(tile2);
      expect(tile1.isMatched).toEqual(false);
      expect(tile1.isMatched).toEqual(false);
    });
    test("after setting 2 tiles with equal values, 'isMatched' prop on both tiles is set to true", async () => {
      await engine.setTile(tile1);
      await engine.setTile(tile3);
      expect(tile1.isMatched).toEqual(true);
      expect(tile1.isMatched).toEqual(true);
    });
    test("after setting 2 tiles with equal values, 'isFlipped' prop on both tiles is set to false", async () => {
      await engine.setTile(tile1);
      await engine.setTile(tile3);
      expect(tile1.isFlipped).toEqual(false);
      expect(tile1.isFlipped).toEqual(false);
    });
  });
});
