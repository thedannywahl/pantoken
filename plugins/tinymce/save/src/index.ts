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
/** Inserts a saved preset at the current cursor without clearing the current document. */
export const INSERT_COMMAND = "pantokenInsertPreset";
/** Replaces the current document with a saved preset after confirmation. */
export const REPLACE_COMMAND = "pantokenReplacePreset";
/** Deletes a named preset without clearing the current document. */
export const DELETE_COMMAND = "pantokenDeletePreset";
/** Clears the current editor state back to the caller's defaults. */
export const NEW_COMMAND = "pantokenNewPreset";
/** Exports the current editor state and config as a portable JSON file. */
export const EXPORT_COMMAND = "pantokenExportPreset";
/** Imports a portable JSON file and overwrites the current editor state and config. */
export const IMPORT_COMMAND = "pantokenImportPreset";
/** Default storage namespace, intentionally separate from TinyMCE Autosave. */
export const SAVE_STORAGE_KEY = "pantoken-tinymce-save-presets";

const STORAGE_VERSION = 1;
const EXPORT_ENVELOPE_VERSION = 1;
const EXPORT_SCHEMA_URL = "https://pantoken.app/schemas/tinymce-save.export.schema.json";

/** A caller-owned state saved under a stable ID and user-visible name. */
export interface SavePreset<State> {
  readonly id: string;
  readonly name: string;
  readonly state: State;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/** Portable JSON export payload used for Save/Import flows. */
export interface SaveExportEnvelope<State> {
  readonly $schema: string;
  readonly version: typeof EXPORT_ENVELOPE_VERSION;
  readonly exportedAt: string;
  readonly name: string;
  readonly state: State;
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
  readonly insert?: (state: State) => void | Promise<void>;
  readonly replace?: (state: State) => void | Promise<void>;
  readonly reset: () => void | Promise<void>;
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

/** A preset (or export) display name, safe as a filesystem/URL filename. Exported so hosts can
 * build a matching filename for their own downloads (e.g. a theme package zip). */
export function slugifyExportName(name: string): string {
  const normalized = name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/gu, "-");
  let start = 0;
  while (start < normalized.length && normalized.charCodeAt(start) === 45) start += 1;
  let end = normalized.length;
  while (end > start && normalized.charCodeAt(end - 1) === 45) end -= 1;
  const clean = normalized.slice(start, end);
  return clean || "preset";
}

function downloadBlob(blob: Blob, filename: string): void {
  if (typeof document === "undefined") return;
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
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
    let baseline: State | undefined = options.capture();

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

    const persistCurrent = (onSaved?: () => void): void => {
      const active = readPresets().find((preset) => preset.id === activePresetId);
      if (!active) {
        openSaveAsDialog(onSaved);
        return;
      }
      const state = options.capture();
      const result = repository.put(active.name, state);
      if (!result.ok) {
        notify(strings.storageWriteError);
        return;
      }
      baseline = state;
      onSaved?.();
    };

    const saveAs = (name: string, onSaved?: () => void): void => {
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
        onSaved?.();
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

    const openSaveAsDialog = (onSaved?: () => void): void => {
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
          saveAs(name, onSaved);
        },
      });
    };

    const save = (): void => {
      persistCurrent();
    };

    const resetCurrent = async (): Promise<void> => {
      try {
        await Promise.resolve(options.reset());
        activePresetId = undefined;
        baseline = options.capture();
      } catch {
        notify(strings.invalidPreset);
      }
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
      if (baseline !== undefined && equals(options.capture(), baseline)) {
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

    const openSelectionDialog = (mode: "open" | "insert" | "replace" | "delete"): void => {
      const presets = readPresets();
      if (presets.length === 0) {
        editor.windowManager.alert(strings.emptyPresets);
        return;
      }
      const title =
        mode === "open"
          ? strings.openDialogTitle
          : mode === "insert"
            ? "Insert preset"
            : mode === "replace"
              ? "Replace preset"
              : strings.deleteDialogTitle;
      const submitText =
        mode === "open"
          ? strings.presetOpenButton
          : mode === "insert"
            ? "Insert"
            : mode === "replace"
              ? "Replace"
              : strings.presetDeleteButton;
      editor.windowManager.open({
        title,
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
          { type: "submit", text: submitText, primary: true },
        ],
        onSubmit: (api): void => {
          const payload =
            typeof api.getData === "function" ? (api.getData() as { presetId?: string }) : {};
          const presetId = payload.presetId ?? activePresetId ?? presets[0]?.id;
          if (!presetId) {
            notify(strings.invalidPreset);
            return;
          }
          const preset = presets.find((candidate) => candidate.id === presetId);
          if (!preset) {
            notify(strings.invalidPreset);
            return;
          }
          api.close();
          if (mode === "delete") {
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
            return;
          }
          if (mode === "open") {
            restorePreset(preset);
            return;
          }
          const applyAction =
            mode === "insert"
              ? (options.insert ?? options.restore)
              : (options.replace ?? options.restore);
          baseline = undefined;
          if (mode === "replace") {
            activePresetId = preset.id;
          }
          void Promise.resolve(applyAction(preset.state)).catch(() =>
            notify(strings.invalidPreset),
          );
        },
      });
    };

    const performNew = (): void => {
      if (baseline === undefined || !equals(options.capture(), baseline)) {
        editor.windowManager.open({
          title: strings.newDialogTitle,
          body: {
            type: "panel",
            items: [{ type: "htmlpanel", html: strings.newDialogMessage }],
          },
          buttons: [
            { type: "cancel", text: strings.presetCancelButton },
            { type: "custom", name: "discard", text: strings.newDialogDiscardButton },
            { type: "submit", text: strings.newDialogSaveButton, primary: true },
          ],
          onSubmit: (api): void => {
            api.close();
            persistCurrent(() => {
              void resetCurrent();
            });
          },
          onAction: (api, details): void => {
            if (details.name !== "discard") return;
            api.close();
            void resetCurrent();
          },
        });
        return;
      }
      void resetCurrent();
    };

    const performExport = (): void => {
      const state = options.capture();
      const active = readPresets().find((preset) => preset.id === activePresetId);
      const envelope: SaveExportEnvelope<State> = {
        $schema: EXPORT_SCHEMA_URL,
        version: EXPORT_ENVELOPE_VERSION,
        exportedAt: new Date().toISOString(),
        name: active?.name || strings.exportDefaultName,
        state,
      };
      const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: "application/json" });
      downloadBlob(blob, `${slugifyExportName(envelope.name)}.json`);
    };

    const readImportFile = async (): Promise<string> => {
      if (
        typeof window !== "undefined" &&
        "showOpenFilePicker" in window &&
        typeof window.showOpenFilePicker === "function"
      ) {
        const [handle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{ description: "JSON files", accept: { "application/json": [".json"] } }],
        });
        const file: File = await handle.getFile();
        return await file.text();
      }

      return await new Promise<string>((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.style.display = "none";
        document.body.append(input);
        input.addEventListener(
          "change",
          () => {
            const file = input.files?.[0];
            if (!file) {
              reject(new Error("No file selected"));
              return;
            }
            file
              .text()
              .then((text) => {
                input.remove();
                resolve(text);
              })
              .catch((error) => {
                input.remove();
                reject(error);
              });
          },
          { once: true },
        );
        input.click();
      });
    };

    const performImport = async (): Promise<void> => {
      try {
        const raw = await readImportFile();
        const parsed = JSON.parse(raw) as Partial<SaveExportEnvelope<unknown>>;
        if (
          typeof parsed !== "object" ||
          parsed === null ||
          parsed.version !== EXPORT_ENVELOPE_VERSION ||
          typeof parsed.exportedAt !== "string" ||
          typeof parsed.name !== "string" ||
          !Object.hasOwn(parsed, "state")
        ) {
          notify(strings.importInvalidFile);
          return;
        }
        if (!options.isValid(parsed.state)) {
          notify(strings.importInvalidFile);
          return;
        }
        const state = parsed.state;
        editor.windowManager.confirm(
          formatSaveString(strings.confirmImportOverwrite, { name: parsed.name }),
          (confirmed) => {
            if (!confirmed) return;
            void Promise.resolve(options.restore(state))
              .then(() => {
                activePresetId = undefined;
                baseline = state;
              })
              .catch(() => notify(strings.invalidPreset));
          },
        );
      } catch {
        notify(strings.importInvalidFile);
      }
    };

    editor.addCommand(SAVE_COMMAND, save);
    editor.addCommand(SAVE_AS_COMMAND, () => openSaveAsDialog());
    editor.addCommand(OPEN_COMMAND, () => openSelectionDialog("open"));
    editor.addCommand(INSERT_COMMAND, () => openSelectionDialog("insert"));
    editor.addCommand(REPLACE_COMMAND, () => openSelectionDialog("replace"));
    editor.addCommand(DELETE_COMMAND, () => openSelectionDialog("delete"));
    editor.addCommand(NEW_COMMAND, performNew);
    editor.addCommand(EXPORT_COMMAND, performExport);
    editor.addCommand(IMPORT_COMMAND, () => {
      void performImport();
    });
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
            text: "Insert...",
            enabled: hasPresets,
            onAction: () => editor.execCommand(INSERT_COMMAND),
          },
          {
            type: "menuitem",
            text: "Replace...",
            enabled: hasPresets,
            onAction: () => editor.execCommand(REPLACE_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.deleteAction,
            enabled: hasPresets,
            onAction: () => editor.execCommand(DELETE_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.newAction,
            onAction: () => editor.execCommand(NEW_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.exportAction,
            onAction: () => editor.execCommand(EXPORT_COMMAND),
          },
          {
            type: "menuitem",
            text: strings.importAction,
            onAction: () => editor.execCommand(IMPORT_COMMAND),
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
