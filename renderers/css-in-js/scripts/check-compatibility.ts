import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Render a themed component with Emotion and assert the Pantoken CSS variable reaches SSR CSS. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^11\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Emotion release: ${version}`);
  await withTargetVersion(
    "@emotion/react",
    version,
    async (require) => {
      const react = require("react") as {
        createElement(type: unknown, props: unknown, ...children: unknown[]): unknown;
      };
      const { ThemeProvider } = require("@emotion/react") as { ThemeProvider: unknown };
      const styled = (
        require("@emotion/styled") as {
          default: (
            tag: string,
          ) => (
            styles: (props: { theme: Record<string, string> }) => Record<string, string>,
          ) => unknown;
        }
      ).default;
      const reactDomServer = require("react-dom/server") as {
        renderToString(element: unknown): string;
      };
      const { pantokenTheme } = await import("../dist/index.mjs");
      const ThemedButton = styled("button")(({ theme }) => ({
        backgroundColor: theme.colorBackgroundBrand,
      }));
      const html = reactDomServer.renderToString(
        react.createElement(
          ThemeProvider,
          { theme: pantokenTheme },
          react.createElement(ThemedButton, null, "Brand"),
        ),
      );
      if (!html.includes("var(--instui-color-background-brand)")) {
        throw new Error(`Emotion ${version} did not emit the Pantoken theme token in SSR markup`);
      }
      console.log(`✓ Emotion ${version}: Pantoken theme value emitted in server-rendered CSS`);
    },
    ["react@19.3.0", "react-dom@19.3.0", "@emotion/styled@11.14.1"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/css-in-js"))
    await checkCompatibility(release);
}
