<script setup lang="ts">
import { computed } from "vue";
import { Tile } from "../core/tile";
import GameTile from "./GameTile.vue";
type GameBoardProps = {
  board: Tile[];
  handleFlipTile: (index: number) => void;
};
const props = defineProps<GameBoardProps>();
const boardGridSize = computed(() => props.board.length);
</script>
<template>
  <div
    class="board"
    :class="`board-grid-${boardGridSize}`"
    data-test="board"
    @select-tile="(tileIndex:number) => handleFlipTile(tileIndex)"
  >
    <GameTile
      v-for="(tile, index) in board"
      :key="tile.getID()"
      :tile-index="index"
      :tileValue="tile.getValue()"
      :is-flipped="tile.isFlipped"
      :is-matched="tile.isMatched"
    />
  </div>
</template>
<style scoped>
.board {
  --board-width: clamp(200px, 87vw, 572px);
  --tile-size: calc(var(--board-width) * var(--tile-to-container-ratio));
  --tile-fs: clamp(1rem, var(--pref-tile-fs), var(--max-tile-fs));
  width: var(--board-width);
  display: grid;
  grid-template-columns: repeat(var(--tiles-in-row), 1fr);
  grid-template-rows: repeat(var(--tiles-in-row), 1fr);
  gap: var(--grid-gap);
  place-items: center;
}
.board-grid-16 {
  --tiles-in-row: 4;
  --tile-to-container-ratio: 0.22;
  --max-tile-size: 7.375rem;
  --grid-gap: calc(var(--board-width) * 0.035);
  --pref-tile-fs: calc(var(--tile-size) * 0.55);
  --max-tile-fs: 3.5rem;
}
.board-grid-36 {
  --tiles-in-row: 6;
  --tile-to-container-ratio: 0.14;
  --max-tile-size: 5.125rem;
  --grid-gap: calc(var(--board-width) * 0.03);
  --pref-tile-fs: calc(var(--tile-size) * 0.53);
  --max-tile-fs: 2.75rem;
}
</style>
