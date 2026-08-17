<script setup lang="ts">
import { computed } from "vue";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";

const props = defineProps<{
  label: string;
  product: string;
  items: readonly { name: string }[];
  selected: ReadonlySet<string>;
}>();

const emit = defineEmits<{
  "toggle-group": [checked: boolean];
  "toggle-item": [name: string];
}>();

const allSelected = computed(
  () => props.items.length > 0 && props.items.every((i) => props.selected.has(i.name)),
);
const someSelected = computed(
  () => !allSelected.value && props.items.some((i) => props.selected.has(i.name)),
);
const checkboxEl = useIndeterminateCheckbox(someSelected);

// The logos plugin publishes its raw SVG assets alongside dist (see its package.json `files`), so
// jsDelivr can serve a preview straight from the vendored source — no CSS/token loading required.
function logoSrc(name: string): string {
  const variant = name.slice(props.product.length + 1);
  return `https://cdn.jsdelivr.net/npm/@pantoken/plugin-logos/assets/logos/${props.product}/${variant}.svg`;
}
</script>

<template>
  <details class="instui-toggle-group picker-toggle-group__item" open>
    <summary>
      <label class="instui-checkbox" @click.stop>
        <input
          ref="checkboxEl"
          type="checkbox"
          :checked="allSelected"
          @change="emit('toggle-group', ($event.target as HTMLInputElement).checked)"
        />
        <span>{{ label }}</span>
      </label>
    </summary>
    <div class="picker-toggle-group__logos">
      <label
        v-for="item in items"
        :key="item.name"
        class="instui-checkbox picker-toggle-group__logo"
      >
        <input
          type="checkbox"
          :checked="selected.has(item.name)"
          @change="emit('toggle-item', item.name)"
        />
        <img
          class="picker-toggle-group__img"
          :src="logoSrc(item.name)"
          :alt="item.name"
          loading="lazy"
          aria-hidden="true"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </details>
</template>

<style scoped>
.picker-toggle-group__item {
  border: 0 none;
}
.picker-toggle-group__logos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  margin: 0.5rem 0 0 1rem;
}
.picker-toggle-group__logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.picker-toggle-group__img {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  /* Override VitePress's default `.vp-doc img { margin: ... }` so it sits flush with the label. */
  margin: 0;
  object-fit: contain;
}
</style>
