import { readFileSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Check the emitted bridge against the Infima CSS shipped with a real Docusaurus theme. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^3\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Docusaurus 3 release: ${version}`);
  await withTargetVersion(
    "@docusaurus/theme-classic",
    version,
    async (require, directory) => {
      const themeRequire = createRequire(
        realpathSync(join(directory, "node_modules/@docusaurus/theme-classic/package.json")),
      );
      const infimaRoot = dirname(themeRequire.resolve("infima/package.json"));
      const css = readFileSync(join(infimaRoot, "dist/css/default/default.css"), "utf8");
      const postcss = require("postcss") as typeof import("postcss").default;
      const theme = postcss.parse(css);
      const { docusaurusCss } = await import("../dist/index.mjs");
      const bridge = postcss.parse(docusaurusCss);
      for (const variable of ["--ifm-color-primary", "--ifm-background-color"]) {
        let defined = false;
        let mapped = false;
        theme.walkDecls(variable, () => {
          defined = true;
        });
        bridge.walkDecls(variable, (declaration) => {
          mapped = declaration.value.startsWith("var(--instui-");
        });
        if (!defined || !mapped)
          throw new Error(`Docusaurus ${version} does not bridge ${variable}`);
      }
      console.log(`✓ Docusaurus ${version}: Infima primary and background variables bridged`);
    },
    ["postcss@8.5.28"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/docusaurus"))
    await checkCompatibility(release);
}
