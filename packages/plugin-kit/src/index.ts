/**
 * `@pantoken/plugin-kit` — build and compose pantoken plugins, with capability-aware registration.
 *
 * {@link definePlugin} is the modern factory: pass the hooks you implement and it returns a normal
 * `PantokenPlugin` branded with the capabilities inferred from those hooks. Consumers
 * (`buildTokens`, `toCss`) run {@link checkPlugins} to warn — never error — when a plugin is
 * registered where it has no effect: a non-factoried plugin (capability checks unavailable) or a
 * factoried plugin at a stage it doesn't implement (e.g. a token-only plugin passed to `toCss`).
 *
 * The transform stages a `plugins:` array actually drives are `tokens`, `icons`, and `css`; `rehype`
 * (a render-time icon resolver) and `native` (Style Dictionary) are recorded as capabilities but are
 * downstream consumers, not guarded here.
 *
 * @example
 * ```ts
 * const brand = definePlugin({ name: "brand", tokens: (c) => [...c.tokens], css: () => ({ ... }) });
 * // capabilitiesOf(brand) → ["tokens", "css"]
 * ```
 *
 * @module
 * @beta
 */
import type { CssContribution, IconResolver, PantokenPlugin } from "@pantoken/model";

/** The plugin hook stages, recorded as capabilities. */
export type Stage = "tokens" | "icons" | "css" | "rehype" | "native";

const STAGES: readonly Stage[] = ["tokens", "icons", "css", "rehype", "native"];
const BRAND = Symbol.for("pantoken.plugin");

interface Branded {
  [BRAND]?: { capabilities: Stage[] };
}

const hasHook = (plugin: PantokenPlugin, stage: Stage): boolean =>
  typeof plugin[stage] === "function";

/**
 * Create a pantoken plugin from its hooks. The result is a normal `PantokenPlugin` branded with the
 * capabilities inferred from the hooks you provided.
 *
 * @param config - The plugin `name` plus any of the `tokens`/`icons`/`css`/`rehype`/`native` hooks.
 * @returns A branded {@link PantokenPlugin}.
 *
 * @example A unified tokens + css plugin
 * ```ts
 * import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";
 *
 * const brand = definePlugin({
 *   name: "@acme/brand",
 *   tokens: (ctx) => [
 *     ...ctx.tokens,
 *     ctx.define({ name: "--instui-brand", value: "var(--instui-color-background-brand)" }),
 *   ],
 *   css: () => ({ append: ":root { color-scheme: light dark; }" }),
 * });
 *
 * capabilitiesOf(brand); // → ["tokens", "css"]
 * ```
 */
export function definePlugin(config: PantokenPlugin): PantokenPlugin {
  validatePlugin(config);
  const capabilities = STAGES.filter((stage) => hasHook(config, stage));
  return Object.assign({}, config, { [BRAND]: { capabilities } });
}

/**
 * True when a plugin was created by {@link definePlugin} (or {@link extendPlugin}).
 *
 * @example
 * ```ts
 * import { definePlugin, isFactoried } from "@pantoken/plugin-kit";
 *
 * isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
 * isFactoried({ name: "hand-written", css: () => ({}) });        // → false
 * ```
 */
export function isFactoried(plugin: PantokenPlugin): boolean {
  return Boolean((plugin as Branded)[BRAND]);
}

/**
 * Assert that a plugin has a valid structure: non-empty name, all hooks are functions,
 * and no hook key falls outside the recognised stage set.
 *
 * Called automatically by {@link definePlugin}. Export it so hand-authored plugins can
 * be validated before passing them to a stage runner.
 *
 * @throws When the plugin fails structural validation.
 *
 * @example Validate a hand-authored plugin
 * ```ts
 * import { validatePlugin } from "@pantoken/plugin-kit";
 *
 * validatePlugin({ name: "brand", css: () => ({}) }); // ok
 * validatePlugin({ name: "", css: () => ({}) });      // throws
 * ```
 */
export function validatePlugin(plugin: PantokenPlugin): void {
  if (!plugin.name || typeof plugin.name !== "string")
    throw new Error(`Plugin has no name or name is not a string.`);
  for (const stage of STAGES) {
    const hook = plugin[stage];
    if (hook !== undefined && typeof hook !== "function")
      throw new Error(
        `Plugin "${plugin.name}" has an invalid "${stage}" hook: expected a function, got ${typeof hook}.`,
      );
  }
  // Guard against typo-smuggled extra keys that could confuse the stage runner.
  const ALLOWED = new Set<string | symbol>(["name", ...STAGES]);
  for (const key of Object.keys(plugin)) {
    if (!ALLOWED.has(key))
      throw new Error(
        `Plugin "${plugin.name}" has an unrecognised key "${key}". Valid keys: name, ${STAGES.join(", ")}.`,
      );
  }
}

/**
 * The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.
 *
 * @example
 * ```ts
 * import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";
 *
 * capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
 * capabilitiesOf({ name: "hand-written" });                                 // → undefined
 * ```
 */
export function capabilitiesOf(plugin: PantokenPlugin): Stage[] | undefined {
  return (plugin as Branded)[BRAND]?.capabilities;
}

const warned = new Set<string>();

