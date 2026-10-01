import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Parse the real Bootstrap stylesheet and confirm pantoken overrides its primary button. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^5\.[23]\.\d+$/u.test(version)) throw new Error(`Invalid Bootstrap release: ${version}`);
  await withTargetVersion(
    "bootstrap",
    version,
    async (require, directory) => {
      const postcss = require("postcss") as typeof import("postcss").default;
      const bootstrapCss = readFileSync(
        join(directory, "node_modules/bootstrap/dist/css/bootstrap.css"),
        "utf8",
      );
      const { toBootstrapCss } = await import("../dist/index.mjs");
      const stylesheet = postcss.parse(`${bootstrapCss}\n${toBootstrapCss()}`);
      const declaration = (selector: string, property: string): string | undefined => {
        let value: string | undefined;
        stylesheet.walkRules(selector, (rule) => {
          rule.walkDecls(property, (decl) => {
            value = decl.value;
          });
        });
        return value;
      };
      const bootstrapButton = declaration(".btn-primary", "--bs-btn-bg");
      if (!bootstrapButton || bootstrapButton.startsWith("var(--instui-")) {
        throw new Error(
          `Bootstrap ${version} did not expose the expected primary button variables`,
        );
      }
      if (
        declaration(":root .btn-primary", "--bs-btn-bg") !==
        "var(--instui-color-background-interactive-action-primary-base)"
      ) {
        throw new Error(`Bootstrap ${version} primary button was not mapped to the InstUI token`);
      }
      if (
        declaration(":root .btn-primary", "--bs-btn-hover-bg") !==
        "var(--instui-color-background-interactive-action-primary-hover)"
      ) {
        throw new Error(`Bootstrap ${version} hover button was not mapped to the InstUI token`);
      }
      if (declaration(":root", "--bs-body-bg") !== "var(--instui-color-background-base)") {
        throw new Error(`Bootstrap ${version} body background was not mapped to the InstUI token`);
      }
      console.log(`✓ Bootstrap ${version}: body and primary button CSS variables mapped`);
    },
    ["postcss@8.5.28"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/bootstrap"))
    await checkCompatibility(release);
}
