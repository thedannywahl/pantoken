/**
 * Locale translation adapter primitives for generated API docs.
 *
 * The default adapter is deterministic and keyless (safe for CI), while the adapter contract keeps
 * room for higher-quality engines later.
 */
import { spawn } from "node:child_process";

export interface TranslationAdapter {
  readonly name: string;
  /**
   * Whether this adapter produces real prose translations. The glossary sets this `false`: it only
   * knows structural terms, so the pipeline must not treat its passthrough of a prose block as a
   * translation (see the poison-cache guard in {@link ./translation-memory.ts}). Defaults to `true`.
   */
  readonly translatesProse?: boolean;
  translateMarkdown(input: string, filePath: string): Promise<string>;
  translateText(input: string): Promise<string>;
  /**
   * Translate many short strings in one request. Returns a map keyed by each item's `id`. Optional:
   * callers fall back to per-item {@link TranslationAdapter.translateText} when it's absent.
   *
   * `onChunk` (if given) is called with each chunk's partial results as it completes, so a caller can
   * persist and report progress mid-run rather than only after the whole batch returns. Chunks may
   * run concurrently, so `onChunk` can fire out of order.
   */
  translateBatch?(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>>;
}

const SORTED_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bType Parameters\b/g, "Típusparaméterek"],
  [/\bType parameter\b/g, "Típusparaméter"],
  [/\bParameters\b/g, "Paraméterek"],
  [/\bParameter\b/g, "Parameter"],
  [/\bReturns\b/g, "Visszatérés"],
  [/\bReturn type\b/g, "Visszatérési típus"],
  [/\bThrows\b/g, "Kivételek"],
  [/\bDefined in\b/g, "Definiálva itt"],
  [/\bInherited from\b/g, "Örökölve innen"],
  [/\bImplemented by\b/g, "Implementálja"],
  [/\bImplementation of\b/g, "Implementációja"],
  [/\bOverrides\b/g, "Felülírja"],
  [/\bProperties\b/g, "Tulajdonságok"],
  [/\bProperty\b/g, "Tulajdonság"],
  [/\bMethods\b/g, "Metódusok"],
  [/\bMethod\b/g, "Metódus"],
  [/\bFunctions\b/g, "Függvények"],
  [/\bFunction\b/g, "Függvény"],
  [/\bVariables\b/g, "Változók"],
  [/\bVariable\b/g, "Változó"],
  [/\bInterfaces\b/g, "Interfészek"],
  [/\bInterface\b/g, "Interfész"],
  [/\bClasses\b/g, "Osztályok"],
  [/\bClass\b/g, "Osztály"],
  [/\bConstructors\b/g, "Konstruktorok"],
  [/\bConstructor\b/g, "Konstruktor"],
  [/\bEnumerations\b/g, "Felsorolások"],
  [/\bEnumeration\b/g, "Felsorolás"],
  [/\bType Aliases\b/g, "Típusaliasok"],
  [/\bType Alias\b/g, "Típusalias"],
  [/\bReferences\b/g, "Hivatkozások"],
  [/\bReference\b/g, "Hivatkozás"],
  [/\bReadonly\b/g, "Csak olvasható"],
  [/\bOptional\b/g, "Opcionális"],
  [/\bDeprecated\b/g, "Elavult"],
  [/\bExample\b/g, "Példa"],
  [/\bExamples\b/g, "Példák"],
  [/\bSee also\b/g, "Lásd még"],
  [/\bHierarchy\b/g, "Hierarchia"],
  [/\bIndex\b/g, "Index"],
  [/\bPackage\b/g, "Csomag"],
  [/\bModule\b/g, "Modul"],
  [/\bNamespaces\b/g, "Névterek"],
  [/\bNamespace\b/g, "Névtér"],
  [/\bCall Signature\b/g, "Hívási szignatúra"],
  [/\bSignatures\b/g, "Szignatúrák"],
  [/\bSignature\b/g, "Szignatúra"],
  [/\bDescription\b/g, "Leírás"],
  [/\bDefault Value\b/g, "Alapértelmezett érték"],
  [/\bSource\b/g, "Forrás"],
  [/\bGenerated using\b/g, "Generálva ezzel"],
  [/\bAPI reference\b/g, "API referencia"],
  // cssdoc section headings. These arrived with the cssdoc doc-block tags (@accessibility, @usage,
  // @modifier, …) after the glossary was last touched, so they rendered in English. Anchored to a
  // whole heading line (^…$) on purpose: many are common words ("usage", "related", "states",
  // "structure") that must NOT be translated when they appear in prose — only as a section heading.
  [/^(#{1,6} )Accessibility$/gm, "$1Akadálymentesség"],
  [/^(#{1,6} )Usage$/gm, "$1Használat"],
  [/^(#{1,6} )Demo$/gm, "$1Demó"],
  [/^(#{1,6} )Structure$/gm, "$1Felépítés"],
  [/^(#{1,6} )Slots$/gm, "$1Slotok"],
  [/^(#{1,6} )Modifiers$/gm, "$1Módosítók"],
  [/^(#{1,6} )Parts$/gm, "$1Részek"],
  [/^(#{1,6} )Pseudo-elements$/gm, "$1Pszeudoelemek"],
  [/^(#{1,6} )States$/gm, "$1Állapotok"],
  [/^(#{1,6} )Custom properties$/gm, "$1Egyéni tulajdonságok"],
  [/^(#{1,6} )Conditions$/gm, "$1Feltételek"],
  [/^(#{1,6} )Animations$/gm, "$1Animációk"],
  [/^(#{1,6} )Tokens consumed$/gm, "$1Felhasznált tokenek"],
  [/^(#{1,6} )Browser support$/gm, "$1Böngészőtámogatás"],
  [/^(#{1,6} )Subcomponents$/gm, "$1Alkomponensek"],
  [/^(#{1,6} )Related$/gm, "$1Kapcsolódó"],
  [/^(#{1,6} )Extends$/gm, "$1Kiterjeszti"],
  // API overview (write-api-overview.ts) section headings.
  [/^(#{1,6} )Start here$/gm, "$1Kezdd itt"],
  [/^(#{1,6} )Browse by group$/gm, "$1Böngéssz csoport szerint"],
  // Stability-tier badge labels. Anchored to the doc-tag pill so a stray "Beta"/"Alpha" in prose is
  // never touched. Deprecated is covered by the \bDeprecated\b entry above.
  [/(pantoken-doc-tag">)Alpha(<)/g, "$1Alfa$2"],
  [/(pantoken-doc-tag">)Beta(<)/g, "$1Béta$2"],
  [/(pantoken-doc-tag">)Experimental(<)/g, "$1Kísérleti$2"],
  // cssdoc table column labels. Anchored to the WHOLE string (^…$): the segmenter feeds each header
  // cell as its own glossary unit, so these fire on an isolated "Value"/"Name"/"Type" cell but never
  // on those common words inside a prose sentence. Description/Class are already handled above.
  [/^Modifier$/g, "Módosító"],
  [/^Pseudo-element$/g, "Pszeudoelem"],
  [/^Part$/g, "Rész"],
  [/^State$/g, "Állapot"],
  [/^Slot$/g, "Slot"],
  [/^Animation$/g, "Animáció"],
  [/^Token$/g, "Token"],
  [/^Type$/g, "Típus"],
  [/^Value$/g, "Érték"],
  [/^Query$/g, "Lekérdezés"],
  [/^Name$/g, "Név"],
  [/^Summary$/g, "Összegzés"],
  [/^Default$/g, "Alapértelmezett"],
  // API-overview table first-column headers (the second column is `Description`, handled above).
  [/^Area$/g, "Terület"],
  [/^Group$/g, "Csoport"],
  // CSS reference section groups (from formats/components via @cssdoc/typedoc). These label the CSS
  // nav tree (typedoc-sidebar.json) as isolated strings AND appear as `## …` headings in
  // api/css/index.md, so each gets both a whole-string form (^…$) for the sidebar label and a
  // heading-anchored form (^# …$) for the overview page. Common words, so both are anchored to never
  // fire inside prose.
  [/^(#{1,6} )Overview$/gm, "$1Áttekintés"],
  [/^(#{1,6} )Components$/gm, "$1Komponensek"],
  [/^(#{1,6} )Utilities$/gm, "$1Segédosztályok"],
  [/^(#{1,6} )Rules$/gm, "$1Szabályok"],
  [/^(#{1,6} )Declarations$/gm, "$1Deklarációk"],
  [/^Overview$/g, "Áttekintés"],
  [/^Components$/g, "Komponensek"],
  [/^Utilities$/g, "Segédosztályok"],
  [/^Rules$/g, "Szabályok"],
  [/^Declarations$/g, "Deklarációk"],
];

export class GlossaryTranslationAdapter implements TranslationAdapter {
  readonly name = "glossary";
  // Deterministic term substitution only — it cannot translate prose, so the memory must never cache
  // its output under a prose key.
  readonly translatesProse = false;

  translateMarkdown(input: string): Promise<string> {
    return Promise.resolve(translateWithoutFencedCode(input, (text) => this.translateSync(text)));
  }

  translateText(input: string): Promise<string> {
    return Promise.resolve(this.translateSync(input));
  }

  /** The deterministic core — synchronous; the async methods just wrap it to satisfy the contract. */
  private translateSync(input: string): string {
    const preserved = preservePackageNames(input);
    let out = preserved.text;
    for (const [pattern, value] of SORTED_REPLACEMENTS) {
      out = out.replace(pattern, value);
    }
    return restorePackageNames(out, preserved.packageNames);
  }

  translateBatch(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    const out = Object.fromEntries(items.map((item) => [item.id, this.translateSync(item.text)]));
    onChunk?.(out);
    return Promise.resolve(out);
  }
}

const replaceBlocks = (
  input: string,
  pattern: RegExp,
  markerPrefix: string,
): { text: string; blocks: string[] } => {
  const blocks: string[] = [];
  const text = input.replace(pattern, (match) => {
    const marker = `__${markerPrefix}_${blocks.length}__`;
    blocks.push(match);
    return marker;
  });
  return { text, blocks };
};

const restoreBlocks = (input: string, blocks: string[], markerPrefix: string): string => {
  let out = input;
  for (const [index, block] of blocks.entries()) {
    out = out.replaceAll(`__${markerPrefix}_${index}__`, block);
  }
  return out;
};

const preserveMarkdownSensitiveBlocks = (
  input: string,
): {
  text: string;
  codeBlocks: string[];
  inlineCodeBlocks: string[];
} => {
  const fenced = replaceBlocks(input, /```[\s\S]*?```/g, "PTK_CODE_BLOCK");
  const inline = replaceBlocks(fenced.text, /`[^`\n]+`/g, "PTK_INLINE_CODE");
  return {
    text: inline.text,
    codeBlocks: fenced.blocks,
    inlineCodeBlocks: inline.blocks,
  };
};

const restoreMarkdownSensitiveBlocks = (
  input: string,
  codeBlocks: string[],
  inlineCodeBlocks: string[],
): string => {
  const withCode = restoreBlocks(input, codeBlocks, "PTK_CODE_BLOCK");
  return restoreBlocks(withCode, inlineCodeBlocks, "PTK_INLINE_CODE");
};

const preservePackageNames = (input: string): { text: string; packageNames: string[] } => {
  const packagePattern = /@[a-z0-9][a-z0-9.-]*\/[a-z0-9][a-z0-9.-]*/gi;
  const packageNames: string[] = [];

  const text = input.replace(packagePattern, (match) => {
    const marker = `__PTK_PACKAGE_${packageNames.length}__`;
    packageNames.push(match);
    return marker;
  });

  return { text, packageNames };
};

/** Pull the first `{…}` JSON object out of a model response (tolerating code fences), or `null`. */
const extractJsonObject = (raw: string): Record<string, unknown> | null => {
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
};

const restorePackageNames = (input: string, packageNames: string[]): string => {
  let out = input;
  for (const [index, packageName] of packageNames.entries()) {
    out = out.replaceAll(`__PTK_PACKAGE_${index}__`, packageName);
  }
  return out;
};

const translateWithoutFencedCode = (input: string, translate: (line: string) => string): string => {
  const lines = input.split("\n");
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    out.push(translate(line));
  }

  return out.join("\n");
};

/** Run `tasks` with at most `limit` in flight at once, preserving result order. */
const mapPool = async <T, R>(
  tasks: readonly T[],
  limit: number,
  fn: (task: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = Array.from({ length: tasks.length });
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < tasks.length) {
      const index = next++;
      results[index] = await fn(tasks[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
};

export class ClaudeCodeTranslationAdapter implements TranslationAdapter {
  readonly name = "claude-code";

  private readonly command: string;
  private readonly args: string[];

  constructor() {
    this.command = process.env.DOCS_TRANSLATION_COMMAND ?? "claude";
    this.args = (process.env.DOCS_TRANSLATION_COMMAND_ARGS ?? "")
      .split(" ")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }

  async translateMarkdown(input: string, filePath: string): Promise<string> {
    const preservedMarkdown = preserveMarkdownSensitiveBlocks(input);
    const preservedPackages = preservePackageNames(preservedMarkdown.text);
    const prompt = [
      "Translate this technical markdown from English to Hungarian.",
      "Return only the translated markdown.",
      "Rules:",
      "- Keep markdown structure unchanged.",
      "- Do not alter placeholder tokens like __PTK_CODE_BLOCK_#__ or __PTK_INLINE_CODE_#__.",
      "- Do not alter placeholder tokens like __PTK_PACKAGE_#__.",
      "- Preserve whitespace and line breaks.",
      "- Keep import paths, package names, URLs, and identifiers intact.",
      `File: ${filePath}`,
      "--- BEGIN MARKDOWN ---",
      preservedPackages.text,
      "--- END MARKDOWN ---",
    ].join("\n");

    const translated = await this.runClaude(prompt, `markdown file ${filePath}`);
    const restoredPackages = restorePackageNames(translated, preservedPackages.packageNames);
    return restoreMarkdownSensitiveBlocks(
      restoredPackages,
      preservedMarkdown.codeBlocks,
      preservedMarkdown.inlineCodeBlocks,
    );
  }

  async translateText(input: string): Promise<string> {
    const preserved = preservePackageNames(input);
    const prompt = [
      "Translate this technical UI text from English to Hungarian.",
      "Return only the translation.",
      "Keep identifiers and package names unchanged.",
      "Do not alter placeholder tokens like __PTK_PACKAGE_#__.",
      "Text:",
      preserved.text,
    ].join("\n");

    const translated = (await this.runClaude(prompt, "single text line")).trim();
    return restorePackageNames(translated, preserved.packageNames);
  }

  async translateBatch(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    // Split into character-budgeted chunks. Each chunk is one `claude -p` call; because the run is
    // generation-bound (the model streaming ~a chunk's worth of translations dominates the fixed
    // startup), running several chunks concurrently is the real wall-clock lever. Smaller chunks keep
    // each JSON response reliable and give finer progress; the pool hides their startup cost.
    const BUDGET = Number(process.env.DOCS_TRANSLATION_BATCH_BUDGET) || 4000;
    const CONCURRENCY = Number(process.env.DOCS_TRANSLATION_CONCURRENCY) || 5;
    const chunks: { id: string; text: string }[][] = [];
    let chunk: { id: string; text: string }[] = [];
    let size = 0;
    for (const item of items) {
      if (size + item.text.length > BUDGET && chunk.length > 0) {
        chunks.push(chunk);
        chunk = [];
        size = 0;
      }
      chunk.push(item);
      size += item.text.length;
    }
    if (chunk.length > 0) chunks.push(chunk);

    const out: Record<string, string> = {};
    await mapPool(chunks, CONCURRENCY, async (group) => {
      // A failed chunk must not sink the whole run or poison the cache: log it and skip. Its items go
      // uncached (the caller leaves them as source), so they're retried on the next run.
      try {
        const partial = await this.runBatch(group);
        Object.assign(out, partial);
        // Surface each chunk as it lands so the caller can persist + report progress.
        onChunk?.(partial);
      } catch (error) {
        console.warn(
          `  ! skipped a batch of ${group.length} strings: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
    return out;
  }

  /** Translate one chunk of short strings as a single JSON object; fall back per item on failure. */
  private async runBatch(
    items: readonly { id: string; text: string }[],
  ): Promise<Record<string, string>> {
    // Protect code and package names in every value before it reaches the model — prose cells and
    // captions carry inline code and `@scope/pkg` names that must survive verbatim — then restore per
    // id. Without this the batch path (unlike translateMarkdown) would let the model rewrite them.
    const masked = items.map((item) => {
      const markdown = preserveMarkdownSensitiveBlocks(item.text);
      const packages = preservePackageNames(markdown.text);
      return { id: item.id, masked: packages.text, markdown, packages };
    });
    const restore = (entry: (typeof masked)[number], value: string): string =>
      restoreMarkdownSensitiveBlocks(
        restorePackageNames(value, entry.packages.packageNames),
        entry.markdown.codeBlocks,
        entry.markdown.inlineCodeBlocks,
      );

    const payload = Object.fromEntries(masked.map((entry) => [entry.id, entry.masked]));
    const prompt = [
      "Translate the VALUES of this JSON object from English to Hungarian.",
      "Return ONLY a JSON object with the same keys and translated values.",
      "Do not translate, add, or remove keys. Keep identifiers, package names, and URLs unchanged.",
      "Do not alter placeholder tokens like __PTK_CODE_BLOCK_#__, __PTK_INLINE_CODE_#__, or __PTK_PACKAGE_#__.",
      JSON.stringify(payload, null, 2),
    ].join("\n");

    const raw = await this.runClaude(prompt, `batch of ${items.length} strings`);
    const parsed = extractJsonObject(raw);
    if (parsed) {
      const out: Record<string, string> = {};
      for (const entry of masked) {
        const value = parsed[entry.id];
        // A missing/non-string value restores to the (masked → original) source rather than dropping it.
        out[entry.id] = restore(entry, typeof value === "string" ? value : entry.masked);
      }
      return out;
    }
    // The model didn't return usable JSON; degrade to per-item translation rather than lose content.
    const out: Record<string, string> = {};
    for (const item of items) out[item.id] = await this.translateText(item.text);
    return out;
  }

  private runClaude(prompt: string, scope: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const child = spawn(this.command, [...this.args, "-p"], {
        stdio: ["pipe", "pipe", "pipe"],
      });
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");
      child.stdout.on("data", (chunk: string) => (stdout += chunk));
      child.stderr.on("data", (chunk: string) => (stderr += chunk));
      // The process-level events (`error`/`close`) come off ChildProcess's EventEmitter; type them
      // explicitly so the checker resolves the overloads and `code` isn't implicitly `any`.
      const proc = child as unknown as {
        on(event: "error", listener: (err: Error) => void): void;
        on(event: "close", listener: (code: number | null) => void): void;
      };
      proc.on("error", reject);
      proc.on("close", (code) => {
        if (code !== 0) {
          reject(
            new Error(
              `Claude translation failed for ${scope} (exit ${code ?? -1}): ${stderr.trim()}`,
            ),
          );
        } else {
          resolve(stdout.trimEnd());
        }
      });
      child.stdin.end(prompt);
    });
  }
}

export const createTranslationAdapter = (): TranslationAdapter => {
  // A pluggable selector means we can drop in a richer provider later without changing callers.
  const selected = (process.env.DOCS_TRANSLATION_ADAPTER ?? "glossary").toLowerCase();

  if (selected === "glossary") {
    return new GlossaryTranslationAdapter();
  }

  if (selected === "claude-code") {
    return new ClaudeCodeTranslationAdapter();
  }

  throw new Error(
    `Unsupported DOCS_TRANSLATION_ADAPTER: ${selected}. Supported adapters: glossary, claude-code`,
  );
};
