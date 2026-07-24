import { expect, test } from "vite-plus/test";
import { buildManifest, categoryOf, diffManifests, manifestsEqual, type Manifest } from "./lib.ts";
import type { Provenance } from "@pantoken/tokens/meta";
import type { Token } from "@pantoken/tokens";

const prov = (ref: string, icons: string): Provenance => ({
  designTokens: { package: "@instructure/instructure-design-tokens", ref, commit: "abcdef0" },
  uiIcons: { package: "@instructure/ui-icons", resolved: icons },
});

const tok = (name: string, value: string, extra: Partial<Token> = {}): Token => ({
  name,
  syntax: value.startsWith("#") ? "<color>" : value.includes("var(") ? "*" : "<length>",
  inherits: true,
  value,
  ...extra,
});

const icon = (name: string, value: string, meta: Token["meta"] = {}): Token => ({
  name,
  syntax: "<image>",
  inherits: false,
  value,
  meta: { kind: "icon", ...meta },
});

function manifest(ref: string, tokens: Token[]): Manifest {
  return buildManifest({
    themes: { rebrand: tokens, canvas: tokens, canvasHighContrast: tokens },
    provenance: prov(ref, "11.7.3"),
  });
}

test("categoryOf routes syntax to a value family", () => {
  expect(categoryOf("<color>")).toBe("color");
  expect(categoryOf("<length>")).toBe("length");
  expect(categoryOf("<integer>")).toBe("number");
  expect(categoryOf("<image>")).toBe("image");
  expect(categoryOf("*")).toBe("other");
});

test("buildManifest stores icons once (theme-independent) and tokens per theme", () => {
  const m = manifest("v1.4.0", [
    tok("--instui-color-x", "#0374B5"),
    icon("--instui-icon-star", "data:image/svg+xml,STAR"),
  ]);
  expect(Object.keys(m.icons)).toEqual(["--instui-icon-star"]);
  expect(m.themes.rebrand["--instui-color-x"].value).toBe("#0374B5");
  // The icon's fat value is stored as a hash, not verbatim.
  expect(m.icons["--instui-icon-star"].hash).not.toContain("data:");
});

test("diff classifies added, removed, value, and ref changes", () => {
  const before = manifest("v1.4.0", [
    tok("--instui-color-keep", "#111111"),
    tok("--instui-color-gone", "#222222"),
    tok("--instui-ref", "var(--instui-color-a)", { syntax: "*", refersTo: "--instui-color-a" }),
  ]);
  const after = manifest("v1.5.0", [
    tok("--instui-color-keep", "#999999"),
    tok("--instui-color-new", "#333333"),
    tok("--instui-ref", "var(--instui-color-b)", { syntax: "*", refersTo: "--instui-color-b" }),
  ]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.addedTokens.map((c) => c.name)).toContain("--instui-color-new");
  expect(diff.buckets.removedTokens.map((c) => c.name)).toContain("--instui-color-gone");
  // The value change appears per theme (3), coloured.
  const valueNames = diff.buckets.valueChanges.filter((c) => c.name === "--instui-color-keep");
  expect(valueNames.length).toBe(3);
  expect(valueNames[0].category).toBe("color");
  expect(diff.buckets.refChanges[0].name).toBe("--instui-ref");
  // Removed tokens land in the manual-review subset.
  expect(diff.manualReview.some((c) => c.name === "--instui-color-gone")).toBe(true);
});

test("diff detects an icon rename by matching artwork hash", () => {
  const before = manifest("v1.4.0", [icon("--instui-icon-old-name", "data:image/svg+xml,ART")]);
  const after = manifest("v1.5.0", [icon("--instui-icon-new-name", "data:image/svg+xml,ART")]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.renamedIcons).toEqual([
    { name: "--instui-icon-old-name", kind: "icon-renamed", renamedTo: "--instui-icon-new-name" },
  ]);
  expect(diff.buckets.removedIcons).toEqual([]);
  expect(diff.buckets.addedIcons).toEqual([]);
});

test("identical builds produce no drift and compare equal", () => {
  const a = manifest("v1.4.0", [tok("--instui-color-x", "#0374B5")]);
  const b = manifest("v1.4.0", [tok("--instui-color-x", "#0374B5")]);
  expect(manifestsEqual(a, b)).toBe(true);
  expect(diffManifests(a, b).summary.total).toBe(0);
});
