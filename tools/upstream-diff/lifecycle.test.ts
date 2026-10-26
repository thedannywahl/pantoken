import { expect, test } from "vite-plus/test";
import type { Token } from "@pantoken/model";
import { prepareLifecycle, type ThemeSnapshot } from "./lifecycle.ts";

const upstream = { designTokens: "2.1.0", ui: "11.7.10", lucide: "1.57.0" };
const next = { ...upstream, designTokens: "2.2.0" };
const token = (name: string, value: string): Token => ({
  name,
  value,
  syntax: "<color>",
  inherits: false,
});
const snapshot = (tokens: Token[]): ThemeSnapshot => ({
  rebrand: tokens,
  canvas: tokens,
  canvasHighContrast: tokens,
});

test("freezes removed references from the old build in each theme", () => {
  const previous = snapshot([token("--base", "#fff"), token("--alias", "var(--base)")]);
  previous.canvas = [token("--base", "#000"), token("--alias", "var(--base)")];
  const update = prepareLifecycle(
    previous,
    snapshot([]),
    { version: 1, entries: [] },
    upstream,
    next,
  );
  expect(update.added).toEqual(["--alias", "--base"]);
  expect(update.ledger.entries[0]).toMatchObject({
    token: "--alias",
    deprecatedIn: "design-tokens@2.2.0",
    removeIn: "design-tokens@2.4.0",
    frozen: { rebrand: { value: "#fff", inherits: false }, canvas: { value: "#000" } },
  });
  expect(prepareLifecycle(previous, snapshot([]), update.ledger, upstream, next).added).toEqual([]);
});

test("retires an old shim without recreating it as a new upstream removal", () => {
  const old = {
    ...token("--old", "#fff"),
    meta: { deprecated: { deprecatedIn: "design-tokens@2.0.0" } },
  };
  const update = prepareLifecycle(
    snapshot([old]),
    snapshot([]),
    {
      version: 1,
      entries: [
        {
          token: "--old",
          value: "#fff",
          deprecatedIn: "design-tokens@2.0.0",
          removeIn: "design-tokens@2.2.0",
        },
      ],
    },
    upstream,
    next,
  );
  expect(update).toMatchObject({ added: [], retired: ["--old"], ledger: { entries: [] } });
});

test("freezes actual icon data and routes Lucide ownership independently of ui-icons", () => {
  const icon: Token = {
    ...token("--icon", 'url("data:image/svg+xml,test")'),
    syntax: "<image>",
    meta: { kind: "icon", source: "lucide", viewBox: "0 0 24 24" },
  };
  const update = prepareLifecycle(
    snapshot([icon]),
    snapshot([]),
    { version: 1, entries: [] },
    upstream,
    { ...upstream, lucide: "1.58.0" },
  );
  expect(update.ledger.entries[0]).toMatchObject({
    deprecatedIn: "lucide@1.58.0",
    frozen: { rebrand: { value: icon.value, meta: icon.meta } },
  });
});

test("rejects incomplete or unresolved snapshots and unattributed removals", () => {
  const previous = snapshot([token("--broken", "var(--missing)")]);
  expect(() =>
    prepareLifecycle(previous, snapshot([]), { version: 1, entries: [] }, upstream, next),
  ).toThrow("Unresolved frozen");
  const complete = snapshot([token("--old", "#fff")]);
  expect(() =>
    prepareLifecycle(complete, snapshot([]), { version: 1, entries: [] }, upstream, upstream),
  ).toThrow("no owning");
  expect(() =>
    prepareLifecycle(
      { ...complete, canvas: [] },
      snapshot([]),
      { version: 1, entries: [] },
      upstream,
      next,
    ),
  ).toThrow("Missing canvas");
  expect(() =>
    prepareLifecycle(
      complete,
      { ...snapshot([]), canvas: complete.canvas },
      { version: 1, entries: [] },
      upstream,
      next,
    ),
  ).toThrow("Theme-inconsistent");
});
