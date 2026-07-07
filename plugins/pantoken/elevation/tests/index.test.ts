import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { elevation } from "../src/index.ts";
import type { Token } from "@pantoken/model";

/** Materialize a plugin-emitted token input into a full Token, as the pipeline would. */
const define = (i: { name: string; value: string }): Token => ({
  name: i.name,
  syntax: "*",
  inherits: true,
  value: i.value,
});

test("is a factoried plugin with tokens + css capabilities", () => {
  expect(capabilitiesOf(elevation())).toEqual(["tokens", "css"]);
});

test("tokens hook emits every named level plus the aliases", () => {
  const names = (elevation().tokens?.({ tokens: [], theme: "rebrand", define }) ?? []).map(
    (t) => t.name,
  );
  for (const n of [
    "--instui-elevation-resting",
    "--instui-elevation-above",
    "--instui-elevation-topmost",
    "--instui-elevation-depth1",
    "--instui-elevation-depth2",
    "--instui-elevation-depth3",
    "--instui-elevation-card",
    "--instui-elevation-cardHover",
  ]) {
    expect(names).toContain(n);
  }
});

test("each level is a two-layer, concrete box-shadow (no dangling var)", () => {
  const out = elevation().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const resting = out.find((t) => t.name === "--instui-elevation-resting")?.value ?? "";
  expect(resting.split(",").length).toBeGreaterThanOrEqual(2); // two shadow layers
  expect(resting).toContain("0.0625rem");
  for (const t of out) expect(t.value).not.toContain("var(");
});

test("aliases resolve to the same value as their base level", () => {
  const out = elevation().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const val = (n: string) => out.find((t) => t.name === n)?.value;
  expect(val("--instui-elevation-depth1")).toBe(val("--instui-elevation-resting"));
  expect(val("--instui-elevation-cardHover")).toBe(val("--instui-elevation-topmost"));
});

test("css hook self-defines the elevation custom properties", () => {
  const c = elevation().css?.({ tokens: [], css: "" });
  const decls = Object.fromEntries(c?.declarations ?? []);
  expect(decls["--instui-elevation-above"]).toBeTruthy();
  expect(decls["--instui-elevation-above"]).not.toContain("var(");
  expect(c?.marker).toBe("pantoken:elevation");
});

test("css hook does not re-declare a level already baked into the IR", () => {
  const withBaked = [
    { name: "--instui-elevation-resting", syntax: "*", inherits: true, value: "none" } as const,
  ];
  const c = elevation().css?.({ tokens: withBaked, css: "" });
  const names = (c?.declarations ?? []).map(([n]) => n);
  expect(names).not.toContain("--instui-elevation-resting");
});
