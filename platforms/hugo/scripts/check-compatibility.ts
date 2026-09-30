import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { toHugoAssets } from "../dist/index.mjs";

const releases = ["0.165.0"];

function collectCss(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectCss(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

/** Build a minimal Hugo site that processes Pantoken assets through Hugo Pipes. */
export function checkCompatibility(version: string): void {
  if (!releases.includes(version)) throw new Error(`Unsupported Hugo release: ${version}`);
  const site = mkdtempSync(join(tmpdir(), "pantoken-hugo-"));
  try {
    for (const asset of toHugoAssets()) {
      const path = join(site, asset.path);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, asset.content);
    }
    mkdirSync(join(site, "content"), { recursive: true });
    mkdirSync(join(site, "layouts"), { recursive: true });
    writeFileSync(
      join(site, "hugo.toml"),
      'baseURL = "https://example.org/"\ntitle = "Pantoken compatibility"\n',
    );
    writeFileSync(join(site, "content/_index.md"), "# Compatibility\n\nHugo host check.\n");
    writeFileSync(
      join(site, "layouts/index.html"),
      `{{ $css := resources.Get "css/pantoken.css" | minify | fingerprint }}
<!doctype html><html><head><link rel="stylesheet" href="{{ $css.RelPermalink }}"></head><body>{{ .Content }}</body></html>
`,
    );
    const result = spawnSync(
      "docker",
      [
        "run",
        "--rm",
        "--volume",
        `${site}:/src`,
        "--workdir",
        "/src",
        "--entrypoint",
        "hugo",
        `hugomods/hugo:${version}`,
        "--minify",
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? result.stderr) || `Hugo ${version} build exited ${result.status}`,
      );
    }
    const html = readFileSync(join(site, "public/index.html"), "utf8");
    const css = collectCss(join(site, "public"))
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");
    if (!html.includes("Compatibility") || !css.includes("--instui-color-background-brand")) {
      throw new Error(`Hugo ${version} did not emit the Pantoken CSS asset`);
    }
    console.log(`✓ Hugo ${version}: Hugo Pipes built the Pantoken token stylesheet`);
  } finally {
    rmSync(site, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) checkCompatibility(release);
}
