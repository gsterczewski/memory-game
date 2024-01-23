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
  <div class="overlay">
    <div class="overlay-box">
      <BaseButton @click="handleRestart" theme="primary" size="block"
        >Restart</BaseButton
      >
      <BaseButton @click="handleNewGame" size="block">New Game</BaseButton>
      <BaseButton @click="handleResume" size="block">Resume Game</BaseButton>
    </div>
  </div>
</template>
<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.overlay-box {
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
