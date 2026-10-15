/** Consumer supported by a cssdoc example's audience flag. */
export type ExampleAudience = "automatica11y" | "canvas-rce" | "docs";

/** Example indexes selected for each cssdoc consumer. */
export interface ExampleTargetSelection {
  automatica11y: number[];
  canvasRce: number[];
  docs: number[];
}

const AUDIENCE_FLAGS = new Map<string, ExampleAudience>([
  ["-automatica11y", "automatica11y"],
  ["-canvas-rce", "canvas-rce"],
  ["-docs", "docs"],
]);

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
export function resolveExampleTargets(examples: readonly string[]): ExampleTargetSelection {
  const flags = examples.map(audienceFlags);
  const explicit = (audience: ExampleAudience): number[] =>
    flags.flatMap((exampleFlags, index) => (exampleFlags.has(audience) ? [index] : []));
  const automatica11y = explicit("automatica11y");
  const canvasRce = explicit("canvas-rce");
  const docs = explicit("docs");

  if (automatica11y.length + canvasRce.length + docs.length === 0) {
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
