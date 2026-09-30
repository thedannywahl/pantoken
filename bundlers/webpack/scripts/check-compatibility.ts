import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Compile a real app with a specific Webpack release and inspect its emitted stylesheet. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^5\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Webpack 5 release: ${version}`);
  await withTargetVersion("webpack", version, async (require, directory) => {
    const entry = join(directory, "entry.js");
    const output = join(directory, "dist");
    writeFileSync(entry, 'console.log("pantoken compatibility");');
    const webpack = require("webpack") as (
      options: Record<string, unknown>,
      callback: (
        error?: Error | null,
        stats?: { hasErrors(): boolean; toString(): string },
      ) => void,
    ) => void;
    const { PantokenWebpackPlugin } = await import("../dist/index.mjs");
    await new Promise<void>((resolve, reject) => {
      webpack(
        {
          mode: "production",
          entry,
          output: { path: output, filename: "app.js", hashFunction: "sha256" },
          plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
        },
        (error, stats) => {
          if (error || !stats || stats.hasErrors()) {
            reject(error ?? new Error(stats?.toString() ?? "Webpack build returned no stats"));
          } else resolve();
        },
      );
    });
    const css = readFileSync(join(output, "tokens.css"), "utf8");
    if (!css.includes("--instui-")) {
      throw new Error(`Webpack ${version} did not emit the pantoken token stylesheet`);
    }
    console.log(`✓ Webpack ${version}: token stylesheet emitted`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/webpack"))
    await checkCompatibility(release);
}
