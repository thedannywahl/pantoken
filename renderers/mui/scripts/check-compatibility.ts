import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["5.0.0", "5.18.0", "6.0.0", "6.5.0", "7.0.0", "7.3.11", "9.0.0", "9.4.0"];

/** Exercise MUI's real createTheme entry point with concrete light and dark options. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^\d+\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid MUI release: ${version}`);
  await withTargetVersion(
    "@mui/material",
    version,
    async (require) => {
      const mui = require("@mui/material/styles") as {
        createTheme(options: unknown): {
          palette: {
            mode: string;
            primary: { main: string };
            augmentColor(options: { color: { main: string } }): unknown;
          };
        };
      };
      const { lightTheme, darkTheme } = await import("../dist/index.mjs");
      for (const options of [lightTheme, darkTheme]) {
        const theme = mui.createTheme(options);
        if (
          theme.palette.mode !== options.palette.mode ||
          theme.palette.primary.main !== options.palette.primary.main
        ) {
          throw new Error(
            `MUI ${version} did not consume the pantoken ${options.palette.mode} palette`,
          );
        }
        theme.palette.augmentColor({ color: { main: theme.palette.primary.main } });
      }
      console.log(`✓ MUI ${version}: light and dark palettes accepted by createTheme`);
    },
    ["@emotion/react@11.14.0", "@emotion/styled@11.14.1"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
