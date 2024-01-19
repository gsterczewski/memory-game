import { GameOptions } from "./types";
import singlePlayerGame from "./single-player-game";

export const defaultOptions: GameOptions = {
  players: 1,
  grid: 16,
  theme: "numbers",
  testMode: false,
};

export function createGame(options?: GameOptions) {
  const testMode = options?.testMode || defaultOptions.testMode;
  const grid = options?.grid || defaultOptions.grid;
  return singlePlayerGame(grid, testMode);
}
