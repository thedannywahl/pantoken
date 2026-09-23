import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const APP_BASE = "/tools/canvas-rce/";
const BACKGROUND_COLOR = "#f5f5f5";
const THEME_COLOR = "#0d1b2a";
const ICON_SIZES = [192, 512] as const;

function replaceRequired(source: string, search: string, replacement: string): string {
  if (!source.includes(search)) {
    throw new Error(`Canvas RCE PWA metadata anchor not found: ${search}`);
  }
  return source.replace(search, replacement);
}

function appIconSvg(logoSvg: string): string {
  const mark = replaceRequired(logoSvg, "<svg ", '<svg x="32" y="32" width="64" height="64" ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="${BACKGROUND_COLOR}"/>${mark}</svg>`;
}

function writePng(svg: string, size: number, path: string): void {
  const png = new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();
  writeFileSync(path, png);
}

/** Apply Pantoken install metadata and icons to the docs-only Canvas RCE render directory. */
export function configureCanvasRcePwa(renderDir: string, logoPath: string): void {
  const indexPath = join(renderDir, "index.html");
  let html = readFileSync(indexPath, "utf8");
  html = replaceRequired(
    html,
    '<meta name="application-name" content="Canvas Theme Editor" />',
    '<meta name="application-name" content="Pantoken" />',
  );
  html = replaceRequired(html, "<title>Canvas Theme Editor</title>", "<title>Pantoken</title>");
  html = replaceRequired(
    html,
    '<link rel="manifest" href="/manifest.webmanifest" />',
    `<link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" data-pantoken-themed-icon />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />`,
  );
  writeFileSync(indexPath, html);

  const publicDir = join(renderDir, "public");
  const manifestPath = join(publicDir, "manifest.webmanifest");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<string, unknown>;
  Object.assign(manifest, {
    id: APP_BASE,
    name: "Pantoken",
    short_name: "Pantoken",
    start_url: APP_BASE,
    scope: APP_BASE,
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    // Desktop Chrome doesn't apply manifest icon updates after installation. Keep these fixed and
    // let the document's opt-in favicon reflect live theme-color changes instead.
    icons: ICON_SIZES.map((size) => ({
      src: `${APP_BASE}icon-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any maskable",
    })),
  });
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const iconSvg = appIconSvg(readFileSync(logoPath, "utf8"));
  for (const size of ICON_SIZES) {
    writePng(iconSvg, size, join(publicDir, `icon-${size}.png`));
  }
  writePng(iconSvg, 180, join(publicDir, "apple-touch-icon.png"));
}
