import { describe, test, expect, beforeEach } from "vitest";
import useState, { AppStage } from "../useState";
const { state, setGameStage } = useState();

function testStage(stage: AppStage, truthArray: boolean[]) {
  const fns = [
    state.shouldShowStartScreen,
    state.shouldShowGameScreen,
    state.shouldShowMenu,
    state.shouldShowResults,
  ];
  const fnsNames = [
    "shouldShowStartScreen",
    "shouldShowGameScreen",
    "shouldShowMenu",
    "shouldShowResults",
  ];
  describe(`STAGE: ${stage}`, () => {
    beforeEach(() => {
      setGameStage(stage);
    });
    fns.forEach((fn, index) => {
      test(`${fnsNames[index]} returns ${truthArray[index]}`, () => {
        expect(fn.value).toEqual(truthArray[index]);
      });
    });
  });
}
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
    test("on intial load shouldShowResults returns false", () => {
      expect(state.shouldShowResults.value).toEqual(false);
    });
  });
  describe("setGameStage()", () => {
    testStage("START", [true, false, false, false]);
    testStage("GAME", [false, true, false, false]);
    testStage("MENU", [false, true, true, false]);
    testStage("RESULTS", [false, true, false, true]);
  });
});
