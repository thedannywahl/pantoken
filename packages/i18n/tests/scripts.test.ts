import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const { parseWorkspaceGlobs, discoverStringSources } =
  await import("../scripts/lib/discover-sources.ts");

test("parseWorkspaceGlobs extracts the packages: list from YAML", () => {
  const yaml = `packages:\n  - packages/*\n  - docs\noverrides:\n  vite: "1.0"`;
  expect(parseWorkspaceGlobs(yaml)).toEqual(["packages/*", "docs"]);
});

test("parseWorkspaceGlobs stops at the next top-level key", () => {
  const yaml = `packages:\n  - apps/*\ncatalogMode: prefer\ncatalog:\n  foo: "1"`;
  expect(parseWorkspaceGlobs(yaml)).toEqual(["apps/*"]);
});

test("parseWorkspaceGlobs returns empty for YAML with no packages: section", () => {
  expect(parseWorkspaceGlobs("name: pantoken\nversion: 1")).toEqual([]);
});

test("discoverStringSources finds packages with src/i18n.json", () => {
  const root = join(tmpdir(), `ptk-discover-${Date.now()}`);
  // Fake workspace: one package with i18n.json, one without.
  mkdirSync(join(root, "pkg-a", "src"), { recursive: true });
  mkdirSync(join(root, "pkg-b", "src"), { recursive: true });
  writeFileSync(join(root, "pkg-a", "src", "i18n.json"), '{"back":"Back"}');
  writeFileSync(join(root, "pkg-a", "package.json"), '{"name":"@scope/pkg-a"}');
  writeFileSync(join(root, "pkg-b", "package.json"), '{"name":"@scope/pkg-b"}');
  writeFileSync(join(root, "pnpm-workspace.yaml"), "packages:\n  - pkg-a\n  - pkg-b\n");
  const sources = discoverStringSources(root);
  expect(sources).toHaveLength(1);
  expect(sources[0].package).toBe("@scope/pkg-a");
  expect(sources[0].absolutePath).toBe(join(root, "pkg-a", "src", "i18n.json"));
  rmSync(root, { recursive: true });
});

test("discoverStringSources sorts results by package name", () => {
  const root = join(tmpdir(), `ptk-discover-sort-${Date.now()}`);
  for (const name of ["z-pkg", "a-pkg"]) {
    mkdirSync(join(root, name, "src"), { recursive: true });
    writeFileSync(join(root, name, "src", "i18n.json"), "{}");
    writeFileSync(join(root, name, "package.json"), `{"name":"@scope/${name}"}`);
  }
  writeFileSync(join(root, "pnpm-workspace.yaml"), "packages:\n  - z-pkg\n  - a-pkg\n");
  const sources = discoverStringSources(root);
  expect(sources.map((s) => s.package)).toEqual(["@scope/a-pkg", "@scope/z-pkg"]);
  rmSync(root, { recursive: true });
});

// ── build-bundles: toIdentifier + buildLocaleFile ─────────────────────────────

const { toIdentifier, buildLocaleFile } = await import("../scripts/build-bundles.ts");

test("toIdentifier converts subtag locales to camelCase identifiers", () => {
  expect(toIdentifier("hu")).toBe("hu");
  expect(toIdentifier("en-AU")).toBe("enAU");
  expect(toIdentifier("pt-BR")).toBe("ptBR");
  expect(toIdentifier("zh-Hans")).toBe("zhHans");
});

test("buildLocaleFile produces valid TS for a translated locale (hu)", () => {
  const ts = buildLocaleFile("hu");
  expect(ts).toContain("export const hu: LocaleBundle");
  expect(ts).toContain('locale: "hu"');
  expect(ts).toContain('dir: "ltr"');
  // Hungarian translations should be non-empty overrides
  expect(ts).toContain("Vissza");
});

test("buildLocaleFile produces bare makeStrings() for English variants (en-AU)", () => {
  const ts = buildLocaleFile("en-AU");
  expect(ts).toContain("export const enAU: LocaleBundle");
  // en-AU has same values as English so no overrides argument
  expect(ts).toContain('makeStrings("en-AU")');
  expect(ts).not.toContain("prevMonth");
});

// ── translation-adapter ───────────────────────────────────────────────────────

vi.mock("@pantoken/translation-adapters", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@pantoken/translation-adapters")>();
  return { ...actual, spawnPrompt: vi.fn() };
});

