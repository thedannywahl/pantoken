/**
 * `@pantoken/plugin-kit/sandbox` — run a plugin's hooks in an isolated Node.js runtime (D3/D4/D6).
 *
 * Node-only: pulls in `node:child_process`/`node:worker_threads`. Kept out of the main
 * `@pantoken/plugin-kit` barrel so browser-facing consumers of `definePlugin`/`extendPlugin` (e.g.
 * `@pantoken/plugin-simple-icons`) don't get these built-ins bundled into client code.
 *
 * @module
 * @beta
 */
import { spawn as nodeSpawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve as resolvePath } from "node:path";
import process from "node:process";
import { Worker as NodeWorker } from "node:worker_threads";
import type { PantokenPlugin } from "@pantoken/model";
import type { Stage } from "./index.ts";

/**
 * A sandboxed plugin entry: load the plugin from `path` and run its hooks in an isolated
 * runtime rather than in the calling process.
 *
 * - `sandbox: 'thread'` — separate V8 heap; prevents prototype pollution.
 * - `sandbox: 'process'` — full OS-capability isolation via Node.js `--permission` flags.
 */
export interface SandboxedPluginEntry {
  /** Absolute path to the plugin module. Must be importable by a Worker or child process. */
  path: string;
  /** Isolation level. `'thread'` is low-overhead; `'process'` restricts fs/net access. */
  sandbox: "thread" | "process";
  /**
   * Additional fs-read grants for `'process'` mode (default: workspace root).
   * Must include any directories the plugin needs to load (e.g. its own node_modules).
   */
  readPaths?: string[];
}

/** `true` when the input is a sandboxed entry rather than an inline plugin object. */
export function isSandboxed(
  input: PantokenPlugin | SandboxedPluginEntry,
): input is SandboxedPluginEntry {
  return "path" in input && "sandbox" in input;
}

// ESM Worker script executed via a data: URL (thread mode).
const THREAD_WORKER_CODE = `
import { workerData, parentPort } from 'node:worker_threads';
import { pathToFileURL } from 'node:url';
const { pluginPath, stage, ctx } = workerData;
try {
  const mod = await import(pathToFileURL(pluginPath).href);
  const plugin = mod.default ?? mod;
  const result = (typeof plugin[stage] === 'function' ? plugin[stage](ctx) : undefined) ?? null;
  parentPort.postMessage({ ok: true, result });
} catch (err) {
  parentPort.postMessage({ ok: false, error: String(err) });
}
`.trim();

// ESM script written to a temp file and spawned as a child process (process mode).
const PROCESS_WORKER_CODE = `
import process from 'node:process';
process.once('message', async ({ pluginPath, stage, ctx }) => {
  try {
    const mod = await import(pluginPath);
    const plugin = mod.default ?? mod;
    const result = (typeof plugin[stage] === 'function' ? plugin[stage](ctx) : undefined) ?? null;
    process.send({ ok: true, result });
  } catch (err) {
    process.send({ ok: false, error: String(err) });
  }
  process.exit(0);
});
`.trim();

/** Walk up from `fromPath` to find the nearest pnpm-workspace.yaml (workspace root). */
function findWorkspaceRoot(fromPath: string): string {
  let dir = dirname(resolvePath(fromPath));
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    dir = dirname(dir);
  }
  return dir;
}

/** Run a hook in a Worker thread (JS heap isolation; no OS-capability restriction). */
function runInThread<T>(pluginPath: string, stage: Stage, ctx: unknown): Promise<T | null> {
  const url = new URL(
    `data:text/javascript;charset=utf-8,${encodeURIComponent(THREAD_WORKER_CODE)}`,
  );
  return new Promise((resolve, reject) => {
    const worker = new NodeWorker(url, { workerData: { pluginPath, stage, ctx } });
    // Cast to EventEmitter — worker_threads.Worker extends EventEmitter but DOM Worker conflicts.
    const emitter = worker as unknown as EventEmitter;
    emitter.once("message", ({ ok, result, error }: { ok: boolean; result: T; error?: string }) => {
      if (ok) resolve(result);
      else reject(new Error(`Plugin "${pluginPath}" ${stage} hook: ${error}`));
    });
    emitter.once("error", (err: Error) => reject(err));
    emitter.once("exit", (code: number) => {
      if (code !== 0) reject(new Error(`Plugin "${pluginPath}" worker exited with code ${code}`));
    });
  });
}

