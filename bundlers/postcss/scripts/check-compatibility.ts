import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["8.0.0", "8.0.9", "8.1.14", "8.2.15", "8.3.11", "8.4.49", "8.5.28"];

/** Run the built plugin with an exact PostCSS release outside the workspace dependency graph. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^8\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid PostCSS 8 release: ${version}`);
  await withTargetVersion("postcss", version, async (require) => {
    const postcss = require("postcss") as typeof import("postcss").default;
    const { pantoken } = await import("../dist/index.mjs");
    const result = await postcss([pantoken()]).process("@pantoken;\n.example { color: red; }", {
      from: undefined,
    });
    if (!result.css.includes("--instui-") || result.css.includes("@pantoken;")) {
      throw new Error(`PostCSS ${version} did not expand the pantoken rule`);
    }
    console.log(`✓ PostCSS ${version}: expanded the pantoken token stylesheet`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
