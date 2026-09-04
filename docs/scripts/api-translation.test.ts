import { EventEmitter } from "node:events";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

// A fake child process: a stream stub for stdout/stderr plus stdin.end that triggers the response.
const spawn = vi.fn();
vi.mock("node:child_process", () => ({ spawn }));

const { GlossaryTranslationAdapter, AiTranslationAdapter, createTranslationAdapter } =
  await import("./api-translation.ts");

/** Extract the first {...} object from a prompt string (mirrors the model's expected input). */
function objectFromPrompt(prompt: string): Record<string, string> | null {
  const start = prompt.indexOf("{");
  const end = prompt.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(prompt.slice(start, end + 1)) as Record<string, string>;
  } catch {
    return null;
  }
}

type Responder = (prompt: string) => { stdout: string; code?: number; stderr?: string };

/** A responder that echoes each batch value back translated, and handles the single-line fallback. */
const echoResponder: Responder = (prompt) => {
  if (prompt.includes("Translate the VALUES of this JSON object")) {
    const payload = objectFromPrompt(prompt) ?? {};
    const out = Object.fromEntries(Object.entries(payload).map(([id, v]) => [id, `HU ${v}`]));
    return { stdout: JSON.stringify(out) };
  }
  // Single-line text fallback: the text is the last line of the prompt.
  const lines = prompt.split("\n");
  return { stdout: `HU ${lines[lines.length - 1]}` };
};

