import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { CONFIG_DEFAULTS, InvalidConfigError, loadConfig, parseConfig } from "../src/config.ts";

const MINIMAL_RAW = { source: "en", spaces: { "docs.guides": { kind: "content" } } };

describe("parseConfig", () => {
  test("fills every default field for a minimal config", () => {
    const config = parseConfig(MINIMAL_RAW);
    expect(config.source).toBe("en");
    expect(config.catalogs).toEqual(CONFIG_DEFAULTS.catalogs);
    expect(config.poOptions).toEqual(CONFIG_DEFAULTS.poOptions);
    expect(config.locales).toEqual(CONFIG_DEFAULTS.locales);
    expect(config.provider).toEqual(CONFIG_DEFAULTS.provider);
    expect(config.defaults).toEqual(CONFIG_DEFAULTS.defaults);
    expect(config.spaces).toEqual({ "docs.guides": { kind: "content" } });
  });

  test("a provided field overrides its default at the leaf level only", () => {
    const config = parseConfig({
      ...MINIMAL_RAW,
      provider: { timeoutMs: 60_000 },
    });
    expect(config.provider.timeoutMs).toBe(60_000);
    // Untouched sibling fields keep their defaults.
    expect(config.provider.default).toBe(CONFIG_DEFAULTS.provider.default);
    expect(config.provider.profiles).toEqual(CONFIG_DEFAULTS.provider.profiles);
  });

  test("a nested default (e.g. circuitBreaker) merges rather than being replaced wholesale", () => {
    const config = parseConfig({
      ...MINIMAL_RAW,
      provider: { circuitBreaker: { maxConsecutiveFailures: 5 } },
    });
    expect(config.provider.circuitBreaker.maxConsecutiveFailures).toBe(5);
    expect(config.provider.circuitBreaker.rotation).toEqual(
      CONFIG_DEFAULTS.provider.circuitBreaker.rotation,
    );
  });

  test("locales.tiers replaces the default map wholesale when provided (arrays/maps don't deep-merge across keys)", () => {
    const config = parseConfig({
      ...MINIMAL_RAW,
      locales: { tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] } },
    });
    expect(Object.keys(config.locales.tiers)).toEqual(["source", "primary", "secondary"]);
  });

  test("rejects a non-object root", () => {
    expect(() => parseConfig(null)).toThrow(InvalidConfigError);
    expect(() => parseConfig("nope")).toThrow(InvalidConfigError);
    expect(() => parseConfig([])).toThrow(InvalidConfigError);
  });

  test("rejects a missing or empty source", () => {
    expect(() => parseConfig({ spaces: {} })).toThrow(/"source"/u);
    expect(() => parseConfig({ source: "", spaces: {} })).toThrow(/"source"/u);
  });

  test("rejects a missing spaces object", () => {
    expect(() => parseConfig({ source: "en" })).toThrow(/"spaces"/u);
  });

  test("rejects a space with no kind", () => {
    expect(() => parseConfig({ source: "en", spaces: { foo: {} } })).toThrow(/"foo"/u);
  });
});

describe("loadConfig", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-config-"));
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  test("reads and parses a real file", () => {
    const path = join(testDir, "i18n.config.json");
    writeFileSync(path, JSON.stringify(MINIMAL_RAW));
    expect(loadConfig(path).source).toBe("en");
  });

  test("defaults to i18n.config.json when no path is given", () => {
    expect(() => loadConfig()).toThrow(/ENOENT/u);
  });
});
