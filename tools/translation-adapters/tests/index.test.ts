import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const spawn = vi.fn();
vi.mock("node:child_process", () => ({ spawn }));

const {
  extractJsonObject,
  generateLocaleBundles,
  isPassthroughTranslation,
  localeFamilyGlobs,
  parseI18nSource,
  resolveVerbatimAction,
  runI18nTranslationCli,
  sha256,
  spawnPrompt,
  TranslationMemory,
} = await import("../src/index.ts");

// ── extractJsonObject ─────────────────────────────────────────────────────────

test("extractJsonObject parses a bare JSON object", () => {
  expect(extractJsonObject('{"a":"1"}')).toEqual({ a: "1" });
});

test("extractJsonObject parses JSON wrapped in surrounding prose", () => {
  expect(extractJsonObject('Here is the result: {"x":"y"} — done.')).toEqual({ x: "y" });
});

test("extractJsonObject parses JSON wrapped in code fences", () => {
  expect(extractJsonObject('```json\n{"k":"v"}\n```')).toEqual({ k: "v" });
});

test("extractJsonObject returns null when no braces are present", () => {
  expect(extractJsonObject("just some text")).toBeNull();
});

test("extractJsonObject returns null for malformed JSON", () => {
  expect(extractJsonObject("{ bad: json }")).toBeNull();
});

test("extractJsonObject returns null for empty string", () => {
  expect(extractJsonObject("")).toBeNull();
});

// ── sha256 ────────────────────────────────────────────────────────────────────

test("sha256 returns a 64-character lowercase hex string", () => {
  const h = sha256("test");
  expect(h).toHaveLength(64);
  expect(h).toMatch(/^[0-9a-f]+$/u);
});

test("sha256 is deterministic for the same input", () => {
  expect(sha256("hello")).toBe(sha256("hello"));
});

test("sha256 produces different digests for different inputs", () => {
  expect(sha256("a")).not.toBe(sha256("b"));
});

// ── isPassthroughTranslation ──────────────────────────────────────────────────

test("isPassthroughTranslation is true for an identical echo", () => {
  expect(isPassthroughTranslation("Back", "Back")).toBe(true);
});

test("isPassthroughTranslation ignores case and surrounding whitespace", () => {
  expect(isPassthroughTranslation("Back", "  back  ")).toBe(true);
});

test("isPassthroughTranslation is false for a genuine translation", () => {
  expect(isPassthroughTranslation("Back", "Terug")).toBe(false);
});

test("isPassthroughTranslation is true for two empty strings", () => {
  expect(isPassthroughTranslation("", "")).toBe(true);
});

// ── parseI18nSource ────────────────────────────────────────────────────

test("parseI18nSource passes plain string entries through unchanged", () => {
  expect(parseI18nSource({ back: "Back" })).toEqual({ strings: { back: "Back" }, verbatim: {} });
});

test("parseI18nSource flattens a rich entry's string and captures its verbatim policy", () => {
  const result = parseI18nSource({
    datePlaceholder: { string: "yyyy-mm-dd", verbatim: "allow" },
  });
  expect(result.strings).toEqual({ datePlaceholder: "yyyy-mm-dd" });
  expect(result.verbatim).toEqual({ datePlaceholder: "allow" });
});

test("parseI18nSource omits the verbatim map entry when a rich entry has no policy", () => {
  const result = parseI18nSource({ back: { string: "Back" } });
  expect(result.strings).toEqual({ back: "Back" });
  expect(result.verbatim).toEqual({});
});

// ── resolveVerbatimAction ──────────────────────────────────────────────

test("resolveVerbatimAction defaults to error when no policy is declared", () => {
  expect(resolveVerbatimAction(undefined, "hu")).toBe("error");
});

test('resolveVerbatimAction treats "allow" as allow for every locale', () => {
  expect(resolveVerbatimAction("allow", "hu")).toBe("allow");
});

test("resolveVerbatimAction matches an exact locale code in the allow tier", () => {
  expect(resolveVerbatimAction({ allow: ["en-GB"] }, "en-GB")).toBe("allow");
  expect(resolveVerbatimAction({ allow: ["en-GB"] }, "en-CA")).toBe("error");
});

test("resolveVerbatimAction matches a prefix glob", () => {
  expect(resolveVerbatimAction({ allow: ["en*"] }, "en-GB")).toBe("allow");
  expect(resolveVerbatimAction({ allow: ["en*"] }, "hu")).toBe("error");
});

test("resolveVerbatimAction matches the wildcard for every locale", () => {
  expect(resolveVerbatimAction({ warn: ["*"] }, "hu")).toBe("warn");
});

