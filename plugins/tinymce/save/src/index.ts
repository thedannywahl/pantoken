import type { Editor, Ui } from "tinymce";
import { formatSaveString, SAVE_STRINGS, type SaveStrings } from "./strings.js";

/** The plugin name used in TinyMCE's `plugins` option. */
export const SAVE_PLUGIN_NAME = "pantoken_save";
/** The menu-button name used in TinyMCE's `toolbar` option. */
export const SAVE_TOOLBAR_NAME = "pantokenSave";
/** Saves the current state to its active preset. */
export const SAVE_COMMAND = "pantokenSavePreset";
/** Prompts for a name and saves the current state. */
export const SAVE_AS_COMMAND = "pantokenSavePresetAs";
/** Opens a named preset. */
export const OPEN_COMMAND = "pantokenOpenPreset";
/** Deletes a named preset without clearing the current document. */
export const DELETE_COMMAND = "pantokenDeletePreset";
/** Default storage namespace, intentionally separate from TinyMCE Autosave. */
export const SAVE_STORAGE_KEY = "pantoken-tinymce-save-presets";

const STORAGE_VERSION = 1;

/** A caller-owned state saved under a stable ID and user-visible name. */
export interface SavePreset<State> {
  readonly id: string;
  readonly name: string;
  readonly state: State;
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface SavePresetEnvelope<State> {
  readonly version: typeof STORAGE_VERSION;
  readonly presets: readonly SavePreset<State>[];
}

/** Browser storage surface used by the repository. */
export interface SaveStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Result returned when persisted presets cannot be read or written. */
export type SaveRepositoryResult<Value> =
  | { readonly ok: true; readonly value: Value }
  | { readonly ok: false; readonly error: "read" | "write" };

/** Normalizes a name for matching while preserving its trimmed display spelling. */
export function normalizePresetName(name: string): string {
  return name.trim().toLocaleLowerCase();
}

function isPreset(value: unknown): value is SavePreset<unknown> {
  if (typeof value !== "object" || value === null) return false;
  const preset = value as Partial<SavePreset<unknown>>;
  return (
    typeof preset.id === "string" &&
    typeof preset.name === "string" &&
    preset.name.trim() !== "" &&
    typeof preset.createdAt === "string" &&
    typeof preset.updatedAt === "string" &&
    Object.hasOwn(preset, "state")
  );
}

/** Creates a versioned repository for named preset CRUD. */
export function createSaveRepository<State>(
  storage: SaveStorage = localStorage,
  storageKey = SAVE_STORAGE_KEY,
): {
  list(): SaveRepositoryResult<readonly SavePreset<State>[]>;
  put(name: string, state: State): SaveRepositoryResult<SavePreset<State>>;
  remove(id: string): SaveRepositoryResult<boolean>;
} {
  const list = (): SaveRepositoryResult<readonly SavePreset<State>[]> => {
    try {
      const raw = storage.getItem(storageKey);
      if (!raw) return { ok: true, value: [] };
      const parsed = JSON.parse(raw) as Partial<SavePresetEnvelope<unknown>>;
      if (parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.presets)) {
        return { ok: true, value: [] };
      }
      return {
        ok: true,
        value: parsed.presets.filter(isPreset) as readonly SavePreset<State>[],
      };
    } catch {
      return { ok: false, error: "read" };
    }
  };

  const write = (presets: readonly SavePreset<State>[]): SaveRepositoryResult<void> => {
    try {
      storage.setItem(storageKey, JSON.stringify({ version: STORAGE_VERSION, presets }));
      return { ok: true, value: undefined };
    } catch {
      return { ok: false, error: "write" };
    }
  };

  return {
    list,
    put(name, state) {
      const current = list();
      if (!current.ok) return current;
      const displayName = name.trim();
      const normalizedName = normalizePresetName(displayName);
      const existing = current.value.find(
        (preset) => normalizePresetName(preset.name) === normalizedName,
      );
      const now = new Date().toISOString();
      const preset: SavePreset<State> = existing
        ? { ...existing, name: displayName, state, updatedAt: now }
        : { id: crypto.randomUUID(), name: displayName, state, createdAt: now, updatedAt: now };
      const next = existing
        ? current.value.map((candidate) => (candidate.id === existing.id ? preset : candidate))
        : [...current.value, preset];
      const saved = write(next);
      return saved.ok ? { ok: true, value: preset } : saved;
    },
    remove(id) {
      const current = list();
      if (!current.ok) return current;
      const next = current.value.filter((preset) => preset.id !== id);
      if (next.length === current.value.length) return { ok: true, value: false };
      const saved = write(next);
      return saved.ok ? { ok: true, value: true } : saved;
    },
  };
}

/** Options accepted by {@link createSavePlugin}. */
export interface SavePluginOptions<State> {
  readonly capture: () => State;
  readonly restore: (state: State) => void | Promise<void>;
  readonly isValid: (state: unknown) => state is State;
  readonly strings?: Partial<SaveStrings>;
  readonly storage?: SaveStorage;
  readonly storageKey?: string;
  readonly equals?: (left: State, right: State) => boolean;
}

/** Public API returned when the plugin callback is invoked by TinyMCE. */
export interface SavePluginApi<State> {
  list(): readonly SavePreset<State>[];
  readonly activePresetId: string | undefined;
}

function defaultEquals<State>(left: State, right: State): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

