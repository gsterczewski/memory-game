<script setup lang="ts">
import { computed } from "vue";
type GameTileProps = {
  isFlipped: boolean;
  isMatched: boolean;
  tileValue: number;
  tileIndex: number;
};
const props = defineProps<GameTileProps>();
const shouldShowValue = computed(() => props.isFlipped || props.isMatched);
</script>
<template>
  <button
    class="tile"
    @click="$emit('selectTile', tileIndex)"
    :disabled="shouldShowValue"
    :class="{
      'tile--isFlipped': isFlipped,
      'tile--isMatched': isMatched,
    }"
    data-test="tile"
  >
    <span v-if="shouldShowValue">{{ tileValue }}</span>
  </button>
</template>

<style scoped>
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
