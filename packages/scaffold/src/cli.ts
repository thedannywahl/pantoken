/**
 * Shared CLI implementation for `pantoken-scaffold` and `create-pantoken-app` — same argv contract,
 * same interactive directory prompt, same post-scaffold instructions.
 *
 * @module
 * @alpha
 */
import { createInterface } from "node:readline/promises";
import { isScaffoldPlatform, scaffoldProject, SCAFFOLD_PLATFORMS } from "./index.ts";

/** Options distinguishing the two bins that share this CLI. */
export interface ScaffoldCliOptions {
  /** How the invoking command reads in its own `--help` usage line, e.g. `"pantoken-scaffold"`. */
  usageCommand: string;
}

/** Whether the directory prompt should run: no `--dir` flag was given, and stdin is an interactive TTY. */
export function shouldPromptForDir(
  dirFlag: string | undefined,
  isTTY: boolean | undefined,
): boolean {
  return dirFlag === undefined && isTTY === true;
}

async function promptForDir(): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question("Project directory (. for current folder): ");
    return answer.trim() || ".";
  } finally {
    rl.close();
  }
}

function parseArgs(argv: string[]): { help: boolean; platform?: string; dirFlag?: string } {
  let platform: string | undefined;
  let dirFlag: string | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") return { help: true, platform, dirFlag };
    if (arg === "--dir") {
      dirFlag = argv[i + 1];
      i += 1;
      continue;
    }
    if (!platform && !arg.startsWith("-")) {
      platform = arg;
      continue;
    }
    throw new Error(`Unknown option "${arg}".`);
  }

  return { help: false, platform, dirFlag };
}

/** Run the scaffold CLI end to end: parse argv, prompt if needed, scaffold, and print next steps. */
export async function runScaffoldCli(argv: string[], options: ScaffoldCliOptions): Promise<void> {
  const usage = () => `Usage: ${options.usageCommand} <${SCAFFOLD_PLATFORMS.join("|")}> [--dir .]`;

  let parsed: { help: boolean; platform?: string; dirFlag?: string };
  try {
    parsed = parseArgs(argv);
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    console.error(usage());
    process.exit(1);
  }

  if (parsed.help) {
    console.log(usage());
    return;
  }

  if (!parsed.platform || !isScaffoldPlatform(parsed.platform)) {
    console.error(`Unknown platform "${parsed.platform ?? ""}".`);
    console.error(usage());
    process.exit(1);
  }

  const dir = shouldPromptForDir(parsed.dirFlag, process.stdin.isTTY)
    ? await promptForDir()
    : (parsed.dirFlag ?? ".");

  try {
    const written = await scaffoldProject(parsed.platform, dir);
    for (const path of written) console.log(`✓ wrote ${path}`);
    console.log(`\nNext steps:\n  cd ${dir}\n  vp install   (or npm/pnpm/yarn/bun install)`);
  } catch (err) {
    console.error(`Error scaffolding project:`, err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
