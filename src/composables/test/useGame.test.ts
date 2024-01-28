import { describe, test, beforeEach, expect } from "vitest";
import useGame from "../useGame";
import { GameOptions } from "../../core/game";

const { optionsState, gameControls, game } = useGame();
const { currentOptions } = optionsState;
const { setOptions, restartGame, createNewGame } = gameControls;

const defaultOptions: GameOptions = {
  players: 1,
  boardSize: 16,
  theme: "numbers",
  order: "sequential",
  gameDelay: 1,
};
beforeEach(() => {
  setOptions(defaultOptions);
  createNewGame();
});
describe("useGame", () => {
  describe("Game options", () => {
    test("starts with default options", () => {
      expect(currentOptions).toEqual(defaultOptions);
    });
    describe("setOptions", () => {
      test("sets new options", () => {
        const expected: GameOptions = {
          players: 4,
          boardSize: 36,
          theme: "icons",
          order: "sequential",
          gameDelay: 2,
        };
        setOptions({ ...expected });
        expect(currentOptions).toEqual(expected);
      });
      test("change subset of options", () => {
        setOptions({ players: 2 });
        const expected1 = { ...defaultOptions, players: 2 };
        expect(currentOptions).toEqual(expected1);
        setOptions({ boardSize: 16 });
        expect(currentOptions).toEqual({
          ...defaultOptions,
          players: 2,
          boardSize: 16,
        });
      });
    });
  });
  describe("createNewGame()", () => {
    test("creates new Game", () => {
      expect(game.value.getBoard().length).toEqual(16);
      setOptions({ boardSize: 36 });
      createNewGame();
      expect(game.value.getBoard().length).toEqual(36);
    });
  });
  describe("restartGame()", () => {
    test("restarts current game with the same options", async () => {
      setOptions({ boardSize: 36 });
      createNewGame();
      await game.value.selectTile(0);
      await game.value.selectTile(18);
      expect(game.value.getScores()[0]).toEqual(1);
      restartGame();
      expect(game.value.getScores()[0]).toEqual(0);
      expect(game.value.getBoard().length).toEqual(36);
    });
  });
});
