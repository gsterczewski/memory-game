<script setup lang="ts">
type TextBarProps = {
  caption: string;
  text: string;
  isHighlighted?: boolean;
};
defineProps<TextBarProps>();
</script>
<template>
  <p class="text-bar" :class="{ '--highlighted': isHighlighted }">
    <span id="text-bar-caption" class="text-bar-caption">{{ caption }}</span>
    <span id="text-bar-result" class="text-bar-result">{{ text }}</span>
  </p>
</template>
<style scoped>
.text-bar {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  background-color: var(--color-neutral-400);
}

.text-bar-caption {
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--color-neutral-600);
}

.text-bar-result {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-neutral-700);
}
.--highlighted {
  background-color: var(--color-neutral-800);
}
.--highlighted > .text-bar-result,
.--highlighted > .text-bar-caption {
  color: var(--color-neutral-200);
}

@media (min-width: 48em) {
  .text-bar {
    padding-inline: 2rem;
    padding-block: 1.5rem;
  }
  .text-bar-caption {
    font-size: 1.125rem;
  }
  .text-bar-result {
    font-size: 2rem;
  }
}
</style>
