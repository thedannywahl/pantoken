import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Compile shadcn CSS aliases and a real utility with the Tailwind CSS CLI. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^4\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Tailwind 4 release: ${version}`);
  await withTargetVersion(
    "@tailwindcss/cli",
    version,
    async (_require, directory) => {
      const cliPackage = JSON.parse(
        readFileSync(join(directory, "node_modules/@tailwindcss/cli/package.json"), "utf8"),
      ) as { bin: Record<string, string> };
      const cli = join(directory, "node_modules/@tailwindcss/cli", cliPackage.bin.tailwindcss);
      const { shadcnCss, shadcnTailwindV4Css } = await import("../dist/index.mjs");
      writeFileSync(
        join(directory, "input.css"),
        `@import "tailwindcss";\n${shadcnCss}\n${shadcnTailwindV4Css}\n`,
      );
      writeFileSync(
        join(directory, "index.html"),
        '<div class="bg-primary text-chart-1">Theme</div>',
      );
      const output = join(directory, "output.css");
      const result = spawnSync(process.execPath, [cli, "-i", "input.css", "-o", output], {
        cwd: directory,
        encoding: "utf8",
      });
      if (result.error || result.status !== 0) {
        throw new Error(
          (result.error?.message ?? result.stderr) || `Tailwind CLI exited ${result.status}`,
        );
      }
      const css = readFileSync(output, "utf8");
      if (!existsSync(output) || !css.includes(".bg-primary") || !css.includes("var(--primary)")) {
        throw new Error(`Tailwind ${version} did not compile the shadcn primary utility`);
      }
      console.log(`✓ Tailwind ${version}: shadcn theme alias compiled into utility CSS`);
    },
    [`tailwindcss@${version}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/shadcn"))
    await checkCompatibility(release);
}
