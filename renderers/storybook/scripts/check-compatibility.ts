import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Pass Pantoken's light and dark ThemeVars through Storybook's real theme constructor. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^8\.\d+\.\d+$/u.test(version)) {
    throw new Error(`Invalid Storybook theming 8 release: ${version}`);
  }
  await withTargetVersion(
    "@storybook/theming",
    version,
    async (require) => {
      const storybook = require("@storybook/theming") as {
        create(theme: Record<string, unknown>): Record<string, unknown>;
      };
      const { pantokenStorybookTheme } = await import("../dist/index.mjs");
      for (const mode of ["light", "dark"] as const) {
        const input = pantokenStorybookTheme(mode);
        const theme = storybook.create(input);
        if (
          theme.base !== mode ||
          theme.brandTitle !== "Instructure" ||
          theme.colorPrimary !== input.colorPrimary ||
          theme.appBg !== input.appBg
        ) {
          throw new Error(`Storybook ${version} did not preserve the Pantoken ${mode} theme`);
        }
      }
      console.log(`✓ Storybook theming ${version}: light and dark themes accepted`);
    },
    ["react@19.3.0"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/storybook"))
    await checkCompatibility(release);
}
