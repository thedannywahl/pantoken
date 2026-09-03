import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { TranslationAdapter } from "./api-translation.ts";

// Back the committed cache with in-memory fs stubs so the tests never touch disk.
const existsSync = vi.fn<(path: string) => boolean>();
const mkdirSync = vi.fn();
const readFileSync = vi.fn<(path: string) => string>();
const writeFileSync = vi.fn<(path: string, data: string) => void>();

vi.mock("node:fs", () => ({ existsSync, mkdirSync, readFileSync, writeFileSync }));

const { TranslationMemory, keyFor, translateUnits } = await import("./translation-memory.ts");
type TranslationUnit = import("./translation-memory.ts").TranslationUnit;

let logSpy: ReturnType<typeof vi.spyOn>;
let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  existsSync.mockReturnValue(false);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** A fake adapter with configurable behavior for each translate method. */
function adapter(overrides: Partial<TranslationAdapter> = {}): TranslationAdapter {
  return {
    name: "fake",
    translateMarkdown: (input: string) => Promise.resolve(`md:${input}`),
    translateText: (input: string) => Promise.resolve(`text:${input}`),
    ...overrides,
  };
}

test("keyFor is deterministic and separates kinds", () => {
  expect(keyFor("prose", "hello")).toBe(keyFor("prose", "hello"));
  expect(keyFor("prose", "hello")).not.toBe(keyFor("text", "hello"));
  expect(keyFor("prose", "a")).not.toBe(keyFor("prose", "b"));
  expect(keyFor("prose", "hello")).toMatch(/^[0-9a-f]{64}$/);
});

test("load starts empty when no cache file exists", () => {
  existsSync.mockReturnValue(false);
  const memory = TranslationMemory.load("hu", "test");
  expect(readFileSync).not.toHaveBeenCalled();
  expect(memory.get("prose", "anything")).toBeUndefined();
  expect(memory.hits).toBe(0);
});

test("load reads and parses an existing cache file, and get counts hits", () => {
  const key = keyFor("prose", "Hello");
  const cached = "cached-translation";
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: cached } }));

  const memory = TranslationMemory.load("hu", "test");
  expect(memory.get("prose", "Hello")).toBe(cached);
  expect(memory.get("prose", "Hello")).toBe(cached);
  expect(memory.hits).toBe(2);
  expect(memory.get("prose", "missing")).toBeUndefined();
});

test("load tolerates a cache file with no entries field", () => {
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1 }));
  const memory = TranslationMemory.load("hu", "test");
  expect(memory.get("prose", "x")).toBeUndefined();
});

test("save prunes to keys touched this run and writes sorted JSON with a trailing newline", () => {
  // Seed two entries but only touch one this run; the untouched entry must be pruned.
  const keptKey = keyFor("prose", "kept");
  const staleKey = keyFor("prose", "stale");
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(
    JSON.stringify({ version: 1, entries: { [keptKey]: "megtartott", [staleKey]: "elavult" } }),
  );

  const memory = TranslationMemory.load("hu", "test");
  memory.get("prose", "kept"); // marks keptKey used
  memory.save();

  expect(mkdirSync).toHaveBeenCalledWith(expect.stringContaining("i18n-cache"), {
    recursive: true,
  });
  const written = writeFileSync.mock.calls[0][1];
  expect(written.endsWith("\n")).toBe(true);
  const payload = JSON.parse(written) as { version: number; entries: Record<string, string> };
  expect(payload.version).toBe(1);
  expect(Object.keys(payload.entries)).toEqual([keptKey]);
  expect(payload.entries[staleKey]).toBeUndefined();
});

test("set records a miss and marks the key used so save keeps it", () => {
  const memory = TranslationMemory.load("hu", "test");
  const translated = "cached-translation";
  memory.set("text", "Home", translated);
  expect(memory.misses).toBe(1);
  expect(memory.get("text", "Home")).toBe(translated);
  memory.save();
  const payload = JSON.parse(writeFileSync.mock.calls[0][1]) as {
    entries: Record<string, string>;
  };
  expect(payload.entries[keyFor("text", "Home")]).toBe(translated);
});

