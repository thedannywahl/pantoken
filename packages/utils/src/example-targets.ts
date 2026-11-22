/** Audience labels on a cssdoc example. */
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

interface LabeledExamples {
  examples: readonly string[];
  exampleLabels?: Readonly<Record<number, readonly string[]>>;
}

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

/** Resolve example indexes from the parsed cssdoc labels, not the example body. */
export function resolveExampleTargets(
  { examples, exampleLabels }: LabeledExamples,
  options: { interactions?: boolean } = {},
): ExampleTargetSelection {
  const labels = examples.map((_, index) => exampleLabels?.[index] ?? []);
  const explicit = (audience: ExampleAudience): number[] =>
    labels.flatMap((exampleLabels, index) => (exampleLabels.includes(audience) ? [index] : []));
  const automatica11y = explicit("automatica11y");
  const withoutInteractions = explicit("canvas-rce-no-interactions");
  const canvasRce =
    options.interactions === false && withoutInteractions.length > 0
      ? withoutInteractions
      : explicit("canvas-rce");
  const fallback = labels.findIndex((exampleLabels) => exampleLabels.length === 0);
  return {
    automatica11y,
    canvasRce: canvasRce.length || fallback === -1 ? canvasRce : [fallback],
    docs: labels.flatMap((labels, index) =>
      !labels.length || labels.includes("docs") ? [index] : [],
    ),
  };
}
