<script setup lang="ts">
import { computed } from "vue";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import PickerToggleGroupItem from "./PickerToggleGroupItem.vue";

const props = defineProps<{
  label: string;
  groups: readonly { key: string; label: string; items: readonly { name: string }[] }[];
  selected: ReadonlySet<string>;
}>();

const emit = defineEmits<{
  "toggle-all": [checked: boolean];
  "toggle-group": [key: string, checked: boolean];
  "toggle-item": [name: string];
}>();

const allNames = computed(() => props.groups.flatMap((g) => g.items.map((i) => i.name)));
const allSelected = computed(
  () => allNames.value.length > 0 && allNames.value.every((n) => props.selected.has(n)),
);
const someSelected = computed(
  () => !allSelected.value && allNames.value.some((n) => props.selected.has(n)),
);
const checkboxEl = useIndeterminateCheckbox(someSelected);
</script>

<template>
  <details class="instui-toggle-group picker-toggle-group" open>
    <summary>
      <label class="instui-checkbox" @click.stop>
        <input
          ref="checkboxEl"
          type="checkbox"
          :checked="allSelected"
          @change="emit('toggle-all', ($event.target as HTMLInputElement).checked)"
        />
        <span>{{ label }}</span>
      </label>
    </summary>
    <div class="picker-toggle-group__content">
      <PickerToggleGroupItem
        v-for="group in groups"
        :key="group.key"
        :label="group.label"
        :items="group.items"
        :selected="selected"
        @toggle-group="(checked) => emit('toggle-group', group.key, checked)"
        @toggle-item="(name) => emit('toggle-item', name)"
      />
    </div>
  </details>
</template>

<style scoped>
.picker-toggle-group {
  margin: 0 0 0.75rem;
}
.picker-toggle-group__content {
  margin: 0.5rem 0 0 1rem;
}
</style>
