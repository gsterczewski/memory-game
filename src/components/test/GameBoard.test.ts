import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameBoard from "../../components/GameBoard.vue";
import { SinglePlayerGame } from "../../core/single-player-game";
import { GameOptions, MemoryGame } from "../../core/game";

const testOptions: GameOptions = {
  players: 1,
  order: "sequential",
  gameDelay: 1,
  theme: "numbers",
  boardSize: 16,
};
let game16: MemoryGame = new SinglePlayerGame(testOptions);
let game36: MemoryGame = new SinglePlayerGame({
  ...testOptions,
  boardSize: 36,
});

describe("GameBoard.vue", () => {
  test("renders 16 buttons (tiles) and includes class board-grid--16", () => {
    const wrapper = mount(GameBoard, {
      props: {
        board: game16.getBoard(),
        handleFlipTile: game16.selectTile.bind(game16),
      },
    });
    const board = wrapper.get("[data-test='board']");

    expect(board.element.children.length).toEqual(16);
    expect(board.classes()).toContain("board-grid-16");
  });
  test("renders 36 buttons (tiles) and  class board-grid--36", () => {
    const wrapper36 = mount(GameBoard, {
      props: {
        board: game36.getBoard(),
        handleFlipTile: game36.selectTile.bind(game36),
      },
    });
    const board = wrapper36.get("[data-test='board']");

    expect(board.element.children.length).toEqual(36);
    expect(board.classes()).toContain("board-grid-36");
  });
});
