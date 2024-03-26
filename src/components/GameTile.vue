<script setup lang="ts">
import { computed } from "vue";
import { GameOptions } from "../core/game";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSpider,
  faCat,
  faFish,
  faCrow,
  faHorse,
  faDragon,
  faMosquito,
  faDog,
  faFrog,
  faHippo,
  faMugHot,
  faPizzaSlice,
  faCandyCane,
  faCarrot,
  faBurger,
  faAppleWhole,
  faCakeCandles,
  faHotdog,
} from "@fortawesome/free-solid-svg-icons";
const icons = [
  faSpider,
  faCat,
  faCrow,
  faFish,
  faHorse,
  faDragon,
  faDog,
  faMosquito,
  faFrog,
  faHippo,
  faMugHot,
  faPizzaSlice,
  faCandyCane,
  faCarrot,
  faAppleWhole,
  faBurger,
  faCakeCandles,
  faHotdog,
];
type GameTileProps = {
  isFlipped: boolean;
  isMatched: boolean;
  tileValue: number;
  tileIndex: number;
  theme: GameOptions["theme"];
};
const props = defineProps<GameTileProps>();
const shouldShowValue = computed(() => props.isFlipped || props.isMatched);
const icon = computed(() => {
  if (props.theme === "numbers") return null;
  return icons[props.tileValue - 1];
});
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
    :aria-label="`Click to check tile number ${tileIndex + 1}`"
  >
    <div v-if="shouldShowValue">
      <div v-if="icon">
        <p class="sr-only">{{ tileValue }}</p>
        <font-awesome-icon :icon="icon" />
      </div>
      <span v-else>{{ tileValue }}</span>
    </div>
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
  cursor: pointer;
}
.tile--isMatched {
  background-color: var(--color-neutral-500);
}
.tile--isFlipped {
  background-color: var(--color-primary);
}
</style>