/** Install a spawn implementation that drives a FakeChild off `responder`. */
function useSpawn(responder: Responder): void {
  spawn.mockImplementation(() => {
    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter & { setEncoding: () => void };
      stderr: EventEmitter & { setEncoding: () => void };
      stdin: { end: (prompt: string) => void };
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

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_BATCH_BUDGET;
  delete process.env.DOCS_TRANSLATION_CONCURRENCY;
  delete process.env.DOCS_TRANSLATION_ADAPTER;
  delete process.env.DOCS_TRANSLATION_COMMAND;
  delete process.env.DOCS_TRANSLATION_COMMAND_ARGS;
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// --- GlossaryTranslationAdapter (deterministic, no spawn) ---

test("glossary adapter substitutes known heading and table-label terms", async () => {
  const g = new GlossaryTranslationAdapter();
  expect(g.name).toBe("glossary");
  expect(g.translatesProse).toBe(false);
  expect(await g.translateMarkdown("## Usage\n\nSome text.")).not.toBe("## Usage\n\nSome text.");
  expect(await g.translateText("Value")).not.toBe("Value");
});

test("glossary adapter leaves fenced code untouched", async () => {
  const g = new GlossaryTranslationAdapter();
  const input = ["## Usage", "", "```", "## Usage inside a fence", "```"].join("\n");
  const out = await g.translateMarkdown(input);
  expect(out).not.toContain("## Usage\n\n"); // heading translated
  expect(out).toContain("## Usage inside a fence"); // fenced line preserved verbatim
});

test("glossary adapter preserves @scope/package names", async () => {
  const g = new GlossaryTranslationAdapter();
  const out = await g.translateText("Import @pantoken/components Parameters.");
  expect(out).toContain("@pantoken/components");
  expect(out).not.toContain("Parameters"); // word-boundary rule translates the surrounding term
});

test("glossary adapter translateBatch fires onChunk with the full result", async () => {
  const g = new GlossaryTranslationAdapter();
  const chunks: Record<string, string>[] = [];
  const out = await g.translateBatch([{ id: "k1", text: "Overview" }], (p) => chunks.push(p));
  expect(out.k1).not.toBe("Overview");
  expect(chunks[0].k1).toBe(out.k1);
});

test("glossary adapter translates the js-requirement callout labels", async () => {
  const g = new GlossaryTranslationAdapter();
  const requirement = await g.translateText("JS Requirement");
  const enhancement = await g.translateText("JS Enhancement");
  expect(requirement).not.toBe("JS Requirement");
  expect(enhancement).not.toBe("JS Enhancement");
  expect(requirement).not.toBe(enhancement);
});

// --- createTranslationAdapter ---

test("createTranslationAdapter defaults to the glossary adapter", () => {
  expect(createTranslationAdapter().name).toBe("glossary");
});

test("createTranslationAdapter builds the ai adapter on request", () => {
  process.env.DOCS_TRANSLATION_ADAPTER = "ai";
  expect(createTranslationAdapter().name).toBe("ai");
});

test("createTranslationAdapter throws on an unknown adapter name", () => {
  process.env.DOCS_TRANSLATION_ADAPTER = "nope";
  expect(() => createTranslationAdapter()).toThrow(/Unsupported DOCS_TRANSLATION_ADAPTER/);
});

// --- AiTranslationAdapter.translateBatch → runBatch → extractJsonObject / chunkByBudget ---

test("translateBatch parses the model's JSON object and maps ids back to translations", async () => {
  useSpawn(echoResponder);
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([
    { id: "a", text: "Home" },
    { id: "b", text: "About" },
  ]);
  expect(out).toEqual({ a: "HU Home", b: "HU About" });
});

test("translateBatch restores masked package names and inline code around the model call", async () => {
  useSpawn(echoResponder);
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([{ id: "a", text: "See @pantoken/css and `code`." }]);
  // The model never sees the raw package/code tokens (they were masked); they're restored verbatim.
  expect(out.a).toContain("@pantoken/css");
  expect(out.a).toContain("`code`");
});

test("translateBatch masks bare escaped angle brackets between separately-masked code spans", async () => {
  // Simulates TypeDoc's generic-type rendering: `` `Readonly`\<`Record`\<`string`, `string`\>\> `` —
  // each backtick token is masked on its own, but the `\<`/`\>` glue between them isn't unless it's
  // masked too. A hostile responder that duplicates any bare `>` it sees would corrupt that glue if it
  // ever reached the model; asserting it's untouched proves the mask, not the responder, protects it.
  useSpawn((prompt) => {
    const lastLine = prompt.split("\n").at(-1) ?? "";
    return { stdout: lastLine.replace(/>/g, ">>>>>>>") };
  });
  const adapter = new AiTranslationAdapter();
  const input = "Use `Readonly`\\<`Record`\\<`string`, `string`\\>\\> to freeze the map.";
  const out = await adapter.translateText(input);
  expect(out).toBe(input);
});

test("translateBatch (batch mode) masks bare escaped angle brackets the same way", async () => {
  useSpawn((prompt) => {
    if (prompt.includes("Translate the VALUES")) {
      const payload = objectFromPrompt(prompt) ?? {};
      const out = Object.fromEntries(
        Object.entries(payload).map(([id, v]) => [id, v.replace(/>/g, ">>>>>>>")]),
      );
      return { stdout: JSON.stringify(out) };
    }
    return echoResponder(prompt);
  });
  const adapter = new AiTranslationAdapter();
  const input = "Returns `Promise`\\<`Readonly`\\<`Record`\\<`string`, `string`\\>\\>\\>.";
  const out = await adapter.translateBatch([{ id: "a", text: input }]);
  expect(out.a).toBe(input);
});

test("translateBatch streams each chunk through onChunk", async () => {
  useSpawn(echoResponder);
  const adapter = new AiTranslationAdapter();
  const seen: Record<string, string>[] = [];
  await adapter.translateBatch([{ id: "a", text: "Home" }], (p) => seen.push(p));
  expect(seen.length).toBeGreaterThan(0);
  expect(seen[0].a).toBe("HU Home");
});

test("translateBatch splits items across budget-limited chunks (chunkByBudget)", async () => {
  process.env.DOCS_TRANSLATION_BATCH_BUDGET = "5"; // tiny budget forces one item per chunk
  const batchPrompts: string[] = [];
  useSpawn((prompt) => {
    if (prompt.includes("Translate the VALUES")) batchPrompts.push(prompt);
    return echoResponder(prompt);
  });
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([
    { id: "a", text: "aaaaaa" },
    { id: "b", text: "bbbbbb" },
    { id: "c", text: "cccccc" },
  ]);
  expect(Object.keys(out)).toHaveLength(3);
  expect(batchPrompts).toHaveLength(3); // one runBatch call per over-budget item
});

test("translateBatch keeps a large single item in its own chunk", async () => {
  process.env.DOCS_TRANSLATION_BATCH_BUDGET = "3";
  useSpawn(echoResponder);
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([{ id: "a", text: "way-over-budget" }]);
  expect(out.a).toBe("HU way-over-budget");
});

test("runBatch degrades to per-item translateText when the model returns no JSON", async () => {
  useSpawn((prompt) => {
    if (prompt.includes("Translate the VALUES")) return { stdout: "sorry, no json here" };
    return echoResponder(prompt); // single-line fallback path
  });
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([{ id: "a", text: "Home" }]);
  // Fell back to translateText, whose responder echoes the last prompt line.
  expect(out.a).toBe("HU Home");
});

test("runBatch restores the source for a key the model omitted from its JSON", async () => {
  useSpawn((prompt) => {
    if (prompt.includes("Translate the VALUES")) {
      const payload = objectFromPrompt(prompt) ?? {};
      const [firstId] = Object.keys(payload);
      return { stdout: JSON.stringify({ [firstId]: `HU ${payload[firstId]}` }) };
    }
    return echoResponder(prompt);
  });
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([
    { id: "a", text: "First" },
    { id: "b", text: "Second" },
  ]);
  expect(out.a).toBe("HU First");
  expect(out.b).toBe("Second"); // omitted → restored to source
});

test("translateBatch logs and skips a chunk whose claude call fails, leaving its items uncached", async () => {
  useSpawn((prompt) => {
    if (prompt.includes("Translate the VALUES")) return { stdout: "", code: 1, stderr: "kaboom" };
    return echoResponder(prompt);
  });
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateBatch([{ id: "a", text: "Home" }]);
  expect(out.a).toBeUndefined(); // skipped, not translated
  expect(warnSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("skipped a batch"))).toBe(
    true,
  );
});

test("translateText trims the model output and restores package names", async () => {
  useSpawn((prompt) => ({ stdout: `  HU ${prompt.split("\n").pop()}  ` }));
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateText("Save @pantoken/css");
  expect(out.startsWith("HU ")).toBe(true);
  expect(out).toContain("@pantoken/css");
  expect(out).toBe(out.trim()); // no surrounding whitespace
});

test("translateMarkdown preserves code fences and package names through the model round trip", async () => {
  // Echo the prompt's markdown body back unchanged so we can assert the masking round-trips.
  useSpawn((prompt) => {
    const begin = prompt.indexOf("--- BEGIN MARKDOWN ---") + "--- BEGIN MARKDOWN ---".length;
    const end = prompt.indexOf("--- END MARKDOWN ---");
    return { stdout: prompt.slice(begin, end).trim() };
  });
  const adapter = new AiTranslationAdapter();
  const input = ["Use @pantoken/css and `inline`.", "", "```", "const x = 1;", "```"].join("\n");
  const out = await adapter.translateMarkdown(input, "a.md");
  expect(out).toContain("@pantoken/css");
  expect(out).toContain("`inline`");
  expect(out).toContain("const x = 1;");
});

test("translateMarkdown strips an echoed markdown envelope", async () => {
  useSpawn(() => ({
    stdout: "--- BEGIN MARKDOWN ---\n# เริ่มต้น\n\nเนื้อหา\n--- END MARKDOWN ---",
  }));
  const adapter = new AiTranslationAdapter();
  const out = await adapter.translateMarkdown("# Getting started\n\nContent", "a.md");
  expect(out).toBe("# เริ่มต้น\n\nเนื้อหา");
});

test("translateMarkdown masks bare escaped angle brackets a hostile model would otherwise mangle", async () => {
  // Reproduces the real corruption this guards against: a TypeDoc signature line like
  // `> \`const\` **X**: \`Readonly\`\<\`Record\`\<\`string\`, \`string\`\>\>` splits into several
  // separately-masked \`Token\` spans joined by bare \<`/`\>` glue outside any code span. A model that
  // duplicates every \`>\` it sees would corrupt that glue; the mask must remove it from the prompt
  // entirely so there's nothing for even a hostile model to mangle.
  useSpawn((prompt) => {
    const begin = prompt.indexOf("--- BEGIN MARKDOWN ---") + "--- BEGIN MARKDOWN ---".length;
    const end = prompt.indexOf("--- END MARKDOWN ---");
    return { stdout: prompt.slice(begin, end).trim().replace(/>/g, ">>>>>>>") };
  });
  const adapter = new AiTranslationAdapter();
  const input = "`const` **X**: `Readonly`\\<`Record`\\<`string`, `string`\\>\\>";
  const out = await adapter.translateMarkdown(input, "a.md");
  expect(out).toBe(input);
});

test("runClaude rejects with a descriptive error when the process exits non-zero", async () => {
  useSpawn(() => ({ stdout: "", code: 2, stderr: "explode" }));
  const adapter = new AiTranslationAdapter();
  await expect(adapter.translateText("Home")).rejects.toThrow(/exited 2.*explode/s);
});

test("ai adapter honors a custom command and args from the environment", async () => {
  process.env.DOCS_TRANSLATION_COMMAND = "my-cli";
  process.env.DOCS_TRANSLATION_COMMAND_ARGS = "--foo  --bar";
  useSpawn(echoResponder);
  const adapter = new AiTranslationAdapter();
  await adapter.translateText("Home");
  expect(spawn).toHaveBeenCalledWith("my-cli", ["--foo", "--bar", "-p"], expect.any(Object));
});
