import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["1.12.1", "2.0.0"];

/** Build real Panda CSS from a preset-backed utility and inspect the extracted token value. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^(1|2)\.\d+\.\d+$/u.test(version)) {
    throw new Error(`Invalid Panda CSS release: ${version}`);
  }
  await withTargetVersion("@pandacss/dev", version, async (_require, directory) => {
    const cli = join(directory, "node_modules/@pandacss/dev/bin.js");
    const adapter = fileURLToPath(new URL("../dist/index.mjs", import.meta.url));
    mkdirSync(join(directory, "src"), { recursive: true });
    writeFileSync(
      join(directory, "panda.config.mjs"),
      `import { pantokenPreset } from ${JSON.stringify(adapter)};
export default { presets: [pantokenPreset], include: ["./src/**/*.ts"], outdir: "styled-system" };
`,
    );
    writeFileSync(
      join(directory, "src/index.ts"),
      'import { css } from "styled-system/css";\nexport const className = css({ color: "token(colors.color-background-brand)" });\n',
    );
    const result = spawnSync(process.execPath, [cli, "build"], {
      cwd: directory,
      encoding: "utf8",
    });
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? result.stderr) || `Panda build exited ${result.status}`,
      );
    }
    const cssFile = join(directory, "styled-system/styles.css");
    if (!existsSync(cssFile)) {
      throw new Error(
        `Panda ${version} did not emit styles.css: ${readdirSync(join(directory, "styled-system")).join(", ")}`,
      );
    }
    const css = readFileSync(cssFile, "utf8");
    if (!css.includes("--colors-color-background-brand")) {
      throw new Error(`Panda ${version} did not emit a Pantoken brand color utility`);
    }
    console.log(`✓ Panda CSS ${version}: preset token utility extracted`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
