import { GameOptions } from "./types";
import { ref, Ref } from "vue";
export const defaultOptions: GameOptions = {
  players: 1,
  grid: 16,
  theme: "numbers",
  testMode: false,
};
export const options: Ref<GameOptions> = ref({ ...defaultOptions });
