#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { inlineHtml } from "./inline-html.ts";

/** Run the HTML inliner CLI. */
export async function runCli(args: string[] = process.argv.slice(2)): Promise<void> {
  const parsed = parseArgs({
    args,
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      css: { type: "string", short: "c" },
      variables: { type: "string", default: "reference" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: false,
  });
  const { input, output, css, help } = parsed.values;

  if (help) {
    process.stdout.write(
      "Usage: pantoken-inline [--css <file>] [--input <file>] [--output <file>] [--variables reference|resolved]\n",
    );
    return;
  }
  if (parsed.values.variables !== "reference" && parsed.values.variables !== "resolved") {
    throw new TypeError("--variables must be reference or resolved");
  }
  const html = input ? await readFile(input, "utf8") : await readStdin();
  const extraCss = css ? await readFile(css, "utf8") : undefined;
  const result = inlineHtml(html, extraCss ?? "", {
    resolveCSSVariables: parsed.values.variables === "resolved",
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
