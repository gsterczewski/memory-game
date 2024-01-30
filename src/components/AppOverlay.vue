<template>
  <div class="overlay">
    <slot></slot>
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
</style>
