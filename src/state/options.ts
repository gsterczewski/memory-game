import { ref, Ref } from "vue";

export type GameTheme = "numbers" | "icons";
export type GamePlayers = "1" | "2" | "3" | "4";
export type GameGrid = "4" | "6";

export type GameOptions = Ref<{
  theme: GameTheme;
  players: GamePlayers;
  grid: GameGrid;
}>;

export const options: GameOptions = ref({
  theme: "numbers",
  players: "1",
  grid: "4",
});
