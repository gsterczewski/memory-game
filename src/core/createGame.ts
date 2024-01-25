import { Game, GameOptions } from "./game";
import { SinglePlayerGame } from "./single-player-game";
import { MultiPlayerGame } from "./multi-player-game";

export function createGame(options: GameOptions): Game {
  if (options.players === 1) return new SinglePlayerGame(options);
  return new MultiPlayerGame(options);
}