const { GlossaryTranslationAdapter, AiTranslationAdapter, createTranslationAdapter } =
  await import("../scripts/lib/translation-adapter.ts");

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.I18N_TRANSLATION_ADAPTER;
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("GlossaryTranslationAdapter.translateBatch is a passthrough", async () => {
  const adapter = new GlossaryTranslationAdapter();
  expect(adapter.name).toBe("glossary");
  expect(adapter.translatesProse).toBe(false);
  const items = [
    { id: "back", text: "Back" },
    { id: "timeLabel", text: "Time" },
  ];
  const result = await adapter.translateBatch(items, "hu", "Hungarian (Magyar)");
  expect(result).toEqual({ back: "Back", timeLabel: "Time" });
});

test("GlossaryTranslationAdapter.translateBatch calls onChunk", async () => {
  const adapter = new GlossaryTranslationAdapter();
  const chunks: Record<string, string>[] = [];
  await adapter.translateBatch([{ id: "back", text: "Back" }], "hu", "Hungarian", (p) =>
    chunks.push(p),
  );
  expect(chunks).toHaveLength(1);
  expect(chunks[0]).toEqual({ back: "Back" });
});

test("createTranslationAdapter defaults to glossary", () => {
  expect(createTranslationAdapter().name).toBe("glossary");
});

test("createTranslationAdapter builds the ai adapter on request", () => {
  process.env.I18N_TRANSLATION_ADAPTER = "ai";
  expect(createTranslationAdapter().name).toBe("ai");
});

test("createTranslationAdapter throws on an unknown adapter name", () => {
  process.env.I18N_TRANSLATION_ADAPTER = "unknown";
  expect(() => createTranslationAdapter()).toThrow(/Unsupported I18N_TRANSLATION_ADAPTER/u);
});

test("AiTranslationAdapter.translateBatch parses JSON from the model and maps ids", async () => {
  const { spawnPrompt } = await import("@pantoken/translation-adapters");
  vi.mocked(spawnPrompt).mockResolvedValue(JSON.stringify({ back: "Vissza", timeLabel: "Idő" }));
  const adapter = new AiTranslationAdapter();
  const items = [
    { id: "back", text: "Back" },
    { id: "timeLabel", text: "Time" },
  ];
  const result = await adapter.translateBatch(items, "hu", "Hungarian (Magyar)");
  expect(result).toEqual({ back: "Vissza", timeLabel: "Idő" });
});

test("AiTranslationAdapter.translateBatch throws when the model response is not JSON", async () => {
  const { spawnPrompt } = await import("@pantoken/translation-adapters");
  vi.mocked(spawnPrompt).mockResolvedValue("not json at all");
  const adapter = new AiTranslationAdapter();
  await expect(
    adapter.translateBatch([{ id: "back", text: "Back" }], "hu", "Hungarian"),
  ).rejects.toThrow(/locale "hu"/u);
});

// ── translation-memory facade ─────────────────────────────────────────────────

const { TranslationMemory, keyFor } = await import("../scripts/lib/translation-memory.ts");

let memDir: string;

beforeEach(() => {
  memDir = join(tmpdir(), `ptk-mem-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(memDir, { recursive: true });
});

afterEach(() => {
  rmSync(memDir, { recursive: true, force: true });
});

test("keyFor returns a stable 64-char hex key", () => {
  const k = keyFor("back", "Back");
  expect(k).toHaveLength(64);
  expect(k).toMatch(/^[0-9a-f]+$/u);
  expect(k).toBe(keyFor("back", "Back"));
});

test("keyFor produces different keys for different inputs", () => {
  expect(keyFor("back", "Back")).not.toBe(keyFor("prevMonth", "Previous month"));
});

test("TranslationMemory.load returns empty memory for missing file", () => {
  const mem = TranslationMemory.load(memDir, "xx");
  expect(mem.get(keyFor("back", "Back"))).toBeUndefined();
});

test("TranslationMemory round-trips through save and reload", () => {
  const k = keyFor("back", "Back");
  const mem = TranslationMemory.load(memDir, "hu");
  mem.set(k, "Vissza");
  mem.save();
  const mem2 = TranslationMemory.load(memDir, "hu");
  expect(mem2.get(k)).toBe("Vissza");
});

test("TranslationMemory.get increments hits on cache hit", () => {
  const k = keyFor("back", "Back");
  const mem = TranslationMemory.load(memDir, "hu");
  mem.set(k, "Vissza");
  expect(mem.hits).toBe(0);
  mem.get(k);
  expect(mem.hits).toBe(1);
});

test("TranslationMemory.get increments misses on cache miss", () => {
  const mem = TranslationMemory.load(memDir, "hu");
  expect(mem.misses).toBe(0);
  mem.get(keyFor("back", "Back"));
  expect(mem.misses).toBe(1);
});