test("resolveVerbatimAction checks allow before warn", () => {
  expect(resolveVerbatimAction({ allow: ["hu"], warn: ["*"] }, "hu")).toBe("allow");
});

test("resolveVerbatimAction falls back to error when no tier matches", () => {
  expect(resolveVerbatimAction({ allow: ["en*"], warn: ["fr"] }, "hu")).toBe("error");
});

test("resolveVerbatimAction falls through to defaultPolicy when the key's own tiers don't match", () => {
  expect(resolveVerbatimAction({ warn: ["nl"] }, "en-GB", { allow: ["en*"] })).toBe("allow");
});

test("resolveVerbatimAction lets a key's own error tier override a permissive defaultPolicy", () => {
  expect(resolveVerbatimAction({ error: ["en-GB"] }, "en-GB", "allow")).toBe("error");
});

test("resolveVerbatimAction lets a key's own tiers win over defaultPolicy when both match", () => {
  expect(resolveVerbatimAction({ warn: ["en-GB"] }, "en-GB", "allow")).toBe("warn");
});

// ── localeFamilyGlobs ───────────────────────────────────────────

test("localeFamilyGlobs collapses regional variants to one glob per base language", () => {
  expect(localeFamilyGlobs(["en-GB", "en-AU", "en-CA"])).toEqual(["en*"]);
});

test("localeFamilyGlobs handles a locale with no region subtag", () => {
  expect(localeFamilyGlobs(["hu"])).toEqual(["hu*"]);
});

test("localeFamilyGlobs returns a sorted, deduped glob per unique base language", () => {
  expect(localeFamilyGlobs(["fr-CA", "en-GB", "fr", "en-AU", "hu"])).toEqual(["en*", "fr*", "hu*"]);
});

test("localeFamilyGlobs returns an empty array for an empty locale list", () => {
  expect(localeFamilyGlobs([])).toEqual([]);
});

// ── TranslationMemory ─────────────────────────────────────────────────────────

let testDir: string;

