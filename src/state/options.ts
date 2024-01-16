import { ref, Ref } from "vue";

export const availableOptions = {
  players: ["1", "2", "3", "4"],
  theme: ["numbers", "icons"],
  grid: ["4", "6"],
} as const;

export type GameOptions = {
  players: (typeof availableOptions.players)[number];
  theme: (typeof availableOptions.theme)[number];
  grid: (typeof availableOptions.grid)[number];
};
export const options: Ref<GameOptions> = ref({
  players: availableOptions.players[0],
  theme: availableOptions.theme[0],
  grid: availableOptions.grid[0],
});
