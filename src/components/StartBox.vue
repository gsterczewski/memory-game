<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import RadioButton from "./RadioButton.vue";
import { options, availableOptions } from "../state/options";
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
            v-model="options.theme"
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
            :label="playersNumber"
            v-model="options.players"
          />
        </div>
      </fieldset>
      <fieldset class="fieldset row-3">
        <legend>Grid Size</legend>
        <div class="radio-group">
          <RadioButton
            v-for="(grid, index) in availableOptions.grid"
            :id="`grid-${index + 1}`"
            :value="grid"
            name="grid"
            :label="`${grid}x${grid}`"
            v-model="options.grid"
            size="large"
          />
        </div>
      </fieldset>
      <div class="row-4">
        <BaseButton size="large" theme="primary">Start Game</BaseButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  padding: 6.4vw;
  background-color: var(--color-neutral-200);
  display: grid;
  place-items: center;
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
