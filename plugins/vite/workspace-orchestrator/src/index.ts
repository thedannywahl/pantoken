/**
 * `@pantoken/vite-workspace-orchestrator` — a Vite dev-server plugin that watches upstream workspace
 * packages and rebuilds them (and their dependents) when source changes.
 *
 * During development, changes to a local workspace package normally need a manual rebuild before the
 * dev server reflects them. This plugin automates that: it watches each upstream package's source
 * with native `fs.watch` (not Vite's chokidar, which filters paths outside the project root),
 * debounces rapid changes, rebuilds in topological order, and registers built output with Vite's
 * watcher so the browser reloads. In pantoken's docs it keeps the generated CSS (`@pantoken/css`,
 * `@pantoken/components`) fresh as you edit the libraries, instead of only at build time.
 *
 * It applies during `serve` only, so production builds are untouched.
 *
 * @example
 * ```ts
 * import { resolve } from "node:path";
 * import { workspaceOrchestrator } from "@pantoken/vite-workspace-orchestrator";
 *
 * workspaceOrchestrator({
 *   upstream: [
 *     {
 *       name: "@pantoken/components",
 *       dir: resolve(root, "formats/components"),
 *       watchPaths: [resolve(root, "formats/components/src")],
 *       build: ["pnpm", "run", "build"],
 *       dependents: [],
 *     },
 *   ],
 *   outputWatchPaths: [resolve(root, "formats/components/generated")],
 * });
 * ```
 *
 * @module
 * @experimental
 */
import { watch as watchFs } from "node:fs";
import type { FSWatcher } from "node:fs";
import { matchesGlob, resolve } from "node:path";
import type { ViteDevServer } from "vite";
import { mountFileServers } from "./file-server.ts";
import { createScheduler } from "./scheduler.ts";
import type { OrchestratorOptions, UpstreamNode } from "./types.ts";

export type { FileServerEntry, OrchestratorOptions, UpstreamNode } from "./types.ts";

const DEFAULT_DEBOUNCE_MS = 200;

/**
 * Returns `true` if the changed filename passes the node's include/ignore filters.
 *
 * @example
 * ```ts
 * import { matchesFilters } from "@pantoken/vite-workspace-orchestrator";
 *
 * const node = {
 *   name: "@pantoken/components",
 *   dir: "/repo/formats/components",
 *   watchPaths: ["/repo/formats/components/src"],
 *   build: ["pnpm", "run", "build"] as const,
 *   dependents: [],
 *   include: ["**\/*.ts"],
 *   ignore: ["**\/*.test.ts"],
 * };
 *
 * matchesFilters("src/index.ts", node); // true
 * matchesFilters("src/index.test.ts", node); // false (ignored)
 * ```
 */
export function matchesFilters(filename: string, node: UpstreamNode): boolean {
  if (node.ignore?.some((pattern) => matchesGlob(filename, pattern))) return false;
  if (node.include && !node.include.some((pattern) => matchesGlob(filename, pattern))) return false;
  return true;
}

/**
 * Create the Vite dev-server plugin.
 *
 * @param options - {@link OrchestratorOptions}.
 * @returns A Vite plugin object (`apply: "serve"`).
 */
export const workspaceOrchestrator = (options: OrchestratorOptions) => {
  const {
    upstream,
    outputWatchPaths = [],
    debounceMs = DEFAULT_DEBOUNCE_MS,
    fileServers = [],
  } = options;

  return {
    apply: "serve" as const,
    name: "workspace-orchestrator",
    configureServer(server: ViteDevServer): void {
      const { logger } = server.config;

      const nodeMap = new Map(upstream.map((n) => [n.name, n]));
      const scheduleRebuild = createScheduler(nodeMap, logger, debounceMs);

      // Native fs.watch on every upstream source path. Paths that don't exist yet (pre-first-build)
      // are silently skipped.
      const fsWatchers: FSWatcher[] = [];
      for (const node of upstream) {
        for (const watchPath of node.watchPaths) {
          try {
            const watcher = watchFs(
              watchPath,
              { recursive: true },
              (_event: string, filename: string | null) => {
                if (filename !== null && !matchesFilters(filename, node)) return;
                scheduleRebuild(node.name);
              },
            );
            fsWatchers.push(watcher);
          } catch {
            // watchPath doesn't exist yet; skip silently.
          }
        }
      }

      // Bridge native fs.watch notifications for each built-output path into the module graph.
      // chokidar's add() doesn't reliably observe pnpm-symlinked or out-of-root directories.
      // Emitting "change" on server.watcher lets Vite decide: CSS HMR for files in the module
      // graph, full page reload otherwise.
      for (const outputPath of outputWatchPaths) {
        try {
          const watcher = watchFs(
            outputPath,
            { recursive: true },
            (_event: string, filename: string | null) => {
              if (filename === null) return;
              server.watcher.emit("change", resolve(outputPath, filename));
            },
          );
          fsWatchers.push(watcher);
        } catch {
          // outputPath doesn't exist yet; skip silently.
        }
      }

      mountFileServers(fileServers, server.middlewares);

      server.httpServer?.on("close", () => {
        for (const w of fsWatchers) w.close();
      });
    },
  };
};
