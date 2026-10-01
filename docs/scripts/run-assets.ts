/**
 * Run the docs asset generators, respecting their real dependencies instead of the serial `&&` chain
 * they used to live in. Sixteen of the eighteen are independent; the chain's ordering was incidental.
 *
 * Deliberately a plain script rather than a vp task DAG: package-scoped tasks need a
 * `docs/vite.config.ts`, and Vite resolves a config file from the project root, so dropping one
 * beside `.vitepress/` risks altering the VitePress build itself.
 *
 * Env:
 *   DOCS_ASSETS_CONCURRENCY  Max concurrent generators. Defaults to the machine's parallelism.
 *
 * @module
 */
import { spawn } from "node:child_process";
import { availableParallelism } from "node:os";
import { runAsMain } from "../../scripts/release/cli.ts";

/** One generator plus the generators whose output it reads. */
export interface AssetTask {
  name: string;
  script: string;
  dependsOn?: readonly string[];
}

/**
 * Only three edges are real: `demos` reads the stylesheet `site-themes` emits, and `icon-manifest`
 * reads the JSON both CDN manifest scripts emit. Everything else was sequential by habit — notably
 * `lucide-lab`, whose generated CSS no generator here consumes (`cdn-icon-manifest` reads the
 * lucide-lab source registry, not its build output).
 */
export const ASSET_TASKS: readonly AssetTask[] = [
  { name: "lucide-lab", script: "../plugins/pantoken/lucide-lab/scripts/generate.ts" },
  { name: "locale-logos", script: "scripts/stage-locale-logos.ts" },
  { name: "og", script: "scripts/gen-og.ts" },
  { name: "site-themes", script: "scripts/site-themes.ts" },
  { name: "cdn-manifest", script: "scripts/cdn-manifest.ts" },
  { name: "cdn-icon-manifest", script: "scripts/cdn-icon-manifest.ts" },
  { name: "cdn-plugin-manifest", script: "scripts/cdn-plugin-manifest.ts" },
  { name: "create-app-skill", script: "scripts/stage-create-pantoken-app-skill.ts" },
  { name: "vscode-custom-data", script: "scripts/stage-vscode-custom-data.ts" },
  { name: "published-schemas", script: "scripts/stage-published-schemas.ts" },
  { name: "api-catalog", script: "scripts/stage-api-catalog.ts" },
  { name: "i18n-schemas", script: "scripts/stage-i18n-schemas.ts" },
  { name: "tinymce-schema", script: "scripts/stage-tinymce-save-schema.ts" },
  { name: "target-compatibility", script: "scripts/stage-target-compatibility.ts" },
  { name: "registry", script: "scripts/generate-registry.ts" },
  { name: "canvas-rce", script: "scripts/build-canvas-rce.ts" },
  { name: "demos", script: "scripts/demos.ts", dependsOn: ["site-themes"] },
  {
    name: "icon-manifest",
    script: "scripts/icon-manifest.ts",
    dependsOn: ["cdn-icon-manifest", "cdn-plugin-manifest"],
  },
];

/** Throws if a task names a dependency that doesn't exist or that forms a cycle. */
export function assertRunnable(tasks: readonly AssetTask[]): void {
  const names = new Set(tasks.map((task) => task.name));
  for (const task of tasks) {
    for (const dependency of task.dependsOn ?? []) {
      if (!names.has(dependency)) {
        throw new Error(`${task.name} depends on unknown task "${dependency}"`);
      }
    }
  }
  const done = new Set<string>();
  let progressed = true;
  while (progressed) {
    progressed = false;
    for (const task of tasks) {
      if (done.has(task.name)) continue;
      if ((task.dependsOn ?? []).every((dependency) => done.has(dependency))) {
        done.add(task.name);
        progressed = true;
      }
    }
  }
  if (done.size !== tasks.length) {
    const stuck = tasks.filter((task) => !done.has(task.name)).map((task) => task.name);
    throw new Error(`dependency cycle among: ${stuck.join(", ")}`);
  }
}

/** The batches a scheduler would release, in order. Pure — used for tests and for the run plan. */
export function batches(tasks: readonly AssetTask[]): string[][] {
  const done = new Set<string>();
  const order: string[][] = [];
  while (done.size < tasks.length) {
    const ready = tasks
      .filter(
        (task) =>
          !done.has(task.name) &&
          (task.dependsOn ?? []).every((dependency) => done.has(dependency)),
      )
      .map((task) => task.name);
    if (ready.length === 0) break;
    for (const name of ready) done.add(name);
    order.push(ready);
  }
  return order;
}

const run = (task: AssetTask): Promise<void> =>
  new Promise((resolve, reject) => {
    const started = Date.now();
    const child = spawn(process.execPath, [task.script], { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`✗ ${task.name} (${task.script}) exited ${code}`));
        return;
      }
      console.log(`✓ ${task.name} in ${((Date.now() - started) / 1000).toFixed(1)}s`);
      resolve();
    });
  });

async function main(): Promise<void> {
  assertRunnable(ASSET_TASKS);

  const limit = Math.max(1, Number(process.env.DOCS_ASSETS_CONCURRENCY) || availableParallelism());
  const started = Date.now();
  console.log(`📦 Generating docs assets: ${ASSET_TASKS.length} tasks, concurrency ${limit}`);

  const done = new Set<string>();
  const running = new Map<string, Promise<void>>();
  const pending = [...ASSET_TASKS];

  while (done.size < ASSET_TASKS.length) {
    while (running.size < limit) {
      const index = pending.findIndex((task) =>
        (task.dependsOn ?? []).every((dependency) => done.has(dependency)),
      );
      if (index === -1) break;
      const [task] = pending.splice(index, 1);
      if (!task) break;
      running.set(
        task.name,
        run(task).then(() => {
          done.add(task.name);
          running.delete(task.name);
        }),
      );
    }
    // Every remaining task is blocked on something in flight, so wait for the next completion.
    await Promise.race(running.values());
  }

  console.log(`✨ Docs assets ready in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

runAsMain(import.meta.url, main);
