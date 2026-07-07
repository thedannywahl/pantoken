import { expect, test } from "vite-plus/test";
import { toRust } from "../src/index.ts";
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
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("egui format emits Color32 + f32, resolving references and filtering icons", () => {
  const rs = toRust(fixture, { format: "egui" });
  expect(rs).toContain("use egui::Color32;");
  expect(rs).toContain("pub const COLOR_BRAND: Color32 = Color32::from_rgb(3, 116, 181);");
  expect(rs).toContain("pub const SPACING_MD: f32 = 16.0;");
  expect(rs).not.toContain("ICON_X");
});

test("iced format emits Color struct literals with float-formatted channels", () => {
  const rs = toRust(fixture, { format: "iced" });
  expect(rs).toContain("use iced::Color;");
  expect(rs).toContain("COLOR_BRAND: Color = Color { r: ");
  expect(rs).toContain("a: 1.0 }"); // opaque → 1.0, never bare `1`
});

test("alpha is preserved (transparent, not opaque black)", () => {
  const transparent: Token[] = [
    { name: "--instui-color-clear", syntax: "<color>", inherits: true, value: "#00000000" },
  ];
  expect(toRust(transparent, { format: "egui" })).toContain(
    "Color32::from_rgba_unmultiplied(0, 0, 0, 0)",
  );
  expect(toRust(transparent, { format: "iced" })).toContain("a: 0.0 }");
});
