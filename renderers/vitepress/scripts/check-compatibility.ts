import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { toVitePressCss } from "../dist/index.mjs";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["1.6.4"];

function collectCss(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectCss(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

/** Build a real VitePress site that imports the Pantoken theme-variable bridge. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^1\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid VitePress 1 release: ${version}`);
  await withTargetVersion("vitepress", version, async (_require, directory) => {
    const cli = join(directory, "node_modules/vitepress/bin/vitepress.js");
    const docs = join(directory, "docs");
    const theme = join(docs, ".vitepress/theme");
    mkdirSync(theme, { recursive: true });
    writeFileSync(join(docs, "index.md"), "# Compatibility\n\nVitePress build check.\n");
    writeFileSync(
      join(docs, ".vitepress/config.mts"),
      'import { defineConfig } from "vitepress";\nexport default defineConfig({ title: "Compatibility", themeConfig: {} });\n',
    );
    writeFileSync(
      join(theme, "index.ts"),
      'import "./custom.css";\nimport DefaultTheme from "vitepress/theme";\nexport default DefaultTheme;\n',
    );
    writeFileSync(join(theme, "custom.css"), toVitePressCss());
    const result = spawnSync(process.execPath, [cli, "build", docs], {
      cwd: directory,
      encoding: "utf8",
      env: { ...process.env, VITEPRESS_TELEMETRY_DISABLED: "1" },
    });
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? result.stderr) || `VitePress build exited ${result.status}`,
      );
    }
    const output = join(docs, ".vitepress/dist");
    const css = collectCss(output)
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");
    if (!/--vp-c-brand-1\s*:\s*var\(--instui-color-institutional-brand-primary\)/u.test(css)) {
      throw new Error(
        `VitePress ${version} did not include the Pantoken brand bridge in built CSS`,
      );
    }
    console.log(`✓ VitePress ${version}: site build includes the Pantoken brand bridge`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
