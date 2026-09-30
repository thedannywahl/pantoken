import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Render the adapter's custom element through a real React and React DOM server release. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^19\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid React 19 release: ${version}`);
  await withTargetVersion(
    "react",
    version,
    async (require) => {
      const react = require("react") as { createElement(type: unknown, props: unknown): unknown };
      const reactDomServer = require("react-dom/server") as {
        renderToStaticMarkup(element: unknown): string;
      };
      const { Icon, readToken } = await import("../dist/index.mjs");
      const element = react.createElement(Icon, { name: "check-mark", size: "1.25rem" });
      const html = reactDomServer.renderToStaticMarkup(element);
      if (
        !html.includes("<instui-icon") ||
        !html.includes('name="check-mark"') ||
        !html.includes('size="1.25rem"')
      ) {
        throw new Error(`React ${version} did not render Icon custom-element props`);
      }
      if (readToken("--instui-color-background-brand", "fallback") !== "fallback") {
        throw new Error(`React ${version} did not return the SSR token fallback`);
      }
      console.log(`✓ React ${version}: Icon props render and token fallback is SSR-safe`);
    },
    [`react-dom@${version}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/react")) await checkCompatibility(release);
}
