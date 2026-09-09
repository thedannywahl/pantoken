/**
 * Whole-document Markdown translation: mask everything a model must not touch, build the prompt,
 * then unmask. Shared by the docs pipeline and the i18n engine's `segment: "file"` content spaces.
 *
 * @module
 */

/** One masking pass: what was hidden, and the text with markers in its place. */
interface Masked {
  text: string;
  blocks: string[];
}

function mask(input: string, pattern: RegExp, prefix: string): Masked {
  const blocks: string[] = [];
  const text = input.replace(pattern, (match) => {
    const marker = `__${prefix}_${blocks.length}__`;
    blocks.push(match);
    return marker;
  });
  return { text, blocks };
}

function unmask(input: string, blocks: readonly string[], prefix: string): string {
  let out = input;
  for (const [index, block] of blocks.entries()) {
    out = out.replaceAll(`__${prefix}_${index}__`, block);
  }
  return out;
}

/** Everything masked out of one document, in the order it must be restored. */
export interface PreservedMarkdown {
  text: string;
  codeBlocks: string[];
  inlineCode: string[];
  packageNames: string[];
  escapedBrackets: string[];
  templateTokens: string[];
}

// TypeDoc renders a generic type as several separately backtick-wrapped tokens joined by bare escaped
// angle brackets — the `\<`/`\>` glue sits outside any code span, so it reaches the model as bare
// punctuation and has come back duplicated or mangled. Masking removes the ambiguity.
const ESCAPED_ANGLE_BRACKET = /\\[<>]/g;
// Scaffold templates carry `{{projectName}}`-style tokens that are substituted after translation.
const TEMPLATE_TOKEN = /\{\{[^}\n]+\}\}/g;

/** Mask fenced/inline code, package names, escaped angle brackets, and `{{template}}` tokens. */
export function preserveMarkdown(input: string): PreservedMarkdown {
  const fenced = mask(input, /```[\s\S]*?```/g, "PTK_CODE_BLOCK");
  const inline = mask(fenced.text, /`[^`\n]+`/g, "PTK_INLINE_CODE");
  const packages = mask(inline.text, /@[a-z0-9][a-z0-9.-]*\/[a-z0-9][a-z0-9.-]*/gi, "PTK_PACKAGE");
  const brackets = mask(packages.text, ESCAPED_ANGLE_BRACKET, "PTK_ESC");
  const tokens = mask(brackets.text, TEMPLATE_TOKEN, "PTK_VAR");
  return {
    text: tokens.text,
    codeBlocks: fenced.blocks,
    inlineCode: inline.blocks,
    packageNames: packages.blocks,
    escapedBrackets: brackets.blocks,
    templateTokens: tokens.blocks,
  };
}

/** Reverse {@link preserveMarkdown} against a translated document. */
export function restoreMarkdown(translated: string, preserved: PreservedMarkdown): string {
  let out = unmask(translated, preserved.templateTokens, "PTK_VAR");
  out = unmask(out, preserved.escapedBrackets, "PTK_ESC");
  out = unmask(out, preserved.packageNames, "PTK_PACKAGE");
  out = unmask(out, preserved.inlineCode, "PTK_INLINE_CODE");
  return unmask(out, preserved.codeBlocks, "PTK_CODE_BLOCK");
}

const BEGIN = "--- BEGIN MARKDOWN ---";
const END = "--- END MARKDOWN ---";

/** Prompt asking for one masked document back, translated, with its structure intact. */
export function buildMarkdownTranslationPrompt(
  maskedText: string,
  targetLanguage: string,
  reference: string,
): string {
  return [
    `Translate this technical markdown from English to ${targetLanguage}.`,
    "Return only the translated markdown.",
    "Rules:",
    "- Keep markdown structure unchanged.",
    "- Translate heading text too (the words after the leading # symbols) — do not leave headings in English.",
    "- Do not alter placeholder tokens like __PTK_CODE_BLOCK_#__ or __PTK_INLINE_CODE_#__.",
    "- Do not alter placeholder tokens like __PTK_PACKAGE_#__, __PTK_ESC_#__, or __PTK_VAR_#__.",
    "- Preserve whitespace and line breaks.",
    "- Keep import paths, package names, URLs, and identifiers intact.",
    `File: ${reference}`,
    BEGIN,
    maskedText,
    END,
  ].join("\n");
}

/** Drop the envelope when a model echoes the prompt's delimiters back around its answer. */
export function stripMarkdownEnvelope(output: string): string {
  const start = output.indexOf(BEGIN);
  const finish = output.lastIndexOf(END);
  if (start === -1 || finish <= start) return output;
  return output.slice(start + BEGIN.length, finish).trim();
}
