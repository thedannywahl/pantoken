/**
 * Tests for the Worker error-event and process non-zero-exit edge paths in the sandbox functions.
 * These require module-level mocks of node:worker_threads and node:child_process, so they live in
 * a separate file where vi.mock() hoisting applies cleanly.
 */
import { EventEmitter } from "node:events";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, expect, test, vi } from "vite-plus/test";
import type { SandboxedPluginEntry } from "../src/index.ts";

// ── module-level mocks (hoisted by vitest) ──────────────────────────────────

vi.mock("node:worker_threads", () => {
  let callCount = 0;
  const fakeWorker = vi
    .fn()
    .mockImplementation(
      function (this: { once: (event: string, cb: (...args: unknown[]) => void) => void }) {
        const em = new EventEmitter();
        this.once = em.once.bind(em);
        callCount++;
        if (callCount % 2 === 0) {
          // Even calls: emit 'exit' with non-zero code (covers the exit handler branch).
          setImmediate(() => em.emit("exit", 2));
        } else {
          // Odd calls: emit 'error' event (covers the error handler).
          setImmediate(() => em.emit("error", new Error("worker-error-event")));
        }
      },
    );
  return { Worker: fakeWorker };
});

vi.mock("node:child_process", () => {
  // No-op mock; node:child_process is not used in the Worker thread tests in this file.
  // The process exit non-zero path is covered by a real integration test in index.test.ts.
  return { spawn: vi.fn() };
});

afterEach(() => vi.restoreAllMocks());

test("runPluginHook(thread) rejects when the Worker emits an error event", async () => {
  const { runPluginHook } = await import("../src/index.ts");
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
  const { runPluginHook } = await import("../src/index.ts");
  const dir = mkdtempSync(join(tmpdir(), "pantoken-pk-exit-"));
  try {
    writeFileSync(join(dir, "plugin.mjs"), `export const tokens = () => [];\n`);
    const entry: SandboxedPluginEntry = { path: join(dir, "plugin.mjs"), sandbox: "thread" };
    await expect(runPluginHook(entry, "tokens", {})).rejects.toThrow(/worker exited with code 2/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