test("translateUnits serves cache hits without calling the adapter", async () => {
  const key = keyFor("text", "Home");
  const cached = "cached-translation";
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: cached } }));
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn();

  const result = await translateUnits(adapter({ translateText }), memory, [
    { kind: "text", source: "Home" },
  ]);

  expect(result.get(key)).toBe(cached);
  expect(translateText).not.toHaveBeenCalled();
  expect(memory.hits).toBe(1);
});

test("translateUnits force option retranslates and overwrites an existing cache hit", async () => {
  const key = keyFor("text", "Home");
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: "stale" } }));
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn((input: string) => Promise.resolve(`fresh:${input}`));

  const result = await translateUnits(
    adapter({ translateText, translateBatch: undefined }),
    memory,
    [{ kind: "text", source: "Home" }],
    { force: true },
  );

  expect(translateText).toHaveBeenCalledWith("Home");
  expect(result.get(key)).toBe("fresh:Home");
  memory.save();
  const payload = JSON.parse(writeFileSync.mock.calls[0][1]) as { entries: Record<string, string> };
  expect(payload.entries[key]).toBe("fresh:Home");
});

test("translateUnits defaults force to the DOCS_TRANSLATION_FORCE env var", async () => {
  const key = keyFor("text", "Home");
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: "stale" } }));
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn((input: string) => Promise.resolve(`fresh:${input}`));
  process.env.DOCS_TRANSLATION_FORCE = "1";

  try {
    const result = await translateUnits(
      adapter({ translateText, translateBatch: undefined }),
      memory,
      [{ kind: "text", source: "Home" }],
    );
    expect(translateText).toHaveBeenCalledWith("Home");
    expect(result.get(key)).toBe("fresh:Home");
  } finally {
    delete process.env.DOCS_TRANSLATION_FORCE;
  }
});

test("translateUnits dedupes identical sources into one translation", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn((input: string) => Promise.resolve(`text:${input}`));

  const units: TranslationUnit[] = [
    { kind: "text", source: "Save" },
    { kind: "text", source: "Save" },
  ];
  await translateUnits(adapter({ translateText, translateBatch: undefined }), memory, units);

  // Deduped: the repeated label is translated once.
  expect(translateText).toHaveBeenCalledTimes(1);
});

test("translateUnits translates markdown misses per file and caches them", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateMarkdown = vi.fn((input: string) => Promise.resolve(`HU(${input})`));

  const result = await translateUnits(adapter({ translateMarkdown }), memory, [
    { kind: "markdown", source: "# Title", filePath: "a.md" },
  ]);

  expect(translateMarkdown).toHaveBeenCalledWith("# Title", "a.md");
  expect(result.get(keyFor("markdown", "# Title"))).toBe("HU(# Title)");
  expect(memory.misses).toBe(1);
});

test("translateUnits autosaves after each markdown miss when asked", async () => {
  const memory = TranslationMemory.load("hu", "test");
  await translateUnits(adapter(), memory, [{ kind: "markdown", source: "# A", filePath: "a.md" }], {
    autosave: true,
  });
  expect(writeFileSync).toHaveBeenCalled();
});

test("translateUnits logs progress for each markdown file translated", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const units: TranslationUnit[] = Array.from({ length: 3 }, (_, i) => ({
    kind: "markdown",
    source: `# File ${i}`,
    filePath: `f${i}.md`,
  }));
  await translateUnits(adapter(), memory, units);
  expect(logSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("1/3 f0.md"))).toBe(true);
  expect(logSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("3/3 f2.md"))).toBe(true);
});

test("translateUnits logs and skips a markdown file that fails, without caching it", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateMarkdown = vi.fn(() => Promise.reject(new Error("boom")));

  const result = await translateUnits(adapter({ translateMarkdown }), memory, [
    { kind: "markdown", source: "# Bad", filePath: "bad.md" },
  ]);

  expect(result.has(keyFor("markdown", "# Bad"))).toBe(false);
  expect(memory.misses).toBe(0);
  expect(warnSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("skipped bad.md"))).toBe(
    true,
  );
});

test("translateUnits skip message falls back to a label and stringifies non-Error throws", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateMarkdown = vi.fn(() => Promise.reject("plain string failure"));

  await translateUnits(adapter({ translateMarkdown }), memory, [
    { kind: "markdown", source: "# NoPath" },
  ]);

  const message = String(warnSpy.mock.calls[0]?.[0]);
  expect(message).toContain("a markdown unit");
  expect(message).toContain("plain string failure");
});

