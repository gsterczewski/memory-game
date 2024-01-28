<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import RadioButton from "./RadioButton.vue";
import useGame from "../composables/useGame";
import { ref } from "vue";

const { availableOptions, currentOptions, setOptions } = useGame();

const model = {
  theme: ref(currentOptions.theme),
  boardSize: ref(currentOptions.boardSize),
  players: ref(currentOptions.players),
};

type StartBoxProps = {
  handleStartGame(): void;
};
const props = defineProps<StartBoxProps>();

function confirm() {
  setOptions({
    players: model.players.value,
    boardSize: model.boardSize.value,
    theme: model.theme.value,
  });
  props.handleStartGame();
}
</script>
<template>
  <div class="box">
    <div class="container">
      <fieldset class="fieldset row-1">
        <legend>Select Theme</legend>
        <div class="radio-group">
          <RadioButton
            v-for="(theme, index) in availableOptions.theme"
            :id="`theme-${index + 1}`"
            :value="theme"
            name="theme"
            :label="theme"
            v-model="model.theme.value"
            size="large"
          />
        </div>
      </fieldset>
      <fieldset class="fieldset row-2">
        <legend>Numbers Of Players</legend>
        <div class="radio-group">
          <RadioButton
            v-for="(playersNumber, index) in availableOptions.players"
            :id="`players-${index + 1}`"
            :value="playersNumber"
            name="players"
            :label="`${playersNumber}`"
            v-model="model.players.value"
          />
        </div>
      </fieldset>
      <fieldset class="fieldset row-3">
        <legend>Grid Size</legend>
        <div class="radio-group">
          <RadioButton
            v-for="(grid, index) in availableOptions.boardSize"
            :id="`grid-${index + 1}`"
            :value="grid"
            name="grid"
            :label="`${Math.sqrt(grid)}x${Math.sqrt(grid)}`"
            v-model="model.boardSize.value"
            size="large"
          />
        </div>
      </fieldset>
      <div class="row-4">
        <BaseButton size="large" theme="primary" @click="confirm"
          >Start Game</BaseButton
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  padding: min(6.4vw, 3.5rem);
  background-color: var(--color-neutral-200);
  display: grid;
  place-items: center;
  border-radius: 0.75rem;
}
.container {
  --row-gap: 1.5rem;
  display: grid;
  grid-template-rows: auto var(--row-gap) auto var(--row-gap) auto 2rem auto;
}
.row-1 {
  grid-row: 1;
}
.row-2 {
  grid-row: 3;
}
.row-3 {
  grid-row: 5;
}
.row-4 {
  grid-row: 7;
}
.radio-group {
  display: flex;
  gap: 0.625rem;
}

.fieldset {
  border: none;
}
.fieldset > legend {
  color: var(--color-neutral-600);
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
@media (min-width: 48em) {
  .container {
    --row-gap: 2rem;
  }
  .fieldset > legend {
    font-size: 1.25rem;
  }
}
</style>
../game/options