beforeEach(() => {
  testDir = join(tmpdir(), `ptk-tm-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(testDir, { recursive: true });
  vi.clearAllMocks();
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
});

test("TranslationMemory.open returns an empty memory for a non-existent path", () => {
  const mem = TranslationMemory.open(join(testDir, "new.json"));
  expect(mem.hits).toBe(0);
  expect([...mem.keys()]).toEqual([]);
});

test("TranslationMemory.open loads entries from an existing JSON file", () => {
  const path = join(testDir, "cache.json");
  writeFileSync(path, JSON.stringify({ version: 1, entries: { abc: "hello" } }));
  const mem = TranslationMemory.open(path);
  expect(mem.get("abc")).toBe("hello");
});

test("TranslationMemory.get returns the stored value and increments hits", () => {
  const mem = TranslationMemory.open(join(testDir, "x.json"));
  mem.set("k", "v");
  expect(mem.hits).toBe(0);
  expect(mem.get("k")).toBe("v");
  expect(mem.hits).toBe(1);
});

test("TranslationMemory.get returns undefined and does not increment hits on a miss", () => {
  const mem = TranslationMemory.open(join(testDir, "x.json"));
  expect(mem.get("missing")).toBeUndefined();
  expect(mem.hits).toBe(0);
});

test("TranslationMemory.has checks presence without affecting hits", () => {
  const mem = TranslationMemory.open(join(testDir, "x.json"));
  mem.set("k", "v");
  expect(mem.has("k")).toBe(true);
  expect(mem.has("nope")).toBe(false);
  expect(mem.hits).toBe(0);
});

test("TranslationMemory.save writes a valid cache file with sorted keys", () => {
  const path = join(testDir, "out.json");
  const mem = TranslationMemory.open(path);
  mem.set("b", "second");
  mem.set("a", "first");
  mem.save();
  const parsed = JSON.parse(readFileSync(path, "utf8")) as {
    version: number;
    entries: Record<string, string>;
  };
  expect(parsed.version).toBe(1);
  expect(Object.keys(parsed.entries)).toEqual(["a", "b"]);
  expect(parsed.entries).toEqual({ a: "first", b: "second" });
});

test("TranslationMemory.save creates parent directories as needed", () => {
  const path = join(testDir, "nested", "deep", "cache.json");
  const mem = TranslationMemory.open(path);
  mem.set("k", "v");
  mem.save();
  expect(existsSync(path)).toBe(true);
});

test("TranslationMemory.save with prune:true discards untouched keys", () => {
  const path = join(testDir, "prune.json");
  writeFileSync(path, JSON.stringify({ version: 1, entries: { old: "stale", kept: "value" } }));
  const mem = TranslationMemory.open(path, { prune: true });
  mem.get("kept");
  mem.save();
  const parsed = JSON.parse(readFileSync(path, "utf8")) as { entries: Record<string, string> };
  expect(Object.keys(parsed.entries)).toEqual(["kept"]);
});

test("TranslationMemory.save without prune preserves all entries sorted", () => {
  const path = join(testDir, "noprune.json");
  writeFileSync(path, JSON.stringify({ version: 1, entries: { z: "last", old: "stale" } }));
  const mem = TranslationMemory.open(path);
  mem.set("a", "new");
  mem.save();
  const parsed = JSON.parse(readFileSync(path, "utf8")) as { entries: Record<string, string> };
  expect(Object.keys(parsed.entries)).toEqual(["a", "old", "z"]);
});

test("TranslationMemory exposes the file path", () => {
  const path = join(testDir, "p.json");
  expect(TranslationMemory.open(path).path).toBe(path);
});

// ── spawnPrompt ───────────────────────────────────────────────────────────────

type Responder = (prompt: string) => { stdout: string; code?: number; stderr?: string };

function useSpawn(responder: Responder): void {
  spawn.mockImplementation(() => {
    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter & { setEncoding: () => void };
      stderr: EventEmitter & { setEncoding: () => void };
      stdin: { end: (s: string) => void };
    };
    const stdout = Object.assign(new EventEmitter(), { setEncoding: () => {} });
    const stderr = Object.assign(new EventEmitter(), { setEncoding: () => {} });
    child.stdout = stdout;
    child.stderr = stderr;
    child.stdin = {
      end: (prompt: string) => {
        queueMicrotask(() => {
          const { stdout: out, code = 0, stderr: err = "" } = responder(prompt);
          if (err) stderr.emit("data", err);
          if (code === 0) stdout.emit("data", out);
          child.emit("close", code);
        });
      },
    };
    return child;
  });
}

test("spawnPrompt resolves with trimmed stdout on exit 0", async () => {
  useSpawn(() => ({ stdout: "hello world\n" }));
  const out = await spawnPrompt("echo", ["-p"], "prompt");
  expect(out).toBe("hello world");
});

test("spawnPrompt rejects with exit code on non-zero exit", async () => {
  useSpawn(() => ({ stdout: "", code: 2, stderr: "explode" }));
  await expect(spawnPrompt("cmd", ["-p"], "prompt")).rejects.toThrow(/exited 2.*explode/su);
});

test("spawnPrompt includes context in the error message when provided", async () => {
  useSpawn(() => ({ stdout: "", code: 1, stderr: "oops" }));
  await expect(spawnPrompt("cmd", ["-p"], "p", "locale 'hu'")).rejects.toThrow(/locale 'hu'/u);
});

test("spawnPrompt omits the context clause when context is not provided", async () => {
  useSpawn(() => ({ stdout: "", code: 1, stderr: "oops" }));
  await expect(spawnPrompt("cmd", ["-p"], "p")).rejects.toThrow(/exited 1: oops/u);
});

// ── runI18nTranslationCli ─────────────────────────────────────────────────────

let cliTestDir: string;

beforeEach(() => {
  cliTestDir = join(tmpdir(), `ptk-i18n-cli-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(cliTestDir, { recursive: true });
});

afterEach(() => {
  rmSync(cliTestDir, { recursive: true, force: true });
});

test("runI18nTranslationCli creates a new cache and saves translated missing keys", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "Szia" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
  } finally {
    logSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({
    hello: "Szia",
  });
});

test("runI18nTranslationCli skips a locale whose cache already has every key", async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ hello: "Szia" }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
  } finally {
    logSpy.mockRestore();
  }
  expect(spawn).not.toHaveBeenCalled();
});

test("I18N_TRANSLATION_FORCE=1 retranslates and overwrites an already-cached key", async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ hello: "stale" }));
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "Szia" }) }));
  process.env.I18N_TRANSLATION_FORCE = "1";
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
  } finally {
    logSpy.mockRestore();
    delete process.env.I18N_TRANSLATION_FORCE;
  }
  expect(spawn).toHaveBeenCalled();
  expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({
    hello: "Szia",
  });
});

test("runI18nTranslationCli always skips the 'en' locale, without touching its cache path", async () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["en"],
      cachePath: () => join(cliTestDir, "unreachable.json"),
    });
  } finally {
    logSpy.mockRestore();
  }
  expect(spawn).not.toHaveBeenCalled();
  expect(existsSync(join(cliTestDir, "unreachable.json"))).toBe(false);
});

