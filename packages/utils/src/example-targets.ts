/** Consumer supported by a cssdoc example's audience flag. */
export type ExampleAudience =
  | "automatica11y"
  | "canvas-rce"
  | "canvas-rce-no-interactions"
  | "docs";

/** Example indexes selected for each cssdoc consumer. */
export interface ExampleTargetSelection {
  automatica11y: number[];
  canvasRce: number[];
  docs: number[];
}

const AUDIENCE_FLAGS = new Map<string, ExampleAudience>([
  ["-automatica11y", "automatica11y"],
  ["-canvas-rce", "canvas-rce"],
  ["-canvas-rce-no-interactions", "canvas-rce-no-interactions"],
  ["-docs", "docs"],
]);

/**
 * Strip a leading flag header only when it ends in a newline.
 * The editor also accepts leading whitespace and flags on successive lines.
 */
export function stripExampleMetadata(example: string, multilineWhitespace = false): string {
  const flag = /-[a-z][a-z0-9-]*/uy;
  let cursor = 0;
  let end = 0;
  if (multilineWhitespace) {
    while (cursor < example.length && /\s/u.test(example[cursor]!)) cursor += 1;
  }
  while (cursor < example.length) {
    flag.lastIndex = cursor;
    if (!flag.test(example)) break;
    cursor = flag.lastIndex;
    while (
      cursor < example.length &&
      (multilineWhitespace ? /\s/u.test(example[cursor]!) : /[ \t]/u.test(example[cursor]!))
    ) {
      if (example[cursor] === "\n") end = cursor + 1;
      cursor += 1;
    }
    if (!multilineWhitespace) {
      if (example[cursor] === "\r") cursor += 1;
      if (example[cursor] === "\n") end = cursor + 1;
      if (end || example[cursor - 1] === "\r") break;
    }
  }
  return example.slice(end);
}

function audienceFlags(example: string): Set<ExampleAudience> {
  const fenceStart = example.indexOf("```");
  const metadata = fenceStart < 0 ? example : example.slice(0, fenceStart);
  const fenceInfo =
    fenceStart < 0 ? "" : (example.slice(fenceStart + 3).split(/\r?\n/u, 1)[0] ?? "");
  const metadataTokens = metadata.trim().split(/\s+/u).filter(Boolean);
  const metadataIsFlags = metadataTokens.every((token) => /^-[a-z][a-z0-9-]*$/u.test(token));
  const flags = new Set<ExampleAudience>();

  for (const token of [...(metadataIsFlags ? metadataTokens : []), ...fenceInfo.split(/\s+/u)]) {
    const audience = AUDIENCE_FLAGS.get(token);
    if (audience) flags.add(audience);
  }

  return flags;
}

/** Resolve example indexes for each consumer while preserving the pre-flag defaults. */
export function resolveExampleTargets(
  examples: readonly string[],
  options: { interactions?: boolean } = {},
): ExampleTargetSelection {
  const flags = examples.map(audienceFlags);
  const explicit = (audience: ExampleAudience): number[] =>
    flags.flatMap((exampleFlags, index) => (exampleFlags.has(audience) ? [index] : []));
  const automatica11y = explicit("automatica11y");
  const withoutInteractions = explicit("canvas-rce-no-interactions");
  const canvasRce =
    options.interactions === false && withoutInteractions.length > 0
      ? withoutInteractions
      : explicit("canvas-rce");
  const docs = explicit("docs");

  if (flags.every((exampleFlags) => exampleFlags.size === 0)) {
    return {
      automatica11y: [],
      canvasRce: examples.length === 0 ? [] : [0],
      docs: examples.map((_, index) => index),
    };
  }

  const unassigned = flags.flatMap((exampleFlags, index) =>
    exampleFlags.size === 0 ? [index] : [],
  );
  const fallbackCanvas = canvasRce.length === 0 ? unassigned.slice(0, 1) : [];
  const assignedCanvas = canvasRce.length > 0 ? canvasRce : fallbackCanvas;
  const fallbackDocs =
    docs.length > 0 ? [] : unassigned.filter((index) => !fallbackCanvas.includes(index));

  return {
    automatica11y,
    canvasRce: assignedCanvas,
    docs: docs.length > 0 ? docs : fallbackDocs,
  };
}
