<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
type PopupMenuProps = {
  handleResume: () => void;
  handleRestart: () => void;
  handleNewGame: () => void;
};
defineProps<PopupMenuProps>();
</script>
<template>
  <div class="menu-box">
    <BaseButton @click="handleRestart" theme="primary" size="block"
      >Restart</BaseButton
    >
    <BaseButton @click="handleNewGame" size="block">New Game</BaseButton>
    <BaseButton @click="handleResume" size="block">Resume Game</BaseButton>
  </div>
</template>
<style scoped>
.menu-box {
  width: min(87%, 450px);
  aspect-ratio: 1.5/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.75rem, 4.8vw, 1.25rem);
  padding: 1.33em;
  row-gap: 0.88em;
  border-radius: 0.75rem;
  background-color: var(--color-neutral-200);
}
</style>
