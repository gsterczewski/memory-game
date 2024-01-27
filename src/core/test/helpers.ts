import { MultiPlayerGame } from "../multi-player-game";
import { SinglePlayerGame } from "../single-player-game";

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
export async function selectTilesAsync(
  tiles: number[],
  game: SinglePlayerGame | MultiPlayerGame
) {
  for (const index of tiles) {
    await game.selectTile(index);
  }
}
