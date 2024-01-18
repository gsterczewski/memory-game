<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import TextBar from "./TextBar.vue";

type Result = {
  caption: string;
  text: string;
  isWinner: boolean;
};

type GameSummaryProps = {
  title: string;
  caption: string;
  results: Result[];
  handleRestart: (...args: any[]) => void;
  handleStartNewGame: (...args: any[]) => void;
};

defineProps<GameSummaryProps>();
</script>
<template>
  <div class="summary-box grid">
    <h2 class="summary-title grid-item-1">{{ title }}</h2>
    <p class="summary-caption grid-item-2">
      {{ caption }}
    </p>
    <div class="summary-content grid-item-3">
      <TextBar
        v-for="(result, index) in results"
        :caption="result.caption"
        :text="result.text"
        :isHighlighted="result.isWinner"
        :key="index"
      />
    </div>
    <BaseButton
      @click="handleRestart"
      class="grid-item-4"
      size="large--no-scale"
      theme="primary"
      >Restart</BaseButton
    >
    <BaseButton
      @click="handleStartNewGame"
      class="grid-item-5"
      size="large--no-scale"
      >Setup New Game</BaseButton
    >
  </div>
</template>
<style scoped>
.summary-box {
  max-width: 40em;
  padding-inline: 1.5em;
  padding-top: 2em;
  padding-bottom: 1.5em;
  border-radius: 1rem;
  background: var(--color-neutral-200);
}

.grid {
  display: grid;
  grid-template-rows: auto 0.625rem auto 1.5rem auto 1.5rem auto 1rem auto;
  justify-items: center;
}
.grid-item-1 {
  grid-row: 1;
}
.grid-item-2 {
  grid-row: 3;
}
.grid-item-3 {
  grid-row: 5;
}
.grid-item-4 {
  grid-row: 7;
}
.grid-item-5 {
  grid-row: 9;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-neutral-800);
}
.summary-caption {
  font-size: 0.9375rem;
  font-weight: bold;
  color: var(--color-neutral-600);
}
.summary-content {
  display: grid;
  row-gap: 0.5rem;
}

@media (min-width: 48em) {
  .grid {
    grid-template-columns: auto auto;
    grid-template-rows: auto 1rem auto 2.5rem auto 3.5rem auto;
    column-gap: 1rem;
  }
  .grid-item-1 {
    grid-column: span 2;
  }
  .grid-item-2 {
    grid-column: span 2;
  }
  .grid-item-3 {
    grid-column: span 2;
  }
  .grid-item-4 {
    grid-column: 1;
    grid-row: 7;
  }
  .grid-item-5 {
    grid-column: 2;
    grid-row: 7;
  }
  .summary-box {
    padding-inline: 3.5rem;
    padding-top: 3.15rem;
    padding-bottom: 4.375rem;
  }
  .summary-title {
    font-size: 3rem;
  }
  .summary-caption {
    font-size: 1.125rem;
  }
  .summary-content {
    row-gap: 1rem;
  }
}
</style>
