import { expect, test } from "vite-plus/test";
import { toAse } from "../src/ase.ts";
import { toGpl } from "../src/gpl.ts";
import { toSwatches } from "../src/model.ts";
import { toSketchPalette } from "../src/sketch.ts";
import { toSvg } from "../src/svg.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  {
    name: "--instui-color-bg",
    syntax: "*",
    inherits: true,
    value: "light-dark(#ffffff, #000000)",
    themed: true,
  },
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("toSwatches keeps only resolved hex colours (no dims/icons)", () => {
  const s = toSwatches(fixture);
  const names = s.map((x) => x.name);
  expect(names).toContain("color-brand");
  expect(names).not.toContain("spacing-md");
  expect(names).not.toContain("icon-x");
  expect(s.find((x) => x.name === "color-brand")?.hex).toBe("#0374B5"); // reference resolved
  expect(s.find((x) => x.name === "color-bg")?.hex).toBe("#ffffff"); // light mode
});

test("toGpl emits a GIMP palette with 0-255 lines", () => {
  const gpl = toGpl([{ name: "white", hex: "#ffffff" }]);
  expect(gpl).toContain("GIMP Palette");
  expect(gpl).toContain("255 255 255\twhite");
});

test("toSketchPalette emits 0-1 RGBA colours", () => {
  const p = toSketchPalette([{ name: "white", hex: "#ffffff" }]);
  expect(p.colors[0]).toEqual({ name: "white", red: 1, green: 1, blue: 1, alpha: 1 });
});

test("toSvg renders a grouped specimen sheet", () => {
  const svg = toSvg([
    { name: "color-background-brand", hex: "#2369a4" },
    { name: "color-background-base", hex: "#ffffff" },
    { name: "color-text-base", hex: "#273540" },
  ]);
  expect(svg.startsWith("<svg")).toBe(true);
  expect(svg).toContain("</svg>");
  // Grouped by name minus the leaf segment.
  expect(svg).toContain(">color-background<");
  expect(svg).toContain(">color-text<");
  // Leaf labels and chip fills.
  expect(svg).toContain(">brand<");
  expect(svg).toContain('fill="#ffffff"');
  expect(svg).toContain(">#273540<"); // hex label, uppercased is same here
});

test("toSvg escapes XML-unsafe characters", () => {
  const svg = toSvg([{ name: "a-b", hex: "#000000" }], { title: "A & B <x>" });
  expect(svg).toContain("A &amp; B &lt;x&gt;");
});

test("toAse writes a valid ASEF binary", () => {
  const bytes = toAse([{ name: "white", hex: "#ffffff" }]);
  const buf = Buffer.from(bytes);
  expect(buf.subarray(0, 4).toString("ascii")).toBe("ASEF");
  expect(buf.readUInt16BE(4)).toBe(1); // major version
  expect(buf.readUInt32BE(8)).toBe(1); // one colour block
  // The colour block contains white as three 1.0 floats (0x3F800000).
  expect(buf.includes(Buffer.from([0x3f, 0x80, 0x00, 0x00]))).toBe(true);
});
