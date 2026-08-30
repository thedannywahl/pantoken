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
  expect(indexContent).toContain("hu: LOCALE_HU,");
  expect(indexContent).toContain("fr: LOCALE_FR,");
});

test("generateLocaleBundles ignores non-JSON files in the cache directory", () => {
  const root = join(localeTestDir, "root");
  const outDir = join(localeTestDir, "out");
  mkdirSync(join(root, "i18n-cache"), { recursive: true });
  writeFileSync(join(root, "i18n-cache", "hu.json"), JSON.stringify({ greeting: "Szia" }));
  writeFileSync(join(root, "i18n-cache", "README.md"), "not a locale");

  generateLocaleBundles(root, outDir);

  const indexContent = readFileSync(join(outDir, "locales", "index.ts"), "utf8");
  expect(indexContent).toContain("hu: LOCALE_HU,");
  expect(indexContent).not.toContain("README");
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
