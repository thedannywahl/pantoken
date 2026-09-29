import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import type { Root } from "postcss";

const releases = ["6.1.2", "6.2.4", "6.3.1", "6.4.3", "6.5.3", "6.6.3", "6.7.5", "6.8.1", "6.9.0"];

/** Compile the current Sass settings override with an actual Foundation release. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^6\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Foundation 6 release: ${version}`);
  await withTargetVersion(
    "foundation-sites",
    version,
    async (require, directory) => {
      const sass = require("sass") as {
        compileString(
          source: string,
          options: { loadPaths: string[]; logger: { warn(): void } },
        ): { css: string };
      };
      const postcss = require("postcss") as typeof import("postcss").default;
      const { foundationSettings, foundationCss } = await import("../dist/index.mjs");
      const result = sass.compileString(
        `${foundationSettings}\n@import "foundation";\n@include foundation-everything;\n.pantoken-check { color: $primary-color; }`,
        {
          loadPaths: [join(directory, "node_modules/foundation-sites/scss")],
          logger: { warn() {} },
        },
      );
      const valueFor = (root: Root, selector: string, property: string): string | undefined => {
        let value: string | undefined;
        root.walkRules((rule) => {
          if (!rule.selector.split(",").some((part) => part.trim() === selector)) return;
          rule.walkDecls(property, (declaration) => {
            value = declaration.value;
          });
        });
        return value;
      };
      const compiled = postcss.parse(result.css);
      const primary = valueFor(compiled, ".pantoken-check", "color");
      const button = valueFor(compiled, ".button.primary", "background-color");
      if (!primary || button?.toLowerCase() !== primary.toLowerCase()) {
        throw new Error(`Foundation ${version} primary button did not use the pantoken Sass color`);
      }
      if (
        valueFor(postcss.parse(foundationCss), ".button", "background-color") !==
        "var(--instui-color-background-brand)"
      ) {
        throw new Error(
          `Foundation ${version} runtime overlay did not retain the pantoken color reference`,
        );
      }
      console.log(`✓ Foundation ${version}: concrete Sass button and runtime overlay compiled`);
    },
    ["sass@1.105.0", "postcss@8.5.28"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
