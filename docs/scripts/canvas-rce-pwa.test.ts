import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { configureCanvasRcePwa } from "./canvas-rce-pwa.ts";

const logoPath = join(
  import.meta.dirname,
  "..",
  "..",
  "plugins",
  "pantoken",
  "logos",
  "assets",
  "logos",
  "pantoken",
  "icon-color.svg",
);

function pngDimensions(png: Buffer): [number, number] {
  expect(png.subarray(1, 4).toString("ascii")).toBe("PNG");
  return [png.readUInt32BE(16), png.readUInt32BE(20)];
}

test("brands the docs Canvas RCE as an installable Pantoken app", () => {
  const renderDir = mkdtempSync(join(tmpdir(), "pantoken-canvas-rce-pwa-"));
  const publicDir = join(renderDir, "public");
  mkdirSync(publicDir);
  writeFileSync(
    join(renderDir, "index.html"),
    `<!doctype html><head>
    <meta name="application-name" content="Canvas Theme Editor" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <title>Canvas Theme Editor</title>
    </head>`,
  );
  writeFileSync(
    join(publicDir, "manifest.webmanifest"),
    JSON.stringify({ description: "Preserved", display: "standalone", icons: [] }),
  );

  configureCanvasRcePwa(renderDir, logoPath);

  const html = readFileSync(join(renderDir, "index.html"), "utf8");
  expect(html).toContain('<meta name="application-name" content="Pantoken" />');
  expect(html).toContain("<title>Pantoken</title>");
  expect(html).toContain('href="/icon-192.png"');
  expect(html).toContain("data-pantoken-themed-icon");
  expect(html).toContain('href="/apple-touch-icon.png"');

  const manifest = JSON.parse(readFileSync(join(publicDir, "manifest.webmanifest"), "utf8"));
  expect(manifest).toMatchObject({
    id: "/tools/canvas-rce/",
    name: "Pantoken",
    short_name: "Pantoken",
    start_url: "/tools/canvas-rce/",
    scope: "/tools/canvas-rce/",
    description: "Preserved",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#0d1b2a",
  });
  expect(manifest.icons).toEqual([
    {
      src: "/tools/canvas-rce/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/tools/canvas-rce/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ]);
  expect(pngDimensions(readFileSync(join(publicDir, "icon-192.png")))).toEqual([192, 192]);
  expect(pngDimensions(readFileSync(join(publicDir, "icon-512.png")))).toEqual([512, 512]);
  expect(pngDimensions(readFileSync(join(publicDir, "apple-touch-icon.png")))).toEqual([180, 180]);
});

test("fails when scaffold metadata anchors drift", () => {
  const renderDir = mkdtempSync(join(tmpdir(), "pantoken-canvas-rce-pwa-drift-"));
  mkdirSync(join(renderDir, "public"));
  writeFileSync(join(renderDir, "index.html"), "<title>Unexpected</title>");

  expect(() => configureCanvasRcePwa(renderDir, logoPath)).toThrow(
    "Canvas RCE PWA metadata anchor not found",
  );
});
