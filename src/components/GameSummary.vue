<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import TextBar from "./TextBar.vue";
import { computed } from "vue";

type GameSummaryProps = {
  scores: number[];
  moves: number;
  time: number;
};
const props = defineProps<GameSummaryProps>();
type Result = {
  label: string;
  score: string;
  playerIndex: number;
  isWinner: boolean;
};

function formatTime(time: number): string {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  const prependZeroIfLessThan10 = (n: number): string =>
    n < 10 ? `0${n}` : `${n}`;
  return `${minutes}:${prependZeroIfLessThan10(seconds)}`;
}

function produceSinglePlayerResults(): Result[] {
  return [
    {
      label: "Time Elapsed",
      score: `${formatTime(props.time)}`,
      isWinner: false,
      playerIndex: 1,
    },
    {
      label: "Moves Taken",
      score: `${props.moves} Moves`,
      isWinner: false,
      playerIndex: 1,
    },
  ];
}
function produceMultiPlayerResults(): Result[] {
  let highestScore = 0;
  props.scores.forEach((score) => {
    if (score > highestScore) {
      highestScore = score;
    }
  });
  return props.scores.map((score, index) => {
    const isWinner = score === highestScore;
    return {
      label: isWinner ? `Player ${index + 1}(Winner!)` : `Player ${index + 1}`,
      score: `${score} Pairs`,
      playerIndex: index + 1,
      isWinner,
    };
  });
}

const isMulitplayer = computed(() => props.scores.length > 1);
const results = computed<Result[]>((): Result[] => {
  if (isMulitplayer.value) return produceMultiPlayerResults();
  return produceSinglePlayerResults();
});
const title = computed<string>((): string => {
  if (!isMulitplayer.value) return "You did it!";
  const winners = results.value.filter((result) => result.isWinner);
  if (winners.length > 1) return "It's a tie!";
  return `Player ${winners[0].playerIndex} Wins!`;
});
const caption = computed<string>((): string => {
  if (isMulitplayer.value) return "Game over! Here are the results...";
  return "Game over! Here's how you got on...";
});
</script>
<template>
  <div class="summary-box grid">
    <h2 class="summary-title grid-item-1">{{ title }}</h2>
    <p class="summary-caption grid-item-2">
      {{ caption }}
    </p>
    <div id="summary-content" class="summary-content grid-item-3">
      <TextBar
        v-for="(result, index) in results"
        :caption="result.label"
        :text="result.score"
        :isHighlighted="result.isWinner"
        :key="index"
      />
    </div>
    <BaseButton
      @click="() => $emit('restart-request')"
      id="summary-button-restart"
      class="grid-item-4"
      size="large--no-scale"
      theme="primary"
      >Restart</BaseButton
    >
    <BaseButton
      id="summary-button-new-game"
      @click="() => $emit('new-game-request')"
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
