import { ref, watchEffect, type Ref } from "vue";

/**
 * Binds a checkbox element to a reactive "some selected" flag by setting its native
 * `.indeterminate` property — Vue has no `:indeterminate` binding, so this has to happen
 * imperatively on the DOM node. Attach the returned ref to the checkbox's `ref` attribute.
 */
export function useIndeterminateCheckbox(someSelected: Ref<boolean>): Ref<HTMLInputElement | null> {
  const checkboxEl = ref<HTMLInputElement | null>(null);
  watchEffect(() => {
    if (checkboxEl.value) checkboxEl.value.indeterminate = someSelected.value;
  });
  return checkboxEl;
}
