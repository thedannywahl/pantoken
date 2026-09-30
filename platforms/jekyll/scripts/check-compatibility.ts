import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { toJekyllAssets } from "../dist/index.mjs";

const release = "4.4.1";

/** Build a real Jekyll site using the generated Sass partial and token CSS asset. */
export function checkCompatibility(version = release): void {
  if (version !== release) throw new Error(`Unsupported Jekyll release: ${version}`);
  const site = mkdtempSync(join(tmpdir(), "pantoken-jekyll-"));
  try {
    for (const asset of toJekyllAssets()) {
      const path = join(site, asset.path);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, asset.content);
    }
    mkdirSync(join(site, "_layouts"), { recursive: true });
    mkdirSync(join(site, "assets/css"), { recursive: true });
    writeFileSync(
      join(site, "_config.yml"),
      "title: Pantoken compatibility\nsass:\n  sass_dir: _sass\n",
    );
    writeFileSync(
      join(site, "index.md"),
      "---\nlayout: default\ntitle: Compatibility\n---\n# Compatibility\n",
    );
    writeFileSync(
      join(site, "_layouts/default.html"),
      '<!doctype html><html><head><link rel="stylesheet" href="/assets/css/pantoken.css"><link rel="stylesheet" href="/assets/css/main.css"></head><body>{{ content }}</body></html>\n',
    );
    writeFileSync(join(site, "assets/css/main.scss"), '---\n---\n@import "pantoken";\n');
    const result = spawnSync(
      "docker",
      [
        "run",
        "--rm",
        "--volume",
        `${site}:/srv/jekyll`,
        "--workdir",
        "/srv/jekyll",
        "jekyll/jekyll:4.4.1",
        "jekyll",
        "build",
        "--source",
        "/srv/jekyll",
        "--destination",
        "/srv/jekyll/_site",
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? result.stderr) ||
          `Jekyll ${version} build exited ${result.status}`,
      );
    }
    const html = readFileSync(join(site, "_site/index.html"), "utf8");
    const sassCss = readFileSync(join(site, "_site/assets/css/main.css"), "utf8");
    if (!html.includes("Compatibility") || !sassCss.includes("--instui-color-background-brand")) {
      throw new Error(`Jekyll ${version} did not build the Pantoken Sass and CSS assets`);
    }
    console.log(`✓ Jekyll ${version}: generated Sass partial compiled into the site`);
  } finally {
    rmSync(site, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) checkCompatibility();