test("runI18nTranslationCli supports a custom isCached predicate for legacy hash-keyed caches", async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ [sha256("hello")]: "Szia" }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      isCached: (key, cache) => sha256(key) in cache,
    });
  } finally {
    logSpy.mockRestore();
  }
  expect(spawn).not.toHaveBeenCalled();
});

test("runI18nTranslationCli exits the process when a locale's translation request fails", async () => {
  useSpawn(() => ({ stdout: "", code: 1, stderr: "boom" }));
  const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Failed to translate for locale hu"),
      expect.anything(),
    );
  } finally {
    exitSpy.mockRestore();
    errorSpy.mockRestore();
    logSpy.mockRestore();
  }
});

test("runI18nTranslationCli does not cache an AI response identical to the English source", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "Hello" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
    expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({});
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("identical to source"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
});

test("runI18nTranslationCli resets a previously-cached entry that matches the English source", async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ hello: "Hello" }));
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "Szia" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
    expect(spawn).toHaveBeenCalled();
    expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({
      hello: "Szia",
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("reset 1 previously-cached"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
});

test("runI18nTranslationCli warns and skips a missing or empty response value", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "   " }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
    });
    expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({});
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("missing or empty"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
});

test("runI18nTranslationCli audits a legacy hash-keyed cache via a custom cachedValue", async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ [sha256("hello")]: "Hello" }));
  useSpawn(() => ({ stdout: JSON.stringify({ hello: "Szia" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { hello: "Hello" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      isCached: (key, cache) => sha256(key) in cache || key in cache,
      cachedValue: (key, cache) => cache[sha256(key)] ?? cache[key],
    });
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  // The stale hash-keyed entry is stripped and the fresh translation is saved under the plain key.
  expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({ hello: "Szia" });
});

test('runI18nTranslationCli caches an "allow" verbatim entry even when identical to the source', async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ datePlaceholder: "yyyy-mm-dd" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { datePlaceholder: "yyyy-mm-dd" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      verbatim: { datePlaceholder: "allow" },
    });
    expect(warnSpy).not.toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({
    datePlaceholder: "yyyy-mm-dd",
  });
});

test('runI18nTranslationCli does not reset a previously-cached "allow" verbatim entry', async () => {
  writeFileSync(join(cliTestDir, "hu.json"), JSON.stringify({ datePlaceholder: "yyyy-mm-dd" }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { datePlaceholder: "yyyy-mm-dd" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      verbatim: { datePlaceholder: "allow" },
    });
    expect(spawn).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
});

test('runI18nTranslationCli caches but warns on a "warn"-tier verbatim entry identical to the source', async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ datePlaceholder: "yyyy-mm-dd" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { datePlaceholder: "yyyy-mm-dd" },
      targetLocales: ["hu"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      verbatim: { datePlaceholder: { warn: ["hu"] } },
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("verbatim policy: warn"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "hu.json"), "utf8"))).toEqual({
    datePlaceholder: "yyyy-mm-dd",
  });
});

test('runI18nTranslationCli still resets a verbatim entry for a locale outside its "allow" tier', async () => {
  writeFileSync(join(cliTestDir, "fr.json"), JSON.stringify({ datePlaceholder: "yyyy-mm-dd" }));
  useSpawn(() => ({ stdout: JSON.stringify({ datePlaceholder: "aaaa-mm-jj" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { datePlaceholder: "yyyy-mm-dd" },
      targetLocales: ["fr"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      verbatim: { datePlaceholder: { allow: ["en*"] } },
    });
    expect(spawn).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("reset 1 previously-cached"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "fr.json"), "utf8"))).toEqual({
    datePlaceholder: "aaaa-mm-jj",
  });
});

test("runI18nTranslationCli applies defaultVerbatim to a key with no per-key policy", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ back: "Back" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { back: "Back" },
      targetLocales: ["en-GB"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      defaultVerbatim: { allow: localeFamilyGlobs(["en-GB", "en-AU"]) },
    });
    expect(warnSpy).not.toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "en-GB.json"), "utf8"))).toEqual({
    back: "Back",
  });
});

test("runI18nTranslationCli falls through to defaultVerbatim when a per-key policy doesn't cover the locale", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ back: "Back" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { back: "Back" },
      targetLocales: ["en-GB"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      defaultVerbatim: "allow",
      verbatim: { back: { warn: ["nl"] } },
    });
    expect(warnSpy).not.toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "en-GB.json"), "utf8"))).toEqual({
    back: "Back",
  });
});

