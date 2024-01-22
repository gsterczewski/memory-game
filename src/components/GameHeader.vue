<script setup lang="ts">
import AppLogo from "./AppLogo.vue";
</script>
<template>
  <header class="header">
    <AppLogo />
    <div class="menu-button">
      <slot name="menu-button"> </slot>
    </div>
    <div class="control-buttons">
      <slot name="control-buttons"></slot>
    </div>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-neutral-800);
}
.control-buttons {
  display: none;
}
@media (min-width: 48em) {
  .control-buttons {
    display: flex;
    gap: 1rem;
  }
  .menu-button {
    display: none;
  }
}
</style>
