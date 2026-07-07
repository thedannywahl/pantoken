import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { toAndroid } from "../src/index.ts";
import type { Token } from "@pantoken/model";

const arrowSvg = "<svg viewBox='0 0 24 24' stroke='currentColor'><path d='M5 12h14'/></svg>";
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
    name: "--instui-icon-arrow-left",
    syntax: "<image>",
    inherits: true,
    value: `url('data:image/svg+xml;utf8,${encodeURIComponent(arrowSvg)}')`,
    meta: { kind: "icon" },
  },
];

test("emits colors.xml and dimens.xml resource files", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-android-"));
  const [colors, dimens] = await toAndroid(fixture, { outDir });

  const colorsXml = readFileSync(colors, "utf8");
  expect(colorsXml).toContain("<resources>");
  expect(colorsXml.toLowerCase()).toContain("color");
  expect(colorsXml).not.toContain("data:"); // icons excluded

  const dimensXml = readFileSync(dimens, "utf8");
  expect(dimensXml).toContain("<dimen");
});

test("emits VectorDrawables for requested icons", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-android-icons-"));
  const files = await toAndroid(fixture, { outDir, icons: ["arrow-left"] });
  const drawable = files.find((f) => f.endsWith("ic_arrow_left.xml"));
  expect(drawable).toBeDefined();
  const xml = readFileSync(drawable as string, "utf8");
  expect(xml).toContain("<vector");
  expect(xml).toContain('android:pathData="M5 12h14"');
});
