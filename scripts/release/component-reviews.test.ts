import { afterEach, expect, test, vi } from "vite-plus/test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  componentReviews,
  renderComponentReview,
  tokenComponent,
  upstreamComponentExports,
  collectComponentInventory,
  promotionScaffold,
  type ComponentInventory,
} from "./component-reviews.ts";
import type { ThemeSnapshot } from "../../tools/upstream-diff/lifecycle.ts";
import type { Token } from "../../packages/model/src/index.ts";

const snapshot = (tokens: Token[]): ThemeSnapshot => ({
  rebrand: tokens,
  canvas: tokens,
  canvasHighContrast: tokens,
});
const token = (name: string, refersTo?: string): Token => ({
  name,
  value: refersTo ? `var(${refersTo})` : "1px",
  syntax: "<length>",
  inherits: true,
  ...(refersTo ? { refersTo } : {}),
});
const inventory: ComponentInventory = {
  core: ["card", "side-nav-bar"],
  custom: ["banner", "card"],
  upstream: ["card", "side-nav-bar"],
};

afterEach(() => vi.unstubAllGlobals());

test("scaffolds Stepper tokens without inventing InstUI validation", () => {
  const findings = componentReviews(
    snapshot([]),
    snapshot([token("--instui-component-stepper-gap")]),
    inventory,
  );
  expect(findings).toHaveLength(1);
  expect(findings[0]).toMatchObject({
    kind: "new-component",
    component: "stepper",
    upstream: false,
    destination: "plugins/pantoken/custom-components/src/components/stepper",
  });
  expect(renderComponentReview(findings[0])).toContain("do not register an empty placeholder");
});

test("routes new Card/imageCard variant tokens to the existing core component", () => {
  const findings = componentReviews(
    snapshot([]),
    snapshot([token("--instui-component-card-image-card-padding")]),
    inventory,
  );
  expect(findings[0]).toMatchObject({
    kind: "component-tokens",
    component: "card",
    destination: "formats/components/src/components/card",
  });
  expect(findings[0].tokens).toHaveLength(1);
});

test("routes custom-component variants to their existing owner and respects longest names", () => {
  const findings = componentReviews(
    snapshot([]),
    snapshot([token("--instui-component-banner-info-gap")]),
    inventory,
  );
  expect(findings[0].destination).toContain("custom-components/src/components/banner");
  expect(tokenComponent("--instui-component-side-nav-bar-gap", ["side", "side-nav-bar"])).toBe(
    "side-nav-bar",
  );
  expect(tokenComponent("--instui-color-primary", [])).toBeNull();
});

test("lists changed references per theme without guessing token-map replacements", () => {
  const before = snapshot([token("--instui-component-card-gap", "--old")]);
  const after = snapshot([token("--instui-component-card-gap", "--new")]);
  const findings = componentReviews(before, after, inventory);
  expect(findings[0].references).toHaveLength(3);
  expect(renderComponentReview(findings[0])).toContain("--old -> --new");
});

test("promotes custom components only with installed export evidence and retains a functional alias", () => {
  const findings = componentReviews(snapshot([]), snapshot([]), {
    ...inventory,
    upstream: ["card", "banner"],
  });
  expect(findings).toHaveLength(1);
  expect(findings[0]).toMatchObject({
    kind: "promote-component",
    component: "banner",
    destination: "formats/components/src/components/banner",
  });
  expect(renderComponentReview(findings[0])).toContain("functional deprecated forwarder");
  expect(componentReviews(snapshot([]), snapshot([]), { ...inventory, upstream: null })).toEqual(
    [],
  );
});

test("parses explicit version-pinned ES exports without evaluating upstream code", async () => {
  expect(
    await upstreamComponentExports(
      'export { Card } from "@instructure/ui-card"; export { default as Stepper } from "example";',
    ),
  ).toEqual(["card", "stepper"]);
  await expect(upstreamComponentExports("export * from 'unknown'")).rejects.toThrow(
    "manual inventory",
  );
  await expect(upstreamComponentExports("invalid export !")).rejects.toThrow();
});

