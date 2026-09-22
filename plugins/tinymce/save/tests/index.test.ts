/**
 * @vitest-environment happy-dom
 */
import { describe, expect, test, vi } from "vite-plus/test";
import {
  DELETE_COMMAND,
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
      isValid: (state): state is { html: string } => typeof state === "object" && state !== null,
      storage: storage(),
    })(target as never);

    expect(target.addCommand.mock.calls.map(([name]) => name)).toEqual([
      SAVE_COMMAND,
      SAVE_AS_COMMAND,
      OPEN_COMMAND,
      DELETE_COMMAND,
    ]);
    expect(target.ui.registry.addMenuButton).toHaveBeenCalledWith(
      SAVE_TOOLBAR_NAME,
      expect.objectContaining({ icon: "save", fetch: expect.any(Function) }),
    );
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
});
