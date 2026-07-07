import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { toFlutter } from "../src/index.ts";
import type { Token } from "@pantoken/model";

const arrowSvg = '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>';
const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
];

test("emits a Flutter Dart class with tokens", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-flutter-"));
  const file = await toFlutter(fixture, { outDir, className: "PanTokens" });
  const dart = readFileSync(file, "utf8");
  expect(dart).toContain("class PanTokens");
  expect(dart.toLowerCase()).toContain("color");
});

test("copies icon SVGs + writes a Dart manifest when icons are requested", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-flutter-icons-"));
  const iconTokens: Token[] = [
    ...fixture,
    {
      name: "--instui-icon-arrow-left",
      syntax: "<image>",
      inherits: true,
      value: `url('data:image/svg+xml;utf8,${encodeURIComponent(arrowSvg)}')`,
      meta: { kind: "icon" },
    },
  ];
  await toFlutter(iconTokens, { outDir, icons: ["arrow-left"] });
  expect(existsSync(join(outDir, "assets/pantoken/icons/arrow-left.svg"))).toBe(true);
  const manifest = readFileSync(join(outDir, "pantoken_icons.dart"), "utf8");
  expect(manifest).toContain("arrowLeft");
});
