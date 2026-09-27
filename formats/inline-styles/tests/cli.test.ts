import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { expect, test, vi } from "vite-plus/test";
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

test("CLI reads HTML from stdin and writes to stdout", async () => {
  const stdin = vi
    .spyOn(process, "stdin", "get")
    .mockReturnValue(
      Readable.from(['<button class="action">Save</button>']) as typeof process.stdin,
    );
  const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

  try {
    await runCli([]);
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining("Save"));
  } finally {
    stdin.mockRestore();
    stdout.mockRestore();
  }
});

test("CLI prints help when invoked", async () => {
  const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

  try {
    await runCli(["--help"]);
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining("Usage: pantoken-inline"));
  } finally {
    stdout.mockRestore();
  }
});
