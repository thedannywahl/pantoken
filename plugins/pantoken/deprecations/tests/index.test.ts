import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import {
  compareVersions,
  deprecationShims,
  describeLifecycle,
  dueForRemoval,
  ledgerCovers,
  parseUpstreamRef,
  removalDeadline,
  shimEntries,
  shimValue,
} from "../src/index.ts";
import type { DeprecationLedger } from "@pantoken/model";

const ledger: DeprecationLedger = {
  version: 1,
  entries: [
    {
      token: "--instui-component-truncate-text-line-height",
      deprecatedIn: "design-tokens@v1.5.0",
      removeIn: "design-tokens@v1.6.0",
      replacement: "--instui-line-height-paragraph-base",
      note: "TruncateText v2 no longer sets line-height.",
    },
    {
      token: "--instui-component-badge-notification-z-index",
      deprecatedIn: "design-tokens@v1.5.0",
      removeIn: "design-tokens@v1.6.0",
      value: "1",
    },
    // An entry with neither replacement nor value emits no shim.
    { token: "--instui-broken", deprecatedIn: "ui@11.7.4", removeIn: "ui@11.8.0" },
  ],
};

test("is a factoried tokens-only plugin", () => {
  expect(capabilitiesOf(deprecationShims(ledger))).toEqual(["tokens"]);
});

test("shimValue prefers a var() forwarder, falls back to a frozen literal", () => {
  expect(shimValue(ledger.entries[0])).toBe("var(--instui-line-height-paragraph-base)");
  expect(shimValue(ledger.entries[1])).toBe("1");
  expect(shimValue(ledger.entries[2])).toBeUndefined();
});

test("shimEntries drops entries that can't emit a shim", () => {
  expect(shimEntries(ledger).map((e) => e.token)).toEqual([
    "--instui-component-truncate-text-line-height",
    "--instui-component-badge-notification-z-index",
  ]);
});

test("ledgerCovers reports whether a token has a lifecycle entry", () => {
  expect(ledgerCovers(ledger, "--instui-broken")).toBe(true);
  expect(ledgerCovers(ledger, "--instui-not-listed")).toBe(false);
});

test("tokens hook appends a shim per entry, carrying meta.deprecated lifecycle", () => {
  const out = deprecationShims(ledger).tokens?.({ tokens: [], theme: "rebrand" }) ?? [];
  const forward = out.find((t) => t.name === "--instui-component-truncate-text-line-height");
  expect(forward?.value).toBe("var(--instui-line-height-paragraph-base)");
  expect(forward?.meta?.deprecated?.removeIn).toBe("design-tokens@v1.6.0");
  const frozen = out.find((t) => t.name === "--instui-component-badge-notification-z-index");
  expect(frozen?.value).toBe("1");
  // The entry with no shim value emits nothing.
  expect(out.some((t) => t.name === "--instui-broken")).toBe(false);
});

test("parseUpstreamRef splits tier and version, tolerating a leading v", () => {
  expect(parseUpstreamRef("design-tokens@v1.6.0")).toEqual({
    tier: "design-tokens",
    version: [1, 6, 0],
  });
  expect(parseUpstreamRef("ui@11.8.0")).toEqual({ tier: "ui", version: [11, 8, 0] });
  expect(parseUpstreamRef("garbage")).toBeUndefined();
});

test("compareVersions orders dotted versions", () => {
  expect(compareVersions([1, 5, 0], [1, 6, 0])).toBeLessThan(0);
  expect(compareVersions([11, 8, 0], [11, 8, 0])).toBe(0);
  expect(compareVersions([1, 6], [1, 5, 9])).toBeGreaterThan(0);
});

