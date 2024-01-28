import { reactive, ref, type Ref } from "vue";
import {
  GameOptions,
  defaultOptions,
  gameOptions,
  MemoryGame,
} from "../core/game";
import { createGame } from "../core/createGame";

/* OPTIONS STORE */
const currentOptions = reactive({ ...defaultOptions });
const availableOptions = gameOptions;
function setOptions(newOptions: Partial<GameOptions>) {
  Object.assign(currentOptions, newOptions);
}

/* GAME STORE */
let game: Ref<MemoryGame> = ref(createGame(currentOptions));

function createNewGame() {
  game.value = createGame(currentOptions);
}

function restartGame() {
  game.value.reset();
}

export default function useGame() {
  return {
    optionsState: {
      currentOptions,
      availableOptions,
    },
    gameControls: {
      restartGame,
      createNewGame,
      setOptions,
    },
    game,
  };
}
