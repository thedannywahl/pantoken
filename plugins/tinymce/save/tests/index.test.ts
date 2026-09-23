/**
 * @vitest-environment happy-dom
 */
import { describe, expect, test, vi } from "vite-plus/test";
import {
  DELETE_COMMAND,
  EXPORT_COMMAND,
  IMPORT_COMMAND,
  NEW_COMMAND,
  OPEN_COMMAND,
  SAVE_AS_COMMAND,
  SAVE_COMMAND,
  SAVE_STORAGE_KEY,
  SAVE_TOOLBAR_NAME,
  createSavePlugin,
  createSaveRepository,
  normalizePresetName,
} from "../src/index.ts";

function storage() {
  const values = new Map<string, string>();
  return {
    values,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("createSaveRepository", () => {
  test("creates, replaces, lists, and removes named presets", () => {
    const target = storage();
    const repository = createSaveRepository<{ html: string }>(target);

    const created = repository.put(" Course Home ", { html: "<h2>First</h2>" });
    expect(created).toMatchObject({ ok: true, value: { name: "Course Home" } });

    const replaced = repository.put("course home", { html: "<h2>Second</h2>" });
    expect(replaced).toMatchObject({
      ok: true,
      value: { id: created.ok ? created.value.id : "" },
    });
    expect(repository.list()).toMatchObject({
      ok: true,
      value: [{ name: "course home", state: { html: "<h2>Second</h2>" } }],
    });

    expect(repository.remove(created.ok ? created.value.id : "")).toEqual({
      ok: true,
      value: true,
    });
    expect(repository.list()).toEqual({ ok: true, value: [] });
    expect(target.values.has(SAVE_STORAGE_KEY)).toBe(true);
  });

  test("ignores unsupported envelopes and malformed records", () => {
    const target = storage();
    target.values.set(SAVE_STORAGE_KEY, JSON.stringify({ version: 2, presets: [] }));
    expect(createSaveRepository(target).list()).toEqual({ ok: true, value: [] });

    target.values.set(
      SAVE_STORAGE_KEY,
      JSON.stringify({ version: 1, presets: [{ id: "missing-fields" }] }),
    );
    expect(createSaveRepository(target).list()).toEqual({ ok: true, value: [] });
  });

  test("reports blocked reads and writes without mutating repository state", () => {
    const blockedRead = createSaveRepository({
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => undefined,
    });
    expect(blockedRead.list()).toEqual({ ok: false, error: "read" });

    const blockedWrite = createSaveRepository({
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    });
    expect(blockedWrite.put("Draft", { html: "content" })).toEqual({
      ok: false,
      error: "write",
    });
  });
});

test("normalizes names case-insensitively", () => {
  expect(normalizePresetName("  COURSE Home ")).toBe("course home");
});

function editor() {
  return {
    addCommand: vi.fn(),
    execCommand: vi.fn(),
    notificationManager: { open: vi.fn() },
    ui: { registry: { addMenuButton: vi.fn() } },
    windowManager: { alert: vi.fn(), confirm: vi.fn(), open: vi.fn() },
  };
}

function command(target: ReturnType<typeof editor>, name: string): () => void {
  return target.addCommand.mock.calls.find(
    ([commandName]) => commandName === name,
  )?.[1] as () => void;
}

function submitDialog(target: ReturnType<typeof editor>, data: Record<string, string>): void {
  const config = target.windowManager.open.mock.calls.at(-1)?.[0] as {
    onSubmit: (api: { close: () => void; getData: () => Record<string, string> }) => void;
  };
  config.onSubmit({ close: vi.fn(), getData: () => data });
}

describe("createSavePlugin", () => {
  test("registers commands and a single preset menu", () => {
    const target = editor();
    createSavePlugin({
      capture: () => ({ html: "" }),
      restore: vi.fn(),
      reset: vi.fn(),
      isValid: (state): state is { html: string } => typeof state === "object" && state !== null,
      storage: storage(),
    })(target as never);

    expect(target.addCommand.mock.calls.map(([name]) => name)).toEqual([
      SAVE_COMMAND,
      SAVE_AS_COMMAND,
      OPEN_COMMAND,
      DELETE_COMMAND,
      NEW_COMMAND,
      EXPORT_COMMAND,
      IMPORT_COMMAND,
    ]);
    expect(target.ui.registry.addMenuButton).toHaveBeenCalledWith(
      SAVE_TOOLBAR_NAME,
      expect.objectContaining({ icon: "save", fetch: expect.any(Function) }),
    );
  });

  test("routes every preset menu action and enables stored-preset actions", () => {
    const target = editor();
    createSavePlugin({
      capture: () => ({ html: "content" }),
      restore: vi.fn(),
      reset: vi.fn(),
      isValid: (state): state is { html: string } => typeof state === "object" && state !== null,
      storage: storage(),
    })(target as never);

    const menu = target.ui.registry.addMenuButton.mock.calls[0]?.[1] as {
      fetch: (success: (items: { enabled?: boolean; onAction: () => void }[]) => void) => void;
    };
    const initial = vi.fn();
    menu.fetch(initial);
    const initialItems = initial.mock.calls[0]![0];
    expect(initialItems).toHaveLength(7);
    expect(initialItems.slice(0, 4).map((item: { enabled?: boolean }) => item.enabled)).toEqual([
      false,
      undefined,
      false,
      false,
    ]);

    for (const item of initialItems) item.onAction();
    expect(target.execCommand.mock.calls.map(([name]) => name)).toEqual([
      SAVE_COMMAND,
      SAVE_AS_COMMAND,
      OPEN_COMMAND,
      DELETE_COMMAND,
      NEW_COMMAND,
      EXPORT_COMMAND,
      IMPORT_COMMAND,
    ]);

    command(target, SAVE_AS_COMMAND)();
    submitDialog(target, { name: "Draft" });
    const populated = vi.fn();
    menu.fetch(populated);
    expect(
      populated.mock.calls[0]![0].slice(0, 4).map((item: { enabled?: boolean }) => item.enabled),
    ).toEqual([true, undefined, true, true]);
  });

  test("saves, opens, and deletes aggregate state without clearing it", async () => {
    const target = editor();
    const targetStorage = storage();
    let current = { html: "first" };
    const restore = vi.fn((state: { html: string }) => {
      current = state;
    });
    const api = createSavePlugin({
      capture: () => current,
      restore,
      reset: vi.fn(),
      isValid: (state): state is { html: string } =>
        typeof state === "object" &&
        state !== null &&
        typeof (state as { html?: unknown }).html === "string",
      storage: targetStorage,
    })(target as never);

    command(target, SAVE_AS_COMMAND)();
    submitDialog(target, { name: "Course home" });
    expect(api.list()).toHaveLength(1);
    expect(api.activePresetId).toBe(api.list()[0]?.id);

    current = { html: "changed" };
    command(target, OPEN_COMMAND)();
    submitDialog(target, { presetId: api.list()[0]!.id });
    const discard = target.windowManager.confirm.mock.calls.at(-1)?.[1] as (value: boolean) => void;
    discard(true);
    await vi.waitFor(() => expect(restore).toHaveBeenCalledWith({ html: "first" }));

    command(target, DELETE_COMMAND)();
    submitDialog(target, { presetId: api.list()[0]!.id });
    const remove = target.windowManager.confirm.mock.calls.at(-1)?.[1] as (value: boolean) => void;
    remove(true);
    expect(api.list()).toEqual([]);
    expect(current).toEqual({ html: "first" });
    expect(api.activePresetId).toBeUndefined();
  });

  test("confirms case-insensitive overwrite and preserves state when storage fails", () => {
    const target = editor();
    const targetStorage = storage();
    let current = { html: "first" };
    createSavePlugin({
      capture: () => current,
      restore: vi.fn(),
      reset: vi.fn(),
      isValid: (state): state is { html: string } => typeof state === "object" && state !== null,
      storage: targetStorage,
    })(target as never);

    command(target, SAVE_AS_COMMAND)();
    submitDialog(target, { name: "Draft" });
    current = { html: "second" };
    command(target, SAVE_AS_COMMAND)();
    submitDialog(target, { name: "draft" });
    expect(target.windowManager.confirm).toHaveBeenCalled();
    const overwrite = target.windowManager.confirm.mock.calls.at(-1)?.[1] as (
      value: boolean,
    ) => void;
    overwrite(false);
    expect(JSON.parse(targetStorage.values.get(SAVE_STORAGE_KEY)!).presets[0].state).toEqual({
      html: "first",
    });
  });

  test("new clears the editor after discard or save", async () => {
    const target = editor();
    const targetStorage = storage();
    let current = { html: "before" };
    const reset = vi.fn(() => {
      current = { html: "" };
    });
    createSavePlugin({
      capture: () => current,
      restore: vi.fn(),
      reset,
      isValid: (state): state is { html: string } =>
        typeof state === "object" &&
        state !== null &&
        typeof (state as { html?: unknown }).html === "string",
      storage: targetStorage,
    })(target as never);

    current = { html: "dirty" };
    command(target, NEW_COMMAND)();
    const config = target.windowManager.open.mock.calls.at(-1)?.[0] as {
      onAction: (api: { close: () => void }, details: { name: string }) => void;
      onSubmit: (api: { close: () => void }) => void;
    };
    config.onAction({ close: vi.fn() }, { name: "discard" });
    expect(reset).toHaveBeenCalled();
    expect(current).toEqual({ html: "" });

    current = { html: "later" };
    command(target, NEW_COMMAND)();
    const saveDialog = target.windowManager.open.mock.calls.at(-1)?.[0] as {
      onSubmit: (api: { close: () => void; getData: () => Record<string, string> }) => void;
    };
    saveDialog.onSubmit({ close: vi.fn(), getData: () => ({}) });
    const secondDialog = target.windowManager.open.mock.calls.at(-1)?.[0] as {
      onSubmit: (api: { close: () => void; getData: () => Record<string, string> }) => void;
    };
    secondDialog.onSubmit({ close: vi.fn(), getData: () => ({ name: "Saved" }) });
    expect(target.windowManager.open).toHaveBeenCalled();
    expect(current).toEqual({ html: "" });
  });

  test("exports a portable JSON envelope and imports a valid file", async () => {
    const target = editor();
    const targetStorage = storage();
    const restore = vi.fn();
    const reset = vi.fn();
    const api = createSavePlugin({
      capture: () => ({ html: "content" }),
      restore,
      reset,
      isValid: (state): state is { html: string } =>
        typeof state === "object" &&
        state !== null &&
        typeof (state as { html?: unknown }).html === "string",
      storage: targetStorage,
    })(target as never);

    command(target, SAVE_AS_COMMAND)();
    submitDialog(target, { name: "Exported" });
    const url = "blob:example";
    const click = vi.fn();
    const createObjectURL = vi.spyOn(URL, "createObjectURL").mockReturnValue(url as never);
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const anchor = {
      click,
      remove: vi.fn(),
      setAttribute: vi.fn(),
      style: {},
    } as unknown as HTMLAnchorElement;
    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      if (tagName === "a") return anchor;
      return document.createElementNS("http://www.w3.org/1999/xhtml", tagName) as HTMLElement;
    });

    command(target, EXPORT_COMMAND)();
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(revoke).toHaveBeenCalledWith(url));

    const payload = {
      $schema: "https://pantoken.app/schemas/tinymce-save.export.schema.json",
      version: 1,
      exportedAt: new Date().toISOString(),
      name: "Exported",
      state: { html: "content" },
    };
    const file = new File([JSON.stringify(payload)], "preset.json", { type: "application/json" });
    const showOpenFilePicker = vi
      .fn()
      .mockResolvedValue([{ getFile: vi.fn().mockResolvedValue(file) }]);
    Object.defineProperty(window, "showOpenFilePicker", {
      value: showOpenFilePicker,
      configurable: true,
    });
    command(target, IMPORT_COMMAND)();
    await vi.waitFor(() => expect(target.windowManager.confirm).toHaveBeenCalled());
    const overwrite = target.windowManager.confirm.mock.calls.at(-1)?.[1] as (
      value: boolean,
    ) => void;
    overwrite(true);
    await vi.waitFor(() => expect(restore).toHaveBeenCalledWith({ html: "content" }));
    expect(api.activePresetId).toBeUndefined();

    createObjectURL.mockRestore();
    revoke.mockRestore();
    vi.restoreAllMocks();
  });
});
