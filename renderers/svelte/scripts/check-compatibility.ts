import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Compile and server-render a Svelte component that uses the Pantoken icon action. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^\d+\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Svelte release: ${version}`);
  await withTargetVersion("svelte", version, async (require, directory) => {
    const compiler = require("svelte/compiler") as {
      compile(
        source: string,
        options: { filename: string; generate: "ssr" },
      ): { js: { code: string } };
    };
    const adapter = pathToFileURL(
      fileURLToPath(new URL("../dist/index.mjs", import.meta.url)),
    ).href;
    const component = compiler.compile(
      `<script>import { icon } from ${JSON.stringify(adapter)};</script><span use:icon={"arrow-left"}>Back</span>`,
      { filename: join(directory, "App.svelte"), generate: "ssr" },
    );
    const output = join(directory, "App.mjs");
    writeFileSync(output, component.js.code);
    const { default: App } = await import(pathToFileURL(output).href);
    const html = version.startsWith("4.")
      ? (App as { render(): { html: string } }).render().html
      : (
          require("svelte/server") as {
            render(component: unknown): { body: string };
          }
        ).render(App).body;
    if (!html.includes("<span") || !html.includes("Back")) {
      throw new Error(`Svelte ${version} did not server-render the icon action component`);
    }
    console.log(`✓ Svelte ${version}: icon action component compiled and rendered on the server`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/svelte"))
    await checkCompatibility(release);
}
