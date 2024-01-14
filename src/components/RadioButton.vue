<script setup lang="ts">
type Size = "normal" | "large";
type Props = {
  size?: Size;
  name: string;
  id: string;
  label: string;
  value: String;
};
withDefaults(defineProps<Props>(), {
  size: "normal",
});

const model = defineModel();
</script>
<template>
  <div class="radio-container" :class="`radio-container--${size}`">
    <input
      class="radio"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      v-model="model"
    />
    <label class="radio_label" :for="id">{{ label }}</label>
  </div>
</template>
<style scoped>
.radio-container {
  --radio-bg: var(--color-neutral-500);
  --radio-bg--checked: var(--color-neutral-700);
  --radio-color: var(--color-neutral-200);
  --radio-hover-color: var(--color-accent);
  --radio-fs: 1rem;
  width: var(--radio-width);
  height: var(--radio-height);
  position: relative;
  font-size: var(--radio-fs);
  font-weight: bold;
  background-color: var(--radio-bg);
  color: var(--color-neutral-200);
  border-radius: 2rem;
}
@media (min-width: 48em) {
  .radio-container {
    --radio-fs: 1.625rem;
  }
}

.radio {
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.01;
}
.radio_label {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: grid;
  place-items: center;
}
.radio-container:has(
    :not(.radio:checked).radio:hover,
    :not(.radio:checked).radio:focus
  ) {
  background-color: var(--radio-hover-color);
}

.radio-container:has(.radio:checked) {
  background-color: var(--radio-bg--checked);
}

.radio-container--normal {
  --radio-width: 4rem;
  --radio-height: 2.5rem;
}
.radio-container--large {
  --radio-width: 8.375rem;
  --radio-height: 2.5rem;
}
@media (min-width: 48em) {
  .radio-container--normal {
    --radio-width: 7.5rem;
    --radio-height: 3.25rem;
  }
  .radio-container--large {
    --radio-width: 16rem;
    --radio-height: 3.25rem;
  }
}
</style>
