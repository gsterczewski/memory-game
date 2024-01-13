<script setup lang="ts">
type Theme = "primary" | "base";
type Size = "large" | "normal";
type ButtonProps = {
  theme?: Theme;
  size?: Size;
};
const props = withDefaults(defineProps<ButtonProps>(), {
  size: "normal",
  theme: "base",
});
</script>
<template>
  <button
    class="button"
    :class="`button--${props.size} button--${props.theme}`"
  >
    <slot />
  </button>
</template>
<style scoped>
.button {
  width: var(--width);
  height: var(--height);
  color: var(--color);
  background-color: var(--background);
  font-size: var(--fs);
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  outline: none;
}

/* SIZES */
.button--normal {
  --width: 4.875rem;
  --height: 2.5rem;
  --fs: 1rem;
}
.button--large {
  --width: 17.5rem;
  --height: 3rem;
  --fs: 1.125rem;
}
@media (min-width: 48em) {
  .button--large {
    --width: 34rem;
    --height: 4.375rem;
    --fs: 2rem;
  }
  .button--normal {
    --width: 9rem;
    --height: 3.25rem;
  }
}
/* THEMES */
.button--primary {
  --background: var(--color-primary);
  --color: var(--color-neutral-200);
}
.button--base {
  --background: var(--color-neutral-500);
  --color: var(--color-neutral-700);
}
.button--primary:hover,
.button--primary:focus {
  opacity: 0.75;
}
.button--base:hover,
.button--base:focus {
  background-color: var(--color-accent);
  --color: var(--color-neutral-200);
}
</style>
