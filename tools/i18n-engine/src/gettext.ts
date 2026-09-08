/**
 * Shells out to the real `msgmerge`/`msgfmt` binaries — never re-implements fuzzy matching or PO
 * format validation. Per the localization-engine plan's settled Phase 0 decision: don't rely on
 * these being preinstalled anywhere (could not be verified empirically on `ubuntu-latest` — see
 * repo memory); always `apt-get install -y gettext` explicitly in CI before calling this module.
 *
 * @module
 */
import { copyFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";

function run(command: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    const proc = child as unknown as {
      on(event: "error", listener: (e: Error) => void): void;
      on(event: "close", listener: (code: number | null) => void): void;
    };
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code !== 0) reject(new Error(`${command} exited ${String(code)}: ${stderr.trim()}`));
      else resolve({ stdout, stderr });
    });
  });
}

/**
 * Merge `potPath` into `poPath` in place (real `msgmerge`): new source strings are added, a removed
 * TRANSLATED one becomes a `#~` obsolete entry (`preserveObsolete` — never `--no-obsolete-entries`;
 * an untranslated removed entry is discarded outright — nothing to preserve), and a reworded source
 * string is marked `fuzzy` rather than losing its prior translation. Seeds `poPath` straight from
 * `potPath` (every `msgstr` empty) when it doesn't exist yet — `msgmerge` requires an existing PO.
 */
export async function mergePoWithTemplate(poPath: string, potPath: string): Promise<void> {
  if (!existsSync(poPath)) {
    // msgmerge requires an existing PO to merge into — seed one from the template (every msgstr
    // starts empty, same as a fresh POT) rather than attempting an update that would only fail.
    copyFileSync(potPath, poPath);
    return;
  }
  await run("msgmerge", ["--update", "--backup=none", poPath, potPath]);
}

/** Coverage counts from `msgfmt --statistics`, which reports on stderr regardless of exit code. */
export interface PoStatistics {
  translated: number;
  fuzzy: number;
  untranslated: number;
}

/** Parse `msgfmt --statistics`'s English summary line(s) — the only supported locale for parsing. */
function parseStatistics(stderr: string): PoStatistics {
  const translated = /(\d+) translated message/u.exec(stderr);
  const fuzzy = /(\d+) fuzzy translation/u.exec(stderr);
  const untranslated = /(\d+) untranslated message/u.exec(stderr);
  return {
    translated: translated ? Number(translated[1]) : 0,
    fuzzy: fuzzy ? Number(fuzzy[1]) : 0,
    untranslated: untranslated ? Number(untranslated[1]) : 0,
  };
}

/** Run `msgfmt --statistics -c` against `poPath`: validates PO syntax and reports coverage counts. */
export async function checkPoFile(poPath: string): Promise<PoStatistics> {
  try {
    const { stderr } = await run("msgfmt", ["--statistics", "-c", "-o", "/dev/null", poPath]);
    return parseStatistics(stderr);
  } catch (error) {
    if (error instanceof Error && /statistics/u.test(error.message))
      return parseStatistics(error.message);
    throw error;
  }
}

/** True when `msgmerge`/`msgfmt` are on `PATH` — check once before a run that needs them. */
export async function isGettextAvailable(): Promise<boolean> {
  try {
    await run("msgmerge", ["--version"]);
    await run("msgfmt", ["--version"]);
    return true;
  } catch {
    return false;
  }
}
