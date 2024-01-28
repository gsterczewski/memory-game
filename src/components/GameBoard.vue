<script setup lang="ts">
import { computed } from "vue";
import { Tile } from "../core/tile";
type GameBoardProps = {
  board: Tile[];
  handleFlipTile: (index: number) => void;
};
const props = defineProps<GameBoardProps>();
const boardGridSize = computed(() => props.board.length);
const shouldShowValue = (tile: Tile) => tile.isFlipped || tile.isMatched;
</script>
<template>
  <div class="board" :class="`board-grid-${boardGridSize}`">
    <button
      class="tile"
      v-for="(tile, index) in board"
      :key="tile.getID()"
      @click="() => handleFlipTile(index)"
      :disabled="tile.isMatched || tile.isFlipped"
      :class="{
        'tile--isFlipped': tile.isFlipped,
        'tile--isMatched': tile.isMatched,
      }"
    >
      <span v-if="shouldShowValue(tile)">{{ tile.getValue() }}</span>
    </button>
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
.tile {
  width: var(--tile-size);
  height: var(--tile-size);
  max-width: var(--max-tile-size);
  max-height: var(--max-tile-size);
  font-size: var(--tile-fs);
  font-weight: bold;
  border: none;
  border-radius: 50%;
  background-color: var(--color-neutral-800);
  color: var(--color-neutral-200);
}
.tile--isMatched {
  background-color: var(--color-primary);
}
.tile--isFlipped {
  background-color: var(--color-neutral-500);
}
</style>
