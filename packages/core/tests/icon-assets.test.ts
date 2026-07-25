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

test("decodeIconSvg returns '' for non-data values and malformed URIs", () => {
  // Not a data: URI at all.
  expect(decodeIconSvg("#ffffff")).toBe("");
  expect(decodeIconSvg("url('https://example.com/x.svg')")).toBe("");
  // A data: URI whose payload is an invalid percent-escape → decode throws → "".
  expect(decodeIconSvg("url('data:image/svg+xml;utf8,%')")).toBe("");
});

test("getIconSvgs skips icon tokens whose value fails to decode", () => {
  const tokens: Token[] = [
    {
      name: "--instui-icon-broken",
      syntax: "<image>",
      inherits: true,
      value: "url('data:image/svg+xml;utf8,%')",
      meta: { kind: "icon" },
    },
  ];
  expect(getIconSvgs(tokens).size).toBe(0);
});

test("toVectorDrawable converts rect/polyline/polygon and defaults the viewport", () => {
  // No viewBox → falls back to 24x24; a custom tint colour flows into fillColor.
  const svg =
    "<svg>" +
    '<rect x="1" y="2" width="4" height="6"/>' +
    '<polyline points="0,0 1,1 2,2"/>' +
    '<polygon points="0,0 4,0 4,4"/>' +
    "</svg>";
  const xml = toVectorDrawable(svg, { color: "#FF0374B5" });
  expect(xml).toContain('android:viewportWidth="24"');
  expect(xml).toContain('android:fillColor="#FF0374B5"');
  expect(xml).toContain('android:pathData="M1,2 h4 v6 h-4 z"'); // rect
  expect(xml).toContain('android:pathData="M0,0 L1,1 L2,2"'); // polyline
  expect(xml).toContain('android:pathData="M0,0 L4,0 L4,4 z"'); // polygon (closed)
});

test("toVectorDrawable skips a polygon with too few points", () => {
  const xml = toVectorDrawable('<svg viewBox="0 0 24 24"><polygon points="0,0"/></svg>');
  // No <path> emitted for the degenerate polygon.
  expect(xml).not.toContain("<path");
});

test("toVectorDrawable honours a per-element stroke on a fill-rooted svg", () => {
  const xml = toVectorDrawable(
    '<svg viewBox="0 0 24 24"><path d="M1 1" stroke="#000" stroke-width="3"/></svg>',
  );
  expect(xml).toContain("android:strokeColor");
  expect(xml).toContain('android:strokeWidth="2"'); // root has no stroke-width → default "2"
});

test("flutterIconManifest accepts a custom asset directory", () => {
  const dart = flutterIconManifest(["arrow-left"], "lib/icons");
  expect(dart).toContain("static const String arrowLeft = 'lib/icons/arrow-left.svg';");
});

test("flutterIconManifest declares camelCased asset-path constants", () => {
  const dart = flutterIconManifest(["arrow-left", "check-mark"]);
  expect(dart).toContain("class PanTokensIcons");
  expect(dart).toContain("static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';");
  expect(dart).toContain("checkMark");
});
