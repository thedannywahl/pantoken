/**
 * Tests for the Worker error-event and process non-zero-exit edge paths in the sandbox functions.
 * These require module-level mocks of node:worker_threads and node:child_process, so they live in
 * a separate file where vi.mock() hoisting applies cleanly.
 */
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, expect, test, vi } from "vite-plus/test";
import type { SandboxedPluginEntry } from "../src/sandbox.ts";

// ── module-level mocks (hoisted by vitest) ──────────────────────────────────

const mocks = vi.hoisted(() => ({ workerOutcome: "error" as "error" | "exit" }));

vi.mock("node:worker_threads", () => {
  class FakeWorker {
    readonly #handlers = new Map<string, (...args: unknown[]) => void>();

    constructor() {
      if (mocks.workerOutcome === "exit") {
        setImmediate(() => this.#emit("exit", 2));
      } else {
        setImmediate(() => this.#emit("error", new Error("worker-error-event")));
      }
    }

    once(event: string, handler: (...args: unknown[]) => void): this {
      this.#handlers.set(event, handler);
      return this;
    }

    #emit(event: string, ...args: unknown[]): void {
      this.#handlers.get(event)?.(...args);
    }
  }
  return { Worker: FakeWorker };
});

vi.mock("node:child_process", () => {
  // No-op mock; node:child_process is not used in the Worker thread tests in this file.
  // The process exit non-zero path is covered by a real integration test in index.test.ts.
  return { spawn: vi.fn() };
});

afterEach(() => vi.restoreAllMocks());

test("runPluginHook(thread) rejects when the Worker emits an error event", async () => {
  mocks.workerOutcome = "error";
  const { runPluginHook } = await import("../src/sandbox.ts");
  const dir = mkdtempSync(join(tmpdir(), "pantoken-pk-err-ev-"));
  try {
    writeFileSync(join(dir, "plugin.mjs"), `export const tokens = () => [];\n`);
    const entry: SandboxedPluginEntry = { path: join(dir, "plugin.mjs"), sandbox: "thread" };
    await expect(runPluginHook(entry, "tokens", {})).rejects.toThrow("worker-error-event");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("runPluginHook(thread) rejects when the Worker exits with non-zero code", async () => {
  mocks.workerOutcome = "exit";
  const { runPluginHook } = await import("../src/sandbox.ts");
  const dir = mkdtempSync(join(tmpdir(), "pantoken-pk-exit-"));
  try {
    writeFileSync(join(dir, "plugin.mjs"), `export const tokens = () => [];\n`);
    const entry: SandboxedPluginEntry = { path: join(dir, "plugin.mjs"), sandbox: "thread" };
    await expect(runPluginHook(entry, "tokens", {})).rejects.toThrow(/worker exited with code 2/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
