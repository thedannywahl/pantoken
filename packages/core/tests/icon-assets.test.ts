import { expect, test } from "vite-plus/test";
import {
  decodeIconSvg,
  flutterIconManifest,
  getIconSvgs,
  toVectorDrawable,
  toXcodeImageset,
} from "../src/icon-assets.ts";
import type { Token } from "../src/model.ts";

test("decodeIconSvg unwraps the data-URI back to inline SVG", () => {
  const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
  const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
  expect(decodeIconSvg(value)).toBe(svg);
});

test("getIconSvgs collects only icon tokens, keyed by short name", () => {
  const tokens: Token[] = [
    { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#fff" },
    {
      name: "--instui-icon-arrow-left",
      syntax: "<image>",
      inherits: true,
      value: `url('data:image/svg+xml;utf8,${encodeURIComponent("<svg><path d='M1 1'/></svg>")}')`,
      meta: { kind: "icon" },
    },
  ];
  const svgs = getIconSvgs(tokens);
  expect([...svgs.keys()]).toEqual(["arrow-left"]);
});

test("toVectorDrawable converts a stroke icon (path + primitives)", () => {
  const svg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/><circle cx="12" cy="12" r="3"/><line x1="1" y1="1" x2="2" y2="2"/>' +
    "</svg>";
  const xml = toVectorDrawable(svg);
  expect(xml).toContain("<vector");
  expect(xml).toContain('android:viewportWidth="24"');
  expect(xml).toContain("android:strokeColor");
  expect(xml).toContain('android:pathData="M5 12h14"');
  // circle + line converted to pathData
  expect(xml).toContain("a3,3 0 1,0");
  expect(xml).toContain("M1,1 L2,2");
});

test("toVectorDrawable uses fillColor for filled icons", () => {
  const xml = toVectorDrawable(
    '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="#000"/></svg>',
  );
  expect(xml).toContain("android:fillColor");
});

test("toXcodeImageset emits the svg + vector-preserving Contents.json", () => {
  const files = toXcodeImageset("arrow-left", "<svg/>");
  const byPath = new Map(files.map((f) => [f.path, f.content]));
  expect(byPath.get("arrow-left.imageset/arrow-left.svg")).toBe("<svg/>");
  const contents = JSON.parse(byPath.get("arrow-left.imageset/Contents.json") as string);
  expect(contents.properties["preserves-vector-representation"]).toBe(true);
  expect(contents.images[0].filename).toBe("arrow-left.svg");
});

test("flutterIconManifest declares camelCased asset-path constants", () => {
  const dart = flutterIconManifest(["arrow-left", "check-mark"]);
  expect(dart).toContain("class PanTokensIcons");
  expect(dart).toContain("static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';");
  expect(dart).toContain("checkMark");
});
