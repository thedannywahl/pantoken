import { computed, ref, type ComputedRef } from "vue";

import {
  DEFAULT_HIDDEN_CLASS,
  DEFAULT_STORAGE_KEY,
  type SidebarToggleOptions,
} from "./inline-script.ts";

/** Reactive whole-sidebar visibility state returned by {@link useSidebarVisibility}. */
export interface SidebarVisibility {
  isHidden: ComputedRef<boolean>;
  toggle: () => void;
}

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Reactive whole-sidebar visibility state, backed by `localStorage` and a class on `<html>`. Reads
 * whatever the {@link sidebarToggleHead} inline script already applied before mount, so there's no
 * hydration flicker between server-rendered and client state.
 */
export function useSidebarVisibility(options: SidebarToggleOptions = {}): SidebarVisibility {
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
  const hiddenClass = options.hiddenClass ?? DEFAULT_HIDDEN_CLASS;

  const hidden = ref(isBrowser && document.documentElement.classList.contains(hiddenClass));

  function toggle(): void {
    hidden.value = !hidden.value;
    if (!isBrowser) return;
    document.documentElement.classList.toggle(hiddenClass, hidden.value);
    try {
      localStorage.setItem(storageKey, String(hidden.value));
    } catch {
      // storage may be unavailable (private browsing, disabled) — the toggle still works for the session
    }
  }

  return { isHidden: computed(() => hidden.value), toggle };
}
