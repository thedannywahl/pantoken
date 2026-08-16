<script setup lang="ts">
import { computed } from "vue";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";

const props = defineProps<{
  label: string;
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
      <label v-for="item in items" :key="item.name" class="instui-checkbox">
        <input
          type="checkbox"
          :checked="selected.has(item.name)"
          @change="emit('toggle-item', item.name)"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </details>
</template>

<style scoped>
.picker-toggle-group__item {
  margin: 0.5rem 0;
}
.picker-toggle-group__logos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  margin: 0.5rem 0 0 1rem;
}
</style>
