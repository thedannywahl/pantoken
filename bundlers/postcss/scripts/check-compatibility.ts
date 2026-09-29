import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const releases = ["8.0.0", "8.0.9", "8.1.14", "8.2.15", "8.3.11", "8.4.49", "8.5.28"];

/** Run the built plugin with an exact PostCSS release outside the workspace dependency graph. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^8\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid PostCSS 8 release: ${version}`);
  const directory = mkdtempSync(join(tmpdir(), "pantoken-postcss-"));
  try {
    writeFileSync(
      join(directory, "package.json"),
      JSON.stringify({ name: "pantoken-postcss-check", version: "0.0.0", private: true }),
    );
    const install = spawnSync("vp", ["add", "--ignore-scripts", `postcss@${version}`], {
      cwd: directory,
      encoding: "utf8",
    });
    if (install.error || install.status !== 0) {
      throw new Error(
        install.error?.message ?? (install.stderr || `vp add exited ${install.status}`),
      );
    }
    const require = createRequire(join(directory, "package.json"));
    const postcss = require("postcss") as typeof import("postcss").default;
    const installed = JSON.parse(
      readFileSync(join(directory, "node_modules/postcss/package.json"), "utf8"),
    ) as {
      version: string;
    };
    if (installed.version !== version)
      throw new Error(`Expected PostCSS ${version}, got ${installed.version}`);
    const { pantoken } = await import("../dist/index.mjs");
    const result = await postcss([pantoken()]).process("@pantoken;\n.example { color: red; }", {
      from: undefined,
    });
    if (!result.css.includes("--instui-") || result.css.includes("@pantoken;")) {
      throw new Error(`PostCSS ${version} did not expand the pantoken rule`);
    }
    console.log(`✓ PostCSS ${version}: expanded the pantoken token stylesheet`);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
