/**
 * A debounced, dependency-aware build scheduler for {@link workspaceOrchestrator}.
 *
 * @module
 */
import { spawn } from "node:child_process";
import type { UpstreamNode } from "./types.ts";

interface BuildState {
  building: boolean;
  pending: boolean;
  debounce: ReturnType<typeof setTimeout> | null;
}

interface Logger {
  info(msg: string, opts?: { timestamp?: boolean }): void;
  error(msg: string, opts?: { timestamp?: boolean }): void;
}

const SUCCESS_EXIT_CODE = 0;

/**
 * Create a debounced build scheduler for the given upstream node map. The returned function
 * debounces file-change events before spawning a build, re-queues a pending build if one is already
 * running, and rebuilds dependents in topological order on success.
 *
 * @param nodeMap - Upstream nodes keyed by name.
 * @param logger - The Vite logger (or any `info`/`error` sink).
 * @param debounceMs - Debounce delay before a build starts.
 * @returns A `scheduleRebuild(name)` function.
 */
export function createScheduler(
  nodeMap: Map<string, UpstreamNode>,
  logger: Logger,
  debounceMs: number,
): (name: string) => void {
  const stateMap = new Map<string, BuildState>(
    [...nodeMap.keys()].map((name) => [name, { building: false, pending: false, debounce: null }]),
  );

  // The two methods are mutually recursive; co-defining them on an object avoids forward-reference
  // issues while keeping the closure intact.
  const scheduler = {
    scheduleRebuild(name: string): void {
      const s = stateMap.get(name);
      if (!s) return;
      if (s.debounce) clearTimeout(s.debounce);
      s.debounce = setTimeout(() => {
        s.debounce = null;
        scheduler.runBuild(name);
      }, debounceMs);
    },

    runBuild(name: string): void {
      const node = nodeMap.get(name);
      const s = stateMap.get(name);
      if (!node || !s) return;

      if (s.building) {
        s.pending = true;
        return;
      }

      s.building = true;
      logger.info(`\n[orchestrator] ${name} — building…`, { timestamp: true });

      const [cmd, ...args] = node.build;
      const child = spawn(cmd, args, { cwd: node.dir, stdio: "inherit" });

      child.on("close", (code) => {
        s.building = false;

        if (code === SUCCESS_EXIT_CODE) {
          logger.info(`[orchestrator] ${name} — done.`, { timestamp: true });
          for (const dep of node.dependents) {
            scheduler.scheduleRebuild(dep);
          }
        } else {
          logger.error(`[orchestrator] ${name} — build failed (exit ${String(code)}).`, {
            timestamp: true,
          });
        }

        if (s.pending) {
          s.pending = false;
          scheduler.runBuild(name);
        }
      });
    },
  };

  return (name) => scheduler.scheduleRebuild(name);
}
