import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fileURLToPath } from "node:url";
import { InstuiMarkdown } from "../dist/index.mjs";

/** Render Markdown through the installed react-markdown and Instructure component pipeline. */
export function checkCompatibility(): void {
  const html = renderToStaticMarkup(
    createElement(InstuiMarkdown, {
      children: "# Compatibility\n\nGo :arrow-left: back. Brand is #03893D.",
    }),
  );
  if (!html.includes("Compatibility") || !html.includes("<svg") || !html.includes("#03893D")) {
    throw new Error("react-markdown did not render the mapped heading, icon, and color swatch");
  }
  console.log("✓ react-markdown: InstUI heading, icon and color swatch rendered through React SSR");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) checkCompatibility();
