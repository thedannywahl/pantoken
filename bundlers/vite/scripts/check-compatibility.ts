import { readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["8.0.0", "8.0.16", "8.1.5", "8.2.2", "8.3.1"];

/** Build a real app that consumes both virtual modules and HTML stylesheet injection. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^8\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Vite 8 release: ${version}`);
  await withTargetVersion("vite", version, async (require, directory) => {
    const project = realpathSync(directory);
    writeFileSync(
      join(project, "index.html"),
      '<html><head></head><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>',
    );
    writeFileSync(
      join(project, "main.js"),
      'import css from "virtual:pantoken/css"; import { tokens } from "virtual:pantoken/tokens"; document.querySelector("#app").textContent = `${tokens.length} ${css.length}`;',
    );
    const vite = require("vite") as typeof import("vite");
    const { pantoken } = await import("../dist/index.mjs");
    await vite.build({
      configFile: false,
      root: project,
      plugins: [pantoken({ injectCss: true })],
      logLevel: "silent",
      build: { outDir: join(project, "dist"), chunkSizeWarningLimit: 10_000 },
    });
    const html = readFileSync(join(project, "dist/index.html"), "utf8");
    if (!html.includes("data-pantoken") || !html.includes("--instui-")) {
      throw new Error(`Vite ${version} did not inject the pantoken stylesheet`);
    }
    const assets = join(project, "dist/assets");
    const bundledTokens = readdirSync(assets).some(
      (file) =>
        file.endsWith(".js") && readFileSync(join(assets, file), "utf8").includes("--instui-"),
    );
    if (!bundledTokens) throw new Error(`Vite ${version} did not bundle the virtual modules`);
    console.log(`✓ Vite ${version}: virtual modules and stylesheet built`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
