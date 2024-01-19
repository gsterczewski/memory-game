import { GameOptions } from "./types";
import { defaultOptions } from "./options";
import singlePlayerGame from "./single-player-game";

export function createGame(options?: GameOptions) {
  const testMode = options?.testMode || defaultOptions.testMode;
  const grid = options?.grid || defaultOptions.grid;
  return singlePlayerGame(grid, testMode);
}
