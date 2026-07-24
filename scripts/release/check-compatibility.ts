/**
 * Gate for the compatibility manifest. Rebuilds the expected manifest in memory and fails if the
 * committed `compatibility.json` doesn't match — so an upstream bump or a new consumer must
 * regenerate it (`vp run sync:compatibility`) in the same change. Compares the *parsed* objects, so
 * it never fights the JSON formatter over whitespace.
 *
 * @module
 */
import fs from "node:fs/promises";
import path from "node:path";
import { buildCompatibility, type Compatibility } from "./compatibility.ts";

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);

/** Canonical (key-sorted) JSON, so equality ignores key order and whitespace. */
function canonical(value: unknown): string {
  const sort = (v: unknown): unknown => {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(sort);
    const o = v as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(o)
        .sort()
        .map((k) => [k, sort(o[k])]),
    );
  };
  return JSON.stringify(sort(value));
}

async function main(): Promise<void> {
  const expected = await buildCompatibility();

  let committed: Compatibility | null = null;
  try {
    committed = JSON.parse(
      await fs.readFile(path.join(ROOT, "compatibility.json"), "utf8"),
    ) as Compatibility;
  } catch {
    committed = null;
  }

  if (!committed) {
    console.error(
      "✗ compatibility: compatibility.json is missing or unparseable. Run `vp run sync:compatibility` and commit it.",
    );
    process.exitCode = 1;
    return;
  }

  if (canonical(committed) !== canonical(expected)) {
    console.error(
      "✗ compatibility: compatibility.json is stale (upstream pins or consumers changed).",
    );
    console.error(
      "  Run `vp run sync:compatibility` and commit compatibility.json + docs/compatibility.md.",
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `✓ compatibility: manifest matches (${Object.keys(expected.upstream).length} upstream sources, ${expected.consumers.length} consumers).`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