test("uses raw multiword families and marks verified stable reference retargeting as automatic", () => {
  const before = snapshot([token("--instui-component-card-gap", "--old")]);
  const after = snapshot([
    token("--instui-component-card-gap", "--new"),
    token("--new"),
    token("--instui-component-new-widget-gap"),
  ]);
  const findings = componentReviews(before, after, { ...inventory, families: ["new-widget"] });
  expect(findings.find((finding) => finding.component === "new-widget")?.destination).toContain(
    "custom-components/src/components/new-widget",
  );
  const references = findings.find((finding) => finding.kind === "reference-change")!;
  expect(references.references.every((reference) => reference.automatic)).toBe(true);
  expect(renderComponentReview(references)).toContain("automatically rebuilt");
});

test("lists unresolved semantic references and missing promotion inventory explicitly", () => {
  const before = snapshot([token("--instui-spacing-small", "--old")]);
  const after = snapshot([token("--instui-spacing-small", "--missing")]);
  const findings = componentReviews(before, after, {
    ...inventory,
    upstream: null,
    upstreamChanged: true,
  });
  expect(findings.find((finding) => finding.kind === "reference-change")?.destination).toBe(
    "packages/core/src/resolve.ts",
  );
  expect(findings.some((finding) => finding.kind === "inventory-unavailable")).toBe(true);
});

test("lists compound reference expressions instead of silently treating them as stable direct mappings", () => {
  const before = snapshot([
    { ...token("--instui-component-card-gap"), value: "calc(var(--old) * 2)" },
  ]);
  const after = snapshot([
    { ...token("--instui-component-card-gap"), value: "calc(var(--new) * 2)" },
  ]);
  const finding = componentReviews(before, after, inventory)[0];
  expect(finding.references[0]).toMatchObject({
    before: "calc(var(--old) * 2)",
    after: "calc(var(--new) * 2)",
    automatic: false,
  });
  expect(renderComponentReview(finding)).toContain("manual mapping review required");
});

test("collects exact family/source ownership and fails closed on unavailable export evidence", async () => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-component-review-"));
  try {
    mkdirSync(join(directory, "formats/components/src/components/card"), { recursive: true });
    mkdirSync(join(directory, "plugins/pantoken/custom-components/src/components/stepper"), {
      recursive: true,
    });
    mkdirSync(join(directory, "formats/tokens/generated"), { recursive: true });
    writeFileSync(
      join(directory, "formats/tokens/generated/raw.json"),
      JSON.stringify({ rebrand: { component: { Stepper: {}, NewWidget: {} } } }),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => 'export { Card } from "@instructure/ui-card";',
      }),
    );
    expect(await collectComponentInventory(directory, "11.7.10", true)).toMatchObject({
      core: ["card"],
      custom: ["stepper"],
      upstream: ["card"],
      families: ["stepper", "new-widget"],
    });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Offline")));
    expect((await collectComponentInventory(directory, "11.7.10", true)).upstream).toBeNull();
    expect((await collectComponentInventory(directory, "unknown", true)).upstream).toBeNull();
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("scaffolds a real CSS move and a functional deprecated forwarder without applying it", () => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-promotion-scaffold-"));
  try {
    const source = join(directory, "plugins/pantoken/custom-components/src/components/banner");
    mkdirSync(source, { recursive: true });
    writeFileSync(join(source, "banner.css"), ".pfx-banner { display: block; }\n");
    writeFileSync(
      join(source, "index.ts"),
      'export function bannerRules(prefix = "instui-"): string {\n  return prefix;\n}\n',
    );
    const patch = promotionScaffold(directory, "banner", "11.7.10")!;
    expect(patch).toContain("rename to formats/components/src/components/banner/banner.css");
    expect(patch).toContain('import { bannerCss } from "@pantoken/components"');
    expect(patch).toContain('return bannerCss({ prefix: prefix.endsWith("-")');
    expect(patch).toContain('"removeIn": "ui@11.9.0"');
    expect(patch).toContain('"nextMajor": "ui@12.0.0"');
    expect(promotionScaffold(directory, "../escape", "11.7.10")).toBeUndefined();
    expect(promotionScaffold(directory, "unknown", "11.7.10")).toBeUndefined();
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
