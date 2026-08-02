/**
 * Shared primitives for the docs and i18n translation pipelines.
 *
 * Both pipelines shell out to an AI CLI that reads a prompt via stdin and writes a response to
 * stdout. This module owns the spawn mechanism, JSON response parser, and the content-addressed
 * translation-memory core so neither pipeline has to duplicate them.
 *
 * @module
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { spawn } from "node:child_process";

/**
 * Pull the first `{…}` JSON object out of a model response, tolerating surrounding prose or code
 * fences. Returns `null` when no valid object is found.
 */
export function extractJsonObject(raw: string): Record<string, unknown> | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as unknown;
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * Spawn an AI command, send `prompt` via stdin, and resolve with the trimmed stdout.
 *
 * The caller is responsible for building `args` — the convention is that `-p` is always the final
 * arg so the `agy-wrapper.sh` can strip it and forward the prompt via agy's own `-p` flag.
 *
 * @param command - The executable (e.g. `"claude"` or a path to `agy-wrapper.sh`).
 * @param args    - Extra flags plus the terminal `-p` sentinel (e.g. `["--model", "x", "-p"]`).
 * @param prompt  - The prompt text; written to the child's stdin then the pipe is closed.
 * @param context - Optional label for the error message (e.g. `"locale 'hu'"` or `"foo.md"`).
 */
export function spawnPrompt(
  command: string,
  args: string[],
  prompt: string,
  context?: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      out += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      err += chunk;
    });
    // Cast to a minimal shape: ChildProcessByStdio omits .on() in @types/node ≥ 22.
    const proc = child as unknown as {
      on(event: "error", listener: (e: Error) => void): void;
      on(event: "close", listener: (code: number | null) => void): void;
    };
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code !== 0) {
        const where = context ? ` for ${context}` : "";
        reject(new Error(`AI command exited ${String(code)}${where}: ${err.trim()}`));
      } else {
        resolve(out.trimEnd());
      }
    });
    child.stdin.end(prompt);
  });
}

// ── Translation memory ────────────────────────────────────────────────────────

interface CacheFile {
  version: 1;
  entries: Record<string, string>;
}

/**
 * Content-addressed translation cache backed by a committed JSON file.
 *
 * Pipeline-specific facades (docs, i18n) wrap this with their own key-construction logic and
 * factory method — neither `get` nor `set` here computes a key; callers pass pre-computed hashes.
 *
 * Set `prune: true` (docs) to discard entries not touched this session on `save()` — keeps the
 * cache from accumulating stale keys after source content is deleted. Leave it off (i18n) to
 * preserve all entries across runs.
 */
export class TranslationMemory {
  readonly path: string;
  private readonly _entries: Map<string, string>;
  private readonly _prune: boolean;
  private readonly _used = new Set<string>();
  hits = 0;

  private constructor(path: string, entries: Map<string, string>, prune: boolean) {
    this.path = path;
    this._entries = entries;
    this._prune = prune;
  }

  /** Open (or create) a memory backed by `path`. */
  static open(path: string, options?: { prune?: boolean }): TranslationMemory {
    if (!existsSync(path)) return new TranslationMemory(path, new Map(), options?.prune ?? false);
    const parsed = JSON.parse(readFileSync(path, "utf8")) as CacheFile;
    return new TranslationMemory(
      path,
      new Map(Object.entries(parsed.entries ?? {})),
      options?.prune ?? false,
    );
  }

  /** Return a cached value and record a hit; returns `undefined` on a miss. */
  get(key: string): string | undefined {
    const val = this._entries.get(key);
    if (val !== undefined) {
      this._used.add(key);
      this.hits++;
    }
    return val;
  }

  /** Store a translated value and mark the key as used. */
  set(key: string, value: string): void {
    this._entries.set(key, value);
    this._used.add(key);
  }

  /** True when the key is present (no counter side-effects). */
  has(key: string): boolean {
    return this._entries.has(key);
  }

  /** Iterate all stored keys. */
  keys(): IterableIterator<string> {
    return this._entries.keys();
  }

  /** Write entries to disk, optionally pruning to only the keys touched this session. */
  save(): void {
    const source = this._prune ? [...this._used].sort() : [...this._entries.keys()].sort();
    const out: Record<string, string> = {};
    for (const key of source) {
      const val = this._entries.get(key);
      if (val !== undefined) out[key] = val;
    }
    mkdirSync(dirname(this.path), { recursive: true });
    writeFileSync(this.path, `${JSON.stringify({ version: 1, entries: out }, null, 2)}\n`);
  }
}

/** Compute a SHA-256 hex digest of `input`. */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}
