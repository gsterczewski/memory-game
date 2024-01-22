<script setup lang="ts">
type StatusBarProps = {
  scores?: number[];
  time: number;
  moves: number;
  playerTurn: number;
  players: number;
};
defineProps<StatusBarProps>();
</script>
<template>
  <div v-if="players === 1" class="status-bar">
    <div class="status">
      <span class="status-caption"> Time </span>
      <span class="status-value">{{ time }}</span>
    </div>
    <div class="status">
      <span class="status-caption">Moves</span>
      <span class="status-value">{{ moves }}</span>
    </div>
  </div>
  <div class="status-bar" v-else>
    <div
      v-for="(score, index) in scores"
      :key="index"
      class="status"
      :class="{ 'status--selected': index === playerTurn }"
    >
      <span class="status-caption status-caption--mobile">
        {{ `P${index + 1}` }}</span
      >
      <span class="status-caption status-caption--desktop">
        {{ `Player ${index + 1}` }}</span
      >
      <span class="status-value">{{ score }}</span>
    </div>
  </div>
</template>
<style scoped>
.status-bar {
  height: 100%;
  display: flex;
  column-gap: 1rem;
}
.status {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 10px;
  font-weight: bold;
  border-radius: 0.75rem;
  background-color: var(--color-neutral-400);
}
.status--selected {
  --triangle-size: 15px;
  position: relative;
  background-color: var(--color-primary);
}
.status--selected::before {
  --size: var(--triangle-size);
  content: "";
  width: var(--size);
  height: var(--size);
  position: absolute;
  z-index: -1;
  top: calc(var(--size) / 2 * -1);
  left: calc(50% - var(--size) / 2);
  transform: rotate(45deg);
  background-color: inherit;
}
.status--selected > .status-caption,
.status--selected > .status-value {
  color: var(--color-neutral-200);
}
.status-caption {
  color: var(--color-neutral-600);
}
.status-value {
  color: var(--color-neutral-700);
  font-size: 1.5rem;
}
.status-caption--desktop {
  display: none;
}
@media (min-width: 48em) {
  .status {
    flex-direction: row;
    justify-content: space-between;
    padding-inline: 1.5rem;
  }
  .status--selected {
    --triangle-size: 25px;
  }
  .status-caption {
    font-size: 18px;
  }
  .status-caption--mobile {
    display: none;
  }
  .status-caption--desktop {
    display: block;
  }
  .status-value {
    font-size: 2rem;
  }
}
</style>