test("runI18nTranslationCli lets a per-key error tier override a permissive defaultVerbatim", async () => {
  useSpawn(() => ({ stdout: JSON.stringify({ back: "Back" }) }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  try {
    await runI18nTranslationCli({
      label: "test strings",
      source: { back: "Back" },
      targetLocales: ["en-GB"],
      cachePath: (locale) => join(cliTestDir, `${locale}.json`),
      defaultVerbatim: "allow",
      verbatim: { back: { error: ["en-GB"] } },
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("identical to source"));
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
  }
  expect(JSON.parse(readFileSync(join(cliTestDir, "en-GB.json"), "utf8"))).toEqual({});
});

// ── generateLocaleBundles ──────────────────────────────────────────────────────

let localeTestDir: string;

beforeEach(() => {
  localeTestDir = join(
    tmpdir(),
    `ptk-locales-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  mkdirSync(localeTestDir, { recursive: true });
});

afterEach(() => {
  rmSync(localeTestDir, { recursive: true, force: true });
});

test("generateLocaleBundles writes one module per locale plus an index re-exporting LOCALES", () => {
  const root = join(localeTestDir, "root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(join(root, "i18n-cache"), { recursive: true });
  writeFileSync(join(root, "i18n-cache", "hu.json"), JSON.stringify({ greeting: "Szia" }));
  writeFileSync(join(root, "i18n-cache", "fr.json"), JSON.stringify({ greeting: "Salut" }));

  generateLocaleBundles(root, outDir);

  const localesDir = join(outDir, "locales");
  const huContent = readFileSync(join(localesDir, "hu.ts"), "utf8");
  expect(huContent).toContain("export const LOCALE_HU");
  expect(huContent).toContain("Szia");

  const indexContent = readFileSync(join(localesDir, "index.ts"), "utf8");
  expect(indexContent).toContain('import { LOCALE_HU } from "./hu.js";');
  expect(indexContent).toContain('import { LOCALE_FR } from "./fr.js";');
  expect(indexContent).toContain('"hu": LOCALE_HU,');
  expect(indexContent).toContain('"fr": LOCALE_FR,');
});

test("generateLocaleBundles ignores non-JSON files in the cache directory", () => {
  const root = join(localeTestDir, "root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(join(root, "i18n-cache"), { recursive: true });
  writeFileSync(join(root, "i18n-cache", "hu.json"), JSON.stringify({ greeting: "Szia" }));
  writeFileSync(join(root, "i18n-cache", "README.md"), "not a locale");

  generateLocaleBundles(root, outDir);

  const indexContent = readFileSync(join(outDir, "locales", "index.ts"), "utf8");
  expect(indexContent).toContain('"hu": LOCALE_HU,');
  expect(indexContent).not.toContain("README");
});

test("generateLocaleBundles sanitizes hyphenated locale tags into valid JS identifiers", () => {
  const root = join(localeTestDir, "root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(join(root, "i18n-cache"), { recursive: true });
  writeFileSync(join(root, "i18n-cache", "en-AU.json"), JSON.stringify({ greeting: "G'day" }));

  generateLocaleBundles(root, outDir);

  const indexContent = readFileSync(join(outDir, "locales", "index.ts"), "utf8");
  expect(indexContent).toContain('import { LOCALE_EN_AU } from "./en-AU.js";');
  expect(indexContent).toContain('"en-AU": LOCALE_EN_AU,');
});

test("generateLocaleBundles writes an empty LOCALES index when i18n-cache doesn't exist", () => {
  const root = join(localeTestDir, "no-cache-root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(root, { recursive: true });

  generateLocaleBundles(root, outDir);

  const indexContent = readFileSync(join(outDir, "locales", "index.ts"), "utf8");
  expect(indexContent).toContain(
    "export const LOCALES: Record<string, Record<string, string>> = {",
  );
  expect(existsSync(join(outDir, "locales", "hu.ts"))).toBe(false);
});

test("generateLocaleBundles logs the generated locales when at least one is produced", () => {
  const root = join(localeTestDir, "root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(join(root, "i18n-cache"), { recursive: true });
  writeFileSync(join(root, "i18n-cache", "hu.json"), JSON.stringify({ greeting: "Szia" }));

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    generateLocaleBundles(root, outDir);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("hu"));
  } finally {
    logSpy.mockRestore();
  }
});

test("generateLocaleBundles does not log when no locales were produced", () => {
  const root = join(localeTestDir, "no-cache-root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(root, { recursive: true });

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  try {
    generateLocaleBundles(root, outDir);
    expect(logSpy).not.toHaveBeenCalled();
  } finally {
    logSpy.mockRestore();
  }
});
