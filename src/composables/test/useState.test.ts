import { describe, test, expect } from "vitest";
import useState from "../useState";
const { state, methods } = useState();

describe("useState", () => {
  describe("Initial state", () => {
    test("on intial load shouldShowGameScreen returns true", () => {
      expect(state.shouldShowGameScreen.value).toEqual(true);
    });
    test("on intial load shouldShowStartScreen returns false", () => {
      expect(state.shouldShowStartScreen.value).toEqual(false);
    });
    test("on intial load shouldShowMenu returns false", () => {
      expect(state.shouldShowMenu.value).toEqual(false);
    });
    describe("showStartScreen()", () => {
      test("sets shouldShowStartScreen to true", () => {
        methods.showStartScreen();
        expect(state.shouldShowStartScreen.value).toEqual(true);
      });
      test("sets shouldShowGameScreen to false", () => {
        methods.showStartScreen();
        expect(state.shouldShowGameScreen.value).toEqual(false);
      });
      test("sets shouldShowMenu to false", () => {
        methods.showStartScreen();
        expect(state.shouldShowMenu.value).toEqual(false);
      });
    });
    describe("showGameScreen()", () => {
      test("sets shouldShowGameScreen to true", () => {
        methods.showGameScreen();
        expect(state.shouldShowGameScreen.value).toEqual(true);
      });
      test("sets shouldShowStartScreen to false", () => {
        methods.showGameScreen();
        expect(state.shouldShowStartScreen.value).toEqual(false);
      });
      test("sets shouldShowMenu to false", () => {
        methods.showGameScreen();
        expect(state.shouldShowMenu.value).toEqual(false);
      });
    });
    describe("showMenu()", () => {
      test("sets shouldShowMenu to true", () => {
        methods.showMenu();
        expect(state.shouldShowMenu.value).toEqual(true);
      });
      test("sets shouldShowGameScreen to true", () => {
        methods.showMenu();
        expect(state.shouldShowGameScreen.value).toEqual(true);
      });
      test("sets shouldShowStartScreen to false", () => {
        methods.showMenu();
        expect(state.shouldShowStartScreen.value).toEqual(false);
      });
    });
    describe("hideMenu()", () => {
      test("sets shouldShowMenu to false", () => {
        methods.hideMenu();
        expect(state.shouldShowMenu.value).toEqual(false);
      });
      test("sets shouldShowGameScreen to true", () => {
        methods.hideMenu();
        expect(state.shouldShowGameScreen.value).toEqual(true);
      });
      test("sets shouldShowStartScreen to false", () => {
        methods.hideMenu();
        expect(state.shouldShowStartScreen.value).toEqual(false);
      });
    });
  });
});
