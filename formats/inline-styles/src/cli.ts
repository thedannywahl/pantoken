#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import type { Theme } from "@pantoken/model";
import { inlinePantokenHtml } from "./pantoken-html.ts";

const THEMES: readonly Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

function parseTheme(value: string | undefined): Theme | undefined {
  if (value === undefined) return undefined;
  if (THEMES.includes(value as Theme)) return value as Theme;
  throw new Error(`Invalid theme "${value}". Choose rebrand, canvas, or canvasHighContrast.`);
}

function parseMode(value: string | undefined): "light" | "dark" | undefined {
  if (value === undefined || value === "light" || value === "dark") return value;
  throw new Error(`Invalid mode "${value}". Choose light or dark.`);
}

/** Run the HTML inliner CLI. */
export async function runCli(args: string[] = process.argv.slice(2)): Promise<void> {
  const parsed = parseArgs({
    args,
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      css: { type: "string", short: "c" },
      theme: { type: "string" },
      mode: { type: "string" },
      prefix: { type: "string" },
      "custom-color": { type: "string" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: false,
  });
  const { input, output, css, help, theme, mode, prefix } = parsed.values;
  const customColor = parsed.values["custom-color"];

  if (help) {
    process.stdout.write(
      "Usage: pantoken-inline [--theme <name>] [--mode <light|dark>] [--prefix <name>] [--custom-color <hex>] [--css <file>] [--input <file>] [--output <file>]\n",
    );
    return;
  }
  const selectedTheme = parseTheme(theme);
  const selectedMode = parseMode(mode);

  const html = input ? await readFile(input, "utf8") : await readStdin();
  const extraCss = css ? await readFile(css, "utf8") : undefined;
  const result = inlinePantokenHtml(html, {
    theme: selectedTheme,
    mode: selectedMode,
    prefix,
    customColor,
    extraCss,
  });

  if (output) {
    await writeFile(output, result);
  } else {
    process.stdout.write(result);
  }
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