/** Run a hook in a child process with Node.js --permission flags (OS-capability isolation). */
function runInProcess<T>(
  pluginPath: string,
  stage: Stage,
  ctx: unknown,
  readPaths?: string[],
): Promise<T | null> {
  const roots = readPaths ?? [findWorkspaceRoot(pluginPath)];
  const makeSandboxDir = (): string => {
    if (!roots.includes("*")) {
      const firstRoot = roots.find((p) => p && p !== "*");
      if (firstRoot) {
        const resolved = resolvePath(firstRoot);
        const base = existsSync(resolved) ? resolved : dirname(resolved);
        if (existsSync(base)) return mkdtempSync(join(base, ".pantoken-sandbox-"));
      }
    }
    return mkdtempSync(join(tmpdir(), "pantoken-sandbox-"));
  };
  const dir = makeSandboxDir();
  const scriptPath = join(dir, "worker.mjs");
  mkdirSync(dir, { recursive: true });
  writeFileSync(scriptPath, PROCESS_WORKER_CODE);
  const fsReadArgs = [...roots, dir].flatMap((p) => ["--allow-fs-read", p]);

  return new Promise((resolve, reject) => {
    const cleanup = (): void => {
      try {
        rmSync(dir, { recursive: true, force: true });
      } catch {
        /* ignore */
      }
    };
    const child = nodeSpawn(process.execPath, ["--permission", ...fsReadArgs, scriptPath], {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
      shell: false,
    });
    const em = child as unknown as EventEmitter;
    em.once("message", (msg: { ok: boolean; result: T; error?: string }) => {
      cleanup();
      if (msg.ok) resolve(msg.result);
      else reject(new Error(`Plugin "${pluginPath}" ${stage} hook: ${msg.error}`));
    });
    em.once("error", (err: Error) => {
      cleanup();
      reject(err);
    });
    em.once("exit", (code: number) => {
      cleanup();
      if (code !== 0) reject(new Error(`Plugin "${pluginPath}" process exited with code ${code}`));
    });
    (child as unknown as { send: (msg: unknown) => void }).send({ pluginPath, stage, ctx });
  });
}

/**
 * Run a single hook of a sandboxed plugin entry. The hook receives a serializable context and
 * returns a serializable result; function references in the context are not supported.
 *
 * @param entry - The sandboxed plugin entry.
 * @param stage - The hook to run.
 * @param ctx - A serializable context object (no function references).
 * @returns The hook's return value, or `null` if the hook is absent or returns `undefined`.
 *
 * @example Run the token hook of a sandboxed plugin
 * ```ts
 * import { runPluginHook } from "@pantoken/plugin-kit/sandbox";
 * import type { TokenHookContext } from "@pantoken/model";
 *
 * const entry = { path: "/abs/path/to/my-plugin.js", sandbox: "thread" as const };
 * const ctx: TokenHookContext = { tokens: [], theme: "rebrand" };
 * const result = await runPluginHook(entry, "tokens", ctx);
 * ```
 */
export async function runPluginHook<T>(
  entry: SandboxedPluginEntry,
  stage: Stage,
  ctx: unknown,
): Promise<T | null> {
  const abs = resolvePath(entry.path);
  if (entry.sandbox === "thread") return runInThread<T>(abs, stage, ctx);
  return runInProcess<T>(abs, stage, ctx, entry.readPaths);
}
