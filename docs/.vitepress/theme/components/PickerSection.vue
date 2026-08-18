<script setup lang="ts">
import { computed } from "vue";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";

const props = defineProps<{
  label: string;
  allSelected: boolean;
  someSelected: boolean;
  disabled?: boolean;
  open?: boolean;
}>();

const emit = defineEmits<{ "toggle-all": [checked: boolean] }>();

const checkboxEl = useIndeterminateCheckbox(computed(() => props.someSelected));
</script>

<template>
  <details class="instui-toggle-details picker-section" :open="open ?? true">
    <summary>
      <label class="instui-checkbox picker-section__checkbox" @click.stop>
        <input
          ref="checkboxEl"
          type="checkbox"
          :checked="allSelected"
          :disabled="disabled"
          @change="emit('toggle-all', ($event.target as HTMLInputElement).checked)"
        />
        <span>{{ label }}</span>
      </label>
    </summary>
    <div class="picker-section__content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.picker-section {
  margin: 0 0 0.75rem;
}
.picker-section:last-child {
  margin-bottom: 0;
}
/* The checkbox's own click must not bubble to <summary> and toggle the disclosure. */
.picker-section__checkbox {
  display: inline-flex;
}
.picker-section__content {
  margin-top: 0.5rem;
}
</style>
