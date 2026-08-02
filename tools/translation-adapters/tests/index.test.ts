import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const spawn = vi.fn();
vi.mock("node:child_process", () => ({ spawn }));

const { extractJsonObject, sha256, spawnPrompt, TranslationMemory } =
  await import("../src/index.ts");

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
