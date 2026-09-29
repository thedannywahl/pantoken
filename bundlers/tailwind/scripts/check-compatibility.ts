import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["4.0.17", "4.1.18", "4.2.4", "4.3.3"];
const presetUrl = pathToFileURL(fileURLToPath(new URL("../dist/index.mjs", import.meta.url))).href;

/** Compile a real Tailwind v4 stylesheet using the current pantoken preset. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^4\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Tailwind 4 release: ${version}`);
  await withTargetVersion(
    "tailwindcss",
    version,
    async (_, directory) => {
      const project = realpathSync(directory);
      writeFileSync(
        join(project, "tailwind.config.mjs"),
        `import { pantokenPreset } from ${JSON.stringify(presetUrl)}; export default { presets: [pantokenPreset()] };`,
      );
      writeFileSync(
        join(project, "input.css"),
        '@import "tailwindcss"; @config "./tailwind.config.mjs"; @source "./index.html";',
      );
      writeFileSync(
        join(project, "index.html"),
        '<div class="bg-background-base p-space-md font-lato"></div>',
      );
      const result = spawnSync(
        join(project, "node_modules/.bin/tailwindcss"),
        ["-i", "input.css", "-o", "output.css", "--minify"],
        { cwd: project, encoding: "utf8" },
      );
      if (result.error || result.status !== 0) {
        throw new Error(result.error?.message ?? (result.stderr || `Tailwind ${version} failed`));
      }
      const css = readFileSync(join(project, "output.css"), "utf8");
      if (!css.includes("var(--instui-color-background-base)")) {
        throw new Error(`Tailwind ${version} did not generate a pantoken color utility`);
      }
      if (!css.includes("var(--instui-spacing-space-md)")) {
        throw new Error(`Tailwind ${version} did not generate a pantoken spacing utility`);
      }
      if (!css.includes("var(--instui-primitive-font-family-lato)")) {
        throw new Error(`Tailwind ${version} did not generate a pantoken font utility`);
      }
      console.log(`✓ Tailwind ${version}: color, spacing, and font utilities compiled`);
    },
    [`@tailwindcss/cli@${version}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
