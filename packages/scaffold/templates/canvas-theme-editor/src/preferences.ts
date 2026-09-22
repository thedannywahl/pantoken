/** Persists this app's own editor/preview UI settings across reloads — never the authored content. */
const STORAGE_KEY = "pantoken-canvas-theme-editor-preferences";

/** Shape of the persisted UI preferences blob. */
export interface StoredPreferences {
  layout: "row" | "column";
  previewWidth: "large" | "medium" | "small";
  previewFullscreen: boolean;
  cdnProvider: string;
  tinymceConfig?: Record<string, unknown>;
}

/** Reads stored preferences, tolerating missing/corrupt/blocked storage. */
export function loadPreferences(): Partial<StoredPreferences> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Partial<StoredPreferences>)
      : {};
  } catch {
    return {};
  }
}

/** Persists preferences, silently no-op-ing if storage is unavailable. */
export function savePreferences(preferences: Partial<StoredPreferences>): void {
  try {
    const current = loadPreferences();
    const nextTinymceConfig = {
      ...(typeof current.tinymceConfig === "object" && current.tinymceConfig !== null
        ? current.tinymceConfig
        : {}),
      ...(typeof preferences.tinymceConfig === "object" && preferences.tinymceConfig !== null
        ? preferences.tinymceConfig
        : {}),
    };
    const nextPreferences = {
      ...current,
      ...preferences,
      tinymceConfig: nextTinymceConfig,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
  } catch {
    // Private mode / storage disabled — preferences just won't persist across reloads.
  }
}