test("dueForRemoval fires once the current upstream reaches removeIn", () => {
  // At design-tokens v1.5.0 the removeIn (v1.6.0) is not reached — nothing due.
  expect(dueForRemoval(ledger, { ui: "11.7.4", designTokens: "v1.5.0" })).toEqual([]);
  // At v1.6.0 both design-tokens entries are due for removal.
  const due = dueForRemoval(ledger, { ui: "11.7.4", designTokens: "v1.6.0" }).map((e) => e.token);
  expect(due).toContain("--instui-component-truncate-text-line-height");
  expect(due).toContain("--instui-component-badge-notification-z-index");
});

test("describeLifecycle renders a one-line summary", () => {
  expect(describeLifecycle(ledger.entries[0])).toBe(
    "deprecated in design-tokens@v1.5.0, removed in design-tokens@v1.6.0 (use `--instui-line-height-paragraph-base`)",
  );
});

test("expires at two minors or the next major, preserving earlier authored deadlines", () => {
  expect(removalDeadline("design-tokens@v2.9.4")).toBe("design-tokens@2.11.0");
  const entry = {
    token: "--old",
    deprecatedIn: "design-tokens@2.9.4",
    removeIn: removalDeadline("design-tokens@2.9.4"),
    value: "1",
  };
  const lifecycle = { version: 1, entries: [entry] };
  expect(dueForRemoval(lifecycle, { ui: "11.7.4", designTokens: "2.10.9" })).toEqual([]);
  expect(dueForRemoval(lifecycle, { ui: "11.7.4", designTokens: "2.11.0" })).toEqual([entry]);
  expect(dueForRemoval(lifecycle, { ui: "11.7.4", designTokens: "3.0.0" })).toEqual([entry]);
  expect(dueForRemoval(ledger, { ui: "11.7.4", designTokens: "1.6.0" })).toHaveLength(2);
});

test("rejects malformed or unavailable provenance instead of retaining shims silently", () => {
  expect(parseUpstreamRef("ui@1.2.3-beta")).toBeUndefined();
  expect(parseUpstreamRef("ui@1.invalid.3")).toBeUndefined();
  expect(() => removalDeadline("unknown@1.2.3")).toThrow("Invalid upstream");
  expect(() =>
    dueForRemoval(
      {
        version: 1,
        entries: [
          {
            token: "--bad",
            deprecatedIn: "ui@1.2.3",
            removeIn: "bad",
          },
        ],
      },
      { ui: "1.3.0", designTokens: "2.0.0" },
    ),
  ).toThrow("Invalid deprecation");
  const lucide = { token: "--icon", deprecatedIn: "lucide@1.1.0", removeIn: "lucide@1.3.0" };
  expect(() =>
    dueForRemoval(
      { version: 1, entries: [lucide] },
      {
        ui: "11.7.4",
        designTokens: "2.0.0",
      },
    ),
  ).toThrow("Missing stable");
  expect(
    dueForRemoval(
      { version: 1, entries: [lucide] },
      {
        ui: "11.7.4",
        designTokens: "2.0.0",
        lucide: "2.0.0",
      },
    ),
  ).toEqual([lucide]);
});

test("preserves theme-specific values and registration without shadowing a restored live token", () => {
  const frozen = {
    ...ledger.entries[1],
    token: "--frozen",
    value: undefined,
    frozen: {
      rebrand: { value: "#ffffff", syntax: "<color>", inherits: false, themed: true },
      canvas: { value: "#000000", syntax: "<color>", inherits: false, themed: true },
      canvasHighContrast: { value: "#ff0000", syntax: "<color>", inherits: false, themed: true },
    },
  };
  const plugin = deprecationShims({ version: 1, entries: [frozen] });
  expect(plugin.tokens?.({ tokens: [], theme: "canvas" })?.[0]).toMatchObject({
    value: "#000000",
    syntax: "<color>",
    inherits: false,
    themed: true,
    meta: { deprecated: { deprecatedIn: frozen.deprecatedIn } },
  });
  const live = { name: "--frozen", value: "#123456", syntax: "<color>", inherits: true };
  expect(plugin.tokens?.({ tokens: [live], theme: "canvas" })).toEqual([live]);
});
