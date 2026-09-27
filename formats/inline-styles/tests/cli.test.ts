import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { runCli } from "../src/cli.ts";

test("CLI inlines pantoken and caller CSS from a file into a file", async () => {
  const directory = await mkdtemp(join(tmpdir(), "pantoken-inline-"));
  const input = join(directory, "input.html");
  const css = join(directory, "style.css");
  const output = join(directory, "output.html");

  try {
    await writeFile(input, '<button class="action">Save</button>');
    await writeFile(css, ".action { color: red; }");
    await runCli(["--input", input, "--css", css, "--output", output]);

    const result = await readFile(output, "utf8");
    expect(result).toContain('style="color: red;"');
    expect(result).not.toContain("<style");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("CLI rejects unsupported options", async () => {
  await expect(runCli(["--theme", "unknown"])).rejects.toThrow("Unknown option '--theme'");
});