function warnOnce(key: string, message: string): void {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

/**
 * Filter a plugin list to those that participate in `stage`, warning about the rest.
 *
 * @param plugins - The registered plugins.
 * @param stage - The stage being run.
 * @returns The plugins that have a hook for `stage`.
 *
 * @example Keep only the plugins that participate in a stage
 * ```ts
 * import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";
 *
 * const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
 * const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });
 *
 * // Warns that "tok" has no css hook, then returns just the css plugin.
 * checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
 * ```
 */
export function checkPlugins(plugins: readonly PantokenPlugin[], stage: Stage): PantokenPlugin[] {
  const active: PantokenPlugin[] = [];
  for (const plugin of plugins) {
    const capabilities = capabilitiesOf(plugin);
    if (!capabilities) {
      warnOnce(
        `${plugin.name}:${stage}:unfactoried`,
        `[pantoken] plugin "${plugin.name}": not created with @pantoken/plugin-kit; capability checks are skipped.`,
      );
      if (hasHook(plugin, stage)) active.push(plugin);
      continue;
    }
    if (!capabilities.includes(stage)) {
      warnOnce(
        `${plugin.name}:${stage}:no-hook`,
        `[pantoken] plugin "${plugin.name}": has no "${stage}" hook and will have no effect here; remove it from this stage.`,
      );
      continue;
    }
    active.push(plugin);
  }
  return active;
}

function joinCss(a: string | undefined, b: string | undefined): string | undefined {
  const joined = [a, b].filter(Boolean).join("\n\n");
  return joined || undefined;
}

function mergeContributions(a: CssContribution, b: CssContribution): CssContribution {
  const out: CssContribution = {};
  const prepend = joinCss(a.prepend, b.prepend);
  const append = joinCss(a.append, b.append);
  if (prepend) out.prepend = prepend;
  if (append) out.append = append;
  if (a.properties || b.properties)
    out.properties = [...(a.properties ?? []), ...(b.properties ?? [])];
  if (a.declarations || b.declarations)
    out.declarations = [...(a.declarations ?? []), ...(b.declarations ?? [])];
  const marker = b.marker ?? a.marker;
  if (marker) out.marker = marker;
  return out;
}

/**
 * Build a plugin on top of another. Same-stage hooks are composed: `tokens` runs `base` then
 * `overrides` (which sees base's output); `css` merges both `CssContribution`s; `icons`/`native` run
 * both; `rehype` chains resolvers (overrides first). Capabilities are the union.
 *
 * @param base - The plugin to extend.
 * @param overrides - Hooks (and an optional `name`) layered on top.
 * @returns A new branded plugin.
 *
 * @example Add an extra CSS contribution on top of a base plugin
 * ```ts
 * import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";
 *
 * const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
 * const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
 * // themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
 * ```
 */
export function extendPlugin(
  base: PantokenPlugin,
  overrides: Partial<PantokenPlugin>,
): PantokenPlugin {
  const composed: PantokenPlugin = { name: overrides.name ?? base.name };

  if (base.tokens || overrides.tokens) {
    composed.tokens = (ctx) => {
      const afterBase = base.tokens ? (base.tokens(ctx) ?? ctx.tokens) : ctx.tokens;
      return overrides.tokens
        ? (overrides.tokens({ ...ctx, tokens: afterBase }) ?? afterBase)
        : afterBase;
    };
  }
  if (base.css || overrides.css) {
    composed.css = (ctx) => mergeContributions(base.css?.(ctx) || {}, overrides.css?.(ctx) || {});
  }
  if (base.icons || overrides.icons) {
    composed.icons = (ctx) => {
      const a = base.icons?.(ctx) ?? [];
      const b = overrides.icons?.(ctx) ?? [];
      const merged = [...a, ...b];
      return merged.length > 0 ? merged : undefined;
    };
  }
  if (base.rehype || overrides.rehype) {
    composed.rehype = (ctx) => {
      const fromBase = base.rehype?.(ctx)?.resolve;
      const fromOverrides = overrides.rehype?.(ctx)?.resolve;
      const resolve: IconResolver = (code) =>
        fromOverrides?.(code) ?? fromBase?.(code) ?? ctx.resolve(code);
      return { resolve };
    };
  }
  if (base.native || overrides.native) {
    composed.native = (ctx) => {
      base.native?.(ctx);
      overrides.native?.(ctx);
    };
  }
  return definePlugin(composed);
}

/**
 * Combine several plugins into one, folding them left-to-right with {@link extendPlugin}.
 *
 * @param plugins - The plugins to merge (at least one).
 * @returns A single branded plugin.
 *
 * @example Combine peer plugins into one
 * ```ts
 * import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";
 *
 * const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
 * const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });
 *
 * const combined = mergePlugin(brand, glyphs);
 * capabilitiesOf(combined); // → ["tokens", "icons"]
 * ```
 */
export function mergePlugin(...plugins: PantokenPlugin[]): PantokenPlugin {
  const [first, ...rest] = plugins;
  if (!first) throw new Error("mergePlugin requires at least one plugin");
  return rest.reduce((acc, plugin) => extendPlugin(acc, plugin), first);
}

// The token reference resolver lives in @pantoken/utils; re-exported here for plugin authors.
export { makeResolver, resolveTokens } from "@pantoken/utils";
export type { Mode, ResolveOptions } from "@pantoken/utils";

// ── Plugin sandboxing (D3/D4/D6) ──────────────────────────────────────────────────────────────

import { spawn as nodeSpawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve as resolvePath } from "node:path";
import process from "node:process";
import { Worker as NodeWorker } from "node:worker_threads";

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
 * import { runPluginHook } from "@pantoken/plugin-kit";
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
