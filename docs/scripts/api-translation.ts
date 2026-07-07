/**
 * Locale translation adapter primitives for generated API docs.
 *
 * The default adapter is deterministic and keyless (safe for CI), while the adapter contract keeps
 * room for higher-quality engines later.
 */
import { spawnSync } from "node:child_process";

export interface TranslationAdapter {
  readonly name: string;
  translateMarkdown(input: string, filePath: string): string;
  translateText(input: string): string;
  /**
   * Translate many short strings in one request. Returns a map keyed by each item's `id`. Optional:
   * callers fall back to per-item {@link TranslationAdapter.translateText} when it's absent.
   */
  translateBatch?(items: readonly { id: string; text: string }[]): Record<string, string>;
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
];

export class GlossaryTranslationAdapter implements TranslationAdapter {
  readonly name = "glossary";

  translateMarkdown(input: string): string {
    return translateWithoutFencedCode(input, (text) => this.translateText(text));
  }

  translateText(input: string): string {
    const preserved = preservePackageNames(input);
    let out = preserved.text;
    for (const [pattern, value] of SORTED_REPLACEMENTS) {
      out = out.replace(pattern, value);
    }
    return restorePackageNames(out, preserved.packageNames);
  }

  translateBatch(items: readonly { id: string; text: string }[]): Record<string, string> {
    return Object.fromEntries(items.map((item) => [item.id, this.translateText(item.text)]));
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

  translateMarkdown(input: string, filePath: string): string {
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

    const translated = this.runClaude(prompt, `markdown file ${filePath}`);
    const restoredPackages = restorePackageNames(translated, preservedPackages.packageNames);
    return restoreMarkdownSensitiveBlocks(
      restoredPackages,
      preservedMarkdown.codeBlocks,
      preservedMarkdown.inlineCodeBlocks,
    );
  }

  translateText(input: string): string {
    const preserved = preservePackageNames(input);
    const prompt = [
      "Translate this technical UI text from English to Hungarian.",
      "Return only the translation.",
      "Keep identifiers and package names unchanged.",
      "Do not alter placeholder tokens like __PTK_PACKAGE_#__.",
      "Text:",
      preserved.text,
    ].join("\n");

    const translated = this.runClaude(prompt, "single text line").trim();
    return restorePackageNames(translated, preserved.packageNames);
  }

  translateBatch(items: readonly { id: string; text: string }[]): Record<string, string> {
    const out: Record<string, string> = {};
    // Chunk by total character budget so each request stays small enough to round-trip reliably.
    const BUDGET = 6000;
    let chunk: { id: string; text: string }[] = [];
    let size = 0;
    const flush = (): void => {
      if (chunk.length > 0) Object.assign(out, this.runBatch(chunk));
      chunk = [];
      size = 0;
    };
    for (const item of items) {
      if (size + item.text.length > BUDGET && chunk.length > 0) flush();
      chunk.push(item);
      size += item.text.length;
    }
    flush();
    return out;
  }

  /** Translate one chunk of short strings as a single JSON object; fall back per item on failure. */
  private runBatch(items: readonly { id: string; text: string }[]): Record<string, string> {
    const payload = Object.fromEntries(items.map((i) => [i.id, i.text]));
    const prompt = [
      "Translate the VALUES of this JSON object from English to Hungarian.",
      "Return ONLY a JSON object with the same keys and translated values.",
      "Do not translate, add, or remove keys. Keep identifiers, package names, and URLs unchanged.",
      JSON.stringify(payload, null, 2),
    ].join("\n");

    const raw = this.runClaude(prompt, `batch of ${items.length} strings`);
    const parsed = extractJsonObject(raw);
    if (parsed) {
      const out: Record<string, string> = {};
      for (const item of items) {
        const value = parsed[item.id];
        out[item.id] = typeof value === "string" ? value : item.text;
      }
      return out;
    }
    // The model didn't return usable JSON; degrade to per-item translation rather than lose content.
    const out: Record<string, string> = {};
    for (const item of items) out[item.id] = this.translateText(item.text);
    return out;
  }

  private runClaude(prompt: string, scope: string): string {
    const result = spawnSync(this.command, [...this.args, "-p"], {
      input: prompt,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });

    if (result.status !== 0) {
      throw new Error(
        `Claude translation failed for ${scope} (exit ${result.status ?? -1}): ${result.stderr.trim()}`,
      );
    }

    return result.stdout.trimEnd();
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
