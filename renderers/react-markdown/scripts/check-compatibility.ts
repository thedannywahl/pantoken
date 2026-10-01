import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fileURLToPath } from "node:url";
import { InstuiMarkdown } from "../dist/index.mjs";
import { commandTargetVersions, targetVersions } from "../../../scripts/release/target-versions.ts";

/** Render Markdown through the installed react-markdown and Instructure component pipeline. */
export function checkCompatibility(version = targetVersions("@pantoken/react-markdown")[0]): void {
  if (!/^\d+\.\d+\.\d+$/u.test(version))
    throw new Error(`Invalid react-markdown release: ${version}`);
  const html = renderToStaticMarkup(
    createElement(InstuiMarkdown, {
      children: "# Compatibility\n\nGo :arrow-left: back. Brand is #03893D.",
    }),
  );
  if (!html.includes("Compatibility") || !html.includes("<svg") || !html.includes("#03893D")) {
    throw new Error("react-markdown did not render the mapped heading, icon, and color swatch");
  }
  console.log(
    `✓ react-markdown ${version}: InstUI heading, icon and color swatch rendered through React SSR`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/react-markdown"))
    checkCompatibility(release);
}