/** Builds the TinyMCE preset management plugin. */
export function createSavePlugin<State>(
  options: SavePluginOptions<State>,
): (editor: Editor) => SavePluginApi<State> {
  return function pantokenSavePlugin(editor: Editor): SavePluginApi<State> {
    const strings: SaveStrings = { ...SAVE_STRINGS, ...options.strings };
    const repository = createSaveRepository<State>(options.storage, options.storageKey);
    const equals = options.equals ?? defaultEquals;
    let activePresetId: string | undefined;
    let baseline = options.capture();

    const notify = (text: string): void => {
      editor.notificationManager.open({ text, type: "error" });
    };

    const readPresets = (): readonly SavePreset<State>[] => {
      const result = repository.list();
      if (!result.ok) {
        notify(strings.storageReadError);
        return [];
      }
      return result.value;
    };

    const saveAs = (name: string): void => {
      const displayName = name.trim();
      if (!displayName) {
        editor.windowManager.alert(strings.invalidName);
        return;
      }
      const presets = readPresets();
      const existing = presets.find(
        (preset) => normalizePresetName(preset.name) === normalizePresetName(displayName),
      );
      const persist = (): void => {
        const state = options.capture();
        const result = repository.put(displayName, state);
        if (!result.ok) {
          notify(strings.storageWriteError);
          return;
        }
        activePresetId = result.value.id;
        baseline = state;
      };
      if (!existing) {
        persist();
        return;
      }
      editor.windowManager.confirm(
        formatSaveString(strings.confirmOverwrite, { name: existing.name }),
        (confirmed) => {
          if (confirmed) persist();
        },
      );
    };

    const openSaveAsDialog = (): void => {
      editor.windowManager.open({
        title: strings.saveAsDialogTitle,
        body: {
          type: "panel",
          items: [{ type: "input", name: "name", label: strings.presetNameLabel }],
        },
        initialData: { name: "" },
        buttons: [
          { type: "cancel", text: strings.presetCancelButton },
          { type: "submit", text: strings.presetSaveButton, primary: true },
        ],
        onSubmit: (api): void => {
          const { name } = api.getData() as { name: string };
          if (!name.trim()) {
            editor.windowManager.alert(strings.invalidName);
            return;
          }
          api.close();
          saveAs(name);
        },
      });
    };

    const save = (): void => {
      const active = readPresets().find((preset) => preset.id === activePresetId);
      if (!active) {
        openSaveAsDialog();
        return;
      }
      const state = options.capture();
      const result = repository.put(active.name, state);
      if (!result.ok) {
        notify(strings.storageWriteError);
        return;
      }
      baseline = state;
    };

    const restorePreset = (preset: SavePreset<State>): void => {
      if (!options.isValid(preset.state)) {
        notify(strings.invalidPreset);
        return;
      }
      const restore = (): void => {
        void Promise.resolve(options.restore(preset.state))
          .then(() => {
            activePresetId = preset.id;
            baseline = preset.state;
          })
          .catch(() => notify(strings.invalidPreset));
      };
      if (equals(options.capture(), baseline)) {
        restore();
        return;
      }
      editor.windowManager.confirm(
        formatSaveString(strings.confirmDiscard, { name: preset.name }),
        (confirmed) => {
          if (confirmed) restore();
        },
      );
    };

    const openSelectionDialog = (mode: "open" | "delete"): void => {
      const presets = readPresets();
      if (presets.length === 0) {
        editor.windowManager.alert(strings.emptyPresets);
        return;
      }
      editor.windowManager.open({
        title: mode === "open" ? strings.openDialogTitle : strings.deleteDialogTitle,
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "presetId",
              label: strings.presetLabel,
              items: presets.map((preset) => ({ text: preset.name, value: preset.id })),
            },
          ],
        },
        initialData: { presetId: activePresetId ?? presets[0].id },
        buttons: [
          { type: "cancel", text: strings.presetCancelButton },
          {
            type: "submit",
            text: mode === "open" ? strings.presetOpenButton : strings.presetDeleteButton,
            primary: true,
          },
        ],
        onSubmit: (api): void => {
          const { presetId } = api.getData() as { presetId: string };
          const preset = presets.find((candidate) => candidate.id === presetId);
          if (!preset) {
            notify(strings.invalidPreset);
            return;
          }
          api.close();
          if (mode === "open") {
            restorePreset(preset);
            return;
          }
          editor.windowManager.confirm(
            formatSaveString(strings.confirmDelete, { name: preset.name }),
            (confirmed) => {
              if (!confirmed) return;
              const result = repository.remove(preset.id);
              if (!result.ok) {
                notify(strings.storageDeleteError);
                return;
              }
              if (activePresetId === preset.id) activePresetId = undefined;
            },
          );
        },
      });
    };

    editor.addCommand(SAVE_COMMAND, save);
    editor.addCommand(SAVE_AS_COMMAND, openSaveAsDialog);
    editor.addCommand(OPEN_COMMAND, () => openSelectionDialog("open"));
    editor.addCommand(DELETE_COMMAND, () => openSelectionDialog("delete"));
    editor.ui.registry.addMenuButton(SAVE_TOOLBAR_NAME, {
      icon: "save",
      tooltip: strings.saveToolbarTooltip,
      fetch: (success): void => {
        const hasPresets = readPresets().length > 0;
        const items: Ui.Menu.NestedMenuItemContents[] = [
          {
            type: "menuitem",
            text: strings.saveAction,
            enabled: activePresetId !== undefined,
            onAction: () => editor.execCommand(SAVE_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.saveAsAction,
            onAction: () => editor.execCommand(SAVE_AS_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.openAction,
            enabled: hasPresets,
            onAction: () => editor.execCommand(OPEN_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.deleteAction,
            enabled: hasPresets,
            onAction: () => editor.execCommand(DELETE_COMMAND),
          },
        ];
        success(items);
      },
    });

    return {
      list: readPresets,
      get activePresetId() {
        return activePresetId;
      },
    };
  };
}

export { SAVE_STRINGS, type SaveStrings } from "./strings.js";