test("translateUnits batches text + prose misses through translateBatch and streams persistence", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const seen: number[] = [];
  const translateBatch = vi.fn(
    (
      items: readonly { id: string; text: string }[],
      onChunk?: (partial: Record<string, string>) => void,
    ) => {
      const out = Object.fromEntries(items.map((i) => [i.id, `HU:${i.text}`]));
      onChunk?.(out); // stream once
      seen.push(items.length);
      return Promise.resolve(out);
    },
  );

  const result = await translateUnits(
    adapter({ translateBatch }),
    memory,
    [
      { kind: "text", source: "Save" },
      { kind: "prose", source: "A real sentence." },
    ],
    { autosave: true },
  );

  expect(result.get(keyFor("text", "Save"))).toBe("HU:Save");
  expect(result.get(keyFor("prose", "A real sentence."))).toBe("HU:A real sentence.");
  expect(seen[0]).toBe(2); // both units batched together
  expect(memory.misses).toBe(2);
  expect(writeFileSync).toHaveBeenCalled(); // autosave fired inside persist
  expect(
    logSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("labels + prose blocks")),
  ).toBe(true);
});

test("translateUnits falls back to per-item translateText when translateBatch is absent", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn((input: string) => Promise.resolve(`text:${input}`));

  const result = await translateUnits(
    adapter({ translateText, translateBatch: undefined }),
    memory,
    [
      { kind: "text", source: "Home" },
      { kind: "text", source: "About" },
    ],
  );

  expect(translateText).toHaveBeenCalledTimes(2);
  expect(result.get(keyFor("text", "Home"))).toBe("text:Home");
  expect(result.get(keyFor("text", "About"))).toBe("text:About");
});

test("translateUnits passes a batchable miss through as source (uncached) when the model drops it", async () => {
  const memory = TranslationMemory.load("hu", "test");
  // Return only one of the two ids; the dropped one must render as source and stay a miss.
  const translateBatch = vi.fn((items: readonly { id: string; text: string }[]) =>
    Promise.resolve({ [items[0].id]: `HU:${items[0].text}` }),
  );

  const result = await translateUnits(adapter({ translateBatch }), memory, [
    { kind: "text", source: "First" },
    { kind: "text", source: "Second" },
  ]);

  expect(result.get(keyFor("text", "First"))).toBe("HU:First");
  // Dropped key: passthrough of the source, not cached (memory recorded only the one real hit).
  expect(result.get(keyFor("text", "Second"))).toBe("Second");
  expect(memory.misses).toBe(1);
});

test("translateUnits does not cache glossary-only prose (poison-cache guard)", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateBatch = vi.fn();

  const result = await translateUnits(adapter({ translatesProse: false, translateBatch }), memory, [
    { kind: "prose", source: "Untranslatable prose." },
  ]);

  // Prose is served as its source but never reaches the batch adapter or the cache.
  expect(result.get(keyFor("prose", "Untranslatable prose."))).toBe("Untranslatable prose.");
  expect(translateBatch).not.toHaveBeenCalled();
  expect(memory.misses).toBe(0);
});

test("translateUnits persist ignores a re-seen chunk without double counting", async () => {
  const memory = TranslationMemory.load("hu", "test");
  // Stream the same chunk twice; the second persist call must be a no-op (added === 0).
  const translateBatch = vi.fn(
    (
      items: readonly { id: string; text: string }[],
      onChunk?: (partial: Record<string, string>) => void,
    ) => {
      const out = Object.fromEntries(items.map((i) => [i.id, `HU:${i.text}`]));
      onChunk?.(out);
      onChunk?.(out); // duplicate stream
      return Promise.resolve(out);
    },
  );

  await translateUnits(adapter({ translateBatch }), memory, [{ kind: "text", source: "Once" }], {
    autosave: true,
  });

  // One real unit → set exactly once despite the duplicate stream.
  expect(memory.misses).toBe(1);
});

test("translateUnits does not cache a markdown translation identical to its source", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateMarkdown = vi.fn((input: string) => Promise.resolve(input));

  const result = await translateUnits(adapter({ translateMarkdown }), memory, [
    { kind: "markdown", source: "# Same", filePath: "same.md" },
  ]);

  expect(result.has(keyFor("markdown", "# Same"))).toBe(false);
  expect(memory.misses).toBe(0);
  expect(
    warnSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("looks untranslated")),
  ).toBe(true);
});

