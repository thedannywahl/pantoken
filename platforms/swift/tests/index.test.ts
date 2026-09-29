import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { toSwift } from "../src/index.ts";
import type { Token } from "@pantoken/model";

const arrowSvg = '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>';

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
  {
    name: "--instui-color-shadow",
    syntax: "*",
    inherits: true,
    value: "light-dark(rgba(35,68,101,0.15), rgba(0,0,0,0.3))",
  },
  // An icon token — must be filtered out of the Swift output.
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:image/svg+xml;utf8,x')",
    meta: { kind: "icon" },
  },
];

test("emits a Swift class from resolved, natively-typed tokens (icons filtered)", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-swift-"));
  const file = await toSwift(fixture, { outDir, className: "PanTokens" });
  const swift = readFileSync(file, "utf8");
  expect(swift).toContain("class PanTokens");
  expect(swift.toLowerCase()).toContain("color");
  expect(swift).toContain("UIColor(red: 0.137, green: 0.267, blue: 0.396, alpha: 0.15)");
  // The brand reference resolved to the concrete blue; the icon token was dropped.
  expect(swift).not.toContain("data:image");
});

test("emits an Icons.xcassets imageset when icons are requested", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-swift-icons-"));
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
  await toSwift(iconTokens, { outDir, icons: ["arrow-left"] });
  expect(existsSync(join(outDir, "Icons.xcassets", "arrow-left.imageset", "arrow-left.svg"))).toBe(
    true,
  );
  expect(existsSync(join(outDir, "Icons.xcassets", "arrow-left.imageset", "Contents.json"))).toBe(
    true,
  );
});
