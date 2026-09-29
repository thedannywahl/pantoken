import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** Exercise an exact npm release outside the workspace dependency graph. */
export async function withTargetVersion(
  packageName: string,
  version: string,
  check: (require: ReturnType<typeof createRequire>, directory: string) => Promise<void>,
): Promise<void> {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-target-"));
  try {
    writeFileSync(
      join(directory, "package.json"),
      JSON.stringify({ name: "pantoken-target-check", version: "0.0.0", private: true }),
    );
    const install = spawnSync("vp", ["add", "--ignore-scripts", `${packageName}@${version}`], {
      cwd: directory,
      encoding: "utf8",
    });
    if (install.error || install.status !== 0) {
      throw new Error(
        install.error?.message ?? (install.stderr || `vp add exited ${install.status}`),
      );
    }
    const installed = JSON.parse(
      readFileSync(join(directory, "node_modules", packageName, "package.json"), "utf8"),
    ) as { version: string };
    if (installed.version !== version)
      throw new Error(`Expected ${packageName} ${version}, got ${installed.version}`);
    await check(createRequire(join(directory, "package.json")), directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