test("translateUnits does not cache a batched translation identical to its source", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateBatch = vi.fn((items: readonly { id: string; text: string }[]) =>
    Promise.resolve(Object.fromEntries(items.map((i) => [i.id, i.text]))),
  );

  const result = await translateUnits(adapter({ translateBatch }), memory, [
    { kind: "text", source: "Home" },
  ]);

  expect(result.get(keyFor("text", "Home"))).toBe("Home");
  expect(memory.misses).toBe(0);
  expect(
    warnSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("looks untranslated")),
  ).toBe(true);
});

test("translateUnits identifies the locale and source file for an untranslated batch unit", async () => {
  const memory = TranslationMemory.load("hu", "demos");
  const translateBatch = vi.fn((items: readonly { id: string; text: string }[]) =>
    Promise.resolve(Object.fromEntries(items.map((item) => [item.id, item.text]))),
  );

  await translateUnits(
    adapter({ translateBatch }),
    memory,
    [{ kind: "text", source: "Modifier", filePath: "demos/view/i18n.json#text5" }],
    { locale: "hu" },
  );

  expect(
    warnSpy.mock.calls.some((call: unknown[]) =>
      String(call[0]).includes("[hu demos/view/i18n.json#text5]"),
    ),
  ).toBe(true);
});

test("translateUnits retranslates a cached hit that matches its source instead of serving it", async () => {
  const key = keyFor("text", "Home");
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: "Home" } }));
  const memory = TranslationMemory.load("hu", "test");
  const translateText = vi.fn((input: string) => Promise.resolve(`fresh:${input}`));

  const result = await translateUnits(
    adapter({ translateText, translateBatch: undefined }),
    memory,
    [{ kind: "text", source: "Home" }],
  );

  expect(translateText).toHaveBeenCalledWith("Home");
  expect(result.get(key)).toBe("fresh:Home");
});

test("translateUnits verbatimSources exempts a matching source from the passthrough guard", async () => {
  const memory = TranslationMemory.load("hu", "test");
  const translateBatch = vi.fn((items: readonly { id: string; text: string }[]) =>
    Promise.resolve(Object.fromEntries(items.map((i) => [i.id, i.text]))),
  );

  const result = await translateUnits(
    adapter({ translateBatch }),
    memory,
    [{ kind: "text", source: "yyyy-mm-dd" }],
    { verbatimSources: new Set(["yyyy-mm-dd"]) },
  );

  expect(result.get(keyFor("text", "yyyy-mm-dd"))).toBe("yyyy-mm-dd");
  expect(memory.misses).toBe(1);
  expect(
    warnSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("looks untranslated")),
  ).toBe(false);
});

test("translateUnits requiredVerbatimSources bypasses translation and overwrites stale cache", async () => {
  const source = "-text-align-start";
  const key = keyFor("text", source);
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(JSON.stringify({ version: 1, entries: { [key]: "translated" } }));
  const memory = TranslationMemory.load("hu", "demos");
  const translateBatch = vi.fn();

  const result = await translateUnits(
    adapter({ translateBatch }),
    memory,
    [{ kind: "text", source }],
    { force: true, requiredVerbatimSources: new Set([source]) },
  );

  expect(translateBatch).not.toHaveBeenCalled();
  expect(result.get(key)).toBe(source);
  memory.save();
  const payload = JSON.parse(writeFileSync.mock.calls[0][1]) as { entries: Record<string, string> };
  expect(payload.entries[key]).toBe(source);
});

test("translateUnits defaultVerbatim caches an English regional identity translation", async () => {
  const memory = TranslationMemory.load("en-GB", "api");
  const translateBatch = vi.fn((items: readonly { id: string; text: string }[]) =>
    Promise.resolve(Object.fromEntries(items.map((item) => [item.id, item.text]))),
  );

  const result = await translateUnits(
    adapter({ translateBatch }),
    memory,
    [{ kind: "text", source: "Home" }],
    { locale: "en-GB", defaultVerbatim: { allow: ["en*"] } },
  );

  expect(result.get(keyFor("text", "Home"))).toBe("Home");
  expect(memory.misses).toBe(1);
  expect(
    warnSpy.mock.calls.some((call: unknown[]) => String(call[0]).includes("looks untranslated")),
  ).toBe(false);
});
